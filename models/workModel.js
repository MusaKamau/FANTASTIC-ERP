const mongoose = require('mongoose');
const slugify = require('slugify');

const workSchema = new mongoose.Schema(
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
      required: [true, 'The work should have a budget'],
    },
    bids: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'The work should have a description'],
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

const Work = mongoose.model('Work', workSchema);
module.exports = Work;
