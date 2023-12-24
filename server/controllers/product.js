const Product = require('../models/products');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).send(products);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        return res.status(200).send(products);
    } catch (error) {
        res.send(error);
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
        res.send(error);
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
        res.send(error);
    }
}

const updateProduct = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const deleteProduct = async (req, res) => {
    try {

    } catch (error) {
        res.send(error);
    }
}

const commentProduct = async (req, res) => {
    try {
        const { comment } = req.body;

        // Validate userId and commentText
        if (!comment) {
            return res.status(400).json({ error: "Comment is required." });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        // Add the new comment
        product.comments.push({ user: req.user, comment });
        await product.save();

        res.status(201).json({ message: "Comment added successfully." });
    } catch (error) {
        res.send(error);
    }
}

const rateProduct = async (req, res) => {
    try {
        const { rating } = req.body;

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }

        // Check if the user has already rated this product
        const existingRating = product.ratings.find((rate) =>
            rate.user.equals(req.user)
        );
        if (existingRating) {
            return res
                .status(400)
                .json({ error: "User has already rated this product" });
        }

        // Add the new rating
        product.ratings.push({ user: req.user, rating: rating });
        await product.save();

        res.status(201).json({ message: "Rating added successfully." });
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct, commentProduct, rateProduct, getProductsByCategory };