const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    //console.log("req.body.category : ",req.body.category)

    const course = await Course.create({
      name: req.body.name,
      desc: req.body.desc,
      category: req.body.category,
      user: req.session.userID,
    });
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;
    //data matching the categories query
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    filter = categorySlug ? { category: category._id } : filter;
    filter = query ? { desc: query } : filter;

    if (!query && !categorySlug) {
      (filter.desc = ''), (filter.category = null);
    }

    const courses = await Course.find({
      $or: [
        { desc: { $regex: '.*' + filter.desc + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdAt')
      .populate('user');
    const categories = await Category.find();
    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);

    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    console.log('user:', user);
    const categories = await Category.find();
    res.status(200).render('course', {
      course,
      categories,
      user,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.addToSet({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndRemove({slug:req.params.slug})
    req.flash("success",`${course.name} has been removed successfully`)
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    console.log('first', first)
    const course = await Course.findOne({slug:req.params.slug});
    course.name = req.body.name;
    course.desc = req.body.description;
    course.category = req.body.category;
    course.save();
    console.log('last', last)
    req.flash("success",`${course.name} has been updated successfully`)
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error,
    });
  }
};


