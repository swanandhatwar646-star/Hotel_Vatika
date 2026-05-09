const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nameEn: { type: String, trim: true, default: '' },
    description: { type: String, trim: true },
    price: { type: String, required: true },
    category: {
      type: String,
      enum: ['Starters', 'Parathas', 'Dal', 'Sabzi', 'Paneer Special', 'Sides', 'Breads', 'Rice', 'Beverages'],
      default: 'Sabzi',
    },
    image: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    available: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Menu', menuSchema)
