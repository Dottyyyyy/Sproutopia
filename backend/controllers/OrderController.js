exports.newOrder = async (req, res, next) => {
  try {
    // Extract shipping information from the request body
    const shippingInfo = {
      address: req.body.address,
      city: req.body.city,
      phoneNo: req.body.phoneNo,
      postalCode: req.body.postalCode,
      country: req.body.country
    };

    // Extract other necessary information from the request body
    const { orderItems } = req.body;

    // Calculate total price for each order item
    let totalPrice = 0;
    const calculatedOrderItems = orderItems.map(item => {
      const totalItemPrice = item.quantity * item.price;
      totalPrice += totalItemPrice;
      return { ...item, totalPrice: totalItemPrice };
    });

    // Create a new order in the database
    const order = await Order.create({
      orderItems: calculatedOrderItems,
      shippingInfo,
      totalPrice, // Include the total price for the entire order
      orderStatus: 'Processing', // Assuming this is the default status
      user: req.user._id // Assuming req.user contains user information
      // You can include itemsPrice, totalPrice, and paymentInfo here if needed
    });

    // Send a success response with the newly created order
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create order"
    });
  }
};


exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
    res.status(200).json({
      success: true,
      orders
  })
}
exports.getSingleOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')
  if (!order) {
      return res.status(404).json({ message: `No Order found with this ID` })
  }
  res.status(200).json({
      success: true,
      order
  })
}
exports.adminOrders = async (req, res, next) => {
  const orders = await Order.find()
  let totalAmount = 0;
  orders.forEach(order => {
      totalAmount += order.totalPrice
  })
  res.status(200).json({
      success: true,
      totalAmount,
      orders
  })
}