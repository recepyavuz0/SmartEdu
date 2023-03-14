const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
  try {
    //console.log("req.body.category : ",req.body.category)

    const course = await Course.create({
      name:req.body.name,
      desc:req.body.desc,
      category: req.body.category,
      user: req.session.userID

    });
    res.status(201).redirect('/courses')
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
  
    //data matching the categories query
    const category = await Category.findOne({slug:categorySlug})
    
    let filter = categorySlug ? {category:category._id} : {}

    //console.log('filter:',filter)
    const courses = await Course.find(filter).sort('-createdAt').populate('user')
    const categories = await Category.find();
    
    res.status(200).render('courses',{
      courses,
      categories,
      page_name: 'courses' }
    )
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({slug:req.params.slug}).populate('user')
    const categories = await Category.find();
    res.status(200).render('course',{
      course,
      categories,
      page_name: 'courses' }
    )
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};