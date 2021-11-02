const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/admin_controller');
//const homeController = require('../controllers/home_controller');
const employController = require('../controllers/employ_controller');

router.get('/home',passport.checkAuthentication,adminController.home);
router.post('/create',adminController.create);
router.get('/sign-in',adminController.signIn);
router.get('/sign-up',employController.signUp)

router.post('/create-session', 
passport.authenticate( 'admin-local', {failureRedirect: '/admin/sign-in'})
,adminController.createSession);
router.get('/create-admin',passport.checkAuthentication,adminController.allEmploys);                      //route to show a page with all employs
router.get('/make/:id',passport.checkAuthentication,adminController.newAdmin);

router.get('/sign-out',passport.checkAuthentication,adminController.destroySession);

//routes for managing employs
router.get('/delete-employ',passport.checkAuthentication,adminController.allEmploys);                    //route to show a page with all employs
router.get('/delete/:id',passport.checkAuthentication,adminController.deleteEmploy);
router.get('/new-employ',passport.checkAuthentication,adminController.employForm);                       //New Employ form, employ being created by Admin

router.get('/view/:id',passport.checkAuthentication,adminController.view);                               //View an Employ

router.post('/employ/update/:id',passport.checkAuthentication,adminController.employUpdate)              //For Updation of employ info
module.exports = router;