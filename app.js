const express = require('express');
const morgan = require('morgan');

const jobRouter = require('./routes/jobRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {});

// Error handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'err';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
});

module.exports = app;
