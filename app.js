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
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋 ');
  next();
});

// ROUTES
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
