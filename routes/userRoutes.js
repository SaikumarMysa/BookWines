const express = require('express');

const userController = require('./../controllers/userController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/myProfile', authController.auth, userController.userProfile, userController.getUserById)

router.patch('/updateMe', authController.auth, userController.updateMe)

router.delete('/deleteMe', authController.auth, userController.deleteMe)

router.get('/wishlist', authController.auth, userController.getWishlist )

router.patch('/wishlist/add', authController.auth, userController.addToWishlist)

router.patch('/wishlist/remove', authController.auth, userController.removeFromWishlist)

module.exports = router;