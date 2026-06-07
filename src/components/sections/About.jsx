import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, staggerContainer } from '../../utils/animations';

const aboutImage = 'src/assets/about/56.jpeg';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.18 });

  return (
    <section id="about" ref={ref} className="about-section">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="about-copy"
      >
        <motion.span variants={fadeUp} className="about-pill">
          The Luxury Lifestyle Agency Group
        </motion.span>

        <motion.h2 variants={fadeUp} className="about-title">
          We blend CREATIVITY, CULTURE and CUTTING-EDGE IMMERSIVE TECHNOLOGIES
        </motion.h2>

        <motion.div variants={fadeUp} className="about-divider" />

        <motion.p variants={fadeUp} className="about-lede">
          to CREATE and ELEVATE brands, experiences and destinations of the future
        </motion.p>

        <motion.p variants={fadeUp} className="about-body">
          We are a curated collective of high-quality creative consultancies,
          immersive technology, marketing and production studios. As a strategic
          partner and transformational, integrated platform we craft the future
          of luxury and lifestyle.
        </motion.p>

        <motion.a variants={fadeUp} href="#services" className="about-link">
          Explore The Group
        </motion.a>
      </motion.div>

      <motion.div
        variants={slideLeft}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="about-image-panel"
      >
        <img src={aboutImage} alt="Luxury editorial campaign" className="about-image" />
      </motion.div>
    </section>
  );
}
