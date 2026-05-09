# 🌿 Hotel Vatika Dhaba

> **Premium Pure Veg Dining with a Nature View** — A production-ready MERN stack hospitality website.

---

## 📸 Overview

A cinematic, warm, editorial-style single-page website for **Hotel Vatika Dhaba** — a premium pure vegetarian restaurant on the Nagpur Highway surrounded by open-air greenery.

**Stack:** React + Vite · Tailwind CSS · Framer Motion · Node.js · Express · MongoDB

---

## 🗂 Project Structure

```
hotel-vatika/
├── client/                   # React + Vite frontend
│   ├── src/
│   │   ├── animations/       # Framer Motion variant files
│   │   ├── components/
│   │   │   ├── layout/       # Navbar, Footer, MobileMenu
│   │   │   └── ui/           # SectionTitle only
│   │   ├── context/          # AppContext (global state)
│   │   ├── hooks/            # useScrollAnimation, useNavbarScroll
│   │   ├── pages/            # Home, Admin
│   │   ├── sections/         # HeroSection, SignatureDishes, WhyChooseUs,
│   │   │                     # Testimonials, Gallery, Contact
│   │   ├── services/         # API service, menuService, galleryService
│   │   ├── styles/           # globals.css (Tailwind + custom)
│   │   └── utils/            # constants, motionVariants, helpers
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json

└── server/                   # Node.js + Express backend
    ├── config/               # db.js, cloudinary.js
    ├── controllers/          # menu, gallery, testimonial, contact
    ├── middleware/            # auth, error, upload
    ├── models/               # Menu, Gallery, Testimonial, Contact
    ├── routes/               # All API routes
    ├── utils/                # generateToken, sendEmail
    ├── uploads/              # Local file storage (dev)
    ├── server.js
    └── package.json
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/swanandhatwar646-star/Hotel_Vatika.git
cd Hotel_Vatika

# Install all dependencies at once
npm run install:all
```

### 2. Configure Environment Variables

**Server** — copy `server/.env.example` to `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel_vatika?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Nodemailer (for contact form emails)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=Hotel Vatika Dhaba <noreply@hotelvatika.com>
ADMIN_EMAIL=admin@hotelvatika.com

# Admin Login
ADMIN_EMAIL_LOGIN=admin@vatika.com
ADMIN_PASSWORD=your_secure_admin_password

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

**Client** — copy `client/.env.example` to `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=919890836578
VITE_PHONE_NUMBER=+91 9890836578
```

### 3. Run in Development

```bash
# From root — runs both client and server concurrently
npm run dev

# Or run individually:
npm run client    # React dev server → http://localhost:3000
npm run server    # Express API    → http://localhost:5000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/health` | Public | Health check |
| POST | `/api/admin/login` | Public | Admin login |
| GET | `/api/menu` | Public | Get all menu items |
| POST | `/api/menu` | Admin | Create menu item |
| PUT | `/api/menu/:id` | Admin | Update menu item |
| DELETE | `/api/menu/:id` | Admin | Delete menu item |
| GET | `/api/gallery` | Public | Get gallery images |
| POST | `/api/gallery` | Admin | Upload gallery image |
| DELETE | `/api/gallery/:id` | Admin | Delete gallery image |
| GET | `/api/testimonials` | Public | Get approved testimonials |
| POST | `/api/testimonials` | Public | Submit testimonial |
| GET | `/api/testimonials/all` | Admin | Get all testimonials |
| PUT | `/api/testimonials/:id` | Admin | Approve/update testimonial |
| POST | `/api/contact` | Public | Submit contact enquiry |
| GET | `/api/contact` | Admin | Get all enquiries |
| PUT | `/api/contact/:id/read` | Admin | Mark enquiry as read |

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-cream` | `#F7F3EA` | Backgrounds |
| `--color-forest` | `#1F4B3F` | Primary dark, CTAs |
| `--color-gold` | `#C8A76A` | Accents, highlights |
| `--color-brown` | `#7A5C3E` | Warm text tones |
| `--color-charcoal` | `#2B2B2B` | Body text |

**Fonts:** Cormorant Garamond (headings) · Poppins (body)

---

## 🏗 Production Build

```bash
# Build the React frontend
npm run build

# Set NODE_ENV=production in server/.env
# Then start the server (serves both API + built frontend)
npm start
```

---

## 📱 Features

- ✅ Cinematic fullscreen hero with parallax
- ✅ Glassmorphism sticky navbar (transparent → solid on scroll)
- ✅ Signature dish cards with hover zoom & glow
- ✅ Mobile swipe carousel (Swiper.js)
- ✅ Feature grid with elegant icons
- ✅ Testimonial slider (auto-scroll on mobile)
- ✅ Gallery with image management
- ✅ Contact form with email notification
- ✅ Google Maps embed in footer
- ✅ Floating WhatsApp FAB button
- ✅ Admin dashboard with JWT auth
- ✅ Cloudinary image upload support
- ✅ Menu pagination (12 items per page)
- ✅ Instagram integration
- ✅ Full CRUD operations for menu, gallery, testimonials, contacts
- ✅ Mobile-first responsive design
- ✅ Lazy loading images

---

## 📦 Key Dependencies

**Frontend**
- `react` + `vite` — Build tooling
- `framer-motion` — All animations
- `tailwindcss` — Utility-first styling
- `swiper` — Touch carousels
- `react-icons` — Icon library
- `axios` — HTTP client

**Backend**
- `express` — Web framework
- `mongoose` — MongoDB ODM
- `jsonwebtoken` — JWT auth
- `bcryptjs` — Password hashing
- `multer` — File uploads
- `cloudinary` — Cloud image storage
- `nodemailer` — Email sending

---

## 🔧 Admin Panel

Access at `/admin` with credentials from your `.env` file:

- **Menu Management**: Add/Edit/Delete menu items with image uploads
- **Gallery Management**: Upload and organize gallery images
- **Testimonials**: Approve and manage customer reviews
- **Contact Inquiries**: View and manage contact form submissions

---

## 🛡 Security Notes

- Change `JWT_SECRET` and `ADMIN_PASSWORD` before going live
- Enable CORS for your production domain in `server.js`
- Use environment variables — never commit `.env` files
- Cloudinary credentials should be server-side only

---

## 🚀 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions:
- **Vercel** (frontend) + **Render** (backend) - Recommended
- **Render** (full stack) - Alternative option

---

*© 2024 Hotel Vatika Dhaba. Built with ❤️ for premium hospitality.*
