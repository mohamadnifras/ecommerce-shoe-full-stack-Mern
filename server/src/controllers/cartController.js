const asyncHandler = require('../middlewares/asyncHandler');
const cartSevice = require('../services/CartService')

// addCart
exports.addToCart = asyncHandler(async (req, res) => {


    const userId = req.user._id
    const { productId } = req.params;
    const { size, quantity } = req.body;
    const cart = await cartSevice.addProductToCart({ userId, productId, size, quantity });

    res.status(200).json({
        success: true,
        message: 'Product added to cat successfully🛒',
        cart,
    });
});

//get allCart
exports.getCart = asyncHandler(async (req, res) => {


    const userId = req.user._id

    const { page, limit } = req.query

    const allCart = await cartSevice.getCartService({ userId, page, limit });


    res.status(200).json({ allCart })
})


//delete item cart

exports.deletedCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    const updateCart = await cartSevice.deletedService({ userId, productId })

    res.status(200).json({ message: "product remove the cart", updateCart })
})

//product increase Cart Quantity
exports.increaseCartQuantity = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { productId } = req.params;
    const { size } = req.body;
    const cart = await cartSevice.increaseProductQuantity(userId, productId,size);

    res.status(200).json({ message: 'Quantity increased', cart })
})

//product decrease Cart Quantity
exports.decreaseCartQuantity = asyncHandler(async (req, res) => {
    const userId = req.user._id
    const { productId } = req.params;
        const { size } = req.body;
    const cart = await cartSevice.decreaseProductQuantity(userId, productId,size);

    res.status(200).json({ message: 'Quantity decreased', cart });
})

