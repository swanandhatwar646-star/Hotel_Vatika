const express = require('express')
const router = express.Router()
const {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../middleware/uploadMiddleware')

router.route('/').get(getMenuItems).post(protect, upload.single('image'), createMenuItem)
router.route('/:id').get(getMenuItem).put(protect, updateMenuItem).delete(protect, deleteMenuItem)

module.exports = router
