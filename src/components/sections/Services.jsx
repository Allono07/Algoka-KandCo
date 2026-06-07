import { useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { services } from '../../data/services';
import { fadeUp, staggerContainer } from '../../utils/animations';

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.services-carousel-card');
    const cardWidth = card ? card.offsetWidth + 24 : 420; // card width + gap
    el.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  };

  return (
    <section id="services" ref={ref} className="services-section">
      <div className="container">
        {/* Header row with title + nav arrows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="services-header"
        >
          <div className="services-header-text">
            <motion.div variants={fadeUp} className="services-pill">
              Our Services
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="services-nav">
            <button
              className={`services-nav-btn ${!canScrollLeft ? 'services-nav-btn--disabled' : ''}`}
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              disabled={!canScrollLeft}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              className={`services-nav-btn ${!canScrollRight ? 'services-nav-btn--disabled' : ''}`}
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              disabled={!canScrollRight}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Carousel track — full-bleed, scrollable */}
      <div className="services-carousel-wrapper">
        <div className="services-carousel-track" ref={trackRef}>
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="services-carousel-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="services-card-image-wrap">
                <img
                  src={service.image}
                  alt={service.title}
                  className="services-card-image"
                  loading="lazy"
                />
              </div>
              <div className="services-card-info">
                <h3 className="services-card-title">{service.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}