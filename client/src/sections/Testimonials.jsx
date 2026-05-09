import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import SectionTitle from '../components/ui/SectionTitle'
import { TESTIMONIALS } from '../utils/constants'
import { staggerContainer, staggerItem } from '../utils/motionVariants'

const StarIcon = () => (
  <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const QuoteIcon = () => (
  <svg className="w-10 h-10 text-gold/30" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
)

const TestimonialCard = ({ testimonial }) => (
  <motion.div
    variants={staggerItem}
    className="bg-cream/80 border border-gold/20 rounded-2xl p-7 flex flex-col gap-5 hover:shadow-[0_16px_50px_rgba(200,167,106,0.15)] transition-shadow duration-300"
  >
    {/* Quote icon */}
    <QuoteIcon />

    {/* Stars */}
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
    </div>

    {/* Review text */}
    <p className="font-body text-charcoal/70 text-sm leading-relaxed flex-1">
      {testimonial.text}
    </p>

    {/* Divider */}
    <div className="h-px bg-gold/20" />

    {/* Author */}
    <div className="flex items-center gap-3">
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover border-2 border-gold/30"
        loading="lazy"
      />
      <div>
        <p className="font-display text-base font-semibold text-charcoal">{testimonial.name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-forest" />
          <p className="font-body text-xs text-charcoal/40">Verified Guest</p>
        </div>
      </div>
    </div>
  </motion.div>
)

const Testimonials = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-forest/5 relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 rounded-full border border-gold/10" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full border border-gold/10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          eyebrow="Voices"
          title="WHAT OUR GUESTS SAY"
          subtitle="Real experiences from real guests who've dined at Vatika."
        />

        {/* Desktop Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {TESTIMONIALS.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
        </motion.div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="!pb-10"
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.id}>
                <TestimonialCard testimonial={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
