/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F3EA',
        forest: '#1F4B3F',
        gold: '#C8A76A',
        brown: '#7A5C3E',
        charcoal: '#2B2B2B',
        'cream-dark': '#EDE8DA',
        'forest-light': '#2A6356',
        'gold-light': '#D4B87A',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slow-zoom': 'slowZoom 20s ease-in-out infinite alternate',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(40px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 },
        },
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(135deg, #F7F3EA 0%, #EDE8DA 50%, #E5DCC8 100%)',
        'hero-overlay': 'linear-gradient(to right, rgba(31,75,63,0.85) 0%, rgba(43,43,43,0.4) 60%, transparent 100%)',
        'gold-shimmer': 'linear-gradient(90deg, transparent 0%, rgba(200,167,106,0.3) 50%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
