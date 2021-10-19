const express = require('express');
const router = express.Router();
const passport = require('passport');
const employController = require('../controllers/employ_controller');
//const homeController = require('../controllers/home_controller');

router.post('/create',employController.create);
router.get('/sign-in',employController.signIn);
router.get('/sign-up',employController.signUp)

router.post('/create-session', 
passport.authenticate( 'employ-local', {failureRedirect: '/employ/sign-in'})
,employController.createSession);

router.get('/sign-out',employController.destroySession);


module.exports = router;