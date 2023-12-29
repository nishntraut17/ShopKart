const Product = require('../models/products');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('seller', ['name']);
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
        const product = await Product.findById(req.params.id).populate('comments.user', ['name', 'profileImage']).populate('seller', ['name']);
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
        const newProduct = new Product({ name: req.body.name, price: req.body.price, description: req.body.description, brand: req.body.brand, category: req.body.category, productImages: req.body.productImages, seller: req.user });
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const updateProduct = async (req, res) => {
    try {
        const {
            name,
            price,
            category,
            description,
            brand,
            productImages,
        } = req.body;
        if (
            !name ||
            !price ||
            !description ||
            !category ||
            !brand ||
            !productImages
        ) {
            return res.status(422).json({ message: "Insufficient data" });
        }
        const product = await Product.findOne({ _id: req.params.id });
        product.name = name;
        product.price = price;
        product.category = category;
        product.description = description;
        product.brand = brand;
        product.productImages = productImages;
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ _id: req.params.id });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

const commentProduct = async (req, res) => {
    try {
        const { comment } = req.body;
        console.log(comment);
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

        console.log(req.user);
        product.ratings.push({ user: req.user, rating: rating });
        await product.save();

        res.status(201).json({ message: "Rating added successfully." });
    } catch (error) {
        res.send(error);
    }
}

module.exports = { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct, commentProduct, rateProduct, getProductsByCategory };