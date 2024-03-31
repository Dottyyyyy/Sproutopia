const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/OrderController');

router.get(`/`, orderControllers.getOrders);
router.get(`/:id`, orderControllers.getOrderById);
router.post('/', orderControllers.createOrder);

module.exports = router;