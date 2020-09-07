const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', jobController.checkID);
router
  .route('/')
  .get(authController.protect, jobController.getAllJobs)
  .post(jobController.createJob);

router
  .route('/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

module.exports = router;
