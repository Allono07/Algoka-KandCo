import { useInView } from 'react-intersection-observer'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../utils/animations'

export default function WhyChoose() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <LazyMotion features={domAnimation} strict>
    <section id="why-choose" ref={ref} className="section-padding about-why">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <m.div variants={fadeUp}>
            <h4 className="why-heading">Why Choose Kalp & Co.</h4>
            <div className="why-grid">
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h5 className="why-title">Strategy First</h5>
                <p className="why-desc">Every decision starts with research, clarity and a strategy built around your real business goals.</p>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <h5 className="why-title">Luxury Brand Thinking</h5>
                <p className="why-desc">We apply premium brand thinking to every project — from positioning to visual identity to communication.</p>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
                <h5 className="why-title">Creativity With Purpose</h5>
                <p className="why-desc">Creative work that is not just beautiful but purposeful — designed to drive real business outcomes.</p>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                <h5 className="why-title">Performance That Matters</h5>
                <p className="why-desc">ROI-focused campaigns across digital channels that generate demand and accelerate growth.</p>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <h5 className="why-title">Technology That Scales</h5>
                <p className="why-desc">AI-powered marketing, intelligent automation and digital technology built to scale your brand.</p>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h5 className="why-title">One Growth Partner</h5>
                <p className="why-desc">Branding, digital, content, performance and AI — all under one roof, one vision, one accountable team.</p>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
    </LazyMotion>
  )
}
