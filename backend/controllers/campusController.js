const asyncHandler = require('express-async-handler');

const getCampuses = asyncHandler(async (req, res) => {
  res.json({ message: 'Get campuses' });
});

const createCampus = asyncHandler(async (req, res) => {
  res.json({ message: 'Add campus' });
});

const updateCampus = asyncHandler(async (req, res) => {
  res.json({ message: `Update campus ${req.params.id}` });
});

const deleteCampus = asyncHandler(async (req, res) => {
  res.json({ message: `Delete campus ${req.params.id}` });
});

module.exports = {
  getCampuses,
  createCampus,
  updateCampus,
  deleteCampus,
};
