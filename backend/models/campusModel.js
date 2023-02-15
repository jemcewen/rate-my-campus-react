const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  path: String,
  filename: String,
});

ImageSchema.virtual('sliderImage').get(function () {
  return this.path.replace('/upload', '/upload/ar_4:3,c_crop');
});

ImageSchema.set('toObject', { virtuals: true });
ImageSchema.set('toJSON', { virtuals: true });

const campusSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: [ImageSchema],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Campus', campusSchema, 'campuses');
