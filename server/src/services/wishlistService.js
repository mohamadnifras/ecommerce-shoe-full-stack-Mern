const Product = require('../models/productModel')
const CustomError = require('../utils/customError')
const Wishlist = require('../models/wishlistModel')


//AddWishlist
const addWishlistService = async (userId, productId) => {
    try {
        const product = await Product.findById(productId)
        if (!product) {
            throw new CustomError('Product not fount', 404)
        }
        let wishlist = await Wishlist.findOne({ userId: userId })
        if(!wishlist){
            wishlist = new Wishlist({userId,items:[]})
        }
        const productExists = wishlist.items.find((item)=>item.productId.toString() === productId);
        if(productExists){
            throw new CustomError('Product already in wishlist')
        }
        wishlist.items.push({productId})
        await wishlist.save()
        return wishlist
    } catch (error) {
      throw error
    }
}


//Remove the wishlist
const removeWishlistService = async(userId,productId)=>{
    console.log(userId);
    console.log(productId);
    
 try{
    const wishlist = await Wishlist.updateOne(
        {userId:userId},
        {$pull:{items:{productId:productId}}}
    );
    if(wishlist.modifiedCount === 0){
        throw new CustomError('Product not found in wishlist',404)
    }
    return wishlist
 }catch(error){
    throw error
 }
}


//cleareWishlist
const cleareWishlistService = async(userId)=>{
   try{
    const wishlist = await Wishlist.updateOne(
        {userId:userId},
        {$set:{items:[]}}
    );
    if(wishlist.modifiedCount === 0){
        throw new CustomError('Wishlist not found or already empty',404)
    }
    return wishlist
   }catch(error){
    throw error
   }
}

module.exports = { addWishlistService, removeWishlistService,cleareWishlistService}
