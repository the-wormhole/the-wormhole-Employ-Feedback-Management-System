const express = require('express');
const router = express.Router();
const passport = require('passport');
const feedbackController = require('../controllers/feedback_controller');

router.post('/add/:id',passport.checkAuthentication,feedbackController.add);
router.get('/delete/:id',passport.checkAuthentication,feedbackController.delete);

module.exports = router;