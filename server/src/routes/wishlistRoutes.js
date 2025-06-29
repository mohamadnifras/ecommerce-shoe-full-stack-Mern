const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const wishlistController = require('../controllers/wishlistController')

const router = express.Router()

router.post('/addWishlist/:productId',authMiddleware,wishlistController.addWishlist)  
router.delete('/removeWishlist/:productId',authMiddleware,wishlistController.removeWishlist)
router.delete('/cleareWishlist',authMiddleware,wishlistController.cleareWishlist)


module.exports = router