const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/customError');
const Order = require('../models/orderModel');
const razorpayInstance = require('../config/razorpay')


//create order
const createOrder = async ({ userId, shippingAddress, paymentMethod }) => {


    const cart = await Cart.findOne({ userId: userId });

   


    if (!cart || !cart.items || cart.items.length == 0) {
        throw new CustomError('Cart is empty. Please add items before placing an order.', 400);
    }


    let totalAmount = 0;
    for (const cartItem of cart.items) {
        const product = await Product.findById(cartItem.productId);
        if (!product) {
            throw new CustomError('Product not found')
        }
        // if (product.stock < cartItem.quantity) {
        //     console.log(product.stock);

        //     throw new CustomError(`Insufficient quantity for ${product.name}`)
        // }

        product.stock -= cartItem.quantity;
        await product.save();
        totalAmount += product.price * cartItem.quantity;
    }

    const newOrder = new Order({
        userId: userId,
        items: cart.items,
        shippingAddress,
        totalAmount,
        paymentMethod,
        status: paymentMethod == 'razorpay' ? 'pending' : 'placed'
    });

    const order = await newOrder.save();
    await Cart.findOneAndUpdate({ userId: userId }, { $set: { items: [], totalItemPrice: 0 }}, { new: true });


  


    if (paymentMethod == 'razorpay') {
        const options = {
            amount: Math.round(totalAmount * 100),
            currency: 'INR',
            receipt: `order_receipt_${order._id}`,
            payment_capture: 1,
        }
       


        try {
            const rezorpayOrder = await razorpayInstance.orders.create(options)
          

            order.razorpayOrderId  = rezorpayOrder.id;
            await order.save()
        } catch (error) {
            console.log(error);

            throw new CustomError('Razorpay order creation failed', 500)
        }
    }
    return { order }
}


const verifyPayment = async (paymentId, razorpayOrderId) => {
    console.log(paymentId,'paymentId')
    console.log(razorpayOrderId,'paymentId')
    const order = await Order.findOne({ razorpayOrderId }).populate('items.productId')
    if (!order || order.razorpayOrderId !== razorpayOrderId) {
        throw new CustomError("Order not found or invalid order ID", 400)
    }
    try {
        const paymentDetails = await razorpayInstance.payments.fetch(paymentId)
        console.log(paymentDetails,'paymentDetails')
        if (paymentDetails.status === 'captured') {
            order.paymentStatus = 'paid';
            order.status = 'placed';
            await order.save();
            return true;
        } else {
            throw new CustomError('Payment verification failed', 400)
        }
    } catch (error) {
        throw new CustomError('Payment verification failed', 500)
    }
}

//get user Oreders 

const getOrders = async ({ userId, page = 1, limit = 10 }) => {

    const skip = (page - 1) * limit
    const orders = await Order.find({ userId })
        .populate('items.productId')
        .skip(skip)
        .limit(limit)

    if (!orders.length) {
        throw new CustomError('No orders found for this user', 404)
    }
    return orders
}


//Admin All Order 
const allOrderService = async (page, limit) => {
    const skip = (page - 1)
    const allOrder = await Order.find().populate('items.productId').skip(skip).limit(limit)
    const totalOrder = await Order.countDocuments()
    return {
        allOrder,
        currentPage: page,
        totalPage: Math.ceil(totalOrder / limit),
        totalOrder
    };
};

//Admin userOrder 
const userOrderService = async (userId) => {
    const userOrder = await Order.find({ userId: userId }).sort({ createdAt: -1 }).populate('items.productId')
    if (!userOrder) {
        throw new CustomError('Order not fount', 404)
    }
    return { userOrder }
}










module.exports = { createOrder, getOrders, userOrderService, allOrderService, verifyPayment }



