const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'A book must have a title'],
        unique:true    
    },
    author:{
        type:String,
        required:[true,'A book must have an author']
    },
    language:{
        type:String,
        required:[true,'A book must have a language']
    },
    genre:[{
        type:String,
        required:true
    }],
    pages:{
        type:Number,
        required:[true,'A book must consist number of pages']
    },
    price:{
        type:Number,
        required:[true,'A book must have a price']
    },
    ratings:{
        type:Number,
        default:3,
        min:[1,'Rating must be above 1'],
        max:[5,'Rating must be below 5']
    },
    publisher:{
        type:String,
        trim:true
    },
    description:{
        type:String,
        trim:true
    }
})
const Book = mongoose.model('Book',bookSchema);
module.exports = Book;