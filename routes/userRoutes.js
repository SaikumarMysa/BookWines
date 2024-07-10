const express = require('express');

const userController = require('./../controllers/userController');

const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/myProfile', authController.auth, userController.userProfile, userController.getUserById)

router.patch('/updateMe', authController.auth, userController.updateMe)

router.delete('/deleteMe', authController.auth, userController.deleteMe)

module.exports = router;