import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '../../data/services'
import { staggerContainer, fadeUp } from '../../utils/animations'

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [page, setPage] = useState(0)

  const perPage = 3
  const totalPages = Math.ceil(services.length / perPage)
  const visible = services.slice(page * perPage, page * perPage + perPage)

  const prev = () => setPage(p => Math.max(0, p - 1))
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1))

  const circleBtn = (onClick, disabled) => ({
    onClick,
    disabled,
    style: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: disabled ? 'var(--color-border)' : 'var(--color-accent)',
      color: disabled ? 'var(--color-muted)' : 'var(--color-black)',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'none',
      fontSize: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s',
    },
  })

  return (
    <section id="services" ref={ref} className="section-padding" style={{ background: 'var(--color-black)' }}>
      <div className="container">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              color: 'var(--color-white)',
              textAlign: 'center',
              marginBottom: '64px',
            }}
          >
            What We Have to Offer
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '40px',
                marginBottom: '56px',
              }}
              className="grid-responsive-3"
            >
              {visible.map(service => (
                <div key={service.number} style={{ textAlign: 'center', padding: '0 12px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '20px',
                      fontWeight: 800,
                      color: 'var(--color-white)',
                      marginBottom: '16px',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-muted)',
                      lineHeight: 1.75,
                      marginBottom: '28px',
                    }}
                  >
                    {service.desc}
                  </p>
                  <a
                    href="#contact"
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--color-white)',
                      textDecoration: 'none',
                      borderBottom: '2px solid var(--color-accent)',
                      paddingBottom: '2px',
                      letterSpacing: '0.04em',
                    }}
                  >
                    Read More
                  </a>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button type="button" aria-label="Previous services" {...circleBtn(prev, page === 0)}>
              {'<'}
            </button>
            <button type="button" aria-label="Next services" {...circleBtn(next, page === totalPages - 1)}>
              {'>'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
