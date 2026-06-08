# Kalp & Co — Website Update Brief
**Branch:** `demo3` | **Stack:** React + Vite + Framer Motion + Tailwind

---

## UPDATE 1 — Hero Brand Text: Uppercase + Typography Transition
**File:** `src/components/layout/Navbar.jsx`

### What to change
The brand text starts as `KalpAndCo` and morphs to `Kalp&Co` on scroll. Two problems:
1. Text must be **ALL CAPS** at all times (`KALPANDCO` → `KALP&CO`)
2. The word `AND` must animate/transition into `&` — a visible, pleasing typographic morph

### How to implement
Use Framer Motion `AnimatePresence` to crossfade between two spans:
- **Before scroll** (morph < 0.85): render `KALP` + animated `AND` + `CO`
- **After scroll** (morph ≥ 0.85): render `KALP` + animated `&` + `CO`

```jsx
// In Navbar.jsx — replace brandText logic and the <a> inner content

const showAmpersand = morph > 0.82

// Replace the single brandText string render with:
<a href="#" aria-label="Kalp and Co home" style={{ ...existingStyles, fontSize: brandSize, color: brandColor }}>
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
```

Also fix in `.menu-brand` (menu overlay) and `Footer.jsx` — both should read `KALP&CO` in caps.

---

## UPDATE 2 — Section Order Restructure
**File:** `src/App.jsx`

### New section order
```
1. Hero
2. Services        ← rename to "What We Have to Offer" (was 3rd)
3. Portfolio       ← rename to "Our Work" (was 4th)
4. ClientLogos     ← "Our Trusted Brands" (was 6th)
5. About
6. Process
7. Testimonials    ← uncomment
8. Team            ← uncomment
9. Blog
10. Contact
```

```jsx
// src/App.jsx — update <main> order:
<main>
  <Hero />
  <Services />
  <Portfolio />
  <ClientLogos />
  <About />
  <Process />
  <Testimonials />
  <Team />
  <Blog />
  <Contact />
</main>
// Also uncomment: <WhatsAppButton />
```

---

## UPDATE 3 — Services Section: "What We Have to Offer"
**File:** `src/components/sections/Services.jsx`

### Design reference
Like lemonmediaco.com — clean white/light bg, centered title, **3-column card grid**, each card has: title, description paragraph, "Read More" link with underline accent. No carousel, no scroll arrows.

### Changes
1. Replace carousel layout with a **3-column CSS grid**
2. Update section heading to `"What We Have to Offer"`
3. Each card: number hidden, show `title` + `desc` + `Read More →` link
4. Background: `var(--color-black)` (which is the light cream `#F5F0EE` in this theme)
5. Text centered per card

```jsx
// src/components/sections/Services.jsx — full replacement

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { services } from '../../data/services'
import { fadeUp, staggerContainer } from '../../utils/animations'

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="services" ref={ref} className="section-padding" style={{ background: 'var(--color-black)' }}>
      <div className="container">
        <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 800, color: 'var(--color-white)', textAlign: 'center', marginBottom: '64px'
          }}>
            What We Have to Offer
          </motion.h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '48px 40px'
          }} className="grid-responsive-3">
            {services.map((service, i) => (
              <motion.div key={service.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ textAlign: 'center', padding: '0 8px' }}
              >
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontSize: '20px', fontWeight: 800,
                  color: 'var(--color-white)', marginBottom: '16px'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '14px', color: 'var(--color-muted)',
                  lineHeight: 1.75, marginBottom: '24px'
                }}>
                  {service.desc}
                </p>
                <a href="#contact" style={{
                  fontSize: '13px', fontWeight: 700, color: 'var(--color-white)',
                  textDecoration: 'none', borderBottom: '2px solid var(--color-accent)',
                  paddingBottom: '2px', letterSpacing: '0.04em'
                }}>
                  Read More
                </a>
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

## UPDATE 4 — Portfolio Section: "Our Work" with Category Filter + Horizontal Scroll Gallery
**File:** `src/components/sections/Portfolio.jsx`

### Design reference
Like lemonmediaco.com — centered title `"Our Work"`, pill-shaped category filter tabs (active = filled accent), 4-image horizontal scrollable row per category with left/right arrows.

### Changes
1. Title → `"Our Work"` (already correct)
2. Filter tabs → **pill/rounded** style matching the reference (rounded-full, filled on active)
3. Grid → **4 columns of equal-height images** in a horizontally scrollable row
4. Left/right arrow navigation on the image row
5. Update `filters` array to match real categories:

```js
// Update filters in Portfolio.jsx
const filters = ['All', 'Branding', 'Performance', 'Social', 'AI', 'Strategy', 'Web']
// → rename to match portfolio data categories, add industry labels if needed:
const filters = ['All', 'Branding', 'Performance', 'Social', 'AI', 'Strategy', 'Web']
```

```jsx
// Filter tab style update — replace button style:
style={{
  padding: '10px 22px',
  borderRadius: '999px',                          // ← pill shape
  border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
  background: active ? 'var(--color-accent)' : 'transparent',
  color: active ? 'var(--color-black)' : 'var(--color-muted)',
  fontSize: '13px', fontWeight: 600,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  cursor: 'none', transition: 'all 0.3s ease',
}}
```

```jsx
// Replace grid with horizontal scroll row + arrows:
const trackRef = useRef(null)
const scroll = dir => trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })

