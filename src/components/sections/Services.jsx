import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '../../data/services';
import { fadeUp, staggerContainer } from '../../utils/animations';

export default function Services() {
  const [active, setActive] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" ref={ref} className="section-padding bg-black">
      <div className="container">
        {/* Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="block text-xs tracking-widest uppercase text-accent mb-4"
          >
            What We Do
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-extrabold leading-tight text-white"
          >
            Services Built for Growth
          </motion.h2>
        </motion.div>

        {/* Service list */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="border-b border-border py-4 cursor-none transition py-4"
            >
              <div className="flex items-center gap-8">
                <span className="font-mono text-sm text-accent min-w-8">{service.number}</span>
                <h3
                  className={`font-heading text-lg md:text-xl font-bold transition ${
                    active === i ? 'text-white' : 'text-muted'
                  }`}
                >
                  {service.title}
                </h3>
                <span className="text-2xl transition" style={{ opacity: active === i ? 1 : 0 }}>
                  →
                </span>
              </div>

              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-base text-muted mt-4 max-w-2xl"
                  >
                    {service.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}