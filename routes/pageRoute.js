const express = require('express')


const pageController = require('../controllers/pageController')

const router = express.Router()

router.route(['/','/index']).get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/dashboard').get(pageController.getDashbordPage);


module.exports = router
