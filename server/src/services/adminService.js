const User = require('../models/userModel')
const CustomError = require('../utils/customError');
const Order = require('../models/orderModel')

//all users service
const allUsersService = async ({ page, limit }) => {
    const skip = (page - 1) * limit
    const allUsers = await User.find({ role: 'user' })
        .skip(skip)
        .limit(limit)
        .select('-password')
        .sort({ createdAt: -1 })
    const totalUser = await User.countDocuments({ role: 'user' })

    return {
        allUsers, totalUser
    }
};


//get user id 

const getUser = async (id) => {

    const user = await User.findById(id)
    if (!user) {
        throw new CustomError('User not fount')
    }
    return user
}

///blockAndUnblockUser
const blockAndUnblockService = async (id) => {
    const user = await User.findById(id)
    if (!user) {
        throw new CustomError('User not found')
    }
    user.blocked = !user.blocked
    await user.save()
    return user
}



//Total Revenue
const revenueService = async () => {
    const totalRevenue = await Order.aggregate([{ $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }])
    return totalRevenue
}




module.exports = { allUsersService, getUser, blockAndUnblockService, revenueService }