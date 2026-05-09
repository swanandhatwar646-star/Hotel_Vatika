import { useState, useEffect } from 'react'

export const useNavbarScroll = (threshold = 80) => {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > threshold)
      setHidden(currentY > lastY && currentY > 200)
      setLastY(currentY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY, threshold])

  return { scrolled, hidden }
}
