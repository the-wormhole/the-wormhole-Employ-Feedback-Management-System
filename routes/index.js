const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');

router.get('/',passport.checkAuthentication,homeController.home);
router.use('/employ',require('./employ'));
router.use('/admin',require('./admin'));

module.exports = router;