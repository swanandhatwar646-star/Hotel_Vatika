import { motion } from 'framer-motion'
import { CONTACT, NAV_LINKS, SITE_NAME } from '../../utils/constants'
import { scrollToSection, openWhatsApp } from '../../utils/helpers'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiLocationMarker, HiPhone, HiClock } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer id="contact" className="bg-forest relative overflow-hidden">
      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* Decorative top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Visit Us */}
          <div>
            <h3 className="font-display text-2xl text-cream font-semibold tracking-wide mb-6">
              Visit Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <HiLocationMarker className="text-gold mt-0.5 flex-shrink-0 text-lg" />
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-cream/70 text-sm leading-relaxed whitespace-pre-line hover:text-gold transition-colors"
                >
                  {CONTACT.address}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <HiPhone className="text-gold flex-shrink-0 text-lg" />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="font-body text-cream/70 text-sm hover:text-gold transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <HiClock className="text-gold flex-shrink-0 text-lg" />
                <p className="font-body text-cream/70 text-sm">{CONTACT.hours}</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-gold/20">
            <iframe
              title="Hotel Vatika Dhaba Location"
              src={CONTACT.mapsEmbed}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>

          {/* Let's Connect */}
          <div>
            <h3 className="font-display text-2xl text-cream font-semibold tracking-wide mb-2">
              Let's Connect
            </h3>
            <p className="font-body text-cream/50 text-sm mb-6">For any enquiry or bulk orders</p>

            <div className="space-y-3">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center justify-center gap-2 w-full border border-cream/30 text-cream py-3 rounded-full font-body text-sm tracking-wider hover:bg-cream hover:text-forest transition-all duration-300"
              >
                <HiPhone className="text-lg" />
                Call Now
              </a>
              <button
                onClick={() => openWhatsApp(CONTACT.whatsapp, 'Hi, I would like to enquire about Hotel Vatika Dhaba')}
                className="flex items-center justify-center gap-2 w-full bg-gold text-charcoal py-3 rounded-full font-body text-sm tracking-wider font-medium hover:bg-gold-light transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp Us
              </button>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {[
                { icon: <FaFacebookF />, href: '#', label: 'Facebook' },
                { icon: <FaInstagram />, href: 'https://www.instagram.com/hotel_vatika_dhaba_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', label: 'Instagram', external: true },
                { icon: <FaYoutube />, href: '#', label: 'YouTube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.external ? '_blank' : undefined}
                  rel={s.external ? 'noreferrer' : undefined}
                  className="w-9 h-9 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 text-sm"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-cream/40 text-xs tracking-wider">
            Copyright {new Date().getFullYear()} {SITE_NAME}. All Rights Reserved.
          </p>
          <p className="font-body text-cream/30 text-xs">
            Pure Vegetarian | Nagpur Highway | Maharashtra
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
