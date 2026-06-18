import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '../../data/services'
import { staggerContainer, fadeUp } from '../../utils/animations'

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)
  const tabsRef = useRef(null)

  // Scroll active tab into view whenever activeIndex changes (mobile horizontal strip)
  useEffect(() => {
    if (!tabsRef.current) return
    const activeBtn = tabsRef.current.children[activeIndex]
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [activeIndex])

  useEffect(() => {
    const handleSelectService = (e) => {
      const { serviceTitle } = e.detail;
      const idx = services.findIndex(s => {
        const normS = s.title.toLowerCase().replace(/[\u2010-\u2015-]/g, '-');
        const normT = serviceTitle.toLowerCase().replace(/[\u2010-\u2015-]/g, '-');
        return normS.includes(normT) || normT.includes(normS);
      });
      if (idx !== -1) {
        setActiveIndex(idx);
      }
    };
    window.addEventListener('select-service', handleSelectService);
    return () => window.removeEventListener('select-service', handleSelectService);
  }, []);

  const activeService = services[activeIndex]

  return (
    <section id="services" ref={ref} className="section-padding services-section-redesign" style={{ background: 'transparent' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          
          <motion.div variants={fadeUp} style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              color: '#94847D',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif'
            }}></p>
            <h2 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 700,
              color: '#2D2926'
            }}>
              What We Have to Offer
            </h2>
            <p style={{
              color: '#7F736E',
              fontSize: '16px',
              marginTop: '16px',
              maxWidth: '600px',
              margin: '16px auto 0',
              fontFamily: 'Montserrat, sans-serif'
            }}>
              A comprehensive suite of creative and strategic solutions tailored to elevate your brand.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="services-panel-grid">
            
            {/* Left Column: Tabs */}
            <div className="services-tabs" ref={tabsRef}>
              {services.map((service, idx) => (
                <button
                  key={service.number}
                  onClick={() => setActiveIndex(idx)}
                  className={idx === activeIndex ? 'tab-active' : 'tab-inactive'}
                  style={{
                    textAlign: 'left',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 500,
                    fontSize: '15px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    display: 'block'
                  }}
                >
                  {service.title}
                </button>
              ))}
            </div>

            {/* Centre Column: Image */}
            <div className="services-image-col">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeService.number}
                  src={activeService.image}
                  alt={activeService.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                />
              </AnimatePresence>

              {/* Mobile prev/next arrows — matching Portfolio style */}
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => setActiveIndex((activeIndex - 1 + services.length) % services.length)}
                className="services-img-nav services-img-nav--prev"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next service"
                onClick={() => setActiveIndex((activeIndex + 1) % services.length)}
                className="services-img-nav services-img-nav--next"
              >
                ›
              </button>

              {/* Slide counter */}
              <div className="services-img-counter">
                {activeIndex + 1} / {services.length}
              </div>
            </div>

            {/* Right Column: Detail Panel */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              padding: '24px'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.number}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <p style={{
                    fontSize: '12px',
                    color: '#7F736E',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    {/* ✦ AS YOU WISH */}
                  </p>
                  <h3 style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: 'clamp(28px, 3vw, 40px)',
                    color: '#2D2926',
                    marginBottom: '24px',
                    lineHeight: 1.2,
                    fontWeight: 700,
                    fontStyle: 'italic'
                  }}>
                    {activeService.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '16px',
                    color: '#7F736E',
                    lineHeight: 1.6,
                    fontWeight: 300,
                    marginBottom: '32px'
                  }}>
                    {activeService.desc}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
                    <span style={{ color: '#94847D' }}>✓</span>
                    <span style={{ fontSize: '14px', color: '#2D2926', fontWeight: 500, fontFamily: 'Montserrat, sans-serif' }}>Premium Service Offering</span>
                  </div>

                  <a href="#contact" style={{
                    display: 'inline-block',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#94847D',
                    textDecoration: 'none',
                    borderBottom: '1px solid #94847D',
                    paddingBottom: '4px',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    transition: 'opacity 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    EXPLORE {activeService.title} ↗
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
