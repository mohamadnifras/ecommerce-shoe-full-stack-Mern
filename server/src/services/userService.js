const User = require('../models/userModel');
const CustomError = require('../utils/customError');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken')

//Register services

exports.userRegisterServices = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new CustomError('Email already registered', 400);
    }

    try {
        console.log(username, email, password,'hello' )
        const user = await User.create({ username, email, password })
        return { id: user._id, username: user.username, email: user.email }
    } catch (error) {
        console.log(error,'error')
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            throw new CustomError(`The ${field} "${error.keyValue[field]}" is already taken. Please use a different one.`, 400);
        }
        throw new CustomError('Error registering user', 500)
    }

};

exports.userLoginServices = async ({ email, password }) => {
  const user = await User.findOne({ email });

  // If user is not found
  if (!user) {
    throw new CustomError('Email not found. Please create an account.', 400);
  }

  // If user is blocked
  if (user.blocked) {
    throw new CustomError('Your account has been blocked. Please contact support.', 403);
  }

  // Check password match
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new CustomError('Invalid password. Please try again.', 400);
  }

  // Generate tokens
  const accessToken = generateAccessToken({ id: user._id, role: user.role, email: user.email });
  const refreshToken = generateRefreshToken({ id: user._id, role: user.role, email: user.email });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      role: user.role,
      email: user.email
    }
  };
};


exports.getUserDetails = async (id) => {
    const user = await User.findById(id).select("username role")
    return user
}

exports.logoutUserService = () =>{
    return true;
}
