const mongoose = require('mongoose');
const Product = require('../models/products');

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
        const product = await Product.findById(req.params.id);
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
        console.log(req.body);
        const newProduct = new Product({ name: req.body.name, price: req.body.price, description: req.body.description, brand: req.body.brand, category: req.body.category, productImage: req.body.productImage });
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllProducts, getOneProduct, createProduct };