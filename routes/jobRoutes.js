const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', jobController.checkID);
router.route('/').get(authController.protect, jobController.getAllJobs);

router
  .route('/create')
  .post(
    jobController.uploadUserDocument,
    jobController.saveUserDocument,
    authController.protect,
    jobController.createJob
  );

// router.route('/upload').post(jobController.uploadUserDocument);

router
  .route('/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'freelancer'),
    jobController.deleteJob
  );

module.exports = router;
