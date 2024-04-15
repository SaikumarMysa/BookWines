const express=require('express');
const router=express.Router();
const bookController=require('./bookController');
router.route('/book-stats').get(bookController.getBookStats);
router.route('/books-by-genre/:genre').get(bookController.getBookByGenre)
router
.route('/')
.get(bookController.getAllBooks)
.post(bookController.createBook)
router
.route('/:id')
.get(bookController.getBook)
.patch(bookController.updateBook)
.delete(bookController.deleteBook)
module.exports=router;
