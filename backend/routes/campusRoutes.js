const express = require('express');
const router = express.Router();
const {
  getCampuses,
  createCampus,
  updateCampus,
  deleteCampus,
} = require('../controllers/campusController');
const validateCampus = require('../middleware/validation/validateCampus');

router.route('/').get(getCampuses).post(validateCampus, createCampus);
router.route('/:id').put(updateCampus).delete(deleteCampus);

module.exports = router;
