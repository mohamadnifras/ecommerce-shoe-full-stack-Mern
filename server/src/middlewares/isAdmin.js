const CustomError = require('../utils/customError');

const isAdmin = (req,res,next)=>{
    if(req.user&&req.user.role === 'admin'){
        next()
    }else{
        throw new CustomError('Access denied. Only Admin Access.',403);
    }
}

module.exports = isAdmin