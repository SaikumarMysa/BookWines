const Book = require('../models/bookModel');
const User = require('./../models/userModel');

const jwt = require('jsonwebtoken');

//getUserById
exports.getUserById = async(req,res) =>{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })
}

//user-register
exports.register = async(req,res) =>{
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            role: req.body.role
        })
        res.status(201).json({
            status:'A User registered',
            data:{
                newUser
            }
        })
    }catch(err){
        res.status(404).json({
            status:'fail',
            message: err.message
        })
    }
}

//user-login

exports.login = async(req,res) =>{

    const {email,password} = req.body;

    if(!email || ! password) return res.status(404).json({
        status:'fail',
        message:'Not found'
    })

    const user = await User.findOne({email}).select('+password')

    const correct = await user.correctPassword(password,user.password)

    if(!user||!correct) return res.status(404).json({
        status:'fail',
        message:'Not found'
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_PASSWORD,{expiresIn:process.env.JWT_EXPIRES_IN});

    res.status(200).json({
        status:'login success',
        token
    })
}

//userProfile
exports.userProfile = (req,res,next)=>{
    req.params.id = req.user.id;
    next();
}

//updateMe

exports.updateMe = async(req,res) =>{
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {new:true, runValidators: true})

    res.status(200).json({
        status: 'user data updated',
        data:{
            updatedUser
        }
    })
}

//deleteMe

exports.deleteMe = async(req,res) =>{
    await User.findByIdAndDelete(req.user.id);
    
    res.status(200).json({
        status: 'User Deleted'
    })
};

//wishlist

exports. getWishlist = async(req,res) =>{
    const user = await User.findById(req.user.id);
    var wishlist = user.wishlist;
    res.status(200).json({
        status: 'Your Wishlist is here',
        data:{
            wishlist
        }
    })
}

exports.addToWishlist = async (req,res) =>{
    const wishlistAdded= await User.findByIdAndUpdate(req.user.id,{$push:{wishlist:req.body.bookId}},
    
        {new: true, runValidators: true});
        var myWishlist = wishlistAdded.wishlist;
        res.status(200).json({
            status: 'Book added to wishlist',
            data:{
                myWishlist
            }
        })
}

exports.removeFromWishlist = async (req,res) =>{
    const wishlistRemoved= await User.findByIdAndUpdate(req.user.id,{$pull:{wishlist:req.body.bookId}},
        {new: true, runValidators: true});
        // var myWishlist = wishlistRemoved.wishlist;
        res.status(200).json({
            status: 'Book removed from wishlist',
        })
}