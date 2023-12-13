const express = require('express');
const productRouter = express.Router();
const { getAllProducts, getOneProduct, createProduct } = require("../controllers/product");

productRouter.post('/', createProduct);
productRouter.get('/', getAllProducts);

module.exports = productRouter;