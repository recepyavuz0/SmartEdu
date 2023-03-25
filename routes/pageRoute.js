const express = require('express')

const redirecthMiddleware = require('../middlewares/redirectMiddleware')
const pageController = require('../controllers/pageController')

const router = express.Router()

router.route(['/','/index']).get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/register').get(redirecthMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirecthMiddleware, pageController.getLoginPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/contact').post(pageController.sendEmail);
module.exports = router
