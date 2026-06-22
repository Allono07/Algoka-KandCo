import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animations';
import aboutImage from '../../assets/about/aboutus.webp';
import reflectionImage from '../../assets/about/reflection.webp';
import visionImage from '../../assets/about/vision.webp';
import missionImage from '../../assets/about/mission.webp';
import valuesImage from '../../assets/about/value.webp';
import identityImage from '../../assets/about/identity.webp';

const aboutBlocks = [
  {
    label: 'MISSION',
    heading: 'Our Mission',
    body: 'To elevate brands through immersive campaigns, strategic planning, and creative solutions that convert and inspire — built around real business outcomes, not vanity metrics.',
    img: missionImage,
  },
  {
    label: 'VALUES',
    heading: 'Our Values',
    body: 'Driven by curiosity, rooted in strategic insight, and dedicated to delivering premium, high-impact results for every partner we work with.',
    img: valuesImage,
  },
  {
    label: 'VISION',
    heading: 'Our Vision',
    body: 'To become the ultimate creative partner for growth-focused brands, blending strategy, technology, and design into one seamless engine for scale.',
    img: visionImage,
  },
  {
    label: 'REFLECTION',
    heading: 'Our Reflection',
    body: 'Every campaign we ship is a reflection of the brand behind it — we hold ourselves to a standard where craft, clarity, and impact are non-negotiable.',
    img: reflectionImage,
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="about-redesign">
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Header row: ABOUT US + description */}
          <motion.div variants={fadeUp} className="about-header-row">
            <h2 className="about-main-title">ABOUT US</h2>
            <p className="about-header-desc">
              Kalp &amp; Co is a growth-focused creative and marketing agency helping brands build impact through strategy, branding, content, AI-powered solutions, and digital performance marketing.
            </p>
          </motion.div>

          {/* Full-width landscape image */}
          <motion.div variants={fadeUp} className="about-landscape-wrap">
            <img src={aboutImage} alt="Kalp & Co Studio" className="about-landscape-img" />
          </motion.div>

          {/* Identity block: image + heading/paragraph */}
          <motion.div variants={fadeUp} className="about-identity-row">
            <div className="about-identity-img">
              <img src={identityImage} alt="Brand identity" />
            </div>
            <div className="about-identity-text">
              <h3 className="about-identity-heading">IDENTITY</h3>
              <p className="about-identity-body">
                We blend creativity, culture, and cutting-edge technology to craft brand identities that feel bold, modern, and unmistakably distinct — built for growth, not just looks. Every visual decision is rooted in strategy, ensuring brands stand out while staying true to who they are.
              </p>
            </div>
          </motion.div>

          {/* 2x2 Mission / Values / Vision / Reflection grid */}
          <div className="about-mvvr-grid">
            {aboutBlocks.map(block => (
              <motion.div variants={fadeUp} key={block.label} className="about-mvvr-card">
                <div className="about-mvvr-img">
                  <img src={block.img} alt={block.label} />
                </div>
                <div className="about-mvvr-text">
                  <h4 className="about-mvvr-heading">{block.label}</h4>
                  <p className="about-mvvr-body">{block.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
