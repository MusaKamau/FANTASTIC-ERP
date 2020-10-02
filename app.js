const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const jobRouter = require('./routes/jobRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
// GLOBAL Middleware
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

//  Set Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this Ip, Please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());

//Data Sanitization againist NOSQL query Injection
app.use(mongoSanitize());

// Data Sanitization againist Xss
app.use(xss());

// Prevent parameter ploution
app.use(
  hpp({
    whitelist: ['budget', 'skills'],
  })
);

// ROUTES
app.use('/', viewRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/users', userRouter);

// Test middleware
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

// Error handling
app.use(globalErrorHandler);
module.exports = app;
