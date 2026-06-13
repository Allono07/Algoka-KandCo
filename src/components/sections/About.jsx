import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, staggerContainer } from '../../utils/animations';
import aboutImage from '../../assets/about/56.jpeg'; // Use existing image

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="about-redesign">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Title */}
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 800,
            color: '#2D2926',
            textAlign: 'center',
            marginBottom: '64px'
          }}
        >
          ABOUT US
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Part A: Hero Identity Block */}
          <div className="about-hero">
            <motion.div variants={fadeUp} className="about-hero-text">
              <p className="about-label">↗ ABOUT US</p>
              <h3 className="about-title-large">KALP & CO.</h3>
              <p className="about-desc">
                We blend CREATIVITY, CULTURE and CUTTING-EDGE IMMERSIVE TECHNOLOGIES to CREATE and ELEVATE brands, experiences and destinations of the future. We are a curated collective of high-quality creative consultancies, immersive technology, marketing and production studios. As a strategic partner and transformational, integrated platform we craft the future of luxury and lifestyle.
              </p>
            </motion.div>
            <motion.div variants={slideLeft} className="about-hero-img-wrap">
              <img src={aboutImage} alt="Kalp & Co Studio" className="about-hero-img" />
            </motion.div>
          </div>

          {/* Part B: Vision / Mission / Values */}
          <div className="about-vmv">
            <motion.div variants={fadeUp} className="vmv-card">
              <span className="vmv-label">VISION</span>
              <h4 className="vmv-heading">Crafting the Future</h4>
              <p className="vmv-body">To become the ultimate creative partner for luxury and lifestyle brands globally, seamlessly blending technology, culture, and design.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="vmv-card">
              <span className="vmv-label">MISSION</span>
              <h4 className="vmv-heading">Elevate Experiences</h4>
              <p className="vmv-body">We exist to elevate brands through immersive technologies, strategic planning, and unparalleled creative solutions that convert and inspire.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="vmv-card">
              <span className="vmv-label">VALUES</span>
              <h4 className="vmv-heading">Innovation & Excellence</h4>
              <p className="vmv-body">We are driven by curiosity, rooted in strategic insight, and dedicated to delivering premium, high-impact results for every partner.</p>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
