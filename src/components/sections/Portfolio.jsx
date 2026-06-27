import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion'
import { portfolio } from '../../data/portfolio'
import { fadeUp, staggerContainer } from '../../utils/animations'

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const trackRef = useRef(null)
  // Lightbox state
  const [lightbox, setLightbox] = useState({ open: false, images: [], index: 0, title: '' })
  // Mobile single-photo slider index
  const [mobileIndex, setMobileIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filters = ['All', 'Jewels', 'F&B', 'FMCG', 'Fashion', 'Interior']

  const filteredPortfolio = useMemo(() => {
    if (activeFilter === 'All') return portfolio
    return portfolio.filter(item => item.category === activeFilter)
  }, [activeFilter])

  // Flatten all images across filtered categories into individual cards
  const imageCards = useMemo(() => {
    const cards = []
    filteredPortfolio.forEach(item => {
      item.images.forEach((imgSrc, imgIdx) => {
        cards.push({ imgSrc, imgIdx, item })
      })
    })
    return cards
  }, [filteredPortfolio])

  // Reset mobile index AND desktop scroll when filter changes
  useEffect(() => {
    setMobileIndex(0)
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'instant' })
    }
  }, [activeFilter])

  const scroll = dir => {
    if (!trackRef.current) return
    const track = trackRef.current
    // Each card is exactly 25% of the track's visible width (no padding offset)
    const cardWidth = track.clientWidth / 4
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' })
  }

  const mobilePrev = () => setMobileIndex(i => (i - 1 + imageCards.length) % imageCards.length)
  const mobileNext = () => setMobileIndex(i => (i + 1) % imageCards.length)

  const openLightbox = (images, index, title) => {
    setLightbox({ open: true, images, index, title })
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightbox({ open: false, images: [], index: 0, title: '' })
    document.body.style.overflow = ''
  }

  const navigateLightbox = (dir) => {
    setLightbox(prev => ({
      ...prev,
      index: (prev.index + dir + prev.images.length) % prev.images.length,
    }))
  }

  const arrowStyle = side => ({
    position: 'absolute',
    [side]: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'var(--color-accent)',
    border: 'none',
    color: 'var(--color-black)',
    fontSize: '18px',
    cursor: 'pointer',
    zIndex: 10,
  })

  // For a single selected category, show its title & description below the carousel
  const activeItem = activeFilter !== 'All'
    ? portfolio.find(item => item.category === activeFilter)
    : null

  return (
    <LazyMotion features={domAnimation} strict>
    <section id="portfolio" ref={ref} className="section-padding">
      <div className="container">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: '56px', textAlign: 'center' }}
        >
          <m.span
            variants={fadeUp}
            style={{
              display: 'block',
              fontSize: '12px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '16px',
            }}
          >
            {/* Selected Work */}
          </m.span>
          <m.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1,
              color: '#2D2926',
              marginBottom: '12px',
            }}
          >
            Our Work
          </m.h2>
          <m.p
            variants={fadeUp}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#94847D',
              margin: '0 auto 8px',
              maxWidth: '700px',
            }}
          >
            Every Brand Has A Story. We Build The Ones People Remember.
          </m.p>
          <m.p
            variants={fadeUp}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '16px',
              color: '#7F736E',
              maxWidth: '600px',
              margin: '0 auto 32px',
              lineHeight: 1.6,
            }}
          >
            We create branding, websites and marketing campaigns that deliver measurable business growth.
          </m.p>
          <m.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {filters.map(filter => {
              const active = activeFilter === filter

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '999px',
                    border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    background: active ? 'var(--color-accent)' : 'transparent',
                    color: active ? 'var(--color-black)' : 'var(--color-muted)',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {filter}
                </button>
              )
            })}
          </m.div>
        </m.div>

        {/* ── MOBILE: single-photo slider ── */}
        {isMobile && imageCards.length > 0 && (
          <div style={{ position: 'relative', padding: '0 16px' }}>
            {/* Prev arrow */}
            <button
              type="button"
              aria-label="Previous photo"
              onClick={mobilePrev}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              ‹
            </button>

            {/* Single image */}
            <AnimatePresence mode="wait">
              <m.div
                key={mobileIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.28 }}
                style={{
                  width: '100%',
                  aspectRatio: '3 / 4',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  const card = imageCards[mobileIndex]
                  openLightbox(card.item.images, card.imgIdx, card.item.title)
                }}
              >
                <img loading="lazy" decoding="async"
                  src={imageCards[mobileIndex].imgSrc}
                  alt={`${imageCards[mobileIndex].item.title} ${imageCards[mobileIndex].imgIdx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </m.div>
            </AnimatePresence>

            {/* Next arrow */}
            <button
              type="button"
              aria-label="Next photo"
              onClick={mobileNext}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.85)',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              ›
            </button>

            {/* Slide counter */}
            <div style={{
              textAlign: 'center',
              marginTop: '12px',
              fontSize: '13px',
              color: 'var(--color-muted)',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.05em',
            }}>
              {mobileIndex + 1} / {imageCards.length}
            </div>
          </div>
        )}

        {/* ── DESKTOP: horizontal scroll carousel ── */}
        {!isMobile && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <button type="button" aria-label="Scroll portfolio left" onClick={() => scroll(-1)} style={arrowStyle('left')}>
            {'<'}
          </button>
          {/* Track: clip to exactly 4 cards — no padding so no partial bleed */}
          <div
            ref={trackRef}
            className="portfolio-carousel-track"
            style={{
              display: 'flex',
              gap: '0px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              padding: '20px 0',
            }}
          >
            <AnimatePresence mode="popLayout">
              {imageCards.map(({ imgSrc, imgIdx, item }) => (
                <m.div
                  key={`${item.title}-${imgIdx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                  className="portfolio-card-redesign"
                  style={{
                    /* Exactly 25% of track width = 4 cards exactly fill the viewport */
                    flex: '0 0 calc(25% - 4px)',
                    margin: '0 2px',
                    scrollSnapAlign: 'start',
                    aspectRatio: '3 / 4',
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'transparent',
                    borderRadius: '16px',
                    cursor: 'pointer',
                  }}
                  onClick={() => openLightbox(item.images, imgIdx, item.title)}
                >
                  <img loading="lazy" decoding="async"
                    src={imgSrc}
                    alt={`${item.title} ${imgIdx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </m.div>
              ))}
            </AnimatePresence>
          </div>
          <button type="button" aria-label="Scroll portfolio right" onClick={() => scroll(1)} style={arrowStyle('right')}>
            {'>'}
          </button>
        </div>
        )}

        {/* Category description shown below carousel when a specific category is selected */}
        <AnimatePresence mode="wait">
          {activeItem && (
            <m.div
              key={activeItem.category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              style={{
                marginTop: '40px',
                textAlign: 'center',
                maxWidth: '640px',
                margin: '40px auto 0',
              }}
            >
              <h3 style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                fontSize: '20px',
                color: '#2D2926',
                marginBottom: '10px',
              }}>
                {activeItem.title}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                color: 'var(--color-muted)',
                lineHeight: 1.7,
              }}>
                {activeItem.desc}
              </p>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {lightbox.open && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '20px',
                right: '24px',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '32px',
                cursor: 'pointer',
                zIndex: 10001,
                lineHeight: 1,
              }}
              aria-label="Close lightbox"
            >
              ×
            </button>

            {/* Title */}
            <div style={{
              position: 'absolute',
              top: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#fff',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              zIndex: 10001,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}>
              {lightbox.title}
            </div>

            {/* Counter */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              zIndex: 10001,
            }}>
              {lightbox.index + 1} / {lightbox.images.length}
            </div>

            {/* Previous arrow */}
            {lightbox.images.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); navigateLightbox(-1) }}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none',
                  color: '#fff',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  fontSize: '22px',
                  cursor: 'pointer',
                  zIndex: 10001,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* Next arrow */}
            {lightbox.images.length > 1 && (
              <button
                onClick={e => { e.stopPropagation(); navigateLightbox(1) }}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.12)',
                  border: 'none',
                  color: '#fff',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  fontSize: '22px',
                  cursor: 'pointer',
                  zIndex: 10001,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                aria-label="Next image"
              >
                ›
              </button>
            )}

            {/* Main image */}
            <m.img loading="lazy" decoding="async"
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              src={lightbox.images[lightbox.index]}
              alt={`${lightbox.title} - ${lightbox.index + 1}`}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '85vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            />
          </m.div>
        )}
      </AnimatePresence>
    </section>
    </LazyMotion>
  )
}
