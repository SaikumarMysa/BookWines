const mongoose = require("mongoose");

const User = require('./userModel');

const itemSchema = require('./itemSchema');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    items: [itemSchema],
    subTotal:{
        type: Number,
        default : 0
    },
    active:{
        type: Boolean,
        default: true,
        select: false
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;