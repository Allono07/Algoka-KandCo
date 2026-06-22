import { useEffect, useState, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import BrandIntro from './components/ui/BrandIntro'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import WhatsAppButton from './components/ui/WhatsAppButton'
import SEO from './components/ui/SEO'
import { Toaster } from 'react-hot-toast'

const Footer = lazy(() => import('./components/layout/Footer'))
const About = lazy(() => import('./components/sections/About'))
const WhyChoose = lazy(() => import('./components/sections/WhyChoose'))
const Services = lazy(() => import('./components/sections/Services'))
const Portfolio = lazy(() => import('./components/sections/Portfolio'))
const Process = lazy(() => import('./components/sections/Process'))
const ClientLogos = lazy(() => import('./components/sections/ClientLogos'))
const Team = lazy(() => import('./components/sections/Team'))
const Blog = lazy(() => import('./components/sections/Blog'))
const Contact = lazy(() => import('./components/sections/Contact'))

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

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      lerp: prefersReduced ? 0 : 0.1,
      smoothWheel: !prefersReduced,
    })
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
        <Suspense fallback={null}>
          <Services />
          <Portfolio />
          <ClientLogos />
          <About />
          <Process />
          <WhyChoose />
          <Blog />
          <Team />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      <Toaster position="bottom-center" />
    </>
  )
  
}
