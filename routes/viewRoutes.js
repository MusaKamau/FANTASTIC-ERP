const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/',authController.isLoggedIn, viewsController.landing);

router.get('/overview', viewsController.getOverview)
router.get('/contact', viewsController.getContactPage)
router.get('/about', viewsController.getAboutPage)
router.get('/postJob', viewsController.getPostjobPage)
// router.get('/overview',
//   authController.protect,
//   authController.isLoggedIn,
//   viewsController.getOverview)

router.get('/job',
  authController.protect,
  authController.isLoggedIn,
  viewsController.jobDetail)

router.get('/login',
  authController.isLoggedIn,
  viewsController.getLoginForm)

router.get('/signup',
  authController.isLoggedIn,
  viewsController.getSignupForm)

router
  .get('/forgotPassword',
  authController.isLoggedIn,
  viewsController.getForgotPasswordForm)

router
  .get('/account',
  authController.isLoggedIn,
  viewsController.getAccountPage);

router
  .get('/resetPassword',
  authController.isLoggedIn,
  authController.protect,
  viewsController.getResetPaswordForm)

router
  .post('/submit-user-data',
   authController.protect,
  viewsController.updateUserData)

module.exports = router
