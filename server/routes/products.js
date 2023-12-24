const express = require('express');
const productRouter = express.Router();
const { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct, commentProduct, rateProduct, getProductsByCategory } = require("../controllers/product");

productRouter.post('/', createProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getOneProduct);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);
productRouter.put('/comment/:id', commentProduct);
productRouter.put('/rate/:id', rateProduct);
productRouter.get('/category/:category', getProductsByCategory);

module.exports = productRouter;