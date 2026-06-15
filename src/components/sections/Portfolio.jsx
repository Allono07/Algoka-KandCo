import { useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { portfolio } from '../../data/portfolio'
import { fadeUp, staggerContainer } from '../../utils/animations'

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const trackRef = useRef(null)

  const filters = ['All', 'Branding', 'Performance', 'Social', 'AI', 'Strategy', 'Web']

  const filteredPortfolio = useMemo(() => {
    if (activeFilter === 'All') return portfolio
    return portfolio.filter(item => item.category === activeFilter)
  }, [activeFilter])

  const scroll = dir => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  const arrowStyle = side => ({
    position: 'absolute',
    [side]: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'var(--color-accent)',
    border: 'none',
    color: 'var(--color-black)',
    fontSize: '18px',
    cursor: 'none',
    zIndex: 10,
  })

  return (
    <section id="portfolio" ref={ref} className="section-padding" style={{ background: 'transparent' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <motion.span
            variants={fadeUp}
            style={{
              display: 'block',
              fontSize: '12px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '16px',
            }}
          >
            {/* Selected Work */}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1,
              color: '#2D2926',
              marginBottom: '32px',
            }}
          >
            Our Work
          </motion.h2>
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {filters.map(filter => {
              const active = activeFilter === filter

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '999px',
                    border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    background: active ? 'var(--color-accent)' : 'transparent',
                    color: active ? 'var(--color-black)' : 'var(--color-muted)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {filter}
                </button>
              )
            })}
          </motion.div>
        </motion.div>

        <div style={{ position: 'relative' }}>
          <button type="button" aria-label="Scroll portfolio left" onClick={() => scroll(-1)} style={arrowStyle('left')}>
            {'<'}
          </button>
          <div
            ref={trackRef}
            className="portfolio-carousel-track"
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              padding: '20px 52px',
            }}
          >
            {filteredPortfolio.map(item => (
              <div
                key={item.title}
                className="portfolio-card-redesign"
                style={{
                  flex: '0 0 calc(25% - 12px)',
                  minWidth: '240px',
                  scrollSnapAlign: 'start',
                  aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'transparent',
                  borderRadius: '16px',
                  transition: 'transform 0.3s ease',
                }}
              >
                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 300,
                      fontSize: '11px',
                      color: '#94847D',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.tag}
                  </p>
                  <h3 style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 600,
                    fontSize: '16px', 
                    color: '#fff' 
                  }}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <button type="button" aria-label="Scroll portfolio right" onClick={() => scroll(1)} style={arrowStyle('right')}>
            {'>'}
          </button>
        </div>
      </div>
    </section>
  )
}
