const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../../models/jobModel');
const User = require('../../models/userModel');

dotenv.config({ path: '../../config.env' });
const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB, connection successfully'));

// Read the file contents
const job = JSON.parse(fs.readFileSync(`${__dirname}/jobs.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

// Import data into the database
const importData = async () => {
  try {
    await Job.create(job);
    console.log('Data successfully loaded');
    await User.create(users, { validateBeforeSave: false });
    // console.log('Data successfully imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete data from db
const deleteData = async () => {
  try {
    await Job.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
