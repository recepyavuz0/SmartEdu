const mongoose = require('mongoose')
const express = require('express')

const categoryController = require('../controllers/categoryController')

const router = express.Router()

router.route('/').post(categoryController.createCategory); // hhtp://localhost:3000/categories kurs oluşturma
router.route('/:id').delete(categoryController.deleteCategory); // hhtp://localhost:3000/categories kurs oluşturma

module.exports = router
