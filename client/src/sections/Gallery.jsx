import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionTitle from '../components/ui/SectionTitle'
import { GALLERY_IMAGES } from '../utils/constants'
import { staggerContainer, staggerItem } from '../utils/motionVariants'

const Lightbox = ({ image, onClose }) => (
  <AnimatePresence>
    {image && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
      >
        <motion.img
          src={image.src.replace('w=600', 'w=1200')}
          alt={image.alt}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="absolute bottom-6 text-white/50 font-body text-sm">{image.alt}</p>
      </motion.div>
    )}
  </AnimatePresence>
)

const Gallery = () => {
  const [lightboxImg, setLightboxImg] = useState(null)

  return (
    <section id="gallery" className="py-24 px-4 md:px-8 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          eyebrow="Visual"
          title="GALLERY"
          subtitle="A glimpse into the warmth and beauty of Vatika."
        />

        {/* Masonry-style grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {GALLERY_IMAGES.map((img, i) => (

<motion.div
              key={img.id}
              variants={staggerItem}
              onClick={() => setLightboxImg(img)}
              className={`group relative overflow-hidden rounded-xl cursor-pointer border border-gold/15 ${
                i === 0 || i === 4 ? 'row-span-2' : ''
              }`}
              style={{
                aspectRatio: (i === 0 || i === 4) ? '3/4' : '4/3',
              }}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.08, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-cream font-body text-xs tracking-wide">{img.alt}</p>
                <span className="text-gold/70 font-body text-xs">{img.category}</span>
              </div>

              {/* Zoom icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Lightbox image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </section>
  )
}

export default Gallery
