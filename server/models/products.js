const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    productImage: {
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);