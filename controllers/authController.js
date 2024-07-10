const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');

//AUTHENTICATION:

exports.auth = async(req,res,next) =>{
    let token;
    if(req.headers.authorization&&req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) return next(new AppError('You are not logged in!', 400))
    const decoded = jwt.verify(token, process.env.JWT_SECRET_PASSWORD)
    const currentUser = await User.findById(decoded.id);
    if(!currentUser) return next (new AppError('The User belonging to this token doesnot exists!', 400))
    req.user = currentUser;
    next();
}

//AUTHORIZATION:

exports.restrictTo = (...roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You donot have permission to  perform this action', 403))
        }
        next();
    }
}