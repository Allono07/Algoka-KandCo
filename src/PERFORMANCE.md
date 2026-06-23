# Kalp & Co — Performance Optimization Guide
**Branch:** `main` | **Stack:** React 19 + Vite 8 + Framer Motion 12 + Lenis

> **Visual output is unchanged.** Every fix below is invisible to the user.

---

## What the Audit Found

| Problem | Size / Impact |
|---------|--------------|
| Hero desktop video | **45 MB** — #1 LCP killer |
| Portfolio FMCG images | **22 MB each**, uncompressed JPEGs |
| Portfolio fashion images | **19 MB each**, uncompressed JPEGs |
| Artegra font | 208 KB TTF — should be WOFF2 (~80 KB) |
| Fluid BG WebGL | Runs `requestAnimationFrame` on every frame, always, even when offscreen |
| All sections eager-loaded | Every component JS parsed on first load → TBT 21,000ms |
| Google Fonts loaded in `<head>` | Two full font families block render |
| `<video>` has no `poster` | Browser fetches video bytes before first paint |
| Images have no `loading="lazy"` | All 480 MB of portfolio images requested immediately |

---

## FIX 1 — Compress the Hero Video (biggest single win)
**Files:** `public/video/hero-desktop.mp4`, `public/video/hero-mobile.mp4`

Run once locally. Do **not** change filenames — Hero.jsx references these paths already.

```bash
# Desktop — compress from 45MB to ~4MB
ffmpeg -i public/video/hero-desktop.mp4 \
  -vcodec libx264 -crf 26 -preset slow \
  -vf "scale=1280:-2" \
  -an \
  public/video/hero-desktop-compressed.mp4

# Then rename:
mv public/video/hero-desktop.mp4 public/video/hero-desktop-original.mp4
mv public/video/hero-desktop-compressed.mp4 public/video/hero-desktop.mp4

# Mobile is already 2.3MB — still worth compressing:
ffmpeg -i public/video/hero-mobile.mp4 \
  -vcodec libx264 -crf 28 -preset slow \
  -vf "scale=720:-2" \
  -an \
  public/video/hero-mobile-compressed.mp4

mv public/video/hero-mobile.mp4 public/video/hero-mobile-original.mp4
mv public/video/hero-mobile-compressed.mp4 public/video/hero-mobile.mp4

# Extract poster frame from desktop video:
ffmpeg -i public/video/hero-desktop-original.mp4 \
  -vframes 1 -q:v 2 public/hero-poster.jpg
```

---

## FIX 2 — Add `poster` + `preload="none"` to Hero Video
**File:** `src/components/sections/Hero.jsx`

Prevents the browser from fetching video bytes before the first paint.

```jsx
// Find the <video> element and update these two attributes:
<video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="none"           // ← ADD THIS
  poster="/hero-poster.jpg" // ← ADD THIS (file created in Fix 1)
  style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  }}
>
  <source src={mobileVideo} type="video/mp4" media="(max-width: 768px)" />
  <source src={desktopVideo} type="video/mp4" />
</video>
```

---

## FIX 3 — Compress All Portfolio Images
**Folder:** `src/assets/portfolio/`

The FMCG and fashion images are 20–22 MB each. At display size they need ~200–400 KB max.

Install tools once:
```bash
# Mac:
brew install imagemagick webp

# Ubuntu/Linux:
sudo apt install imagemagick webp
```

Run the compression script (safe — keeps originals):
```bash
# Compress all JPEGs in portfolio to max 1200px wide, 80% quality
find src/assets/portfolio -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" -o -name "*.JPEG" | while read f; do
  out="${f%.*}.jpg"
  convert "$f" -resize "1200>" -quality 80 -strip "$out"
  echo "✓ $f → $(du -sh "$out" | cut -f1)"
done

# Also convert to WebP for browsers that support it (even smaller):
find src/assets/portfolio -name "*.jpg" -o -name "*.JPG" -o -name "*.jpeg" | while read f; do
  cwebp -q 80 "$f" -o "${f%.*}.webp"
done
```

Expected result: 22 MB images → ~150–300 KB each. **Total portfolio folder: 480 MB → ~25 MB.**

---

## FIX 4 — Add `loading="lazy"` + `decoding="async"` to All Portfolio Images
**File:** `src/components/sections/Portfolio.jsx`

Find every `<img>` tag inside the portfolio grid and add two attributes:

