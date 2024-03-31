const express = require('express');
const router = express.Router();
const orderControllers = require('../controllers/OrderController');

const { isAuthenticated } = require('../middlewares/Auth')
router.post('/', isAuthenticated, orderControllers.newOrder);
router.get('/', isAuthenticated, orderControllers.myOrders);
module.exports = router;

module.exports = router;