const multer = require('multer');
const Job = require('../models/jobModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// multer configs

// muter settings for files
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/files/docs');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, `file-${fileName}`);
  },
});

// const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('application')) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Not a document or an image Please upload only images and documents',
        404
      ),
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// exports.uploadUserDocument = upload.single('document');


//Create a new job posting in the database
exports.createJob = catchAsync(async (req, res, next) => {
  if(req.file){
    const document = upload.single('document');
  }

  const newJob = await Job.create(req.body, document);

  res.status(201).json({
    status: 'success',
    data: {
      job: newJob,
    },
  });
});

// Get all Job postings available in the database
exports.getAllJobs = catchAsync(async (req, res, next) => {
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
exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
});


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

// Update a single Job based on its ID
exports.updateJob = catchAsync(async (req, res, next) => {


  // fuilder out unwanted data
  const filteredBody = filterObj(req.body, 'name', 'budget', 'category', 'description', 'dueDate', 'document')
  const job = await Job.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
});

// Delete a job based on its ID from the database
exports.deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return next(new AppError('No job found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
