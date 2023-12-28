const express = require('express');
const productRouter = express.Router();
const auth = require('../middleware/auth')
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct, commentProduct, rateProduct, getProductsByCategory } = require("../controllers/product");

productRouter.post('/', createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getOneProduct);
productRouter.put('/:id', auth, updateProduct);
productRouter.delete('/:id', auth, deleteProduct);
productRouter.put('/comment/:id', auth, commentProduct);
productRouter.put('/rate/:id', auth, rateProduct);
productRouter.get('/category/:category', getProductsByCategory);

module.exports = productRouter;