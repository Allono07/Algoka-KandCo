import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'
import { blog } from '../../data/blog'

export default function Blog() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="blog" ref={ref} className="section-padding"
      style={{ background: 'var(--color-charcoal)' }}>
      <div className="container">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                        marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <motion.span variants={fadeUp}
                style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                         textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>
                Insights
              </motion.span>
              <motion.h2 variants={fadeUp}
                style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)',
                         fontWeight: 800, color: 'var(--color-white)' }}>
                From the Studio
              </motion.h2>
            </div>
            <motion.a variants={fadeUp} href="#"
              style={{ fontSize: '13px', color: 'var(--color-accent)', letterSpacing: '0.1em',
                       textTransform: 'uppercase', textDecoration: 'none' }}>
              View All Posts →
            </motion.a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}
            className="grid-responsive-3">
            {blog.map((post, i) => (
              <motion.article key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                style={{ cursor: 'none' }}
              >
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', marginBottom: '24px',
                               background: 'var(--color-surface)' }}>
                  <img src={post.img} alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover',
                              transition: 'transform 0.5s ease', display: 'block' }}
                    className="blog-img" />
                </div>
                <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                                color: 'var(--color-accent)', display: 'block', marginBottom: '12px' }}>
                  {post.category}
                </span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700,
                              color: 'var(--color-white)', marginBottom: '12px', lineHeight: 1.3 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.7,
                             marginBottom: '20px' }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: 'var(--color-border)', letterSpacing: '0.05em' }}>
                    {post.date}
                  </span>
                  <a href="#" style={{ fontSize: '13px', color: 'var(--color-accent)',
                                       textDecoration: 'none', letterSpacing: '0.05em' }}>
                    Read →
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}