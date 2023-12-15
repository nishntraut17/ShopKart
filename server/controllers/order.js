const mongoose = require('mongoose');
const Order = require('../models/orders');

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).send(orders);
    } catch (error) {
        console.log(error);
    }
}

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user });
        return res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
}

const addOrder = async (req, res) => {
    try {
        req.body.cartItemIdQuantity.map(async (item) => {
            const result = await Order({ product: item._id, quantity: item.quantity, user: req.user });
            console.log("Result is ", result);
            await result.save();
        })
        res.status(201).json({ success: "Recipe added successfully" });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllOrders, getUserOrders, addOrder };