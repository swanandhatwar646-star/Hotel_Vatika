import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../components/ui/SectionTitle'
import { CONTACT } from '../utils/constants'
import { openWhatsApp, validateEmail } from '../utils/helpers'
import { fadeUp, staggerContainer, staggerItem } from '../utils/motionVariants'
import api from '../services/api'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null) // 'loading' | 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    setStatus('loading')
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full bg-cream border border-gold/30 rounded-xl px-4 py-3 font-body text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold/70 focus:shadow-[0_0_0_3px_rgba(200,167,106,0.1)] transition-all duration-300'

  return (
    <section className="py-24 px-4 md:px-8 bg-warm-gradient relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold/30" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Reach Us"
          title="GET IN TOUCH"
          subtitle="We'd love to hear from you. Drop us a message or visit us on the highway."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-sm border border-gold/20 rounded-2xl p-8"
          >
            <h3 className="font-display text-2xl font-semibold text-charcoal mb-6">
              Send an Enquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-body text-xs text-charcoal/50 tracking-widest uppercase mb-2 block">
                    Name *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-charcoal/50 tracking-widest uppercase mb-2 block">
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="font-body text-xs text-charcoal/50 tracking-widest uppercase mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="font-body text-xs text-charcoal/50 tracking-widest uppercase mb-2 block">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about your visit, reservation or inquiry..."
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>

              {status === 'success' && (
                <p className="text-forest font-body text-sm bg-forest/10 rounded-lg px-4 py-3">
                  Message sent. We'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-600 font-body text-sm bg-red-50 rounded-lg px-4 py-3">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-forest text-cream py-4 rounded-full font-body text-sm tracking-widest uppercase hover:bg-forest-light transition-all duration-300 disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Info cards */}
            {[
              {
                title: 'Our Location',
                content: CONTACT.address,
                href: CONTACT.mapsUrl,
              },
              {
                title: 'Phone',
                content: CONTACT.phone,
                href: `tel:${CONTACT.phone}`,
              },
              {
                title: 'Opening Hours',
                content: CONTACT.hours,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="p-6 bg-white/60 border border-gold/20 rounded-2xl hover:border-gold/50 transition-all duration-300"
              >
                <div>
                  <p className="font-body text-xs text-charcoal/40 tracking-widest uppercase mb-1">
                    {item.title}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href === CONTACT.mapsUrl ? '_blank' : undefined}
                      rel={item.href === CONTACT.mapsUrl ? 'noreferrer' : undefined}
                      className="font-display text-lg text-charcoal hover:text-gold transition-colors"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="font-display text-lg text-charcoal whitespace-pre-line">
                      {item.content}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Quick action buttons */}
            <motion.div variants={staggerItem} className="flex gap-3 mt-2">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-forest text-cream py-4 rounded-full font-body text-sm tracking-wider hover:bg-forest-light transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call Now
              </a>
              <button
                onClick={() => openWhatsApp(CONTACT.whatsapp, 'Hi! I would like to make an enquiry about Hotel Vatika Dhaba.')}
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-full font-body text-sm tracking-wider hover:bg-[#20b356] transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
