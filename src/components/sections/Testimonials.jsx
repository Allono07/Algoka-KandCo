import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'
import { testimonials } from '../../data/testimonials'

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="section-padding"
      style={{ background: 'var(--color-charcoal)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                         textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>
            Client Stories
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)',
                       fontWeight: 800, color: 'var(--color-white)' }}>
            What They Say
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop spaceBetween={40} slidesPerView={1}
          style={{ paddingBottom: '60px' }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '0 20px' }}>
                <div style={{ fontSize: '80px', color: 'var(--color-accent)', lineHeight: 0.8,
                               fontFamily: 'Georgia', marginBottom: '32px' }}>"</div>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(20px, 3vw, 28px)',
                             fontWeight: 500, color: 'var(--color-white)', lineHeight: 1.6,
                             marginBottom: '48px', fontStyle: 'italic' }}>
                  {t.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <img src={t.avatar} alt={t.name}
                    style={{ width: '52px', height: '52px', borderRadius: '50%',
                              border: '2px solid var(--color-accent)', objectFit: 'cover' }} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 700, color: 'var(--color-white)', marginBottom: '4px' }}>{t.name}</p>
                    <p style={{ fontSize: '13px', color: 'var(--color-muted)' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}