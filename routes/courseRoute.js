const mongoose = require('mongoose')
const express = require('express')

const roleMiddleware = require('../middlewares/roleMiddleware')
const courseController = require('../controllers/courseController')

const router = express.Router()

router.route('/').post(roleMiddleware(["teacher","admin"]), courseController.createCourse); // hhtp://localhost:3000/courses kurs oluşturma
router.route('/').get(courseController.getAllCourses); // hhtp://localhost:3000/courses kursları listeleme
router.route('/:slug').get(courseController.getCourse) // hhtp://localhost:3000/courses/id kurs detayları
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);

module.exports = router
