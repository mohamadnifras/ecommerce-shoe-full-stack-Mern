const express = require('express');
const productDetail = require('../controllers/productController')
const authMiddleware = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdmin')
const upload = require('../middlewares/uploadMiddleware')

const router = express.Router()


// get product userSide
router.get('/product', productDetail.getProduct)
router.get('/product/:id', productDetail.getProduct)

// Admin side 
router.post('/addProduct', authMiddleware, isAdmin, upload.fields([{ name: 'image', maxCount: 5 }, { name: 'individualImages', maxCount: 10 }]), productDetail.addProduct)
router.delete('/deletedProduct/:id', authMiddleware, isAdmin, productDetail.deletedProduct)
router.put('/editProduct/:id', authMiddleware, isAdmin, upload.fields([{ name: 'image', maxCount: 5 }, { name: 'individualImages', maxCount: 10 }]), productDetail.editProduct)


module.exports = router