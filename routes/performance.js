const express = require('express');
const router = express.Router();
const performController = require('../controllers/performance_controller');
const passport = require('passport');

router.get('/view/:id',passport.checkAuthentication,performController.empPerformance);       
router.post('/create/:id',passport.checkAuthentication,performController.create);
router.post('/update/:id',passport.checkAuthentication,performController.update);    // If the performance has been reviewed once then this controller is called, otherwise create function is called


module.exports = router;