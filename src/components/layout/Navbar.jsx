import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { number: '01', label: 'About', href: '#about' },
  { number: '02', label: 'Services', href: '#services' },
  { number: '03', label: 'Work', href: '#portfolio' },
  { number: '04', label: 'Process', href: '#process' },
  { number: '05', label: 'Team', href: '#team' },
  { number: '06', label: 'Blog', href: '#blog' },
  { number: '07', label: 'Contact', href: '#contact' },
]

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
const ease = value => value * value * (3 - 2 * value)

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [morph, setMorph] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      const start = heroHeight * 0.48
      const end = heroHeight * 0.96
      setMorph(ease(clamp((window.scrollY - start) / (end - start), 0, 1)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const navReady = morph > 0.9
  const brandTop = `calc(${80 * (1 - morph)}vh + ${29 * morph}px)`
  const brandSize = `clamp(${22 + (1 - morph) * 30}px, ${2 + (1 - morph) * 7}vw, ${22 + (1 - morph) * 86}px)`
  const menuButtonOpacity = navReady ? 1 : 0

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        minHeight: '58px',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        background: navReady ? 'rgba(247,247,243,0.94)' : 'transparent',
        backdropFilter: navReady ? 'blur(18px)' : 'none',
        borderBottom: navReady ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'background 0.45s ease, border-color 0.45s ease, backdrop-filter 0.45s ease',
      }}
    >
      <a
        href="#"
        aria-label="Kalp and Co home"
        style={{
          position: 'fixed',
          top: brandTop,
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)',
          fontSize: brandSize,
          fontWeight: 800,
          letterSpacing: `${0.17 - morph * 0.07}em`,
          color: '#0A0A0A',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          pointerEvents: navReady ? 'auto' : 'none',
          transition: 'letter-spacing 0.12s linear',
          willChange: 'top, font-size, letter-spacing',
        }}
      >
        KALP&CO
      </a>

      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        style={{
          background: 'transparent',
          border: '1px solid var(--color-border)',
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
          borderRadius: '999px',
        }}
        onMouseEnter={event => {
          event.currentTarget.style.background = 'var(--color-surface)'
        }}
        onMouseLeave={event => {
          event.currentTarget.style.background = 'transparent'
        }}
      >
        <span className="menu-label">Menu</span>
        <span className="hamburger-lines" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(247,247,243,0.98)',
              zIndex: 999,
              padding: '24px',
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
                <div className="menu-brand">KALP&CO</div>
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
    </motion.header>
  )
}
