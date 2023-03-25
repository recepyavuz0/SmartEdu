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

  exports.sendEmail = (req, res) => {
    const nodemailer = require("nodemailer");
    let output = `
    <h1>Mail Details</h1>
    <ul>
    <li>Name:${req.body.name}</li>
    <li>Email:${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `

    nodemailer.createTestAccount((err, account) => {
      if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          return process.exit(1);
      }
      let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
              user: account.user,
              pass: account.pass
          }
      });

      // Message object
      let message = {
          from: `Sender Name <${account.user}>`,
          to: req.body.email,
          subject: 'Nodemailer is unicode friendly ✔',
          html: output
      };
  
      transporter.sendMail(message, (err, info) => {
          if (err) {
              console.log('Error occurred. ' + err.message);
              return process.exit(1);
          }
  
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
  });


    console.log(req.body)
    res.status(200).redirect('/contact')
  }
