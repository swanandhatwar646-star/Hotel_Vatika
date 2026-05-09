const asyncHandler = require('express-async-handler')
const Menu = require('../models/Menu')
const cloudinary = require('../config/cloudinary')

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
  const items = await Menu.find({ available: true }).sort({ sortOrder: 1, createdAt: -1 })
  res.json({ success: true, count: items.length, data: items })
})

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
const getMenuItem = asyncHandler(async (req, res) => {
  const item = await Menu.findById(req.params.id)
  if (!item) {
    res.status(404)
    throw new Error('Menu item not found')
  }
  res.json({ success: true, data: item })
})

// @desc    Create menu item
// @route   POST /api/menu
// @access  Admin
const createMenuItem = asyncHandler(async (req, res) => {
  let imageData = { image: req.body.image || '', imagePublicId: '' }

  // Check Cloudinary config
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Cloudinary credentials missing in .env file')
    res.status(500)
    throw new Error('Cloudinary not configured properly. Check server .env file.')
  }

  // If file uploaded, upload to Cloudinary
  if (req.file) {
    try {
      console.log('Uploading file to Cloudinary:', req.file.path)
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'hotel-vatika/menu',
        transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
      })
      console.log('Cloudinary upload successful:', result.public_id)
      imageData = {
        image: result.secure_url,
        imagePublicId: result.public_id,
      }
      // Clean up local file
      const fs = require('fs')
      fs.unlinkSync(req.file.path)
    } catch (error) {
      console.error('Cloudinary upload error:', error)
      res.status(500)
      throw new Error(`Image upload failed: ${error.message}`)
    }
  }

  const item = await Menu.create({
    ...req.body,
    ...imageData,
  })
  res.status(201).json({ success: true, data: item })
})

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Admin
const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await Menu.findById(req.params.id)
  if (!item) {
    res.status(404)
    throw new Error('Menu item not found')
  }

  let updateData = { ...req.body }

  // If new file uploaded, upload to Cloudinary and delete old image
  if (req.file) {
    // Delete old image from Cloudinary
    if (item.imagePublicId) {
      await cloudinary.uploader.destroy(item.imagePublicId)
    }

    // Upload new image
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hotel-vatika/menu',
      transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
    })
    updateData.image = result.secure_url
    updateData.imagePublicId = result.public_id

    // Clean up local file
    const fs = require('fs')
    fs.unlinkSync(req.file.path)
  }

  const updatedItem = await Menu.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  })
  res.json({ success: true, data: updatedItem })
})

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Admin
const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await Menu.findById(req.params.id)
  if (!item) {
    res.status(404)
    throw new Error('Menu item not found')
  }
  if (item.imagePublicId) {
    await cloudinary.uploader.destroy(item.imagePublicId)
  }
  await item.deleteOne()
  res.json({ success: true, message: 'Menu item removed' })
})

module.exports = { getMenuItems, getMenuItem, createMenuItem, updateMenuItem, deleteMenuItem }
