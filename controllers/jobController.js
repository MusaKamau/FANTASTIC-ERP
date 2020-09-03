const Job = require('../models/jobModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

// Get all Job postings available in the database
exports.getAllJobs = catchAsync(async (req, res) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Job.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const jobs = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'Success',
    results: jobs.length,
    data: {
      jobs,
    },
  });
});

// Get a single job bsed on it's ID from the database
exports.getJob = catchAsync(async (req, res) => {
  const singleJob = await Job.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      singleJob,
    },
  });
});

//Create a new job posting in the database
exports.createJob = catchAsync(async (req, res, next) => {
  const newJob = await Job.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      job: newJob,
    },
  });
});

// Update a single Job based on its ID
exports.updateJob = catchAsync(async (req, res) => {
  const singleJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      singleJob,
    },
  });
});

// Delete a job based on its ID from the database
exports.deleteJob = catchAsync(async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
