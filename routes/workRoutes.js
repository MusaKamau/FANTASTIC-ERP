const express = require('express');
const workController = require('../controlers/workController');

const router = express.Router();

// router.param('id', workController.checkID);

router
  .route('/')
  .get(workController.getAllWork)
  .post(workController.createWork);

router
  .route('/:id')
  .get(workController.getWork)
  .patch(workController.updateWork)
  .delete(workController.deleteWork);

module.exports = router;
