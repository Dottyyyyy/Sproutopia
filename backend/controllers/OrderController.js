const  Order  = require('../models/order');
const Product  = require('../models/product');

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
  const orders = await Order.find().populate('user', 'name')

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