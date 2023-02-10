const asyncHandler = require('express-async-handler');

const Campus = require('../models/campusModel');

const getCampuses = asyncHandler(async (req, res) => {
  const campuses = await Campus.find({});
  res.json(campuses);
});

const getCampus = asyncHandler(async (req, res) => {
  const campus = await Campus.findById(req.params.id);
  if (!campus) {
    res.status(400);
    throw new Error('Campus not found');
  }
  res.json(campus);
});

const createCampus = asyncHandler(async (req, res) => {
  // Check if campus exists
  const campusExists = await Campus.findOne({ name: req.body.name });
  if (campusExists) {
    res.status(400);
    throw new Error('Campus already exists');
  }

  const campus = new Campus({ ...req.body, user: req.user._id });
  campus.images = req.files.map((f) => ({
    path: f.path,
    filename: f.filename,
  }));
  await campus.save();
  res.status(200).json(campus);
});

const updateCampus = asyncHandler(async (req, res) => {
  const campus = await Campus.findById(req.params.id);

  if (!campus) {
    res.status(400);
    throw new Error('Campus not found');
  }

  if (campus.user.toString !== req.user._id) {
    res.status(401);
    throw new Error('User not authorized to update this campus');
  }

  const updatedCampus = await Campus.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCampus);
});

const deleteCampus = asyncHandler(async (req, res) => {
  const campus = await Campus.findById(req.params.id);

  if (!campus) {
    res.status(400);
    throw new Error('Campus not found');
  }

  if (campus.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized to delete this campus');
  }

  const deletedCampus = await campus.remove();

  res.status(200).json(deletedCampus);
});

module.exports = {
  getCampuses,
  getCampus,
  createCampus,
  updateCampus,
  deleteCampus,
};
