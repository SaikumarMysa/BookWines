const ApiFeatures = require('./../utils/apiFeatures.js');

const Book = require('./../models/bookModel');

exports.getBookByGenre=async(req,res)=>{
    try {
        const genre = req.params.genre;
        const books = await Book.aggregate([
            {
                $unwind:'$genre'
            },
            {
                $match:{genre:genre}
            }
            ,
            {
                $group:{
                    _id:'$genre',
                    count:{$sum:1},
                    books:{$push:'$title'}
                }
            },
            {
                $project:{"genre":1,"books":1}
                    
            },
            {
                $sort:{count:-1}
                //descending order of results
            }
        ])
        res.status(200).json({
            status:'success',
            data:{
                Results: books.length,
                books
            }
        })   
    } catch (err) {
        res.status(404).json({
            status:'fail',
            message:err.message
        })
    }
}

exports.getBookStats=async(req,res)=>{
    try {
        const stats=await Book.aggregate([
            {
                $match:{ratings:{$gte:4.5}}
            },
            {
                $group:{
                    _id:null,
                    numBooks:{$sum:1},
                    avgRating:{$avg:'$ratings'},
                    avgPrice:{$avg:'$price'},
                    minPrice:{$min:'$price'},
                    maxPrice:{$max:'$price'}
                }
            }
        ]);
        res.status(200).json({
            status:'success',
            data:{
                stats
            }
        })
    } catch (err) {
        res.status(404).json({
            status:'fail',
            message:err.message
        })
        
    }
}

//prices: high-low
exports.pricesHighToLow = (req, res, next) =>{
    req.query.sort = '-price';
    next();
}

//prices: low-high
exports.pricesLowToHigh = (req, res, next) =>{
    req.query.sort = 'price'
    next();
}

//most populator books(top rated)
exports.mostPopular = (req, res, next) =>{
   
    req.query.sort = '-ratings';
    req.query.limit = '5';
    next();
}
//Retrieve All Books:

exports.getAllBooks = async(req,res) => {

    try {

        const features = new ApiFeatures(Book.find(), req.query).filter().sort().limitFields().paginate()

        const books = await features.query;

        res.status(200).json({

            status: 'success',

            results: books.length,

            data: {

                books

            }
        })

    }catch (err) {

            res.status(404).json({

            status: 'fail',

            message: err.message

        })
    }
}

exports.getBook = async(req,res)=>{
    try{
        const book = await Book.findById(req.params.id)
        res.status(200).json({
            status:'success',
            data:{
                book
            }
            
        })
    }catch(err){
        console.log(err);
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}

//create
exports.createBook=async(req,res)=>{
    try{
       const newBook = await Book.create(req.body);
       res.status(201).json({
        status:'success',
        data:{
            book:newBook
        }
       })
    }catch(err){
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}

//Update
exports.updateBook = async(req,res)=>{
    try{
        const book = await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })

        res.status(200).json({
            status:'success',
            data:{
                book
            }
        })
    }catch(err){
        res.send(404).json({
            status:'fail',
            message:err
        })

    }
}

//Delete
exports.deleteBook = async(req,res)=>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status:'Book has been removed from database',
        })
    }catch(err){
        res.status(404).json({
            status:fail,
            message:err
        })
    }
}