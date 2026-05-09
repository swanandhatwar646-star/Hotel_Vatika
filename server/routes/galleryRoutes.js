const express = require('express')
const router = express.Router()
const {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
} = require('../controllers/galleryController')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/uploadMiddleware')

router.route('/').get(getGalleryImages).post(protect, upload.single('image'), uploadGalleryImage)
router.route('/:id').delete(protect, deleteGalleryImage)

module.exports = router
