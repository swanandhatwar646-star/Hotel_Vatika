import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import api from '../services/api'
import { MENU_CATEGORIES } from '../utils/constants'

// ==================== ADMIN LOGIN ====================
const AdminLogin = ({ onLogin }) => {
  const [creds, setCreds] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/admin/login', creds)
      localStorage.setItem('vatika_token', data.token)
      onLogin()
    } catch {
      setError('Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-cream rounded-2xl p-10 w-full max-w-md shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-forest rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl font-semibold text-charcoal">Admin Panel</h2>
          <p className="font-body text-charcoal/50 text-sm mt-1">Hotel Vatika Dhaba</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={creds.email}
            onChange={(e) => setCreds({ ...creds, email: e.target.value })}
            className="w-full border border-gold/30 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-gold bg-white/50"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={creds.password}
            onChange={(e) => setCreds({ ...creds, password: e.target.value })}
            className="w-full border border-gold/30 rounded-xl px-4 py-3 font-body text-sm focus:outline-none focus:border-gold bg-white/50"
            required
          />
          {error && <p className="text-red-600 text-sm font-body">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest text-cream py-3.5 rounded-full font-body text-sm tracking-widest uppercase hover:bg-forest-light transition-all disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ==================== MENU MANAGEMENT ====================
const MenuManager = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '',
    nameEn: '',
    price: '',
    description: '',
    category: 'Starters',
    image: ''
  })
  const [imageFile, setImageFile] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const { data } = await api.get('/menu')
      setItems(data.data || [])
    } catch (err) {
      console.error('Failed to fetch menu items')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(form).forEach(key => formData.append(key, form[key]))
    if (imageFile) {
      formData.append('image', imageFile)
      console.log('Submitting with image file:', imageFile.name)
    }

    try {
      console.log('Form data being submitted:', Object.fromEntries(formData))
      if (editing) {
        console.log('Updating item:', editing._id)
        await api.put(`/menu/${editing._id}`, formData)
      } else {
        console.log('Creating new item')
        await api.post('/menu', formData)
      }
      fetchItems()
      resetForm()
    } catch (err) {
      console.error('Upload error:', err)
      console.error('Error response:', err.response?.data)
      alert(`Failed to save menu item: ${err.response?.data?.message || err.message}`)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    try {
      await api.delete(`/menu/${id}`)
      fetchItems()
    } catch (err) {
      alert('Failed to delete item')
    }
  }

  const resetForm = () => {
    setEditing(null)
    setForm({ name: '', nameEn: '', price: '', description: '', category: 'Starters', image: '' })
    setImageFile(null)
  }

  const startEdit = (item) => {
    setEditing(item)
    setForm({
      name: item.name,
      nameEn: item.nameEn,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image
    })
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gold/20 p-6 space-y-4">
        <h3 className="font-display text-xl text-charcoal mb-4">
          {editing ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Marathi Name (e.g., पालक पनीर)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gold/30 rounded-lg px-4 py-2 font-body text-sm"
            required
          />
          <input
            type="text"
            placeholder="English Name (e.g., Palak Paneer)"
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            className="border border-gold/30 rounded-lg px-4 py-2 font-body text-sm"
            required
          />
          <input
            type="text"
            placeholder="Price (e.g., Rs. 220)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border border-gold/30 rounded-lg px-4 py-2 font-body text-sm"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border border-gold/30 rounded-lg px-4 py-2 font-body text-sm"
          >
            {MENU_CATEGORIES.filter(c => c !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gold/30 rounded-lg px-4 py-2 font-body text-sm"
          rows="2"
        />
        <div className="flex gap-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="font-body text-sm"
          />
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-charcoal/60 font-body text-sm hover:text-charcoal"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-forest text-cream rounded-lg font-body text-sm hover:bg-forest-light"
          >
            {editing ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>

      {/* Items List */}
      <div className="bg-white rounded-2xl border border-gold/20 overflow-hidden">
        <table className="w-full">
          <thead className="bg-forest/5">
            <tr>
              <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Image</th>
              <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Name</th>
              <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Category</th>
              <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Price</th>
              <th className="text-right px-4 py-3 font-body text-sm text-charcoal/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-t border-gold/10">
                <td className="px-4 py-3">
                  <img src={item.image} alt={item.nameEn} className="w-12 h-12 object-cover rounded-lg" />
                </td>
                <td className="px-4 py-3 font-body text-sm">
                  <div className="font-medium text-charcoal">{item.name}</div>
                  <div className="text-charcoal/60">{item.nameEn}</div>
                </td>
                <td className="px-4 py-3 font-body text-sm text-charcoal/70">{item.category}</td>
                <td className="px-4 py-3 font-body text-sm text-forest font-semibold">{item.price}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-forest hover:underline font-body text-sm mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:underline font-body text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ==================== GALLERY MANAGEMENT ====================
const GalleryManager = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [imageFile, setImageFile] = useState(null)
  const [category, setCategory] = useState('Food')

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const { data } = await api.get('/gallery')
      setImages(data.data || [])
    } catch (err) {
      console.error('Failed to fetch gallery')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!imageFile) {
      console.log('No image file selected')
      return
    }

    console.log('Uploading gallery image:', imageFile.name, 'Category:', category)
    const formData = new FormData()
    formData.append('image', imageFile)
    formData.append('category', category)

    try {
      console.log('Sending gallery upload request...')
      await api.post('/gallery', formData)
      console.log('Gallery upload successful')
      fetchImages()
      setImageFile(null)
    } catch (err) {
      console.error('Gallery upload error:', err)
      console.error('Error response:', err.response?.data)
      alert(`Failed to upload image: ${err.response?.data?.message || err.message}`)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    try {
      await api.delete(`/gallery/${id}`)
      fetchImages()
    } catch (err) {
      alert('Failed to delete image')
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="space-y-6">
      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-white rounded-2xl border border-gold/20 p-6 space-y-4">
        <h3 className="font-display text-xl text-charcoal mb-4">Upload Gallery Image</h3>
        <div className="flex gap-4 items-end">
          <div>
            <label className="block font-body text-sm text-charcoal/70 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gold/30 rounded-lg px-4 py-2 font-body text-sm"
            >
              <option value="Food">Food</option>
              <option value="Ambience">Ambience</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="font-body text-sm"
            required
          />
          <button
            type="submit"
            disabled={!imageFile}
            className="px-6 py-2 bg-forest text-cream rounded-lg font-body text-sm hover:bg-forest-light disabled:opacity-50"
          >
            Upload
          </button>
        </div>
      </form>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="bg-white rounded-xl border border-gold/20 overflow-hidden">
            <img src={img.imageUrl} alt="Gallery" className="w-full h-32 object-cover" />
            <div className="p-3 flex items-center justify-between">
              <span className="font-body text-xs text-charcoal/60">{img.category}</span>
              <button
                onClick={() => handleDelete(img._id)}
                className="text-red-600 hover:underline font-body text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== TESTIMONIALS MANAGEMENT ====================
const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data } = await api.get('/testimonials/all')
      setTestimonials(data.data || [])
    } catch (err) {
      console.error('Failed to fetch testimonials')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id, approved) => {
    try {
      await api.put(`/testimonials/${id}`, { approved: !approved })
      fetchTestimonials()
    } catch (err) {
      alert('Failed to update testimonial')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await api.delete(`/testimonials/${id}`)
      fetchTestimonials()
    } catch (err) {
      alert('Failed to delete testimonial')
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="bg-white rounded-2xl border border-gold/20 overflow-hidden">
      <table className="w-full">
        <thead className="bg-forest/5">
          <tr>
            <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Name</th>
            <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Review</th>
            <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Rating</th>
            <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Status</th>
            <th className="text-right px-4 py-3 font-body text-sm text-charcoal/70">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t._id} className="border-t border-gold/10">
              <td className="px-4 py-3 font-body text-sm">
                <div className="font-medium text-charcoal">{t.name}</div>
                <div className="text-charcoal/60 text-xs">{t.email}</div>
              </td>
              <td className="px-4 py-3 font-body text-sm text-charcoal/70 max-w-xs truncate">{t.review}</td>
              <td className="px-4 py-3 font-body text-sm text-gold">{'★'.repeat(t.rating)}</td>
              <td className="px-4 py-3 font-body text-sm">
                <span className={`px-2 py-1 rounded-full text-xs ${t.approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {t.approved ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleToggle(t._id, t.approved)}
                  className="text-forest hover:underline font-body text-sm mr-3"
                >
                  {t.approved ? 'Hide' : 'Approve'}
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="text-red-600 hover:underline font-body text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ==================== CONTACT INQUIRIES ====================
const ContactsManager = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const { data } = await api.get('/contact')
      setContacts(data.data || [])
    } catch (err) {
      console.error('Failed to fetch contacts')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`)
      fetchContacts()
    } catch (err) {
      alert('Failed to mark as read')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      await api.delete(`/contact/${id}`)
      fetchContacts()
    } catch (err) {
      alert('Failed to delete inquiry')
    }
  }

  if (loading) return <div className="text-center py-12">Loading...</div>

  return (
    <div className="bg-white rounded-2xl border border-gold/20 overflow-hidden">
      <table className="w-full">
        <thead className="bg-forest/5">
          <tr>
            <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Name</th>
            <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Contact</th>
            <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Message</th>
            <th className="text-left px-4 py-3 font-body text-sm text-charcoal/70">Date</th>
            <th className="text-right px-4 py-3 font-body text-sm text-charcoal/70">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id} className={`border-t border-gold/10 ${!c.read ? 'bg-gold/5' : ''}`}>
              <td className="px-4 py-3 font-body text-sm">
                <div className="font-medium text-charcoal">{c.name}</div>
                {!c.read && <span className="text-xs text-forest font-semibold">NEW</span>}
              </td>
              <td className="px-4 py-3 font-body text-sm text-charcoal/70">
                <div>{c.email}</div>
                <div>{c.phone}</div>
              </td>
              <td className="px-4 py-3 font-body text-sm text-charcoal/70 max-w-xs">{c.message}</td>
              <td className="px-4 py-3 font-body text-xs text-charcoal/50">
                {new Date(c.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                {!c.read && (
                  <button
                    onClick={() => handleMarkRead(c._id)}
                    className="text-forest hover:underline font-body text-sm mr-3"
                  >
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c._id)}
                  className="text-red-600 hover:underline font-body text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ==================== ADMIN DASHBOARD ====================
const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('menu')

  const tabs = [
    { id: 'menu', label: 'Menu Items', component: MenuManager },
    { id: 'gallery', label: 'Gallery', component: GalleryManager },
    { id: 'testimonials', label: 'Testimonials', component: TestimonialsManager },
    { id: 'contacts', label: 'Inquiries', component: ContactsManager },
  ]

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-forest px-6 py-4 flex items-center justify-between">
        <h1 className="font-display text-xl text-cream">Hotel Vatika - Admin</h1>
        <button
          onClick={onLogout}
          className="font-body text-xs text-cream/60 hover:text-cream tracking-wider uppercase"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gold/20 bg-white px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-body text-sm tracking-wider py-4 px-6 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-forest text-forest'
                : 'border-transparent text-charcoal/40 hover:text-charcoal'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 max-w-5xl mx-auto">
        <ActiveComponent />
      </div>
    </div>
  )
}

// ==================== MAIN ADMIN COMPONENT ====================
const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('vatika_token')
    if (token) setIsLoggedIn(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('vatika_token')
    setIsLoggedIn(false)
  }

  return isLoggedIn
    ? <AdminDashboard onLogout={handleLogout} />
    : <AdminLogin onLogin={() => setIsLoggedIn(true)} />
}

export default Admin
