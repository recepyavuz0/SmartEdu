const mongoose = require('mongoose')
const express = require('express')

const authController = require('../controllers/authController')

const router = express.Router()

router.route('/signup').post(authController.createUser); // hhtp://localhost:3000/categories kurs oluşturma
router.route('/login').post(authController.loginUser);
module.exports = router
