const express = require('express');
const router = express.Router();
const passport = require('passport');
const employController = require('../controllers/employ_controller');

router.post('/create',employController.create);
router.get('/sign-in',employController.signIn);
router.get('/sign-up',employController.signUp)

router.post('/create-session', 
passport.authenticate( 'employ-local', {failureRedirect: '/employ/sign-in'})
,employController.createSession);

router.get('/sign-out',employController.destroySession);
router.get('/view/:id',employController.view)


module.exports = router;