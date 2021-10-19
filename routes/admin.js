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
router.get('/create-admin',adminController.allEmploys);                      //route to show a page with all employs
router.get('/make/:id',adminController.newAdmin);

router.get('/sign-out',adminController.destroySession);

//routes for managing employs
router.get('/delete-employ',adminController.allEmploys);                    //route to show a page with all employs
router.get('/delete/:id',adminController.deleteEmploy);
router.get('/new-employ',adminController.employForm);                       //New Employ form, employ being created by Admin

router.get('/view/:id',adminController.view);                               //View an Employ

router.post('/employ/update/:id',adminController.employUpdate)
module.exports = router;