import { motion, AnimatePresence } from 'framer-motion'
import { useNavbarScroll } from '../../hooks/useNavbarScroll'
import { useApp } from '../../context/AppContext'
import { NAV_LINKS, CONTACT, SITE_NAME } from '../../utils/constants'
import { scrollToSection } from '../../utils/helpers'
import MobileMenu from './MobileMenu'
import { FaInstagram } from 'react-icons/fa'

const LogoIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 3C18 3 28 11 28 19C28 27 18 33 18 33C18 33 8 27 8 19C8 11 18 3 18 3Z" fill="#C8A76A" opacity="0.9" />
    <path d="M18 10C18 10 23 15 23 19.5C23 24 18 28 18 28C18 28 13 24 13 19.5C13 15 18 10 18 10Z" fill="#1F4B3F" />
    <line x1="18" y1="28" x2="18" y2="19" stroke="#C8A76A" strokeWidth="1" />
  </svg>
)

const Navbar = () => {
  const { scrolled } = useNavbarScroll(60)
  const { mobileMenuOpen, setMobileMenuOpen } = useApp()

  const handleNavClick = (href) => {
    const id = href.replace('#', '')
    scrollToSection(id)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-forest/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group"
          >
            <LogoIcon />
            <div className="text-left leading-none">
              <div className="text-gold font-body text-[10px] tracking-[0.25em] uppercase">
                Hotel
              </div>
              <div className={`font-display text-xl font-semibold tracking-wider transition-colors ${
                scrolled ? 'text-cream' : 'text-cream'
              }`}>
                VATIKA
              </div>
              <div className="text-gold font-body text-[10px] tracking-[0.25em] uppercase">
                Dhaba
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative group font-body text-sm tracking-widest uppercase text-cream/90 hover:text-gold transition-colors duration-300"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA Phone */}
          <a
            href={`tel:${CONTACT.phone}`}
            className="hidden md:flex items-center gap-2 border border-gold/60 text-gold font-body text-sm tracking-wide px-5 py-2 rounded-full hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {CONTACT.phone}
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/hotel_vatika_dhaba_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-gold/60 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            <FaInstagram className="w-5 h-5" />
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-cream"
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px bg-cream"
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px bg-cream"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && <MobileMenu onClose={() => setMobileMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export default Navbar
