import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { scrollToSection } from '../utils/helpers'
import { heroTextReveal, blurClear, staggerContainer, staggerItem } from '../utils/motionVariants'

// Floating particle
const Particle = ({ style }) => (
  <motion.div
    className="absolute rounded-full bg-gold/30 pointer-events-none"
    style={style}
    animate={{
      y: [0, -80, 0],
      opacity: [0, 0.7, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: style.duration,
      repeat: Infinity,
      delay: style.delay,
      ease: 'easeInOut',
    }}
  />
)

const particles = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + i * 8}%`,
  bottom: '5%',
  width: `${4 + Math.random() * 6}px`,
  height: `${4 + Math.random() * 6}px`,
  duration: 4 + Math.random() * 4,
  delay: Math.random() * 5,
}))

// Stat badge
const StatBadge = ({ label, sub }) => (
  <motion.div
    variants={staggerItem}
    className="px-5 py-3 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-xl"
  >
    <p className="font-body font-semibold text-cream text-sm leading-none">{label}</p>
    <p className="font-body text-cream/60 text-xs mt-0.5">{sub}</p>
  </motion.div>
)

const HeroSection = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="home" ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Cinematic background with parallax */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="w-full h-full bg-cover bg-center"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85')`,
          }}
        />
      </motion.div>

      {/* Layered overlays for warm golden atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-charcoal/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
      {/* Warm golden glow top-right */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-gold/20 via-transparent to-transparent pointer-events-none" />
      {/* Warm light-leak left */}
      <motion.div
        className="absolute left-0 top-1/4 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none"
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Particles */}
      {particles.map((p, i) => <Particle key={i} style={p} />)}

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display italic text-gold text-lg md:text-xl tracking-wide mb-4"
        >
          Pure Veg Dining
        </motion.p>

        {/* Main heading */}
        <div className="overflow-hidden mb-3">
          <motion.h1
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-cream leading-none tracking-tight"
          >
            Hotel
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-cream leading-none tracking-tight"
          >
            Vatika Dhaba
          </motion.h1>
        </div>

        {/* Subheading */}
        <motion.p
          variants={blurClear}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.75 }}
          className="font-body text-cream/80 text-sm md:text-base max-w-md mb-10 leading-relaxed"
        >
          Pure Veg Dining
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex flex-wrap gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('menu')}
            className="flex items-center gap-2 bg-forest border-2 border-gold text-cream px-8 py-3.5 rounded-full font-body text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Explore Menu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-2 bg-transparent border-2 border-cream text-cream px-8 py-3.5 rounded-full font-body text-sm tracking-widest uppercase hover:bg-cream hover:text-forest transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Visit Us
          </motion.button>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          transition={{ delayChildren: 1.1, staggerChildren: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          <StatBadge label="100%" sub="Pure Veg" />
          <StatBadge label="Nagpur Highway" sub="Premium Location" />
          <StatBadge label="Open Till" sub="Late Night" />
          <StatBadge label="Ample" sub="Parking" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-cream/40 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-cream/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
