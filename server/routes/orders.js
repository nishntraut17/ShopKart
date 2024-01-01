const express = require('express');
const orderRouter = express.Router();
const { disableReviewOption, getUserOrders, addOrder, deleteOrders } = require('../controllers/order');
const auth = require("../middleware/auth");

orderRouter.post('/', auth, addOrder);
orderRouter.get('/', auth, getUserOrders);
orderRouter.put('/:id', auth, disableReviewOption);
orderRouter.put('/:id', auth, deleteOrders);

module.exports = orderRouter;