const User = require('../models/User');
const bcrypt = require('bcrypt');
let session = require('express-session');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login')
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          //USER SESSİON
          req.session.userID = user._id;
          console.log('login : ', req.session.userID);
          res.status(200).redirect('/users/dashboard');
        } else {
          res.status(401).send('You are not logged in');
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  try {
    console.log('logout : ', req.session.userID);
    req.session.destroy(() => {
      res.redirect('/');
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getDashbordPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID });
  const categories = await Category.find()
  const courses = await Course.find({user:req.session.userID})
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    categories,
    courses
  });
};
