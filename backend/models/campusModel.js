const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campusSchema = new Schema(
  {
    name: {
      type: String,
      unique: [true, 'A campus with this name already exists'],
      required: [true, 'Campus name is required'],
    },
    location: {
      type: String,
      required: [true, 'Campus location is required'],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Campus', campusSchema, 'campuses');
