const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    body: String,
    rating: Number,
    author: {
      type: Schema.Types.ObjectID,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
