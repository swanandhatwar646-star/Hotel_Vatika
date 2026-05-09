const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Ambience', 'Food', 'Kitchen', 'Events', 'Other'],
      default: 'Ambience',
    },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Gallery', gallerySchema)
