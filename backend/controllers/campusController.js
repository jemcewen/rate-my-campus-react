const asyncHandler = require('express-async-handler');

const Campus = require('../models/campusModel');

const getCampuses = asyncHandler(async (req, res) => {
  const campuses = await Campus.find({});
  res.json(campuses);
});

const createCampus = asyncHandler(async (req, res) => {
  const campus = await Campus.create(req.body);
  res.status(200).json(campus);
});

const updateCampus = asyncHandler(async (req, res) => {
  const campus = await Campus.findById(req.params.id);

  if (!campus) {
    res.status(400);
    throw new Error('Campus not found.');
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
    throw new Error('Campus not found.');
  }

  const deletedCampus = await campus.remove();

  res.status(200).json(deletedCampus);
});

module.exports = {
  getCampuses,
  createCampus,
  updateCampus,
  deleteCampus,
};
