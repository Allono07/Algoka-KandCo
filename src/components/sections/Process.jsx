import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '../../utils/animations';

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'Deep‑dive into your brand, audience, competition, and goals through discovery workshops and audits.',
  },
  {
    num: '02',
    title: 'Strategise',
    desc: 'Build a data‑backed strategy — positioning, channels, messaging, timelines, and KPIs.',
  },
  {
    num: '03',
    title: 'Create',
    desc: 'Design and produce all creative assets — campaigns, content, collateral, and digital experiences.',
  },
  {
    num: '04',
    title: 'Launch',
    desc: 'Execute across channels with precision — paid, organic, influencer, PR, and events.',
  },
  {
    num: '05',
    title: 'Optimise',
    desc: 'Continuous performance monitoring, A/B testing, and iteration to maximise ROI.',
  },
];

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="process" ref={ref} className="section-padding bg-black">
      <div className="container">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={fadeUp}
            className="block text-xs tracking-widest uppercase text-accent mb-5"
          >
            How We Work
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-heading text-4xl md:text-5xl font-extrabold leading-tight text-white mb-12"
          >
            Our Process
          </motion.h2>

          {/* Steps grid */}
          <div className="grid md:grid-cols-5 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                {/* Number */}
                <div className="font-heading text-6xl font-extrabold text-border mb-4 transition-colors">
                  {step.num}
                </div>

                {/* Accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  className="h-0.5 bg-accent mx-auto mb-4"
                />

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
