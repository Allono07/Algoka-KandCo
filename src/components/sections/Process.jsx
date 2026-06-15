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
    <section id="process" ref={ref} className="section-padding" style={{ background: 'transparent' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={fadeUp}
            style={{
              display: 'block',
              fontSize: '12px',
              
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#94847D',
              marginBottom: '20px',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {/* ★ How We Work */}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              color: '#2D2926',
              marginBottom: '48px',
              lineHeight: 1.1
            }}
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
                className="process-step text-center"
              >
                {/* Number */}
                <div className="process-step-num" style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '60px',
                  fontWeight: 700,
                  marginBottom: '16px'
                }}>
                  {step.num}
                </div>

                {/* Accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  style={{
                    height: '2px',
                    background: '#C1B6AF',
                    width: '100%',
                    marginBottom: '16px'
                  }}
                />

                {/* Title */}
                <h3 style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#2D2926',
                  marginBottom: '8px'
                }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '14px',
                  color: '#7F736E',
                  lineHeight: 1.6,
                  fontWeight: 300
                }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
