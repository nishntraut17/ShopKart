const express = require('express');
const orderRouter = express.Router();
const { disableReviewOption, getUserOrders, addOrder } = require('../controllers/order');
const auth = require("../middleware/auth");

orderRouter.post('/', auth, addOrder);
orderRouter.get('/', auth, getUserOrders);
orderRouter.put('/:id', auth, disableReviewOption);

module.exports = orderRouter;