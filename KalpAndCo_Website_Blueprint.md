# Kalp & Co — Full Website Build Blueprint
> React + Framer Motion | Dark Premium Creative Agency | Inspired by togethergroup.com

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Project Structure](#3-project-structure)
4. [Design System & Theme](#4-design-system--theme)
5. [Global Setup Files](#5-global-setup-files)
6. [Section-by-Section Build Guide](#6-section-by-section-build-guide)
   - 6.1 Navbar
   - 6.2 Hero Section
   - 6.3 About Section
   - 6.4 Services Section
   - 6.5 Portfolio / Case Studies
   - 6.6 Process / Workflow
   - 6.7 Client Logos
   - 6.8 Testimonials
   - 6.9 Team Section
   - 6.10 Blog / Insights
   - 6.11 Contact Section
   - 6.12 Footer
7. [Animations & Transitions](#7-animations--transitions)
8. [WhatsApp Integration](#8-whatsapp-integration)
9. [SEO Setup](#9-seo-setup)
10. [Assets Needed (Placeholder List)](#10-assets-needed-placeholder-list)
11. [Full LLM Prompt to Generate the Entire Project](#11-full-llm-prompt-to-generate-the-entire-project)

---

## 1. PROJECT OVERVIEW

**Client:** Kalp & Co  
**Type:** Full-Service Creative & Marketing Agency  
**Style:** Modern Premium Dark, Minimal, Motion-Heavy, Bold Typography  
**Reference:** https://togethergroup.com/  
**Font for brand name:** Artegra Sans SC ExtraBold  
**Contact:**
- Phone / WhatsApp: +91 94822 12222
- Email: kalpandco9@gmail.com / contact@kalpandco.com
- Address: 4th Floor, No.33/1 PJD No.76, 22-33/1, Vittal Mallya Rd, Bengaluru, Karnataka 560001
- Instagram: https://www.instagram.com/kalpandco

---

## 2. TECH STACK & DEPENDENCIES

```bash
# Create project
npx create-react-app kalp-and-co --template cra-template
cd kalp-and-co

# OR with Vite (recommended for performance)
npm create vite@latest kalp-and-co -- --template react
cd kalp-and-co

# Core dependencies
npm install framer-motion
npm install react-router-dom
npm install react-helmet-async
npm install @emailjs/browser
npm install react-intersection-observer
npm install react-scroll
npm install react-slick slick-carousel
npm install swiper
npm install gsap
npm install lenis                        # smooth scroll
npm install react-countup
npm install react-hot-toast

# Dev dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black:   "#0A0A0A",
          charcoal:"#141414",
          surface: "#1A1A1A",
          border:  "#2A2A2A",
          white:   "#F5F5F0",
          muted:   "#888888",
          accent:  "#C9A84C",      // Gold accent — change to brand color if provided
          accentHover: "#E2BE74",
        }
      },
      fontFamily: {
        display: ['"Artegra Sans SC"', 'sans-serif'],   // For KALP & CO wordmark only
        heading: ['"Neue Haas Grotesk"', '"Helvetica Neue"', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'slide-left': 'slideLeft 0.8s ease forwards',
        'marquee':    'marquee 25s linear infinite',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: 0, transform: 'translateY(40px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideLeft: { '0%': { opacity: 0, transform: 'translateX(60px)' }, '100%': { opacity: 1, transform: 'translateX(0)' } },
        marquee:   { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      }
    }
  },
  plugins: [],
}
```

---

## 3. PROJECT STRUCTURE

```
kalp-and-co/
├── public/
│   ├── favicon.ico
│   ├── logo.svg                     ← Replace with actual logo
│   └── og-image.webp                 ← Social share preview
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero-placeholder.webp
│   │   │   ├── about-placeholder.webp
│   │   │   ├── team/
│   │   │   ├── clients/
│   │   │   └── portfolio/
│   │   ├── videos/
│   │   │   └── hero-reel.mp4        ← Replace with actual reel
│   │   └── fonts/
│   │       └── ArtegraSansSC-ExtraBold.woff2
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   ├── AnimatedText.jsx
│   │   │   ├── Cursor.jsx
│   │   │   └── Loader.jsx
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Services.jsx
│   │       ├── Portfolio.jsx
│   │       ├── Process.jsx
│   │       ├── ClientLogos.jsx
│   │       ├── Testimonials.jsx
│   │       ├── Team.jsx
│   │       ├── Blog.jsx
│   │       └── Contact.jsx
│   │
│   ├── data/
│   │   ├── services.js
│   │   ├── portfolio.js
│   │   ├── team.js
│   │   ├── testimonials.js
│   │   ├── clients.js
│   │   └── blog.js
│   │
│   ├── hooks/
│   │   ├── useScrollAnimation.js
│   │   └── useSmoothScroll.js
│   │
│   ├── utils/
│   │   └── animations.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

## 4. DESIGN SYSTEM & THEME

### Color Palette
```css
/* src/index.css */
:root {
  --color-black:      #0A0A0A;
  --color-charcoal:   #141414;
  --color-surface:    #1A1A1A;
  --color-border:     #2A2A2A;
  --color-white:      #F5F5F0;
  --color-muted:      #888888;
  --color-accent:     #C9A84C;   /* Gold — update when brand color confirmed */
  --color-accent-rgb: 201, 168, 76;

  --font-display: 'Artegra Sans SC', sans-serif;
  --font-heading: 'Neue Haas Grotesk', 'Helvetica Neue', sans-serif;
  --font-body:    'DM Sans', sans-serif;

  --transition-fast:   0.2s ease;
  --transition-medium: 0.4s ease;
  --transition-slow:   0.8s cubic-bezier(0.16, 1, 0.3, 1);

  --section-padding: 120px 0;
  --container-max:   1320px;
}
```

### Global CSS Reset & Base Styles
```css
/* src/index.css (continued) */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background-color: var(--color-black);
  color: var(--color-white);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  cursor: none;          /* We use a custom cursor */
}

::selection {
  background: var(--color-accent);
  color: var(--color-black);
}

/* Lenis smooth scroll */
html.lenis { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-black); }
::-webkit-scrollbar-thumb { background: var(--color-accent); border-radius: 2px; }

/* Section utility */
.section-padding { padding: var(--section-padding); }
.container { max-width: var(--container-max); margin: 0 auto; padding: 0 40px; }

@media (max-width: 768px) {
  .container { padding: 0 20px; }
  :root { --section-padding: 80px 0; }
}

/* Font face for Artegra */
@font-face {
  font-family: 'Artegra Sans SC';
  src: url('/src/assets/fonts/ArtegraSansSC-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
```

---

## 5. GLOBAL SETUP FILES

### src/main.jsx
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
```

### src/App.jsx
```jsx
import { useEffect } from 'react'
import Lenis from 'lenis'
import Cursor from './components/ui/Cursor'
import Loader from './components/ui/Loader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Process from './components/sections/Process'
import ClientLogos from './components/sections/ClientLogos'
import Testimonials from './components/sections/Testimonials'
import Team from './components/sections/Team'
import Blog from './components/sections/Blog'
import Contact from './components/sections/Contact'
import WhatsAppButton from './components/ui/WhatsAppButton'
import SEO from './components/ui/SEO'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <SEO />
      <Cursor />
      <Loader />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <ClientLogos />
        <Testimonials />
        <Team />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
```

### src/utils/animations.js
```js
// Reusable Framer Motion variants

export const fadeUp = {
  hidden:  { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
}

export const slideLeft = {
  hidden:  { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export const slideRight = {
  hidden:  { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
}

export const lineReveal = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
}
```

---

## 6. SECTION-BY-SECTION BUILD GUIDE

---

### 6.1 NAVBAR

**Behavior:**
- Fixed top, transparent on load → solid dark on scroll
- Logo left, nav links center/right
- "Get In Touch" CTA button (accent color)
- Mobile: hamburger → full-screen overlay menu with staggered link animation
- Active section highlight via scroll spy

```jsx
// src/components/layout/Navbar.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About',     href: '#about' },
  { label: 'Services',  href: '#services' },
  { label: 'Work',      href: '#portfolio' },
  { label: 'Process',   href: '#process' },
  { label: 'Team',      href: '#team' },
  { label: 'Blog',      href: '#blog' },
  { label: 'Contact',   href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '20px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #2A2A2A' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ fontFamily: 'var(--font-display)', fontSize: '22px',
                            fontWeight: 800, letterSpacing: '0.08em', color: 'var(--color-white)',
                            textDecoration: 'none' }}>
        KALP<span style={{ color: 'var(--color-accent)' }}>&</span>CO
      </a>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', gap: '32px' }} className="hidden-mobile">
        {navLinks.map(link => (
          <a key={link.label} href={link.href}
            style={{ fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
                     color: 'var(--color-muted)', textDecoration: 'none',
                     transition: 'color 0.2s', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => e.target.style.color = 'var(--color-white)'}
            onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <a href="#contact"
        style={{ padding: '10px 24px', border: '1px solid var(--color-accent)',
                 color: 'var(--color-accent)', fontSize: '13px', letterSpacing: '0.1em',
                 textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-body)',
                 transition: 'all 0.3s' }}
        onMouseEnter={e => { e.target.style.background = 'var(--color-accent)'; e.target.style.color = '#000' }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-accent)' }}
        className="hidden-mobile"
      >
        Get In Touch
      </a>

      {/* Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'none', border: 'none', cursor: 'none', color: 'var(--color-white)',
                 display: 'none' }} className="show-mobile">
        <span style={{ fontSize: '24px' }}>{menuOpen ? '✕' : '☰'}</span>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'fixed', inset: 0, background: 'var(--color-black)',
                     display: 'flex', flexDirection: 'column', alignItems: 'center',
                     justifyContent: 'center', gap: '40px', zIndex: 999 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label} href={link.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0, transition: { delay: i * 0.08 } }}
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 700,
                         color: 'var(--color-white)', textDecoration: 'none', letterSpacing: '0.02em' }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
```

---

### 6.2 HERO SECTION

**Design:** Full-screen dark video banner with overlay text. Large bold headline with a character-by-character reveal animation. Scroll indicator at bottom.

```jsx
// src/components/sections/Hero.jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Headline split into words for staggered animation
const headline = "We Build Brands That Move"
const words = headline.split(' ')

export default function Hero() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section id="home" style={{
      position: 'relative', height: '100vh', minHeight: '700px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Video Background */}
      <video ref={videoRef} autoPlay muted loop playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                 objectFit: 'cover', zIndex: 0 }}>
        <source src="/src/assets/videos/hero-reel.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.85) 100%)',
        zIndex: 1
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        {/* Tag line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.25em',
                   textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '24px' }}
        >
          Creative & Marketing Agency
        </motion.p>

        {/* Main Heading — word by word reveal */}
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(48px, 8vw, 120px)',
                     fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.02em',
                     color: 'var(--color-white)', marginBottom: '32px', overflow: 'hidden' }}>
          {words.map((word, i) => (
            <motion.span key={i}
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(16px, 2vw, 20px)',
                   color: 'var(--color-muted)', maxWidth: '600px', margin: '0 auto 48px',
                   lineHeight: 1.7 }}
        >
          Strategy. Branding. Digital Marketing. AI-led Solutions.
          Built for brands that want to grow with purpose.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#portfolio"
            style={{ padding: '16px 40px', background: 'var(--color-accent)',
                     color: 'var(--color-black)', fontFamily: 'var(--font-body)',
                     fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase',
                     fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s' }}
          >
            View Our Work
          </a>
          <a href="#contact"
            style={{ padding: '16px 40px', border: '1px solid rgba(255,255,255,0.3)',
                     color: 'var(--color-white)', fontFamily: 'var(--font-body)',
                     fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase',
                     textDecoration: 'none', transition: 'all 0.3s' }}
          >
            Start a Project
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
                 zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                       color: 'var(--color-muted)' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--color-accent), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
```

---

### 6.3 ABOUT SECTION

**Design:** Two-column layout — large text left, image/stats right. Bold number counters (years, clients, projects). Animated line reveal.

```jsx
// src/components/sections/About.jsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { fadeUp, slideLeft, staggerContainer } from '../../utils/animations'

const stats = [
  { number: 5,   suffix: '+', label: 'Years of Excellence' },
  { number: 80,  suffix: '+', label: 'Brands Scaled' },
  { number: 200, suffix: '+', label: 'Campaigns Delivered' },
  { number: 15,  suffix: '',  label: 'Service Verticals' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="about" ref={ref} className="section-padding"
      style={{ background: 'var(--color-charcoal)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}
          className="grid-responsive">

          {/* Left — Text */}
          <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.span variants={fadeUp}
              style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                       textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '20px' }}>
              About Us
            </motion.span>

            <motion.h2 variants={fadeUp}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)',
                       fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em',
                       color: 'var(--color-white)', marginBottom: '32px' }}>
              We Don't Just Tell Your Story. We Scale It.
            </motion.h2>

            <motion.p variants={fadeUp}
              style={{ fontSize: '17px', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
              Kalp & Co is a growth-focused creative and marketing agency helping brands build impact
              through strategy, branding, content, AI-powered solutions, and digital performance marketing.
            </motion.p>

            <motion.p variants={fadeUp}
              style={{ fontSize: '17px', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              We create campaigns and experiences designed to drive measurable business growth and
              long-term brand value — not vanity metrics.
            </motion.p>

            <motion.a variants={fadeUp} href="#services"
              style={{ display: 'inline-block', padding: '14px 36px',
                       border: '1px solid var(--color-accent)', color: 'var(--color-accent)',
                       fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase',
                       textDecoration: 'none', transition: 'all 0.3s' }}
            >
              Explore Services →
            </motion.a>
          </motion.div>

          {/* Right — Image + Stats */}
          <motion.div variants={slideLeft} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {/* Placeholder image — replace with team/office photo */}
            <div style={{ position: 'relative', aspectRatio: '4/5', marginBottom: '48px',
                          background: 'var(--color-surface)', overflow: 'hidden' }}>
              <img src="/src/assets/images/about-placeholder.webp" alt="Kalp & Co Team"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              {/* Accent border */}
              <div style={{ position: 'absolute', bottom: '-16px', right: '-16px',
                            width: '120px', height: '120px',
                            border: '2px solid var(--color-accent)' }} />
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {stats.map((stat, i) => (
                <div key={i}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 5vw, 56px)',
                                fontWeight: 800, color: 'var(--color-white)', lineHeight: 1 }}>
                    {inView ? <CountUp end={stat.number} duration={2.5} delay={i * 0.2} /> : '0'}
                    <span style={{ color: 'var(--color-accent)' }}>{stat.suffix}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-muted)',
                               letterSpacing: '0.05em', marginTop: '8px' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

### 6.4 SERVICES SECTION

**Design:** Dark section, large number-indexed service list. Hover reveals description. Reference: linear list expanding on hover (like togethergroup.com services).

```js
// src/data/services.js
export const services = [
  { number: '01', title: 'Branding',                   desc: 'Identity systems, logo design, brand guidelines, visual language, and messaging that creates lasting recognition.' },
  { number: '02', title: 'Social Media Marketing',      desc: 'Platform strategy, content calendars, community management, and growth campaigns across all major channels.' },
  { number: '03', title: 'Performance Marketing',       desc: 'ROI-driven paid campaigns across Google, Meta, and programmatic networks. Data-led, conversion-optimised.' },
  { number: '04', title: 'Website Design & Development',desc: 'High-performance, visually stunning websites built for conversion, speed, and seamless user experience.' },
  { number: '05', title: 'Content Strategy',            desc: 'Audience research, content mapping, editorial planning, and distribution strategies built for impact.' },
  { number: '06', title: 'Content Marketing',           desc: 'Long-form, short-form, video, and multimedia content that educates, entertains, and converts.' },
  { number: '07', title: 'Product Marketing',           desc: 'Go-to-market strategy, positioning, messaging hierarchy, and launch playbooks for new products.' },
  { number: '08', title: 'Strategic Planning',          desc: 'Business growth audits, competitive analysis, brand architecture, and integrated marketing strategy.' },
  { number: '09', title: 'AI-driven Marketing Solutions',desc: 'Automation, personalisation at scale, AI-generated assets, chatbot experiences, and predictive analytics.' },
  { number: '10', title: 'Product Launch Campaigns',   desc: 'End-to-end launch planning — teaser campaigns, influencer seeding, PR, paid media, and post-launch sustain.' },
  { number: '11', title: 'Talent / Brand Partnerships', desc: 'Influencer identification, negotiation, campaign management, and performance tracking for brand collaborations.' },
  { number: '12', title: 'Real Estate Marketing',       desc: 'Developer branding, project launches, digital campaigns, walkthrough videos, and sales collateral.' },
  { number: '13', title: 'Creative Design Services',    desc: 'Campaign creatives, print, OOH, packaging, presentations, motion graphics, and everything in between.' },
]
```

```jsx
// src/components/sections/Services.jsx
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '../../data/services'
import { fadeUp, staggerContainer } from '../../utils/animations'

export default function Services() {
  const [active, setActive] = useState(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" ref={ref} className="section-padding"
      style={{ background: 'var(--color-black)' }}>
      <div className="container">
        {/* Heading */}
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: '80px' }}>
          <motion.span variants={fadeUp}
            style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                     textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>
            What We Do
          </motion.span>
          <motion.h2 variants={fadeUp}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)',
                     fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em',
                     color: 'var(--color-white)', maxWidth: '700px' }}>
            Services Built for Growth
          </motion.h2>
        </motion.div>

        {/* Services List */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                borderBottom: '1px solid var(--color-border)',
                padding: active === i ? '32px 0' : '24px 0',
                cursor: 'none',
                transition: 'padding 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px',
                               color: 'var(--color-accent)', minWidth: '28px' }}>
                  {service.number}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: active === i ? 'clamp(22px, 3vw, 36px)' : 'clamp(18px, 2.5vw, 28px)',
                  fontWeight: 700, color: active === i ? 'var(--color-white)' : 'var(--color-muted)',
                  letterSpacing: '-0.01em', flex: 1,
                  transition: 'all 0.3s ease',
                }}>
                  {service.title}
                </h3>
                <span style={{ color: active === i ? 'var(--color-accent)' : 'transparent',
                               fontSize: '24px', transition: 'color 0.3s' }}>→</span>
              </div>

              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ fontSize: '16px', color: 'var(--color-muted)', lineHeight: 1.7,
                             paddingLeft: '60px', marginTop: '16px', maxWidth: '700px' }}
                  >
                    {service.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### 6.5 PORTFOLIO / CASE STUDIES

**Design:** Full-width masonry or grid of case study cards. Each card: image, client name, category, short result. Hover = image scale + overlay CTA. Filter by category.

```js
// src/data/portfolio.js
export const portfolio = [
  {
    id: 1,
    client:   'Brand X',
    category: 'Branding',
    tags:     ['Branding', 'Strategy'],
    result:   '340% brand recall increase',
    image:    '/src/assets/images/portfolio/case-1.webp',
    color:    '#1A1A2E',
  },
  {
    id: 2,
    client:   'Startup Y',
    category: 'Performance Marketing',
    tags:     ['Performance Marketing', 'Social'],
    result:   '5x ROAS in 90 days',
    image:    '/src/assets/images/portfolio/case-2.webp',
    color:    '#0D1B1E',
  },
  {
    id: 3,
    client:   'Real Estate Co',
    category: 'Real Estate Marketing',
    tags:     ['Real Estate Marketing', 'Campaigns'],
    result:   '₹50Cr inventory sold in 60 days',
    image:    '/src/assets/images/portfolio/case-3.webp',
    color:    '#1C1C0A',
  },
  // Add more cases...
]
```

```jsx
// src/components/sections/Portfolio.jsx
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { portfolio } from '../../data/portfolio'
import { fadeUp, staggerContainer } from '../../utils/animations'

const categories = ['All', 'Branding', 'Performance Marketing', 'Real Estate Marketing', 'Social']

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const filtered = active === 'All' ? portfolio : portfolio.filter(p => p.tags.includes(active))

  return (
    <section id="portfolio" ref={ref} className="section-padding"
      style={{ background: 'var(--color-charcoal)' }}>
      <div className="container">
        {/* Heading */}
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between',
                   alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <motion.span variants={fadeUp}
              style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                       textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>
              Our Work
            </motion.span>
            <motion.h2 variants={fadeUp}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)',
                       fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em',
                       color: 'var(--color-white)' }}>
              Selected Work
            </motion.h2>
          </div>

          {/* Category Filter */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  padding: '8px 20px', fontSize: '12px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', cursor: 'none', transition: 'all 0.3s',
                  background: active === cat ? 'var(--color-accent)' : 'transparent',
                  color: active === cat ? 'var(--color-black)' : 'var(--color-muted)',
                  border: `1px solid ${active === cat ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  fontFamily: 'var(--font-body)',
                }}>
                {cat}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2px' }}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id} layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.08 }}
              style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden',
                       background: item.color, cursor: 'none', group: true }}
              className="portfolio-card"
            >
              <img src={item.image} alt={item.client}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                         transition: 'transform 0.6s ease' }}
                className="portfolio-img" />
              <div style={{
                position: 'absolute', inset: 0, padding: '32px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                opacity: 1, transition: 'opacity 0.3s',
              }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                             color: 'var(--color-accent)', marginBottom: '8px' }}>
                  {item.category}
                </p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700,
                              color: 'var(--color-white)', marginBottom: '8px' }}>
                  {item.client}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)' }}>{item.result}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <a href="#contact"
            style={{ display: 'inline-block', padding: '16px 48px',
                     border: '1px solid var(--color-border)', color: 'var(--color-white)',
                     fontFamily: 'var(--font-body)', fontSize: '13px', letterSpacing: '0.1em',
                     textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}>
            Start Your Project →
          </a>
        </div>
      </div>
    </section>
  )
}
```

---

### 6.6 PROCESS / WORKFLOW

**Design:** Horizontal scroll or vertical numbered steps. Each step: number, title, short description.

```jsx
// src/components/sections/Process.jsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'

