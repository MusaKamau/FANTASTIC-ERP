const AppError = require('../utils/appError');

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // console.log(value);
  const message = `Duplicate field value: ${value} please use another value`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invlid token plese log in gain', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired please log in again', 401);

const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(',  ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  // API
  if(req.originalUrl.startsWith('/api')){
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // Rendered Website
  console.error('ERROR 🔥 ', err);
  return res.status(err.statusCode).render('error',{
    title: 'Something went wrong',
    msg: err.message
  })
};

const sendErrorProd = (err, req, res) => {
  // API
  if(req.originalUrl.startsWith('/api')){
    // Operational, trusted error: Send to clinet
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // Programming or other unknown error
    // 1) Log error
    console.error('ERROR 🔥 ', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }

  // Rendered website
  // Send trusted error to the client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error',{
      title: 'Something went wrong',
      msg: err.message,
    });
  }
    // Programming or other unknown error
    // 1) Log error
    console.error('ERROR 🔥 ', err);
    // 2) Send generic message
    return res.status(err.statusCode).render('error',{
      title: 'Something went wrong!',
      msg: 'Please try again later.'
    });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDb(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDb(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, req, res);
  }
};
