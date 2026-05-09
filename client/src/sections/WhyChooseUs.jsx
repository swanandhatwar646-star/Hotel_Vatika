import { motion } from 'framer-motion'
import SectionTitle from '../components/ui/SectionTitle'
import { FEATURES } from '../utils/constants'
import { staggerContainer, staggerItem } from '../utils/motionVariants'

const iconMap = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C12 2 18 7 18 13C18 19 12 22 12 22C12 22 6 19 6 13C6 7 12 2 12 2Z" />
      <line x1="12" y1="22" x2="12" y2="13" strokeLinecap="round" />
    </svg>
  ),
  tree: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L8 10H16L12 2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10L5 18H19L15 10H9Z" />
      <line x1="12" y1="18" x2="12" y2="22" strokeLinecap="round" />
    </svg>
  ),
  chef: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8a3 3 0 016 0v1h4a3 3 0 010 6H8a3 3 0 010-6h-2V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15v3m6-3v3M8 18h8" />
    </svg>
  ),
  family: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" strokeWidth={1.5}>
      <circle cx="9" cy="7" r="2" />
      <circle cx="15" cy="7" r="2" />
      <path strokeLinecap="round" d="M4 21v-2a5 5 0 0110 0v2" />
      <path strokeLinecap="round" d="M14 21v-2a5 5 0 0110 0v2" />
    </svg>
  ),
  service: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 17h18M5 17V9a7 7 0 0114 0v8" />
      <path strokeLinecap="round" d="M12 2v2" />
    </svg>
  ),
  parking: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-7 h-7" strokeWidth={1.5}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 3H8L6 7h12l-2-4z" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
}

const FeatureCard = ({ feature, index }) => (
  <motion.div
    variants={staggerItem}
    className="group text-center p-8 rounded-2xl border border-gold/15 bg-cream hover:bg-white hover:border-gold/40 hover:shadow-[0_20px_60px_rgba(200,167,106,0.15)] transition-all duration-400"
  >
    {/* Icon container */}
    <div className="w-16 h-16 mx-auto mb-5 rounded-full border-2 border-gold/30 flex items-center justify-center text-forest group-hover:border-gold group-hover:bg-gold/10 transition-all duration-300">
      {iconMap[feature.icon]}
    </div>

    {/* Thin line accent */}
    <div className="w-8 h-px bg-gold/40 mx-auto mb-4 group-hover:w-12 transition-all duration-300" />

    <h3 className="font-display text-xl font-semibold text-charcoal mb-3 leading-tight">
      {feature.title}
    </h3>
    <p className="font-body text-charcoal/55 text-sm leading-relaxed">
      {feature.description}
    </p>
  </motion.div>
)

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-cream relative">
      {/* Background texture suggestion */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C8A76A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          eyebrow="Why"
          title="CHOOSE VATIKA?"
          subtitle="We create an experience that nourishes both body and soul - in harmony with nature."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
