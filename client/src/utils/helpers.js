/**
 * Smooth scroll to element by id
 */
export const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Format phone number for tel: href
 */
export const formatPhone = (phone) => phone.replace(/\s+/g, '')

/**
 * Open WhatsApp with pre-filled message
 */
export const openWhatsApp = (number, message = '') => {
  const url = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}`
  window.open(url, '_blank')
}

/**
 * Simple email validation
 */
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

/**
 * Truncate text to max length
 */
export const truncate = (str, n) => str.length > n ? `${str.slice(0, n)}...` : str

/**
 * Generate star array for ratings
 */
export const generateStars = (rating) => Array.from({ length: 5 }, (_, i) => i < rating)

/**
 * Debounce function
 */
export const debounce = (fn, delay) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
