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
    <section id="testimonials" ref={ref} className="section-padding"
      style={{ background: 'transparent', overflow: 'hidden' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} style={{ marginBottom: '60px', textAlign: 'center' }}>
          <span style={{ display: 'block', fontSize: '12px', letterSpacing: '0.15em',
                         textTransform: 'uppercase', color: '#94847D', marginBottom: '16px',
                         fontWeight: 600, fontFamily: 'Montserrat, sans-serif' }}>
            ★ Client Stories
          </span>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(36px, 5vw, 64px)',
                       fontWeight: 800, color: '#2D2926' }}>
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
              <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '48px 32px',
                            background: '#FAF6F0', border: '1px solid #C1B6AF', borderRadius: '16px' }}>
                <div style={{ fontSize: '80px', color: '#C1B6AF', lineHeight: 0.8,
                               fontFamily: 'Georgia', marginBottom: '24px' }}>"</div>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 'clamp(20px, 3vw, 28px)',
                             fontWeight: 400, color: '#2D2926', lineHeight: 1.6,
                             marginBottom: '40px', fontStyle: 'italic' }}>
                  {t.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                  <img src={t.avatar} alt={t.name}
                    style={{ width: '52px', height: '52px', borderRadius: '50%',
                              border: '2px solid #C1B6AF', objectFit: 'cover' }} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontWeight: 600, color: '#94847D', marginBottom: '4px', fontFamily: 'Montserrat, sans-serif' }}>{t.name}</p>
                    <p style={{ fontSize: '13px', color: '#7F736E', fontFamily: 'Montserrat, sans-serif' }}>{t.role}</p>
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