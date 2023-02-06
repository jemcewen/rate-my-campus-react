const express = require('express');
const router = express.Router();
const {
  getCampuses,
  createCampus,
  updateCampus,
  deleteCampus,
} = require('../controllers/campusController');
const validateCampus = require('../middleware/validation/validateCampus');
const protect = require('../middleware/authMiddleware');

router.route('/').get(getCampuses).post(protect, validateCampus, createCampus);
router.route('/:id').put(protect, updateCampus).delete(protect, deleteCampus);

module.exports = router;
