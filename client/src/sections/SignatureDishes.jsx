import { memo, useMemo, useState } from 'react'
import SectionTitle from '../components/ui/SectionTitle'
import { DISHES, MENU_CATEGORIES } from '../utils/constants'

const DishCard = memo(({ dish, compact = false }) => {
  return (
    <div
      className={`bg-cream border border-gold/20 overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-transform transition-shadow duration-300 ease-out md:hover:-translate-y-2 md:hover:shadow-[0_20px_60px_rgba(200,167,106,0.2)] ${
        compact ? 'rounded-xl' : 'rounded-2xl'
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${compact ? 'aspect-square' : 'aspect-[4/3]'}`}>
        <img
          src={dish.image}
          alt={dish.nameEn}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Warm overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gold/30 to-transparent opacity-0 transition-opacity duration-300 md:group-hover:opacity-100" />
        {/* Category tag */}
        <div className={compact ? 'absolute top-2 left-2 right-2' : 'absolute top-3 left-3'}>
          <span
            className={`inline-block max-w-full truncate bg-forest/80 backdrop-blur-sm text-cream rounded-full font-body tracking-wide ${
              compact ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'
            }`}
          >
            {dish.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className={compact ? 'p-3' : 'p-4'}>
        <div className={compact ? 'mb-1' : 'flex items-start justify-between mb-1'}>
          <div className="flex-1">
            <h3
              className={`font-display font-semibold text-charcoal leading-tight ${
                compact ? 'text-base line-clamp-2' : 'text-lg'
              }`}
            >
              {dish.name}
            </h3>
            <p className={`font-body text-charcoal/70 mt-0.5 ${compact ? 'text-[11px] truncate' : 'text-xs'}`}>
              {dish.nameEn}
            </p>
          </div>
          <div className={compact ? 'mt-1' : 'flex items-center gap-1 ml-2'}>
            <span className={`font-body font-semibold text-forest whitespace-nowrap ${compact ? 'text-sm' : 'text-base'}`}>
              {dish.price}
            </span>
          </div>
        </div>
        <p
          className={`font-body text-charcoal/55 leading-relaxed ${
            compact ? 'text-[11px] line-clamp-2' : 'text-xs'
          }`}
        >
          {dish.description}
        </p>
      </div>
    </div>
  )
})

DishCard.displayName = 'DishCard'

const SignatureDishes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  const normalizedSearch = searchQuery.trim().toLowerCase()

  const categoryCounts = useMemo(() => {
    return DISHES.reduce((counts, dish) => {
      counts[dish.category] = (counts[dish.category] || 0) + 1
      return counts
    }, {})
  }, [])

  // Filter dishes based on category and search
  const filteredDishes = useMemo(() => {
    return DISHES.filter((dish) => {
      const matchesCategory = selectedCategory === 'All' || dish.category === selectedCategory
      const matchesSearch = normalizedSearch === '' ||
        dish.name.toLowerCase().includes(normalizedSearch) ||
        dish.nameEn.toLowerCase().includes(normalizedSearch)
      return matchesCategory && matchesSearch
    })
  }, [normalizedSearch, selectedCategory])

  // Calculate pagination for "All" category only
  const totalPages = Math.ceil(filteredDishes.length / ITEMS_PER_PAGE)
  const paginatedDishes = useMemo(() => {
    return selectedCategory === 'All'
      ? filteredDishes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
      : filteredDishes
  }, [currentPage, filteredDishes, selectedCategory])

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
                    ({categoryCounts[category] || 0})
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
        <div className="md:hidden grid grid-cols-2 gap-3">
          {paginatedDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} compact />
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
