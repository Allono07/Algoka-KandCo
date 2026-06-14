import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import aboutImage from '../../assets/about/56.jpeg'; // reuse existing — replace later

const vmvData = [
  {
    label: 'VISION',
    position: 'vision',
    heading: 'Crafting the Future',
    body: 'To become the ultimate creative partner for growth-focused brands, blending strategy, technology, and design into one seamless engine.',
    img: aboutImage,
  },
  {
    label: 'MISSION',
    position: 'mission',
    heading: 'Elevate Experiences',
    body: 'We exist to elevate brands through immersive campaigns, strategic planning, and creative solutions that convert and inspire.',
    img: aboutImage,
  },
  {
    label: 'VALUES',
    position: 'values',
    heading: 'Innovation & Excellence',
    body: 'Driven by curiosity, rooted in strategic insight, and dedicated to delivering premium, high-impact results for every partner.',
    img: aboutImage,
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="about-redesign">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

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
            marginBottom: '48px',
          }}
        >
          ABOUT US
        </motion.h2>

        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          {/* Landscape hero image */}
          <motion.div variants={fadeUp} className="about-landscape-wrap">
            <img src={aboutImage} alt="Kalp & Co Studio" className="about-landscape-img" />
            <div className="about-landscape-overlay">
              <p className="about-label">↗ ABOUT US</p>
              <h3 className="about-title-large" style={{ marginBottom: 0 }}>KALP & CO.</h3>
            </div>
          </motion.div>

          {/* Identity row */}
          <div className="about-identity-row">
            <motion.div variants={fadeUp} className="about-identity-img">
              <img src={aboutImage} alt="Brand work" />
            </motion.div>

            <motion.div variants={fadeUp} className="about-identity-text">
              <span className="about-identity-label">IDENTITY</span>
              <p className="about-identity-body">
                We blend creativity, culture, and cutting-edge technology to craft brand identities that feel bold, modern, and unmistakably distinct — built for growth, not just looks.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="about-identity-img">
              <img src={aboutImage} alt="Brand work" />
            </motion.div>
          </div>

          {/* Vision / Mission / Values — staggered layout */}
          <div className="about-vmv-rows">
            {vmvData.map(item => (
              <motion.div
                variants={fadeUp}
                key={item.label}
                className={`vmv-row vmv-${item.position}`}
              >
                <div className="vmv-row-img">
                  <img src={item.img} alt={item.label} />
                </div>
                <div className="vmv-row-text">
                  <span className="vmv-label">{item.label}</span>
                  <h4 className="vmv-heading">{item.heading}</h4>
                  <p className="vmv-body">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
