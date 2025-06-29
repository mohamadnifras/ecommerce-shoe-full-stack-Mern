const { required, string, types } = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            size: {
                type: Number,
                required: true,
                enum: [4, 5, 6, 7, 8, 9, 10, 11],
            },
            quantity: {
                type: Number,
                required: true,
            },

        }
    ],

    shippingAddress: {
        fullName: { type: String, required: true },
        address: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        state: { type: String, required: true }

    },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['placed', 'pending', 'shipped', 'delivered', 'cancelled'],
    },
    razorpayPaymentId: {
        type: String,
    },
    razorpayOrderId: {
        type: String,
    },
    paymentStatus: {
        type: String,
        enum: ['paid', 'placed', 'pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    createdAt: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Order', orderSchema) 