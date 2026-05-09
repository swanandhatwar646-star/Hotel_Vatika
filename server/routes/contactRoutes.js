const express = require('express')
const router = express.Router()
const {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(submitContact).get(protect, getContacts)
router.put('/:id/read', protect, markAsRead)
router.delete('/:id', protect, deleteContact)

module.exports = router
