const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name required'],
    },
    price: {
        type: Number,
        required: [true, 'product price required']
    },
    image: {
        type: [String],
        required: [true, 'product image required']
    },
    individualImages: {
        type: [String],
        required: [true, 'products image required']
    },
    category: {
        type: String,
        required: [true, 'product category required']
    },
    brand: {
        type: String,
        required: [true, 'product brand required']
    },
    stock: {
        type: Number,
        required: [true, 'product stock required']
    },
    size: {
        type: [Number],
        enum: [4, 5, 6, 7, 8, 9, 10, 11],
        required: [true, 'product size required'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema)