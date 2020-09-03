const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Job must have a name/title'],
      trim: true,
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
    dueDate: {
      type: Date,
      default: Date.now(),
    },
    duration: {
      type: Number,
    },
    location: String,
    skills: [
      {
        type: String,
      },
    ],
    secretJob: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

jobSchema.virtual('durationDays').get(function () {
  return this.duration / 7;
});

// QUERY Middleware: runs before the save() and create()
jobSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// jobSchema.pre('save', function (next) {
//   console.log(`Will sav document`);
//   next();
// });
// //Execute after pre has executed
// jobSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// Query middleware
jobSchema.pre(/^find/, function (next) {
  this.find({
    secretJob: { $ne: true },
  });
  this.start = Date.now();
  next();
});

jobSchema.post(/^find/, function (docs, next) {
  // console.log(`Query took ${Date.now() - this.start} milliseconds`);
  // console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE
jobSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretJob: { $ne: true } } });
  // console.log(this);
  next();
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
