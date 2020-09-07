const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Create token here
  // 1) payload
  // 2) Secret
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  // destructuring
  const { email, password } = req.body;
  // 1) Check if email nd password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password'));
  }
  // 2) Check if user exist and password is correct
  const user = await User.findOne({ email }).select('+password');
  console.log(user);

  // 3) if ok send token
  const token = 'this is the token';
  res.status(200).json({
    status: 'success',
    token,
  });
});
