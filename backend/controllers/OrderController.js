const Order = require("../models/order");
const Product = require("../models/product");

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

    //   req.body.orderItems.product = req.body.orderItems.id
    console.log(req.body);
    // Create a new order in the database
    const order = await Order.create({
      orderItems,
      shippingInfo,
      paidAt: Date.now(),
      user: req.user._id, // Assuming req.user contains user information
      // You can include itemsPrice, totalPrice, and paymentInfo here if needed
    });

    // Send a success response with the newly created order
    res.status(200).json({
      success: true,
      order,
    });
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
  const orders = await Order.find();

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
