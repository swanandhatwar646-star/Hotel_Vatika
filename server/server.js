const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const bcrypt = require('bcryptjs')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const generateToken = require('./utils/generateToken')

// Routes
const menuRoutes = require('./routes/menuRoutes')
const galleryRoutes = require('./routes/galleryRoutes')
const testimonialRoutes = require('./routes/testimonialRoutes')
const contactRoutes = require('./routes/contactRoutes')

dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()

// ─── Middleware ────────────────────────────────────────────────────────────────
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.CLIENT_URL || 'https://yourdomain.com']
  : ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173']

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// ─── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '🌿 Hotel Vatika Dhaba API is running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  })
})

// ─── Admin Auth Route ──────────────────────────────────────────────────────────
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body

  const adminEmail = process.env.ADMIN_EMAIL_LOGIN
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    return res.status(500).json({ success: false, message: 'Admin credentials not configured' })
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' })
  }

  const token = generateToken({ role: 'admin', email })

  res.json({
    success: true,
    token,
    admin: { email, role: 'admin' },
  })
})

// ─── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/menu', menuRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/contact', contactRoutes)

// ─── Serve React Frontend (Production) ────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'))
  })
}

// ─── Error Handling ────────────────────────────────────────────────────────────
app.use(notFound)
app.use(errorHandler)

// ─── Start Server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n🌿 ─────────────────────────────────────────`)
  console.log(`   Hotel Vatika Dhaba — API Server`)
  console.log(`   Running on: http://localhost:${PORT}`)
  console.log(`   Mode: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌿 ─────────────────────────────────────────\n`)
})

module.exports = app
