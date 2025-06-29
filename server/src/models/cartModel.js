const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        size: {
            type: Number,
            required: true,
            enum: [4, 5, 6, 7, 8, 9, 10, 11],
        },
    }],
    totalItemPrice: {
        type: Number,
        required: true 
    },
    
   
},{ timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)