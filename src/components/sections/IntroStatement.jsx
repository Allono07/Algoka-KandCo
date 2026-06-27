import { useInView } from 'react-intersection-observer'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'

export default function IntroStatement() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <LazyMotion features={domAnimation} strict>
      <section ref={ref} className="section-padding" style={{ background: 'transparent' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ textAlign: 'center' }}
          >
            <m.h2
              variants={fadeUp}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 800,
                color: '#2D2926',
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
            >
              We Build Businesses That Lead.
            </m.h2>

            <m.p
              variants={fadeUp}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: 'clamp(15px, 1.5vw, 18px)',
                color: '#7F736E',
                lineHeight: 1.7,
                maxWidth: '780px',
                margin: '0 auto 40px',
                fontWeight: 400,
              }}
            >
              KALP &amp; CO is a luxury branding agency, creative agency, and digital marketing agency helping ambitious businesses transform ideas into category-leading brands. Through branding, website design, SEO, performance marketing, content strategy, AI-powered marketing, and creative technology, we deliver measurable business growth with one integrated partner.
            </m.p>

            <m.a
              variants={fadeUp}
              href="#contact"
              style={{
                display: 'inline-block',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#FAF6F0',
                background: '#2D2926',
                padding: '16px 36px',
                borderRadius: '50px',
                textDecoration: 'none',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#94847D' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2D2926' }}
            >
              Start Your Growth Journey
            </m.a>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
