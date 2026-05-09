# Hotel Vatika Dhaba - Deployment Guide

## Prerequisites

1. **MongoDB Atlas Account** (Free tier available)
   - Create cluster at https://cloud.mongodb.com
   - Get connection string
   - Whitelist all IPs (0.0.0.0/0) for testing
2. **Cloudinary Account** (Free tier available)
   - Sign up at https://cloudinary.com
   - Get Cloud Name, API Key, API Secret

3. **Email Service** (Gmail recommended)
   - Enable 2-factor authentication
   - Generate App Password

## Option 1: Vercel (Frontend) + Render (Backend)

### Step 1: Deploy Backend to Render

1. Push code to GitHub
2. Go to https://render.com
3. Create "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Name**: hotel-vatika-api
   - **Runtime**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASS=your_app_password
   ADMIN_EMAIL_LOGIN=admin@vatika.com
   ADMIN_PASSWORD=your_admin_password
   CLIENT_URL=https://hotel-vatika-dhaba.vercel.app
   ```

7. Deploy and copy the URL (e.g., `https://hotel-vatika-api.onrender.com`)

### Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Import your GitHub repo
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add Environment Variables:
   ```
   VITE_API_URL=https://hotel-vatika-api.onrender.com/api
   VITE_WHATSAPP_NUMBER=919890836578
   VITE_PHONE_NUMBER=+91 9890836578
   ```

5. Deploy

---

## Option 2: Full Stack on Render

Deploy both frontend and backend on Render:

### Backend Service (as above)

### Static Site (Frontend)
1. Create "Static Site" on Render
2. Connect same GitHub repo
3. Configure:
   - **Name**: hotel-vatika-dhaba
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`

4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

---

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify image uploads work
- [ ] Test contact form emails
- [ ] Check admin login
- [ ] Test WhatsApp button
- [ ] Verify mobile responsiveness
- [ ] Test all category filters
- [ ] Verify Instagram link works

---

## Environment Variables Summary

### Server (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=...
EMAIL_PASS=...
ADMIN_EMAIL_LOGIN=admin@vatika.com
ADMIN_PASSWORD=...
CLIENT_URL=https://your-frontend-url.com
```

### Client (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
VITE_WHATSAPP_NUMBER=919890836578
VITE_PHONE_NUMBER=+91 9890836578
```

---

## Troubleshooting

### CORS Errors
- Verify CLIENT_URL matches your actual frontend URL
- Check CORS configuration in server.js

### MongoDB Connection Failed
- Check IP whitelist in MongoDB Atlas
- Verify MONGODB_URI format

### Images Not Uploading
- Verify Cloudinary credentials
- Check file size limits (10MB)

### Emails Not Sending
- Verify Gmail App Password (not regular password)
- Check email service configuration