// Render:
<div style={{ position: 'relative' }}>
  <button onClick={() => scroll(-1)} style={arrowStyle('left')}>←</button>
  <div ref={trackRef} style={{
    display: 'flex', gap: '16px', overflowX: 'auto',
    scrollSnapType: 'x mandatory', scrollbarWidth: 'none'
  }}>
    {filteredPortfolio.map((item, i) => (
      <div key={item.title} style={{
        flex: '0 0 calc(25% - 12px)', scrollSnapAlign: 'start',
        aspectRatio: '3/4', overflow: 'hidden', position: 'relative'
      }}>
        <img src={item.img} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px',
          background:'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
          <p style={{ fontSize:'11px', color:'var(--color-accent)', letterSpacing:'0.18em',
            textTransform:'uppercase' }}>{item.tag}</p>
          <h3 style={{ fontSize:'16px', color:'#fff', fontWeight:700 }}>{item.title}</h3>
        </div>
      </div>
    ))}
  </div>
  <button onClick={() => scroll(1)} style={arrowStyle('right')}>→</button>
</div>
```

---

## UPDATE 5 — ClientLogos Section: Heading Update
**File:** `src/components/sections/ClientLogos.jsx`

### Change
Update the heading text from `"Trusted by Brands That Mean Business"` → `"Our Trusted Brands"`

```jsx
// Line ~30 in ClientLogos.jsx:
<p style={{ fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
  Our Trusted Brands   {/* ← was: "Trusted by Brands That Mean Business" */}
</p>
```

No layout changes needed — dual-row marquee animation stays as-is.

---

## UPDATE 6 — About Section: Fix Oversized / Cut-off Layout
**File:** `src/components/sections/About.jsx` + `src/index.css`

### Problem
`.about-section` uses `min-height: 100vh` on both the copy panel and image panel, causing the section to be 200vh+ tall and content to overflow/cut off on normal screens.

### Fix — `src/index.css`

```css
/* Replace existing .about-section block */
.about-section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  background: #fff;
  /* Remove min-height: 100vh */
}

.about-copy {
  padding: clamp(48px, 6vw, 80px) clamp(24px, 5vw, 72px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 2.5vw, 36px);
  text-align: center;
  color: var(--color-white);
  /* Remove: min-height: 100vh */
}

.about-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 3.2vw, 48px);   /* ← reduced from 76px max */
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0.01em;
  max-width: 680px;
}

.about-lede {
  font-family: var(--font-display);
  font-size: clamp(20px, 2.6vw, 40px);   /* ← reduced from 62px max */
  font-weight: 800;
  line-height: 1.15;
  max-width: 640px;
}

.about-body {
  font-family: var(--font-heading);
  font-size: clamp(13px, 1.1vw, 17px);   /* ← reduced */
  font-weight: 700;
  line-height: 1.45;
  max-width: 560px;
  color: var(--color-white);
}

.about-image-panel {
  overflow: hidden;
  background: var(--color-surface);
  /* Remove: min-height: 100vh */
  aspect-ratio: 4/5;                      /* ← constrains image height */
}

.about-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* Remove: min-height: 100vh */
}

/* Mobile */
@media (max-width: 860px) {
  .about-section {
    grid-template-columns: 1fr;
  }
  .about-image-panel {
    aspect-ratio: 16/9;                   /* ← wider on mobile */
  }
  .about-copy {
    padding: 48px 22px;
    gap: 20px;
  }
}
```

### Global rule — apply to ALL sections
Add this rule to `src/index.css` to prevent any section from overflowing viewport height:

```css
/* Prevent any section from being taller than needed */
main section {
  max-width: 100vw;
  overflow-x: hidden;
}
```

Also audit these sections for oversized elements and apply similar `clamp()` reductions if needed:
- `Process.jsx` — step numbers use `text-6xl` (60px), fine as-is
- `Portfolio.jsx` — grid cards, fine
- `Team.jsx` — 4-col grid, fine on desktop, verify mobile
- `Blog.jsx` — 3-col grid, fine

---

## SUMMARY TABLE

| # | File(s) | Change |
|---|---------|--------|
| 1 | `Navbar.jsx` | KALPANDCO caps + AND→& animated morph |
| 2 | `App.jsx` | Reorder sections, uncomment Team/Testimonials/WhatsApp |
| 3 | `Services.jsx` | Replace carousel → 3-col grid, new heading |
| 4 | `Portfolio.jsx` | Pill filters + horizontal scroll 4-col image row |
| 5 | `ClientLogos.jsx` | Update heading text only |
| 6 | `About.jsx` + `index.css` | Fix oversized layout, remove 100vh constraints, reduce font sizes |

---

## ASSETS STILL NEEDED
- Client logo SVGs → `public/clients/client-1.svg` … (ClientLogos section currently broken — all logos 404)
- Team member photos → replace Unsplash placeholders in `src/data/teams.js`
- Testimonial avatars → `public/src/assets/images/team/avatar-1..3.jpg` (currently 404)
- EmailJS keys → `src/components/sections/Contact.jsx` lines 10–12
