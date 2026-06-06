import { useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolio } from '../../data/portfolio'
import { fadeUp, staggerContainer } from '../../utils/animations'

const filters = ['All', 'Branding', 'Performance', 'Social', 'AI', 'Strategy', 'Web']

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filteredPortfolio = useMemo(() => {
    if (activeFilter === 'All') return portfolio
    return portfolio.filter(item => item.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="portfolio" ref={ref} className="section-padding" style={{ background: 'var(--color-charcoal)' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: '56px' }}
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
            Selected Work
          </motion.span>
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(38px, 6vw, 76px)',
                fontWeight: 800,
                lineHeight: 1,
                color: 'var(--color-white)',
                maxWidth: '760px',
              }}
            >
              Campaigns Crafted to Move Markets
            </h2>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {filters.map(filter => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    border: `1px solid ${activeFilter === filter ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    background: activeFilter === filter ? 'var(--color-accent)' : 'transparent',
                    color: activeFilter === filter ? 'var(--color-black)' : 'var(--color-muted)',
                    padding: '9px 14px',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px' }}
          className="grid-responsive-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredPortfolio.map((item, i) => (
              <motion.article
                key={item.title}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="portfolio-card"
                style={{ cursor: 'none' }}
              >
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/5',
                    overflow: 'hidden',
                    background: 'var(--color-surface)',
                    marginBottom: '20px',
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="portfolio-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.6s ease',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,10,10,0.9), rgba(10,10,10,0.08))',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: '20px',
                      right: '20px',
                      bottom: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#F5F5F0',
                    }}
                  >
                    <span style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      {item.tag}
                    </span>
                    <span style={{ color: '#F5F5F0' }}>{item.year}</span>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '22px',
                    lineHeight: 1.2,
                    color: 'var(--color-white)',
                    marginBottom: '10px',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-muted)', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
