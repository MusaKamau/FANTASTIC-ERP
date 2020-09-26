const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.isLoggedIn);
router.get('/', viewsController.landing);
router.get('/overview',authController.protect,  viewsController.getOverview)
router.get('/job', authController.protect, viewsController.jobDetail)
router.get('/login', viewsController.getLoginForm)
router.get('/signup', viewsController.getSignupForm)
router.get('/forgotPassword', viewsController.getForgotPasswordForm)
router.get('/account', viewsController.getAccountPage);

module.exports = router
