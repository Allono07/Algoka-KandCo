import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import BrandIntro from './components/ui/BrandIntro'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import WhyChoose from './components/sections/WhyChoose'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Process from './components/sections/Process'
import ClientLogos from './components/sections/ClientLogos'
import Team from './components/sections/Team'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import WhatsAppButton from './components/ui/WhatsAppButton'
import SEO from './components/ui/SEO'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  // Force the page to start at the very top on initial mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  // Lock scroll while the intro is on screen
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      window.scrollTo(0, 0)
    }
  }, [isLoading])

  // Initialize Lenis only AFTER the intro has finished
  useEffect(() => {
    if (isLoading) return undefined

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [isLoading])

  return (
    <>
      <SEO />
      <BrandIntro onComplete={() => setIsLoading(false)} />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <ClientLogos />
        <About />
        <Process />
        <WhyChoose />
        <Blog />
        <Team />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="bottom-center" />
    </>
  )
  
}
