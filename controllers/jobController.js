const Job = require('../models/jobModel');
const APIFeatures = require('../utils/apiFeatures');
// Get all Job postings available in the database
exports.getAllJobs = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get a single job bsed on it's ID from the database
exports.getJob = async (req, res) => {
  try {
    const singleJob = await Job.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        singleJob,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

//Create a new job posting in the database
exports.createJob = async (req, res) => {
  try {
    // const newJob = new Job({});
    // newJob.save();

    const newJob = await Job.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        job: newJob,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// Update a single Job based on its ID
exports.updateJob = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete a job based on its ID from the database
exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