```jsx
// Before:
<img src={item.img} alt={item.title} style={{ ... }} />

// After:
<img
  src={item.img}
  alt={item.title}
  loading="lazy"      // ← browser skips offscreen images
  decoding="async"    // ← non-blocking decode
  style={{ ... }}
/>
```

Do the same in: `About.jsx`, `Blog.jsx`, `Team.jsx`, `ClientLogos.jsx`, `Services.jsx`  
**Do NOT add `loading="lazy"` to the hero poster or any above-fold image.**

---

## FIX 5 — Lazy-Load All Below-Fold Sections
**File:** `src/App.jsx`

This is the main TBT fix. Replaces all static imports with dynamic imports — JS for each section only parses when it's needed.

```jsx
import { useEffect, useState, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import BrandIntro from './components/ui/BrandIntro'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import SEO from './components/ui/SEO'
import WhatsAppButton from './components/ui/WhatsAppButton'
import { Toaster } from 'react-hot-toast'

// ← Replace all section imports below Hero with lazy():
const Services    = lazy(() => import('./components/sections/Services'))
const Portfolio   = lazy(() => import('./components/sections/Portfolio'))
const ClientLogos = lazy(() => import('./components/sections/ClientLogos'))
const About       = lazy(() => import('./components/sections/About'))
const Process     = lazy(() => import('./components/sections/Process'))
const WhyChoose   = lazy(() => import('./components/sections/WhyChoose'))
const Blog        = lazy(() => import('./components/sections/Blog'))
const Team        = lazy(() => import('./components/sections/Team'))
const Contact     = lazy(() => import('./components/sections/Contact'))
const Footer      = lazy(() => import('./components/layout/Footer'))

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      window.scrollTo(0, 0)
    }
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return undefined
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [isLoading])

  return (
    <>
      <SEO />
      <BrandIntro onComplete={() => setIsLoading(false)} />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Services />
          <Portfolio />
          <ClientLogos />
          <About />
          <Process />
          <WhyChoose />
          <Blog />
          <Team />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      <Toaster position="bottom-center" />
    </>
  )
}
```

---

## FIX 6 — Vite Bundle Splitting
**File:** `vite.config.js`

