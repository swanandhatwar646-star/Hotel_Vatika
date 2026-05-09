const express = require('express')
const router = express.Router()
const {
  getTestimonials,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getTestimonials).post(createTestimonial)
router.get('/all', protect, getAllTestimonials)
router.route('/:id').put(protect, updateTestimonial).delete(protect, deleteTestimonial)

module.exports = router
