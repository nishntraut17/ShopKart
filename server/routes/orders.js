const express = require('express');
const orderRouter = express.Router();
const { getAllOrders, getUserOrders, addOrder } = require('../controllers/order');
const auth = require("../middleware/auth");

orderRouter.post('/', auth, addOrder);
orderRouter.get('/', getUserOrders);

module.exports = orderRouter;