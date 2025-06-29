const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const CustomError = require('../utils/customError');




const calculateTotalPrice = async (items) => {
    let total = 0;
    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    return total;
};
//add cart services
const addProductToCart = async ({ userId, productId, size, quantity }) => {
    try {
        const product = await Product.findById(productId);

        if (!product) {
            throw new CustomError('Product not found', 404);
        }

        if (product.quantity <= 0) {
            throw new CustomError('Product is out of stock', 400);
        }
        const price = product.price;


        let cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{
                    productId,
                    quantity,
                    size
                }],
                totalItemPrice: price * quantity
            });
        } else {
            const existingItemIndex = cart.items.findIndex(item =>
                item.productId.toString() === productId && item.size === size);

            if (existingItemIndex >= 0) {
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity, size });
            }
            cart.totalItemPrice = await calculateTotalPrice(cart.items);
        }

        return await cart.save();
    } catch (error) {
        console.error("Error adding product to cart:", error);
        throw error;
    }

};


//getCartService all product 
const getCartService = async ({ userId, page, limit }) => {
    console.log(userId);

    const skip = (page - 1) * limit
    const cart = await Cart.findOne({ userId: userId })
        .populate('items.productId')
        .skip(skip)
        .limit(limit);
    if (!cart) {
        throw new CustomError('Cart not found', 404);
    }
    return cart
}



// increase Product Quantit
const increaseProductQuantity = async (userId, productId,size) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');


    const productInCart = cart.items.find(p => p.productId.toString() === productId && p.size === size);
    if (!productInCart) throw new Error('Product not found in cart');


    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');


    if (product.stock < productInCart.quantity + 1) {
        throw new Error('Not enough stock available');
    }
    productInCart.quantity += 1;


    let totalItemPrice = 0;
    for (const item of cart.items) {
        const product = await Product.findById(item.productId);
        if (product) {
            totalItemPrice += product.price * item.quantity;
        }
    }


    cart.totalItemPrice = totalItemPrice;
    await cart.save();

    return cart;
};






//product decrease Cart Quantity
const decreaseProductQuantity = async (userId, productId,size) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error('Cart not found');


    const productInCart = cart.items.find(p => p.productId.toString() === productId && p.size === size);
    if (!productInCart) throw new Error('Product not found in cart');


    const product = await Product.findById(productId);
    if (!product) throw new Error('Product not found');


    if (product.stock < productInCart.quantity - 1) {
        throw new Error('Not enough stock available');
    }


    if (productInCart.quantity > 1) {
        productInCart.quantity -= 1;
    } else {
        throw new Error('Quantity cannot be less than 1');
    }

    let totalItemPrice = 0;
    for (const item of cart.items) {
        const itemProduct = await Product.findById(item.productId);
        if (itemProduct) {
            totalItemPrice += itemProduct.price * item.quantity;
        }
    }


    cart.totalItemPrice = totalItemPrice;

    await cart.save();
    return cart;
};


//deletedService
const deletedService = async ({ userId, productId }) => {

    const cart = await Cart.findOne({ userId: userId })

    if (!cart) {
        throw new CustomError("Cart not found", 404)
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId)
    if (!existingItem) {
        throw new CustomError("Product not found in cart", 404)
    }

    cart.items.pull({ productId })
    await cart.save()
    return cart

}




module.exports = { addProductToCart, getCartService, increaseProductQuantity, decreaseProductQuantity, deletedService }