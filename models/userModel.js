const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcrypt');

const Book = require('./bookModel');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter your name']
    },
    email:{
        type:String,
        required:[true,'Enter your email'],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,'Please Re-enter your password'],
        validate:{
            validator:function(el){
                return el===this.password
            }
        }
    },
    role:{
        type:String,
        enum: ['user','admin'],
        default:'user'
    },
    wishlist:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    }]
},
{timestamps:true}
)

//hashing
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    //hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12)
    //delete the confirmPassword field in db
    this.confirmPassword = undefined;
})

userSchema.methods.correctPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}

const User = mongoose.model('User',userSchema);

module.exports = User;