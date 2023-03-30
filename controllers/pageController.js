const nodemailer = require("nodemailer");
const Course = require("../models/Course");
const User = require("../models/User");

exports.getIndexPage = async(req, res) => {
  const courses = await Course.find().sort('-createdAt').limit(2);
  const totalCourses = await Course.find().countDocuments();
  const totalStudents= await User.countDocuments({role:'student'});
  const totalTeachers= await User.countDocuments({role:'teacher'});
    res.status(200).render('index',
    {
      page_name : "index",
      courses,
      totalCourses,
      totalStudents,
      totalTeachers
    }
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

  exports.sendEmail =  async (req, res) => {
    try {
      
    let output = `
    <h1>Mail Details</h1>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>Email:${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "geoffrey.bosco@ethereal.email", // generated ethereal user
        pass: "2dMYBeec5kH77NUjjF", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `SmartEDU <message@smartedu.com>`, // sender address
      to: req.body.email, // list of receivers
      subject: "Hello ✔", // Subject line
      html: output
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    req.flash("success", "We Received your message succesfully");
    } catch (err) {
      req.flash("error", `Something happened!`);
    }
    


    console.log(req.body)
    res.status(200).redirect('contact')
  }