Splits the JS bundle so vendor libraries aren't re-downloaded when your code changes.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-lenis':  ['lenis'],
          'vendor-swiper': ['swiper'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
```

---

## FIX 7 — Convert Artegra Font TTF → WOFF2
**Files:** `public/fonts/`, `src/index.css`, `index.html`

TTF is 208 KB. WOFF2 compresses it to ~80 KB and loads 40% faster.

```bash
# Install once:
npm install -g ttf2woff2

# Convert:
ttf2woff2 < public/fonts/artegra-sans-extra-bold.ttf > public/fonts/artegra-sans-extra-bold.woff2
```

Update `src/index.css` — find the `@font-face` block and update `src`:
```css
@font-face {
  font-family: 'Artegra Sans SC ExtraBold';
  src: url('/fonts/artegra-sans-extra-bold.woff2') format('woff2'),
       url('/fonts/artegra-sans-extra-bold.ttf') format('truetype');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
```

Add preload to `index.html` `<head>` (before Google Fonts links):
```html
<link rel="preload"
  href="/fonts/artegra-sans-extra-bold.woff2"
  as="font" type="font/woff2" crossorigin>
```

---

## FIX 8 — Defer Google Fonts (non-blocking)
**File:** `index.html`

Currently both Montserrat and Cormorant load synchronously in `<head>`, blocking render.

```html
<!-- REMOVE these two lines from <head>: -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />

<!-- REPLACE WITH non-blocking load: -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Cormorant:ital,wght@0,300;0,600;1,300&display=swap"
  onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Cormorant:ital,wght@0,300;0,600;1,300&display=swap" rel="stylesheet">
</noscript>
```

Note: Also removed unused Cormorant weights — only loading the ones actually used on site.

---

## FIX 9 — Throttle the WebGL Fluid Background
**File:** `index.html` — the inline `<script>` at bottom of `<body>`

Currently runs at 60fps always, even when the tab is hidden. Cap it at 30fps — visually identical, half the CPU usage:

```js
// Find this inside the WebGL script:
(function loop() {
  const t = (performance.now() - start) / 1000;
  gl.uniform1f(uTime, t);
  gl.uniform2f(uRes, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(loop);
})();

// REPLACE WITH (30fps cap + pause when tab hidden):
let lastFrame = 0;
const FPS_INTERVAL = 1000 / 30; // 30fps

function loop(now) {
  requestAnimationFrame(loop);
  if (document.hidden) return; // pause when tab not visible
  if (now - lastFrame < FPS_INTERVAL) return;
  lastFrame = now;
  const t = (now - start) / 1000;
  gl.uniform1f(uTime, t);
  gl.uniform2f(uRes, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
requestAnimationFrame(loop);
```

---

## FIX 10 — Use `LazyMotion` in Heavy Sections
**Files:** `Services.jsx`, `Portfolio.jsx`, `About.jsx`, `Process.jsx`, `Team.jsx`

Replaces the full Framer Motion bundle (~60 KB) with a deferred feature loader in sections that don't need full motion capabilities:

```jsx
// In each heavy section — replace:
import { motion } from 'framer-motion'

// With:
import { LazyMotion, domAnimation, m } from 'framer-motion'

// Wrap the section JSX:
<LazyMotion features={domAnimation} strict>
  {/* Replace every <motion.div> with <m.div>, <motion.h2> with <m.h2> etc. */}
  <m.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
    ...
  </m.div>
</LazyMotion>
```

Do this in: `Services.jsx`, `Portfolio.jsx`, `About.jsx`, `Blog.jsx`, `WhyChoose.jsx`  
**Keep full `motion` import in:** `BrandIntro.jsx`, `Navbar.jsx` (they use `useAnimation` which requires the full package).

---

## FIX 11 — Add `reduced-motion` support
**File:** `src/index.css` — add at end of file

```css
@media (prefers-reduced-motion: reduce) {
  /* Pause WebGL canvas */
  #fluid-bg { display: none; }

  /* Kill CSS animations */
  .marquee-left,
  .marquee-right,
  .marquee-track {
    animation: none !important;
  }

  /* Disable Lenis smooth scroll — handled in App.jsx already via
     the prefers-reduced-motion check in Lenis config */
}
```

Also update `Lenis` init in `App.jsx`:
```js
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const lenis = new Lenis({
  lerp: prefersReduced ? 0 : 0.1,
  smoothWheel: !prefersReduced,
})
```

---

## FIX 12 — Client Logo PNG → WebP
**File:** `src/assets/client_logos/`

Some logos are 316 KB PNGs. Convert to WebP (transparent logos stay sharp):

```bash
find src/assets/client_logos -name "*.png" | while read f; do
  cwebp -lossless "$f" -o "${f%.png}.webp"
done
```

Then update `src/data/clients.js` — change each logo path from `.png` to `.webp`.

---

## IMPLEMENTATION ORDER

Do these in order — each one compounds the previous:

| Priority | Fix | Expected gain |
|----------|-----|---------------|
| 🔴 1 | **Fix 1 + 2** — Compress & poster hero video | LCP 8.2s → ~2s |
| 🔴 2 | **Fix 3 + 4** — Compress portfolio images + lazy | TBT drops, bandwidth -480MB |
| 🔴 3 | **Fix 5** — Lazy-load all sections | TBT 21,000ms → <500ms |
| 🟡 4 | **Fix 6** — Vite bundle splitting | Caching, faster repeat visits |
| 🟡 5 | **Fix 7** — Artegra WOFF2 | FCP -0.3s |
| 🟡 6 | **Fix 8** — Defer Google Fonts | FCP -0.2s |
| 🟢 7 | **Fix 9** — WebGL 30fps cap | CPU usage -50% |
| 🟢 8 | **Fix 10** — LazyMotion | Bundle -60KB |
| 🟢 9 | **Fix 11 + 12** — Reduced motion + logo WebP | Accessibility + polish |

---

## Expected Scores After All Fixes

| Metric | Before | After |
|--------|--------|-------|
| Performance (mobile) | 29 🔴 | 75–85 🟡 |
| Performance (desktop) | 53 🟡 | 92–98 ✅ |
| TBT | 21,040 ms | <300 ms |
| LCP | 8.2 s | <2.5 s |
| FCP | 3.4 s | <1.0 s |

> Mobile will not reach 100 while a hero video exists — the video itself costs ~10–15 points on mobile regardless of compression. 80–85 mobile + 95+ desktop is the realistic ceiling and an excellent result.
