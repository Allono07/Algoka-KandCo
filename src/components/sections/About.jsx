import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeUp, slideLeft, staggerContainer } from '../../utils/animations';

const stats = [
  { number: 5,   suffix: '+', label: 'Years of Excellence' },
  { number: 80,  suffix: '+', label: 'Brands Scaled' },
  { number: 200, suffix: '+', label: 'Campaigns Delivered' },
  { number: 15,  suffix: '',  label: 'Service Verticals' },
];

function AnimatedCount({ end, duration = 2500, delay = 0, active }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frameId;
    let startTime;
    const delayTimer = setTimeout(() => {
      const animate = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setValue(Math.round(end * eased));

        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        }
      };

      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(frameId);
    };
  }, [active, delay, duration, end]);

  return value;
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="section-padding bg-charcoal">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* ---- Text side ---- */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span
              variants={fadeUp}
              className="block text-xs tracking-widest uppercase text-accent mb-5"
            >
              About Us
            </motion.span>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl font-extrabold leading-tight text-white mb-8"
            >
              We Don't Just Tell Your Story. We Scale It.
            </motion.h2>

            <motion.p variants={fadeUp} className="text-lg text-muted mb-4">
              Kalp &amp; Co is a growth‑focused creative and marketing agency helping brands
              build impact through strategy, branding, content, AI‑powered solutions,
              and digital performance marketing.
            </motion.p>

            <motion.p variants={fadeUp} className="text-lg text-muted mb-8">
              We create campaigns and experiences designed to drive measurable business growth
              and long‑term brand value — not vanity metrics.
            </motion.p>

            <motion.a
              variants={fadeUp}
              href="#services"
              className="inline-block px-6 py-3 border border-accent text-accent font-body uppercase tracking-wider transition hover:bg-accent hover:text-black"
            >
              Explore Services →
            </motion.a>
          </motion.div>

          {/* ---- Image + stats side ---- */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Placeholder image */}
            <div className="aspect-[4/5] mb-12 bg-surface overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                alt="Kalp & Co Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-[-16px] right-[-16px] w-30 h-30 border-2 border-accent" />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="font-heading text-4xl md:text-5xl font-extrabold text-white leading-none">
                    <AnimatedCount
                      end={stat.number}
                      duration={2500}
                      delay={i * 200}
                      active={inView}
                    />
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <p className="text-sm text-muted mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
