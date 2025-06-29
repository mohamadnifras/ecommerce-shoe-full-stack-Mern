const asyncHandler = require('../middlewares/asyncHandler');
const orderService = require('../services/orderService')
const CustomError = require("../utils/customError")
//add to order
exports.addOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { shippingAddress, paymentMethod } = req.body;
    const { order, razorpayOrderId } = await orderService.createOrder({ userId, shippingAddress, paymentMethod });

    res.status(201).json({
        message: "Order place successfully",
        order,
        razorpayOrderId
    })
})

exports.verifyPayment = asyncHandler(async (req, res) => {
    const { paymentId, orderId } = req.body;
    try {
        isPaymentVerfied = await orderService.verifyPayment(paymentId, orderId)
        if (isPaymentVerfied) {
            res.status(200).json({
                message: 'payment verified successfully'
            })
        } else {
            throw new CustomError('payment verified failed !', 400)
        }
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Something went wrong!"
        })
    }
})

// get user order
exports.getUserOrder = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { page, limit } = req.query
    const orders = await orderService.getOrders({ userId, page, limit })

    res.status(201).json({
        message: "Orders success", orders
    })
})

//AllOrders
exports.getAllOrders = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const allOrder = await orderService.allOrderService(page, limit);

    res.status(201).json(allOrder)
})



//Admin userOrder
exports.getUserOrderById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const userOrder = await orderService.userOrderService(userId)

    res.status(201).json(userOrder)
})




