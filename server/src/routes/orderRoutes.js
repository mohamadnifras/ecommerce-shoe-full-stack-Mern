const express = require('express')
const orderConrollers= require('../controllers/orderConrollers')
const authMiddleware = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdmin')


const router  =  express.Router()

//user Order
router.post('/order/create',authMiddleware,orderConrollers.addOrder);
router.post('/verify-payment',orderConrollers.verifyPayment)
router.get('/orders', authMiddleware,orderConrollers.getUserOrder)



//Admin userOrder
router.get('/allOrders', authMiddleware, isAdmin, orderConrollers.getAllOrders)
router.get('/order/:userId', authMiddleware,isAdmin,orderConrollers.getUserOrderById)



module.exports = router