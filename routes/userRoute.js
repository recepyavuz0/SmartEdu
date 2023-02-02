const mongoose = require('mongoose')
const express = require('express')

const userController = require('../controllers/authController')

const router = express.Router()

router.route('/signup').post(userController.createUser); // hhtp://localhost:3000/categories kurs oluşturma

module.exports = router
