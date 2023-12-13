const mongoose = require('mongoose');
const Product = require('../model/product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).send(products);
    } catch (error) {
        console.log(error);
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.body.id);
        if (!product) {
            return res.status(400).send("No such Product");
        }
        return res.status(200).send(product);
    } catch (error) {
        console.log(error);
    }
}

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body });
        await newProduct.save();
    } catch (error) {
        console.log(error);
    }
}