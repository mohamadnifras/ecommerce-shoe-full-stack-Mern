const express = require('express')
const {registerUser, loginUser, getLoggedInUser,logoutUser,refreshAccessToken} = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router()


router.post('/register', registerUser)
router.post("/login", loginUser)
router.get('/me',authMiddleware,getLoggedInUser)
router.post('/logout',logoutUser)
router.post('/refresh-token', refreshAccessToken);


module.exports = router