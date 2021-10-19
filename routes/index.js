const express = require('express');
const router = express.Router();
//const homeController = require('../controllers/home_controller');
const employController = require('../controllers/employ_controller');
const passport = require('passport');

router.get('/',passport.checkAuthentication,employController.home);
router.use('/employ',require('./employ'));
router.use('/admin',require('./admin'));
router.use('/performance',require('./performance'));
router.use('/feedback',require('./feedback'));

module.exports = router;