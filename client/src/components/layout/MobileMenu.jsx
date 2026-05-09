import { motion } from 'framer-motion'
import { NAV_LINKS, CONTACT } from '../../utils/constants'
import { scrollToSection, openWhatsApp } from '../../utils/helpers'

const MobileMenu = ({ onClose }) => {
  const handleNavClick = (href) => {
    const id = href.replace('#', '')
    scrollToSection(id)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-40 bg-forest flex flex-col"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/5" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold/5" />
      </div>

      <div className="relative z-10 flex flex-col h-full px-8 py-20">
        {/* Logo */}
        <div className="mb-12">
          <p className="text-gold font-body text-xs tracking-[0.3em] uppercase mb-1">Hotel</p>
          <h2 className="font-display text-4xl text-cream font-semibold">VATIKA DHABA</h2>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-6 flex-1">
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link.label}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              onClick={() => handleNavClick(link.href)}
              className="text-left border-b border-gold/20 pb-4 group"
            >
              <span className="font-display text-3xl text-cream group-hover:text-gold transition-colors duration-300">
                {link.label}
              </span>
            </motion.button>
          ))}
        </nav>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 mt-8"
        >
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex-1 flex items-center justify-center gap-2 border border-gold/40 text-gold py-3 rounded-full font-body text-sm tracking-wider"
          >
            Call Now
          </a>
          <button
            onClick={() => openWhatsApp(CONTACT.whatsapp)}
            className="flex-1 flex items-center justify-center gap-2 bg-gold text-charcoal py-3 rounded-full font-body text-sm tracking-wider font-medium"
          >
            WhatsApp
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default MobileMenu
