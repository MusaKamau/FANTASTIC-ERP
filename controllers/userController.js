const multer = require('multer');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// multer configs
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const uniqueSuffix = Date.now() + '-'+ Math.round(Math.random() * 1E6)
    cb(null, `user-${uniqueSuffix}.${ext}`)
    // cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image please upload only images', 404), false);
  }
};


const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo')

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'Success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  // 1) Create an error if user tries to update password
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        'This route is not for password update please use /updateMyPassword'
      )
    );
  }

  // 2) Filter out unwanted data
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update THE USER Document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
  next();
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
