const express = require('express');
const viewsController = require('../controllers/viewsController');
const router = express.Router();

router.get('/', viewsController.landing);
router.get('/overview', viewsController.getOverview)
router.get('/job', viewsController.jobDetail)
router.get('/login', viewsController.login)
router.get('/signup', viewsController.signup)

module.exports = router
