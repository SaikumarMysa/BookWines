const mongoose = require("mongoose");

const Book = require("./bookModel");

const itemSchema = new mongoose.Schema({
    itemId:{
        type: mongoose.Schema.ObjectId,
        ref: 'Book'
    },
    quantity:{
        type: Number,
        required: true,
        min:[1, 'Quantity cannot be less than 1']
    },
    price:{
        type: Number
    },
    total:{
        type: Number
    }
});

module.exports = itemSchema;

