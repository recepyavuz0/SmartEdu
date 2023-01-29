const mongoose = require('mongoose')
const express = require('express')

const courseController = require('../controllers/courseController')

const router = express.Router()

router.route('/').post(courseController.createCourse); // hhtp://localhost:3000/courses kurs oluşturma
router.route('/').get(courseController.getAllCourses); // hhtp://localhost:3000/courses kursları listeleme
router.route('/:slug').get(courseController.getCourse) // hhtp://localhost:3000/courses/id kurs detayları

module.exports = router
