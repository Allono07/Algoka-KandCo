import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { number: '04', label: 'About Us', href: '#about' },
  { number: '02', label: 'Our Work', href: '#portfolio' },
  // { number: '03', label: 'Our Trusted Brands', href: '#trusted-brands' },

  { number: '01', label: 'What We Have to Offer', href: '#services' },
  // { number: '05', label: 'Our Process', href: '#process' },
  { number: '06', label: 'Why Choose Kalp & Co.', href: '#why-choose' },
  { number: '07', label: 'From the Studio', href: '#studio' },
  // { number: '08', label: 'What They Say', href: '#testimonials' },
  // { number: '09', label: 'Meet the People Leading the Way', href: '#team' },
  { number: '10', label: 'Contact Us', href: '#contact' },
]

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const mix = (from, to, progress) => from + (to - from) * progress

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [brandMotion, setBrandMotion] = useState({ morph: 0, heroBottom: 0, heroHeight: 0 })
  const brandMotionRef = useRef({ morph: 0, heroBottom: 0, heroHeight: 0 })

  useEffect(() => {
    let frameId = null

    const updateMorph = () => {
      const hero = document.getElementById('home')
      const heroHeight = hero?.offsetHeight || window.innerHeight
      const heroBottom = hero?.getBoundingClientRect().bottom || heroHeight - window.scrollY
      const scrollDistance = Math.max(heroHeight, 1)
      const nextMorph = clamp(window.scrollY / scrollDistance, 0, 1)
      const nextBrandMotion = { morph: nextMorph, heroBottom, heroHeight }
      const currentBrandMotion = brandMotionRef.current

      if (
        Math.abs(currentBrandMotion.morph - nextMorph) > 0.001 ||
        Math.abs(currentBrandMotion.heroBottom - heroBottom) > 0.5
      ) {
        brandMotionRef.current = nextBrandMotion
        setBrandMotion(nextBrandMotion)
      }
      frameId = window.requestAnimationFrame(updateMorph)
    }

    frameId = window.requestAnimationFrame(updateMorph)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [])

  const { morph, heroBottom, heroHeight } = brandMotion
  const shrinkProgress = morph
  const moveProgress = clamp((morph - 0.85) / 0.15, 0, 1)
  const navProgress = clamp((morph - 0.88) / 0.12, 0, 1)
  const navReady = navProgress > 0.94
  const showAmpersand = morph > 0.82
  // const heroBrandTop = heroBottom - 24
  const isDesktop = window.innerWidth >= 1024;
  const heroBrandTop = isDesktop
  ? heroBottom - 24
  : heroBottom - 45;
  const brandTop = `${mix(heroBrandTop, 29, moveProgress)}px`
  const brandTranslateY = -(100 - 50 * moveProgress)
  const brandSize = `clamp(${mix(42, 22, shrinkProgress)}px, ${mix(12.8, 3.5, shrinkProgress)}vw, ${mix(200, 34, shrinkProgress)}px)`
  const brandColorValue = Math.round(mix(255, 10, navProgress))
  const brandColor = `rgb(${brandColorValue}, ${brandColorValue}, ${brandColorValue})`
  const menuButtonOpacity = navProgress
  return (
    <motion.header
      className="site-navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        minHeight: '44px',
        padding: '8px clamp(16px, 4vw, 32px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        background: `rgba(245, 240, 238, ${0.94 * navProgress})`,
        backdropFilter: `blur(${18 * navProgress}px)`,
      }}
    >
      <a
        href="#"
        aria-label="Kalp and Co home"
        style={{
          position: 'fixed',
          top: brandTop,
          left: '50%',
          transform: `translate3d(-50%, ${brandTranslateY}%, 0)`,
          fontFamily: 'var(--font-brand)',
          fontSize: brandSize,
          fontWeight: 800,
          lineHeight: 0.82,
          letterSpacing: `${0.08 - shrinkProgress * 0.02}em`,
          color: brandColor,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          pointerEvents: navReady ? 'auto' : 'none',
          willChange: 'top, transform, font-size, letter-spacing, color',
        }}
      >
        <span>KALP</span>
        <AnimatePresence mode="wait">
          {showAmpersand ? (
            <motion.span
              key="amp"
              initial={{ opacity: 0, y: 8, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.7 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block' }}
            >
              &amp;
            </motion.span>
          ) : (
            <motion.span
              key="and"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block' }}
            >
              AND
            </motion.span>
          )}
        </AnimatePresence>
        <span>CO</span>
      </a>

      <button
        type="button"
        className="menu-toggle-btn"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        style={{
          background: 'transparent',
          border: `1px solid rgba(10, 10, 10, ${navProgress})`,
          cursor: 'none',
          color: 'var(--color-white)',
          opacity: menuButtonOpacity,
          pointerEvents: navReady ? 'auto' : 'none',
          transition: 'opacity 0.35s ease, background 0.25s ease',
          minWidth: '44px',
          minHeight: '40px',
          padding: '0 16px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          fontSize: '12px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          borderRadius: '8px',
        }}
        onMouseEnter={event => {
          event.currentTarget.style.background = 'var(--color-surface)'
        }}
        onMouseLeave={event => {
          event.currentTarget.style.background = 'transparent'
        }}
      >
        <span className="menu-label">Menu</span>
        <span className="hamburger-lines hamburger-desktop-hidden" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {createPortal((
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(245,240,238,0.98)',
              zIndex: 2000,
              padding: '28px 40px',
              backdropFilter: 'blur(18px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              className="menu-shell"
            >
              <div className="menu-top">
                <div className="menu-brand" style={{ fontFamily: 'var(--font-brand)' }}>KALP&CO</div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="menu-close"
                >
                  Close
                </button>
              </div>

              <div className="menu-content">
                <aside className="menu-aside">
                  <p className="menu-eyebrow">Creative and marketing agency</p>
                  <p className="menu-copy">
                    Strategy, brand systems, campaigns, digital products, and AI-led marketing for growth-focused teams.
                  </p>
                  <div className="menu-meta">
                    <a href="mailto:contact@kalpandco.com">contact@kalpandco.com</a>
                    <a href="tel:+919482212222">+91 94822 12222</a>
                    <a href="https://www.instagram.com/kalpandco" target="_blank" rel="noopener noreferrer">Instagram</a>
                  </div>
                </aside>

                <nav className="menu-links" aria-label="Primary menu">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 0.1 + index * 0.055 } }}
                      onClick={() => setMenuOpen(false)}
                      className="menu-link"
                    >
                      <span>{link.number}</span>
                      <strong>{link.label}</strong>
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      ), document.body)}
    </motion.header>
  )
}
