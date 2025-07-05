const jwt = require('jsonwebtoken')


//Generate access token
const generateAccessToken = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });
}

//Generate refresh token
const generateRefreshToken = (user) => {
    const payload = { id: user.id, email: user.email, role: user.role }
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
}




module.exports = { generateAccessToken, generateRefreshToken };