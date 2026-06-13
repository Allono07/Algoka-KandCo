import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../utils/animations'

export default function WhyChoose() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="why-choose" ref={ref} className="section-padding about-why">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={fadeUp}>
            <h4 className="why-heading">Why Choose Kalp & Co.</h4>
            <div className="why-grid">
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h5 className="why-title">Curated Collective</h5>
                <p className="why-desc">We bring together top-tier creatives, strategists, and technologists under one cohesive vision.</p>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                </div>
                <h5 className="why-title">Global Perspective</h5>
                <p className="why-desc">Our strategies are informed by diverse cultures and global market trends.</p>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <h5 className="why-title">Data-Driven Impact</h5>
                <p className="why-desc">Every creative decision is backed by insights to ensure maximum ROI.</p>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <h5 className="why-title">Immersive Tech</h5>
                <p className="why-desc">We leverage cutting-edge technologies to craft experiences of the future.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
