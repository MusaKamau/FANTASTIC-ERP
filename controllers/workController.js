const Work = require('../models/workModel');

// Get all Job postings available in the database
exports.getAllWork = async (req, res) => {
  try {
    // BUILD QUERY
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const query = Work.find(queryObj);

    // const works = await Work.find()
    //   .where('bids')
    //   .equals(2)
    //   .where('budget')
    //   .equals(350);

    // EXECUTE QUERY
    const works = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'Success',
      results: works.length,
      data: {
        works,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Get a single job bsed on it's ID from the database
exports.getWork = async (req, res) => {
  try {
    const singleWork = await Work.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        singleWork,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

//Create a new job posting in the database
exports.createWork = async (req, res) => {
  try {
    const newWork = await Work.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        work: newWork,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Update a single Job based on its ID
exports.updateWork = async (req, res) => {
  try {
    const singleWork = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        singleWork,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Delete a job based on its ID from the database
exports.deleteWork = async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