const steps = [
  { num: '01', title: 'Discover',   desc: 'Deep-dive into your brand, audience, competition, and goals through discovery workshops and audits.' },
  { num: '02', title: 'Strategise', desc: 'Build a data-backed strategy — positioning, channels, messaging, timelines, and KPIs.' },
  { num: '03', title: 'Create',     desc: 'Design and produce all creative assets — campaigns, content, collateral, and digital experiences.' },
  { num: '04', title: 'Launch',     desc: 'Execute across channels with precision — paid, organic, influencer, PR, and events.' },
  { num: '05', title: 'Optimise',   desc: 'Continuous performance monitoring, A/B testing, and iteration to maximise ROI.' },
]

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="process" ref={ref} className="section-padding"
      style={{ background: 'var(--color-black)' }}>
      <div className="container">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.span variants={fadeUp}
            style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                     textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>
            How We Work
          </motion.span>
          <motion.h2 variants={fadeUp}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)',
                     fontWeight: 800, lineHeight: 1.1, color: 'var(--color-white)',
                     marginBottom: '80px', maxWidth: '600px' }}>
            Our Process
          </motion.h2>

          {/* Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '32px' }}
            className="grid-responsive-5">
            {steps.map((step, i) => (
              <motion.div key={step.num}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Number */}
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '72px', fontWeight: 800,
                               lineHeight: 1, color: 'var(--color-border)', marginBottom: '24px',
                               transition: 'color 0.3s' }}>
                  {step.num}
                </div>
                {/* Accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
                  style={{ height: '2px', background: 'var(--color-accent)',
                            marginBottom: '20px', transformOrigin: 'left' }}
                />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 700,
                              color: 'var(--color-white)', marginBottom: '12px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### 6.7 CLIENT LOGOS

**Design:** Infinite marquee/ticker of client logos on dark background. Two rows scrolling in opposite directions.

```jsx
// src/components/sections/ClientLogos.jsx
import { motion } from 'framer-motion'

// Replace src values with actual client logo files
const clients = [
  { name: 'Client 1', logo: '/src/assets/images/clients/client-1.svg' },
  { name: 'Client 2', logo: '/src/assets/images/clients/client-2.svg' },
  { name: 'Client 3', logo: '/src/assets/images/clients/client-3.svg' },
  { name: 'Client 4', logo: '/src/assets/images/clients/client-4.svg' },
  { name: 'Client 5', logo: '/src/assets/images/clients/client-5.svg' },
  { name: 'Client 6', logo: '/src/assets/images/clients/client-6.svg' },
  { name: 'Client 7', logo: '/src/assets/images/clients/client-7.svg' },
  { name: 'Client 8', logo: '/src/assets/images/clients/client-8.svg' },
]

function LogoRow({ direction = 1, items }) {
  return (
    <div style={{ overflow: 'hidden', width: '100%', padding: '20px 0' }}>
      <motion.div
        animate={{ x: direction > 0 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        style={{ display: 'flex', gap: '64px', width: 'max-content' }}
      >
        {[...items, ...items].map((client, i) => (
          <div key={i}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                     minWidth: '140px', opacity: 0.4, transition: 'opacity 0.3s', cursor: 'none' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0.4'}
          >
            <img src={client.logo} alt={client.name}
              style={{ maxWidth: '120px', maxHeight: '40px', filter: 'brightness(0) invert(1)' }} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function ClientLogos() {
  return (
    <section style={{ background: 'var(--color-charcoal)', padding: '80px 0',
                      borderTop: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: 'var(--color-muted)' }}>
          Trusted by Brands That Mean Business
        </p>
      </div>
      <LogoRow direction={1}  items={clients} />
      <LogoRow direction={-1} items={clients.slice().reverse()} />
    </section>
  )
}
```

---

### 6.8 TESTIMONIALS

**Design:** Large quote with client photo, name, role. Swiper carousel with autoplay.

```jsx
// src/components/sections/Testimonials.jsx
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    quote:  "Kalp & Co didn't just rebrand us — they repositioned our entire business. The results were visible within the first quarter.",
    name:   'Rahul Sharma',
    role:   'Founder, Brand X',
    avatar: '/src/assets/images/team/avatar-1.webp',
  },
  {
    quote:  "The performance marketing team at Kalp & Co delivered 5x ROAS in just 90 days. We've never seen results like this.",
    name:   'Priya Nair',
    role:   'Marketing Head, Startup Y',
    avatar: '/src/assets/images/team/avatar-2.webp',
  },
  {
    quote:  "They understood real estate marketing inside out. Our project sold ₹50Cr of inventory in 60 days flat.",
    name:   'Anil Menon',
    role:   'Director, Real Estate Co',
    avatar: '/src/assets/images/team/avatar-3.webp',
  },
]

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
```

---

### 6.9 TEAM SECTION

**Design:** Cards with image, name, role. Hover reveals social link.

```jsx
// src/components/sections/Team.jsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { staggerContainer, scaleIn, fadeUp } from '../../utils/animations'

const team = [
  { name: 'Team Member 1', role: 'Founder & Creative Director', img: '/src/assets/images/team/member-1.webp', instagram: '#' },
  { name: 'Team Member 2', role: 'Strategy Lead',               img: '/src/assets/images/team/member-2.webp', instagram: '#' },
  { name: 'Team Member 3', role: 'Head of Performance',         img: '/src/assets/images/team/member-3.webp', instagram: '#' },
  { name: 'Team Member 4', role: 'Creative Lead',               img: '/src/assets/images/team/member-4.webp', instagram: '#' },
]

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
```

---

### 6.10 BLOG / INSIGHTS

**Design:** Three-column card grid. Each card: category tag, title, date, read more CTA.

```jsx
// src/components/sections/Blog.jsx
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/animations'

const posts = [
  {
    category: 'Strategy',
    title:    'Why Most Brand Launches Fail in the First 90 Days',
    date:     'June 2025',
    excerpt:  'The uncomfortable truth about why brands spend big and still miss — and how to avoid it.',
    img:      '/src/assets/images/blog/post-1.webp',
  },
  {
    category: 'AI Marketing',
    title:    'How AI is Reshaping Performance Marketing in 2025',
    date:     'May 2025',
    excerpt:  'From automated bidding to AI-generated creatives — what actually works and what\'s hype.',
    img:      '/src/assets/images/blog/post-2.webp',
  },
  {
    category: 'Branding',
    title:    'The 5 Brand Elements Most Startups Get Wrong',
    date:     'April 2025',
    excerpt:  'It\'s not just the logo. Here\'s what truly makes a brand stick in a competitive market.',
    img:      '/src/assets/images/blog/post-3.webp',
  },
]

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
            {posts.map((post, i) => (
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
```

---

### 6.11 CONTACT SECTION

**Design:** Split layout — left large text + contact details, right form. EmailJS for form submission. Map embed optional.

```jsx
// src/components/sections/Contact.jsx
import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import { fadeUp, staggerContainer } from '../../utils/animations'

// Setup: https://www.emailjs.com/
// Replace these with your EmailJS credentials
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form, EMAILJS_PUBLIC_KEY)
      toast.success('Message sent! We\'ll be in touch shortly.')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '16px 0',
    background: 'transparent', border: 'none',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-white)', fontSize: '16px',
    fontFamily: 'var(--font-body)', outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <section id="contact" ref={ref} className="section-padding"
      style={{ background: 'var(--color-black)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}
          className="grid-responsive">

          {/* Left */}
          <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <motion.span variants={fadeUp}
              style={{ display: 'block', fontSize: '12px', letterSpacing: '0.3em',
                       textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: '16px' }}>
              Let's Talk
            </motion.span>
            <motion.h2 variants={fadeUp}
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(40px, 5vw, 72px)',
                       fontWeight: 800, lineHeight: 1.0, color: 'var(--color-white)',
                       marginBottom: '40px', letterSpacing: '-0.02em' }}>
              Start Something Great
            </motion.h2>
            <motion.p variants={fadeUp}
              style={{ fontSize: '17px', color: 'var(--color-muted)', lineHeight: 1.7,
                       marginBottom: '60px' }}>
              Whether you're launching a brand, scaling a product, or rethinking your marketing —
              we'd love to hear from you.
            </motion.p>

            {/* Contact Details */}
            {[
              { label: 'Email',   value: 'contact@kalpandco.com',   href: 'mailto:contact@kalpandco.com' },
              { label: 'Phone',   value: '+91 94822 12222',          href: 'tel:+919482212222' },
              { label: 'WhatsApp',value: '+91 94822 12222',          href: 'https://wa.me/919482212222' },
              { label: 'Address', value: '4th Floor, 33/1 Vittal Mallya Rd, Bengaluru 560001', href: '#' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ marginBottom: '24px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                                color: 'var(--color-accent)', minWidth: '80px', paddingTop: '2px' }}>
                  {item.label}
                </span>
                <a href={item.href}
                  style={{ fontSize: '16px', color: 'var(--color-muted)', textDecoration: 'none',
                            transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--color-white)'}
                  onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}>
                  {item.value}
                </a>
              </motion.div>
            ))}

            {/* Instagram */}
            <motion.div variants={fadeUp} style={{ marginTop: '40px' }}>
              <a href="https://www.instagram.com/kalpandco" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '12px',
                         color: 'var(--color-muted)', textDecoration: 'none',
                         fontSize: '14px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}>
                <span>Instagram</span>
                <span>→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'name',    placeholder: 'Your Name',         type: 'text' },
                { name: 'email',   placeholder: 'Email Address',     type: 'email' },
                { name: 'phone',   placeholder: 'Phone Number',      type: 'tel' },
              ].map(field => (
                <input key={field.name} {...field}
                  value={form[field.name]} onChange={handleChange} required
                  style={inputStyle}
                  onFocus={e => e.target.style.borderBottomColor = 'var(--color-accent)'}
                  onBlur={e => e.target.style.borderBottomColor = 'var(--color-border)'}
                />
              ))}

              <select name="service" value={form.service} onChange={handleChange}
                style={{ ...inputStyle, cursor: 'none' }}
                onFocus={e => e.target.style.borderBottomColor = 'var(--color-accent)'}
                onBlur={e => e.target.style.borderBottomColor = 'var(--color-border)'}>
                <option value="" style={{ background: '#141414' }}>Select a Service</option>
                {['Branding','Social Media Marketing','Performance Marketing',
                  'Website Design & Development','Content Strategy','AI-driven Marketing Solutions',
                  'Product Launch Campaigns','Real Estate Marketing','Other'].map(s => (
                  <option key={s} value={s} style={{ background: '#141414' }}>{s}</option>
                ))}
              </select>

              <textarea name="message" placeholder="Tell us about your project"
                value={form.message} onChange={handleChange} rows={5} required
                style={{ ...inputStyle, resize: 'none', paddingTop: '20px' }}
                onFocus={e => e.target.style.borderBottomColor = 'var(--color-accent)'}
                onBlur={e => e.target.style.borderBottomColor = 'var(--color-border)'}
              />

              <motion.button type="submit"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                disabled={loading}
                style={{ marginTop: '32px', padding: '18px 48px',
                          background: loading ? 'var(--color-border)' : 'var(--color-accent)',
                          color: 'var(--color-black)', border: 'none', cursor: 'none',
                          fontFamily: 'var(--font-body)', fontSize: '14px',
                          letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700,
                          alignSelf: 'flex-start', transition: 'all 0.3s' }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

### 6.12 FOOTER

```jsx
// src/components/layout/Footer.jsx
import { motion } from 'framer-motion'

const footerLinks = {
  Services: ['Branding','Social Media Marketing','Performance Marketing',
             'Website Design & Development','AI-driven Solutions','Real Estate Marketing'],
  Company:  ['About Us','Our Work','Blog','Team','Contact'],
  Connect:  ['Instagram','LinkedIn','WhatsApp','Email'],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-charcoal)', borderTop: '1px solid var(--color-border)',
                     padding: '80px 0 40px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '80px' }}
          className="grid-responsive-footer">

          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800,
                           letterSpacing: '0.08em', color: 'var(--color-white)', marginBottom: '20px' }}>
              KALP<span style={{ color: 'var(--color-accent)' }}>&</span>CO
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.8,
                         maxWidth: '280px', marginBottom: '32px' }}>
              A growth-focused creative and marketing agency. Strategy. Branding. Digital. AI.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-border)' }}>
              4th Floor, 33/1 Vittal Mallya Rd,<br />Bengaluru, Karnataka 560001
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
                            color: 'var(--color-accent)', marginBottom: '24px' }}>
                {heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#"
                      style={{ fontSize: '14px', color: 'var(--color-muted)', textDecoration: 'none',
                                transition: 'color 0.2s' }}
                      onMouseEnter={e => e.target.style.color = 'var(--color-white)'}
                      onMouseLeave={e => e.target.style.color = 'var(--color-muted)'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '32px',
                       display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                       flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '12px', color: 'var(--color-border)' }}>
            © {new Date().getFullYear()} Kalp & Co. All rights reserved.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--color-border)' }}>
            Bengaluru · India
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## 7. ANIMATIONS & TRANSITIONS

### Custom Cursor Component
```jsx
// src/components/ui/Cursor.jsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos]     = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = e => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', move)

    const addHover = () => {
      document.querySelectorAll('a, button, [cursor-pointer]').forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }
    addHover()

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovered ? 0 : 1 }}
        transition={{ type: 'spring', mass: 0.1, stiffness: 800, damping: 20 }}
        style={{ position: 'fixed', top: 0, left: 0, width: 12, height: 12,
                 borderRadius: '50%', background: 'var(--color-accent)',
                 pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference' }}
      />
      {/* Outer ring */}
      <motion.div
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hovered ? 2 : 1,
                   opacity: hovered ? 0.4 : 0.6 }}
        transition={{ type: 'spring', mass: 0.4, stiffness: 150, damping: 20 }}
        style={{ position: 'fixed', top: 0, left: 0, width: 40, height: 40,
                 borderRadius: '50%', border: '1px solid var(--color-accent)',
                 pointerEvents: 'none', zIndex: 9998 }}
      />
    </>
  )
}
```

### Page Loader Component
```jsx
// src/components/ui/Loader.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          style={{ position: 'fixed', inset: 0, background: 'var(--color-black)',
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   zIndex: 10000, flexDirection: 'column', gap: '24px' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800,
                     letterSpacing: '0.1em', color: 'var(--color-white)' }}
          >
            KALP<span style={{ color: 'var(--color-accent)' }}>&</span>CO
          </motion.div>
          {/* Loading bar */}
          <div style={{ width: '200px', height: '1px', background: 'var(--color-border)' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{ height: '100%', background: 'var(--color-accent)', transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

### Responsive Grid CSS (add to index.css)
```css
/* Responsive grid helpers */
@media (max-width: 1024px) {
  .grid-responsive   { grid-template-columns: 1fr !important; }
  .grid-responsive-3 { grid-template-columns: 1fr 1fr !important; }
  .grid-responsive-4 { grid-template-columns: 1fr 1fr !important; }
  .grid-responsive-5 { grid-template-columns: 1fr 1fr !important; }
  .grid-responsive-footer { grid-template-columns: 1fr 1fr !important; }
  .hidden-mobile  { display: none !important; }
  .show-mobile    { display: flex !important; }
}
@media (max-width: 640px) {
  .grid-responsive-3 { grid-template-columns: 1fr !important; }
  .grid-responsive-4 { grid-template-columns: 1fr !important; }
  .grid-responsive-5 { grid-template-columns: 1fr !important; }
  .grid-responsive-footer { grid-template-columns: 1fr !important; }
}
/* Show/hide mobile helpers */
.hidden-mobile { display: flex; }
.show-mobile   { display: none; }

/* Image hover effects */
.portfolio-card:hover .portfolio-img,
.team-card:hover .team-img,
.blog-article:hover .blog-img {
  transform: scale(1.06);
}
```

---

## 8. WHATSAPP INTEGRATION

```jsx
// src/components/ui/WhatsAppButton.jsx
import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919482212222?text=Hi%20Kalp%20%26%20Co%2C%20I%27d%20like%20to%20discuss%20a%20project."
      target="_blank" rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'fixed', bottom: '32px', right: '32px', zIndex: 999,
        width: '56px', height: '56px', borderRadius: '50%',
        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(37, 211, 102, 0.4)', cursor: 'none',
      }}
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </motion.a>
  )
}
```

---

## 9. SEO SETUP

```jsx
// src/components/ui/SEO.jsx
import { Helmet } from 'react-helmet-async'

export default function SEO({
  title       = 'Kalp & Co — Creative & Marketing Agency | Bengaluru',
  description = 'Kalp & Co is a growth-focused creative and marketing agency in Bengaluru helping brands scale through strategy, branding, digital marketing, AI-led solutions, and performance campaigns.',
  url         = 'https://www.kalpandco.com',
  image       = '/og-image.webp',
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description"             content={description} />
      <meta name="keywords"                content="creative agency bengaluru, branding agency bangalore, digital marketing agency india, performance marketing, social media marketing, AI marketing, brand strategy" />
      <meta name="robots"                  content="index, follow" />
      <link rel="canonical"                href={url} />

      {/* Open Graph */}
      <meta property="og:type"             content="website" />
      <meta property="og:title"            content={title} />
      <meta property="og:description"      content={description} />
      <meta property="og:url"              content={url} />
      <meta property="og:image"            content={image} />
      <meta property="og:site_name"        content="Kalp & Co" />

      {/* Twitter */}
      <meta name="twitter:card"            content="summary_large_image" />
      <meta name="twitter:title"           content={title} />
      <meta name="twitter:description"     content={description} />
      <meta name="twitter:image"           content={image} />

      {/* Local Business Schema */}
      <script type="application/ld+json">{JSON.stringify({
        "@context":    "https://schema.org",
        "@type":       "MarketingAgency",
        "name":        "Kalp & Co",
        "url":         url,
        "logo":        `${url}/logo.svg`,
        "description": description,
        "telephone":   "+91 94822 12222",
        "email":       "contact@kalpandco.com",
        "address": {
          "@type":           "PostalAddress",
          "streetAddress":   "4th Floor, No.33/1, Vittal Mallya Rd",
          "addressLocality": "Bengaluru",
          "addressRegion":   "Karnataka",
          "postalCode":      "560001",
          "addressCountry":  "IN"
        },
        "sameAs": ["https://www.instagram.com/kalpandco"]
      })}</script>
    </Helmet>
  )
}
```

---

## 10. ASSETS NEEDED (PLACEHOLDER LIST)

The following assets need to be provided or sourced. Until then, use placeholder images from `https://images.unsplash.com` or a solid color div.

| Asset | Usage | Placeholder |
|-------|-------|-------------|
| `hero-reel.mp4` | Hero background video | Remove `<video>` tag and use a full-height dark gradient |
| `about-placeholder.webp` | About section image | Office / team candid |
| `portfolio/case-1.webp` through `case-N.webp` | Portfolio cards | Campaign mockups / brand renders |
| `team/member-1.webp` through `member-N.webp` | Team section | Headshots (square or 3:4 format) |
| `clients/client-1.svg` through `client-N.svg` | Client logo marquee | White SVG logos |
| `blog/post-1.webp` through `post-3.webp` | Blog cards | Editorial / flat-lay images |
| `team/avatar-1..3.webp` | Testimonial avatars | Client headshots |
| `logo.svg` | Navbar + Footer logo | Artegra Sans SC ExtraBold wordmark |
| `favicon.ico` | Browser tab | Square version of logo |
| `og-image.webp` | Social share preview | 1200×630px brand card |

> **Font note:** Download or host `ArtegraSansSC-ExtraBold.woff2` and place in `src/assets/fonts/`. This font is used **only** for the wordmark "KALP&CO". All other typography uses system/Google fonts.

---

## 11. FULL LLM PROMPT TO GENERATE THE ENTIRE PROJECT

Copy and paste the following prompt directly into GitHub Copilot, Cursor, or any LLM:

---

```
You are a senior frontend engineer and creative director. Build a complete React + Vite + TailwindCSS website for "Kalp & Co", a premium creative and marketing agency based in Bengaluru, India.

## Design Direction
- Aesthetic: Dark premium, minimal, bold. Reference: togethergroup.com
- Colors: Black (#0A0A0A), Charcoal (#141414), White (#F5F5F0), Muted (#888888), Accent Gold (#C9A84C)
- Typography: "Artegra Sans SC ExtraBold" for the brand wordmark only; "Neue Haas Grotesk" or "Helvetica Neue" for headings; "DM Sans" for body
- Animations: Framer Motion throughout — word-by-word headline reveal, staggered cards, scroll-triggered fade-ups, parallax layers
- Smooth scroll via Lenis
- Custom cursor (accent dot + outer ring)
- Page load animation (dark overlay with wordmark, slides up to reveal)

## Tech Stack
- Vite + React 18
- TailwindCSS (utility + custom tokens)
- Framer Motion (all animations)
- Lenis (smooth scroll)
- Swiper (testimonials carousel)
- react-countup (animated stats)
- react-intersection-observer (scroll triggers)
- @emailjs/browser (contact form)
- react-hot-toast (form feedback)
- react-helmet-async (SEO)

## Sections to Build (in order)
1. **Navbar** — Fixed, transparent→dark on scroll, logo left, links center, CTA right, full-screen mobile menu with staggered animation
2. **Hero** — Full-screen video banner, word-by-word heading reveal, subtext, two CTAs, animated scroll indicator
3. **About** — Two-column: text+CTA left, image+stats grid right. Animated counters: 5+ years, 80+ brands, 200+ campaigns
4. **Services** — Numbered accordion list (01–13), hover expands description, inspired by togethergroup.com services list
5. **Portfolio** — Filter-by-category grid of case study cards, hover image scale + overlay
6. **Process** — 5-step horizontal grid: Discover, Strategise, Create, Launch, Optimise
7. **Client Logos** — Dual-row infinite marquee, logos desaturated + fade to full on hover
8. **Testimonials** — Swiper carousel, large italic quote, avatar + name
9. **Team** — 4-column grid, 3:4 image cards, name + role below
10. **Blog** — 3-column card grid, category tag, title, excerpt, date
11. **Contact** — Split: details left (email, phone, address, WhatsApp, Instagram), form right (EmailJS). No <form> tags — use onSubmit on a <div> or controlled submit
12. **Footer** — Brand left, 3 link columns, bottom copyright bar

## Key Features
- Mobile responsive (breakpoints: 1024px, 768px, 640px)
- WhatsApp floating button bottom-right (wa.me/919482212222)
- SEO: react-helmet-async, JSON-LD LocalBusiness schema
- Custom scrollbar (4px accent color)
- ::selection accent color

## Contact Details (hardcode these)
- Phone/WhatsApp: +91 94822 12222
- Email: contact@kalpandco.com
- Address: 4th Floor, No.33/1 PJD No.76, Vittal Mallya Rd, Bengaluru, Karnataka 560001
- Instagram: https://www.instagram.com/kalpandco

## Services List (13 total)
Branding, Social Media Marketing, Performance Marketing, Website Design & Development, Content Strategy, Content Marketing, Product Marketing, Strategic Planning, AI-driven Marketing Solutions, Product Launch Campaigns, Talent / Brand Partnerships, Real Estate Marketing, Creative Design Services

## File Structure
Organize into: src/components/sections/, src/components/layout/, src/components/ui/, src/data/, src/utils/animations.js, src/hooks/

## Placeholder Images
Use https://images.unsplash.com/photo-<id>?w=800&q=80 for all images. Choose dark, moody, professional editorial-style photos relevant to each section (team, campaigns, office, abstract textures for blog).

## Animations Detail
- All section headings: word-by-word or character reveal using Framer Motion
- Cards: staggered fadeUp with react-intersection-observer triggerOnce
- Services list: height animation on hover
- Hero heading: each word slides up from overflow:hidden container
- Loader: brand wordmark fades in, progress bar fills, entire overlay slides up
- Cursor: spring-animated accent dot + lagging ring
- Numbers in About: react-countup triggered by inView

## Notes
- Use `cursor: none` on the body; the custom cursor component handles all cursor rendering
- All hover states should transition smoothly (0.3s ease)
- Ensure Artegra Sans SC ExtraBold is used ONLY for the brand name "KALP&CO" (with & in accent color)
- The "&" in KALP&CO should always render in the accent gold color
- All section padding: 120px top/bottom desktop, 80px mobile
- Max container width: 1320px, centered, 40px horizontal padding

Generate all files. Start with main.jsx, App.jsx, index.css, then each section component, data files, and utility files.
```

---

> **What you'll still need to add after code generation:**
> - Upload actual logo file and replace `KALP&CO` text wordmark
> - Replace placeholder Unsplash images with real brand photography
> - Upload `hero-reel.mp4` (brand showreel / campaign video)
> - Add client SVG logo files
> - Register on [EmailJS](https://www.emailjs.com/) and replace service/template/public key
> - Configure DNS and deploy to Vercel/Netlify
> - Upload `ArtegraSansSC-ExtraBold.woff2` font file
> - Add real team names, photos, and bios
> - Add real case studies with results
> - Add real blog content or connect to a headless CMS (Contentful / Sanity)

---

*Blueprint by Claude for Kalp & Co — Ready to hand off to any LLM or developer.*
