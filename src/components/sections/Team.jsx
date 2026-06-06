import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { staggerContainer, scaleIn, fadeUp } from '../../utils/animations'
import { team } from '../../data/teams'

export default function Team() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="team" ref={ref} className="section-padding"
      style={{ background: 'var(--color-black)' }}>
      <div className="container">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.span variants={fadeUp}
            style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                     textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>
            The Team
          </motion.span>
          <motion.h2 variants={fadeUp}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)',
                     fontWeight: 800, color: 'var(--color-white)', marginBottom: '64px' }}>
            People Behind the Work
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}
            className="grid-responsive-4">
            {team.map((member, i) => (
              <motion.div key={i} variants={scaleIn}
                style={{ position: 'relative', overflow: 'hidden', cursor: 'none' }}
                className="team-card"
              >
                <div style={{ aspectRatio: '3/4', background: 'var(--color-surface)', overflow: 'hidden' }}>
                  <img src={member.img} alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover',
                              transition: 'transform 0.6s ease', display: 'block' }}
                    className="team-img" />
                </div>
                <div style={{ padding: '20px 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 700,
                                color: 'var(--color-white)', marginBottom: '4px' }}>
                    {member.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--color-accent)' }}>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}