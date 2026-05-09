const asyncHandler = require('express-async-handler')
const Gallery = require('../models/Gallery')
const cloudinary = require('../config/cloudinary')
const path = require('path')

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGalleryImages = asyncHandler(async (req, res) => {
  const images = await Gallery.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 })
  res.json({ success: true, count: images.length, data: images })
})

// @desc    Upload gallery image
// @route   POST /api/gallery
// @access  Admin
const uploadGalleryImage = asyncHandler(async (req, res) => {
  console.log('Gallery upload request received')
  
  if (!req.file) {
    console.log('No file in request')
    res.status(400)
    throw new Error('No image file provided')
  }

  // Check Cloudinary config
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('Cloudinary credentials missing in .env file')
    res.status(500)
    throw new Error('Cloudinary not configured properly. Check server .env file.')
  }

  console.log('Uploading to Cloudinary:', req.file.path)
  // Upload to cloudinary
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hotel-vatika/gallery',
      transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
    })
    console.log('Cloudinary upload successful:', result.public_id)

    const image = await Gallery.create({
      title: req.body.title || '',
      imageUrl: result.secure_url,
      publicId: result.public_id,
      category: req.body.category || 'Ambience',
    })

    // Clean up local file
    const fs = require('fs')
    fs.unlinkSync(req.file.path)

    res.status(201).json({ success: true, data: image })
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    // Clean up local file if it exists
    const fs = require('fs')
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path)
    }
    res.status(500)
    throw new Error(`Image upload failed: ${error.message}`)
  }
})

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Admin
const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findById(req.params.id)
  if (!image) {
    res.status(404)
    throw new Error('Image not found')
  }
  if (image.publicId) {
    await cloudinary.uploader.destroy(image.publicId)
  }
  await image.deleteOne()
  res.json({ success: true, message: 'Image deleted' })
})

module.exports = { getGalleryImages, uploadGalleryImage, deleteGalleryImage }
