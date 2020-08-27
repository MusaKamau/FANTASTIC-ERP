const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Job must have a name/title'],
      trim: true,
      unique: true,
    },
    slug: String,
    budget: {
      type: Number,
      required: [true, 'The Job should have a budget'],
    },
    bids: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'The Job should have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    datePosted: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    location: String,
    skills: [
      {
        type: String,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
