const asyncHandler = require('../middlewares/asyncHandler');
const adminService = require('../services/adminService')


//get allUsers
exports.getAllUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const allUsers = await adminService.allUsersService({ page, limit });

    res.status(201).json(allUsers)
})

//get user
exports.getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await adminService.getUser(id);

    res.status(201).json(user)
})

//blockAndUnblockUser
exports.blockAndUnblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await adminService.blockAndUnblockService(id);


    res.status(200).json(
        {
            message: `User ${user.blocked ? "blocked" : "unblocked"} `,
            user
        }
    )
})



//Total Revenue
exports.getTotalRevenue = asyncHandler(async (req, res) => {
    const totalRevenue = await adminService.revenueService()

    res.status(201).json(totalRevenue)
})


