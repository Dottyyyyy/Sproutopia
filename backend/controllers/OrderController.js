const  Order  = require('../models/order');
const Product  = require('../models/product');
const nodemailer = require("nodemailer");

const sendOrderNotification = async (email, orderItems, order) => {
  //create a nodemailer transport

  const transporter = nodemailer.createTransport({
    //configure the email service

      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ad5a6648f4014a",
        pass: "b839a9629dccda"
      }

  });

  //compose the email message
  const mailOptions = {
    from: "Baghub.com",
    to: email,
    subject: "Order Notification",
  };
  const productText = orderItems
    .map((orderItems) => `- ${orderItems.name}: $${orderItems.price} x${orderItems.quantity}`)
    .join("\n");

  mailOptions.text = `Thank you for ordering from Baghub! \n\nLIST OF ITEMS:\n${productText}\n\nOrder Total:₱ ${order.totalPrice}`;

  //send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};

exports.newOrder = async (req, res, next) => {
  try {
    // Extract shipping information from the request body
    const shippingInfo = {
      address: req.body.address,
      city: req.body.city,
      phoneNo: req.body.phoneNo,
      postalCode: req.body.postalCode,
      country: req.body.country,
    };

    // Extract other necessary information from the request body
    const { orderItems } = req.body;

    // Calculate total price for each order item
    let totalPrice = 0;
    const calculatedOrderItems = orderItems.map((item) => {
      const totalItemPrice = item.quantity * item.price;
      totalPrice += totalItemPrice;
      return { ...item, totalPrice: totalItemPrice };
    });
    // Create a new order in the database
    const order = await Order.create({
      orderItems: calculatedOrderItems,
      shippingInfo,
      totalPrice, // Include the total price for the entire order
      orderStatus: "Processing", // Assuming this is the default status
      user: req.user._id, // Assuming req.user contains user information
      // You can include itemsPrice, totalPrice, and paymentInfo here if needed
    });

    // Send a success response with the newly created order
    res.status(200).json({
      success: true,
      order,
    });
    sendOrderNotification(req.user.email, orderItems, order);
  } catch (error) {
    // Handle errors
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order",
    });
  }
};

exports.myOrders = async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
};

exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return res.status(404).json({ message: `No Order found with this ID` });
  }

  res.status(200).json({
    success: true,
    order,
  });
};

exports.adminOrders = async (req, res, next) => {
  const orders = await Order.find().populate("user", "name");

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};

exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return res
      .status(404)
      .json({ message: `You have already delivered this order` });
  }

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({
    success: true,
  });
};
