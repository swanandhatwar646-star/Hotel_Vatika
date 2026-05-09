import { motion } from 'framer-motion'
import HeroSection from '../sections/HeroSection'
import SignatureDishes from '../sections/SignatureDishes'
import WhyChooseUs from '../sections/WhyChooseUs'
import Testimonials from '../sections/Testimonials'
import Gallery from '../sections/Gallery'
import Contact from '../sections/Contact'
import Footer from '../components/layout/Footer'

const Home = () => {
  return (
    <motion.main>
      <HeroSection />
      <SignatureDishes />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </motion.main>
  )
}

export default Home
