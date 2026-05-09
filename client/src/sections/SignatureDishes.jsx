import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import SectionTitle from '../components/ui/SectionTitle'
import { DISHES, MENU_CATEGORIES } from '../utils/constants'
import { staggerContainer, staggerItem } from '../utils/motionVariants'
import { imageZoomHover } from '../animations/hoverAnimations'

const DishCard = ({ dish }) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-cream border border-gold/20 rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        boxShadow: hovered
          ? '0 20px 60px rgba(200,167,106,0.2)'
          : '0 4px 20px rgba(0,0,0,0.06)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={dish.image}
          alt={dish.nameEn}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Warm overlay on hover */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-gold/30 to-transparent transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
        />
        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-forest/80 backdrop-blur-sm text-cream text-xs px-3 py-1 rounded-full font-body tracking-wide">
            {dish.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold text-charcoal leading-tight">
              {dish.name}
            </h3>
            <p className="font-body text-charcoal/70 text-xs mt-0.5">{dish.nameEn}</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <span className="font-body font-semibold text-forest text-base whitespace-nowrap">{dish.price}</span>
          </div>
        </div>
        <p className="font-body text-charcoal/55 text-xs leading-relaxed">{dish.description}</p>
      </div>
    </div>
  )
}

const SignatureDishes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  // Filter dishes based on category and search
  const filteredDishes = DISHES.filter((dish) => {
    const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory
    const matchesSearch = searchQuery === '' ||
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.nameEn.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Calculate pagination for "All" category only
  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE)
  const paginatedDishes = selectedCategory === 'All'
    ? filteredDishes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : filteredDishes

  // Reset to page 1 when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <section id="menu" className="py-24 px-4 md:px-8 bg-warm-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-forest/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionTitle eyebrow="Our" title="COMPLETE MENU" />

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 pl-12 bg-white/80 backdrop-blur-sm border border-gold/30 rounded-full text-charcoal placeholder-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-transparent transition-all"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {MENU_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-forest text-cream shadow-lg shadow-forest/30'
                    : 'bg-white/60 text-charcoal/70 hover:bg-white/80 hover:text-forest'
                }`}
              >
                {category}
                {category !== 'All' && (
                  <span className="ml-2 text-xs opacity-70">
                    ({DISHES.filter(d => d.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-center">
          <p className="font-body text-charcoal/60 text-sm">
            {selectedCategory === 'All'
              ? `Showing ${Math.min(currentPage * ITEMS_PER_PAGE, filteredDishes.length)} of ${filteredDishes.length} items (Page ${currentPage} of ${totalPages})`
              : `Showing ${filteredDishes.length} ${filteredDishes.length === 1 ? 'item' : 'items'}`
            }
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        {/* Mobile Grid */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {paginatedDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>

        {/* Pagination Controls */}
        {selectedCategory === 'All' && totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center gap-4">
            {/* Page Numbers */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white/60 text-charcoal rounded-lg font-body text-sm font-medium hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-body text-sm font-medium transition-all ${
                    currentPage === page
                      ? 'bg-forest text-cream shadow-lg shadow-forest/30'
                      : 'bg-white/60 text-charcoal hover:bg-white/80'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white/60 text-charcoal rounded-lg font-body text-sm font-medium hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* No results */}
        {filteredDishes.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-charcoal/60 text-lg">No dishes found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default SignatureDishes
