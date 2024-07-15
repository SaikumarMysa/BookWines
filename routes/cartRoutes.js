const express = require('express');

const router = express.Router();

const authController = require('./../controllers/authController');

const cartController = require('./../controllers/cartController');

router.post('/addToCart', authController.auth, cartController.addToCart);

router.get('/', authController.auth, cartController.getCart);

router.delete('/removeItem', authController.auth, cartController.removeItem);


module.exports = router;