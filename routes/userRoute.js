const mongoose = require('mongoose')
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const authController = require('../controllers/authController')

const router = express.Router()

router.route('/signup').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware ,authController.getDashbordPage);
module.exports = router
