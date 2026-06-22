import { useInView } from 'react-intersection-observer'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { staggerContainer, fadeUp, slideLeft } from '../../utils/animations'
import { blog } from '../../data/blog'
import studioImage1 from '../../assets/studio/studioback.webp'
import studioImage2 from '../../assets/studio/studiofront.webp' 


export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <LazyMotion features={domAnimation} strict>
    <section id="studio" ref={ref} className="studio-redesign">
      <div className="container">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="studio-layout"
        >
          {/* Images */}
          <m.div variants={fadeUp} className="studio-image-group">
            <img loading="lazy" decoding="async" src={studioImage1} alt="Studio Work 1" className="studio-img img-back" />
            <img loading="lazy" decoding="async" src={studioImage2} alt="Studio Work 2" className="studio-img img-front" />
          </m.div>

          {/* Text Block */}
          <m.div variants={slideLeft} className="studio-text-block">
            <span style={{
              display: 'block',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#94847D',
              marginBottom: '16px',
              fontWeight: 600
            }}>
              {/* ★ FROM THE STUDIO */}
            </span>
            <h2 style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              color: '#2D2926',
              marginBottom: '24px',
              lineHeight: 1.1
            }}>
              Inside the world of Kalp & Co.
            </h2>
            <p style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px',
              color: '#7F736E',
              lineHeight: 1.6,
              fontWeight: 300,
              marginBottom: '40px'
            }}>
              Step behind the scenes and explore our creative process, culture, and the passionate people who bring extraordinary ideas to life. Discover how we blend art, technology, and strategy to build the brands of tomorrow.
            </p>
            <a href="#contact" className="cta-btn">
              Explore Our Journal
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
    </LazyMotion>
  )
}