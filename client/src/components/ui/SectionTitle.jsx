import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/motionVariants'

const SectionTitle = ({ eyebrow, title, subtitle, center = true, light = false }) => {
  return (
    <motion.div
      className={`mb-14 ${center ? 'text-center' : ''}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {eyebrow && (
        <p
          className={`font-display italic text-lg mb-2 tracking-wide ${
            light ? 'text-gold-light' : 'text-gold'
          }`}
        >
          {eyebrow}
        </p>
      )}

      {/* Decorative leaf divider */}
      <div className={`flex items-center gap-3 mb-4 ${center ? 'justify-center' : ''}`}>
        <div className={`h-px w-12 ${light ? 'bg-gold-light/50' : 'bg-gold/50'}`} />
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-60">
          <path
            d="M10 2C10 2 14 6 14 10C14 14 10 18 10 18C10 18 6 14 6 10C6 6 10 2 10 2Z"
            fill={light ? '#D4B87A' : '#C8A76A'}
          />
        </svg>
        <div className={`h-px w-12 ${light ? 'bg-gold-light/50' : 'bg-gold/50'}`} />
      </div>

      <h2
        className={`font-display text-4xl md:text-5xl font-semibold leading-tight tracking-wide ${
          light ? 'text-cream' : 'text-charcoal'
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 font-body text-sm md:text-base max-w-xl ${
            center ? 'mx-auto' : ''
          } leading-relaxed ${light ? 'text-cream/70' : 'text-charcoal/60'}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle
