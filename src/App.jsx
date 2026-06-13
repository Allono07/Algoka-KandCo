import { useEffect } from 'react'
import Lenis from 'lenis'
import Cursor from './components/ui/Cursor'
import Loader from './components/ui/Loader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import WhyChoose from './components/sections/WhyChoose'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Process from './components/sections/Process'
import ClientLogos from './components/sections/ClientLogos'
import Testimonials from './components/sections/Testimonials'
import Team from './components/sections/Team'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import WhatsAppButton from './components/ui/WhatsAppButton'
import SEO from './components/ui/SEO'
import { Toaster } from 'react-hot-toast'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <SEO />
      <Cursor />
      <Loader />
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
        <Testimonials />
        <Team />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="bottom-center" />
    </>
  )
}
