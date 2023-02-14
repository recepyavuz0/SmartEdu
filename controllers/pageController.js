
exports.getIndexPage = (req, res) => {
  console.log("--")
    res.status(200).render('index',
    {page_name : "index"}
    )
  }

exports.getAboutPage = (req, res) => {
  console.log("++")
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
    res.status(200).render('course',
    {page_name : "course"}
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
    console.log("getLoginPage")
    
    res.status(200).render('login',
    {page_name : "login"}
    )
  }

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register',
    {page_name : "register"}
    )
  }
