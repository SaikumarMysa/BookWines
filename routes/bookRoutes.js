const express = require('express');

const bookController = require('./../controllers/bookController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/book-stats').get(bookController.getBookStats);

router.route('/books-by-genre/:genre').get(bookController.getBookByGenre)

router
.route('/')
.get(bookController.getAllBooks)
.post(authController.auth, authController.restrictTo('admin'), bookController.createBook)

router
.route('/:id')
.get(bookController.getBook)
.patch(bookController.updateBook)
.delete(bookController.deleteBook)

module.exports=router;
