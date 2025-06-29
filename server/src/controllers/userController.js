const { userRegisterServices, userLoginServices, getUserDetails, logoutUserService } = require("../services/userService.js")
const asyncHandler = require('../middlewares/asyncHandler')
const { registerValidation, loginValidatin } = require('../utils/validators')
const CustomError = require('../utils/customError')

// registerUser
exports.registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const { error } = registerValidation.validate({ username, email, password, confirmPassword });
    if (error) throw new CustomError(error.details[0].message, 400);
    const user = await userRegisterServices({ username, email, password })
    console.log(user);


    //send response
    res.status(201).json({
        message: 'User registered successfully', user,
    });
});

// loginUser
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginValidatin.validate({ email, password });
    if (error) throw new CustomError(error.details[0].message, 400);
    const { accessToken, refreshToken, user } = await userLoginServices({ email, password })
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 3 * 24 * 60 * 60 * 1000, //3days
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    })

    res.status(200).json({
        message: 'Login Successfully', user,
    });
});


exports.getLoggedInUser = asyncHandler(async (req, res) => {
    const user = await getUserDetails(req.user.id);
    if (!user) {
        throw new CustomError("User not found", 404)
    }

    res.status(200).json({ user })
})

exports.logoutUser = asyncHandler(async (req, res) => {
    await logoutUserService();

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
    });

    res.status(200).json({ message: 'Logged out successfully' });
})


exports.refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new CustomError('Refresh token not found', 401);
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);   

    const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role, email: decoded.email});

    // Set the new access token as a cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 5 * 60 * 1000,
    });

    res.status(200).json({ message: 'Token refreshed successfully' });
  } catch (err) {
    throw new CustomError('Invalid or expired refresh token', 401);
  }
});



