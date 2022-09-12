exports.getIndexPage = (req, res) => {
    res.status(200).render('index',
    {page_name : "index"}
    )
  }

exports.getAboutPage = (req, res) => {
    res.status(200).render('about',
    {page_name : "about"}
    )
  }

  exports.getContactPage = (req, res) => {
    res.status(200).render('contact',
    {page_name : "contact"}
    )
  }

exports.getCourseSinglePage = (req, res) => {
    res.status(200).render('course-single',
    {page_name : "course-single"}
    )
  }

  exports.getCoursesPage = (req, res) => {
    res.status(200).render('courses',
    {page_name : "courses"}
    )
  }

exports.getDashbordPage = (req, res) => {
    res.status(200).render('dashboard',
    {page_name : "dashboard"}
    )
  }

  exports.getLoginPage = (req, res) => {
    res.status(200).render('login',
    {page_name : "login"}
    )
  }

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register',
    {page_name : "register"}
    )
  }
