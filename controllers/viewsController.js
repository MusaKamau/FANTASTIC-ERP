const Job = require('../models/jobModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

exports.jobDetail = catchAsync(async(req, res, next) => {
  // 1) Get the data for the requested job
  const job = await Job.findOne({slug: req.params.slug});
  if(!job) {
    return next(new AppError('There is no job with that name.', 404));
  }
  // 2) Build template
  // 3) Render the template using data from 1
  res.status(200).render('job', {
    title: `${job.name}`,
    job
  })
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'login'
  });
}

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Signup'
  });
}

exports.getForgotPasswordForm = (req, res) => {
  res.status(200).render('forgotPassword');
}

exports.getAccountPage = (req, res) => {
  res.status(200).render('account');
}

exports.getResetPaswordForm = (req, res) => {
  res.status(200).render('resetPassword');
}
