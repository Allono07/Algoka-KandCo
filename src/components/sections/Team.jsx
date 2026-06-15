import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { staggerContainer, scaleIn, fadeUp } from '../../utils/animations'
import { team } from '../../data/teams'

export default function Team() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="team" ref={ref} className="section-padding"
      style={{ background: 'transparent' }}>
      <div className="container">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.span variants={fadeUp}
            style={{ display: 'block', fontSize: '12px', letterSpacing: '0.15em',
                     textTransform: 'uppercase', color: '#94847D', marginBottom: '16px',
                     fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
            {/* ★ The Team */}
          </motion.span>
          <motion.h2 variants={fadeUp}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(36px, 5vw, 64px)',
                     fontWeight: 800, color: '#2D2926', marginBottom: '64px' }}>
            Meet the People Leading the Way
          </motion.h2>

          <div className="team-grid-2">
            {team.slice(0, 2).map((member, i) => (
              <motion.div key={i} variants={scaleIn}
                style={{
                  background: '#FAF6F0',
                  border: '1px solid #C1B6AF',
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer',
                }}
                className="team-card"
              >
                <div style={{ aspectRatio: '3/4', background: 'transparent', overflow: 'hidden', borderRadius: '12px' }}>
                  <img src={member.img} alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover',
                              transition: 'transform 0.6s ease', display: 'block' }}
                    className="team-img" />
                </div>
                <div style={{ padding: '20px 0 8px 0', textAlign: 'center' }}>
                  <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '18px', fontWeight: 600,
                                color: '#2D2926', marginBottom: '4px' }}>
                    {member.name}
                  </h3>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', fontWeight: 300, color: '#94847D' }}>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
