const mongoose = require('mongoose');
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),

    body('email').isEmail().withMessage('Please Enter Your Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is alredy exists!');
          }
        });
      }),
    body('password').not().isEmpty().withMessage('Please Enter Password'),
  ],authController.createUser);

  router.route('/login').post(
    [
      body('email').isEmail().withMessage('Please Enter Your Email'),
      body('password').not().isEmpty().withMessage('Please Enter Password')
    ], authController.loginUser);
router.route('/logout').get(authController.logoutUser);
router.route('/dashboard').get(authMiddleware, authController.getDashbordPage);
module.exports = router;
