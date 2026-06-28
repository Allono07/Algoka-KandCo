import { useEffect, useState, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import BrandIntro from './components/ui/BrandIntro'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import IntroStatement from './components/sections/IntroStatement'
import Portfolio from './components/sections/Portfolio'
import WhatsAppButton from './components/ui/WhatsAppButton'
import SEO from './components/ui/SEO'
import { Toaster } from 'react-hot-toast'

const ClientLogos = lazy(() => import('./components/sections/ClientLogos'))
const About       = lazy(() => import('./components/sections/About'))
const Process     = lazy(() => import('./components/sections/Process'))
const WhyChoose   = lazy(() => import('./components/sections/WhyChoose'))
const Blog        = lazy(() => import('./components/sections/Blog'))
const Contact     = lazy(() => import('./components/sections/Contact'))
const Footer      = lazy(() => import('./components/layout/Footer'))

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      window.scrollTo(0, 0)
    }
  }, [isLoading])

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
        <IntroStatement />
        <Services />
        <Portfolio />
        <Suspense fallback={null}>
          <ClientLogos />
          <About />
          <Process />
          <WhyChoose />
          <Blog />
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