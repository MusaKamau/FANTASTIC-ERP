const Job = require('../models/jobModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync( async(req, res, next) => {
  // Get Job data from collection
  const jobs = await Job.find();
  // Build template
  // Render that temlate using job data
  res.status(200).render('overview', {
    title: 'Jobs',
    jobs
  })
})

exports.landing =  (req, res) => {
  res.status(200).render('landingPage');
}

exports.jobDetail = (req, res) => {
  res.status(200).render('job', {
    title: 'Job'
  })
}

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'login'
  });
}

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup');
}
