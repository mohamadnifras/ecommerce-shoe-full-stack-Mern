const asyncHandler = require('../middlewares/asyncHandler');
const wishlistService = require('../services/wishlistService')

//AddWishlist
exports.addWishlist = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {productId} = req.params;

    const wishlist = await wishlistService.addWishlistService(userId,productId)

    res.status(200).json({
        message:'Product added to wishlist',
        wishlist
    })
})

//Remove the wishlist
exports.removeWishlist =  asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const {productId} = req.params;

    const wishlist = await wishlistService.removeWishlistService(userId,productId);

    res.status(200).json({
        message:'Product removed from wishlist successfully',
        wishlist
   })
})

//cleareWishlist

exports.cleareWishlist = asyncHandler(async(req,res)=>{
    const userId = req.user._id;
    const wishlist = await wishlistService.cleareWishlistService(userId);


    res.status(200).json({
        message:'Wishlist cleared successfully',
        wishlist
    })
})               