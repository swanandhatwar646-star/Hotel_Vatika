const asyncHandler = require('express-async-handler')
const Contact = require('../models/Contact')
const { sendEmail } = require('../utils/sendEmail')

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body

  if (!name || !message) {
    res.status(400)
    throw new Error('Name and message are required')
  }

  const contact = await Contact.create({ name, email, phone, message })

  // Send notification email to admin
  try {
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Enquiry from ${name} — Hotel Vatika`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #F7F3EA; border-radius: 12px;">
          <h2 style="color: #1F4B3F; font-size: 22px; margin-bottom: 8px;">New Website Enquiry</h2>
          <p style="color: #7A5C3E; font-size: 13px; margin-bottom: 24px;">Hotel Vatika Dhaba</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #555; font-size: 14px; width: 120px;"><strong>Name</strong></td><td style="padding: 8px 0; color: #2B2B2B;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #555; font-size: 14px;"><strong>Email</strong></td><td style="padding: 8px 0; color: #2B2B2B;">${email || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #555; font-size: 14px;"><strong>Phone</strong></td><td style="padding: 8px 0; color: #2B2B2B;">${phone || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #555; font-size: 14px; vertical-align: top;"><strong>Message</strong></td><td style="padding: 8px 0; color: #2B2B2B;">${message}</td></tr>
          </table>
          <p style="margin-top: 24px; color: #C8A76A; font-size: 12px; text-align: center;">© Hotel Vatika Dhaba</p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Email notification failed:', err.message)
    // Don't fail the request if email fails
  }

  res.status(201).json({ success: true, message: 'Enquiry submitted successfully', data: contact })
})

// @desc    Get all contact submissions (admin)
// @route   GET /api/contact
// @access  Admin
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 })
  res.json({ success: true, count: contacts.length, data: contacts })
})

// @desc    Mark contact as read
// @route   PUT /api/contact/:id/read
// @access  Admin
const markAsRead = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  )
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }
  res.json({ success: true, data: contact })
})

// @desc    Delete contact
// @route   DELETE /api/contact/:id
// @access  Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
  if (!contact) {
    res.status(404)
    throw new Error('Contact not found')
  }
  await contact.deleteOne()
  res.json({ success: true, message: 'Enquiry deleted' })
})

module.exports = { submitContact, getContacts, markAsRead, deleteContact }
