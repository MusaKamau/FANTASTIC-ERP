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
      type: String,
      required: [true, 'The Job should have a budget'],
    },

    category: {
      type: String,
      required: [true, 'a job should be of a specific category'],
    },
    description: {
      type: String,
      trim: true,
      required: [
        true,
        'A Job should have a detailed description / instructions',
      ],
    },
    datePosted: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    dueDate: {
      type: Date,
      required: [true, 'a due date is required'],
    },
    document: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);



// jobSchema.virtual('durationDays').get(function () {
//   return this.duration / 7;
// });

// QUERY Middleware: runs before the save() and create()
jobSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Execute after pre has executed
jobSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

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
