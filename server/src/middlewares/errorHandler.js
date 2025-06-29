const errorHandler = (err, req, res, next)=>{
    let statusCode = err.statusCode || 500;
    let message = err.message|| 'Internal Server Error';
console.log(err)
    res.status(statusCode).json({
        status:'error',
        message,
    })
};




module.exports = errorHandler;