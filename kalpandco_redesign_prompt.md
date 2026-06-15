# Kalp & Co. — Website Redesign Prompt
*Detailed specification for developer/designer handoff*

---

## 🎨 Global Design System

### Typography
- **Primary Font:** Montserrat (Google Fonts) — use weights 300, 400, 500, 600, 700
- **Fallback:** Helvetica Neue, Arial, sans-serif
- Apply `font-family: 'Montserrat', Helvetica, sans-serif` globally on `body`

### Colour Palette
| Role | Hex | Usage |
|------|-----|-------|
| Primary Warm | `#94847D` | Headings, active states, buttons |
| Secondary Warm | `#C1B6AF` | Borders, subtle accents, tab lines |
| Background Base | `#FAF6F0` | Page background (warm off-white) |
| Animated Wash 1 | `#F5EDE2` | Moving blob colour 1 |
| Animated Wash 2 | `#EDE0D0` | Moving blob colour 2 |
| Animated Wash 3 | `#DDD1CB` | Moving blob colour 3 |
| Text Dark | `#2D2926` | Body text |
| Text Light | `#7F736E` | Captions, labels |

### Background Animation (Global — GSAP Blob Approach)
Implement a **full-page GSAP blob animation** — 5 large blurred colour blobs that drift continuously behind all sections, with scroll-based parallax. This closely mirrors the fluid, living feel of the Coca-Cola homepage.

#### Step 1 — Load GSAP in `<head>`
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

#### Step 2 — Add blob canvas right after `<body>` opens
```html
<div id="blob-canvas" aria-hidden="true">
  <div class="blob" id="b1"></div>
  <div class="blob" id="b2"></div>
  <div class="blob" id="b3"></div>
  <div class="blob" id="b4"></div>
  <div class="blob" id="b5"></div>
</div>
```

#### Step 3 — CSS
```css
#blob-canvas {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: #FAF6F0;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.55;
  will-change: transform;
}

#b1 { width: 700px; height: 700px; background: #EDE0D0; top: -100px; left: -150px; }
#b2 { width: 600px; height: 600px; background: #DDD1CB; top: 30%;  right: -100px; }
#b3 { width: 500px; height: 500px; background: #C1B6AF; bottom: 10%; left: 20%;   }
#b4 { width: 450px; height: 450px; background: #F5EDE2; top: 50%;  left: -80px;  }
#b5 { width: 550px; height: 550px; background: #E8DDD6; bottom: -100px; right: 10%; }

/* All sections must be transparent */
section, header, footer, main, .section, [class*="section"] {
  background: transparent !important;
}

@media (prefers-reduced-motion: reduce) {
  .blob { animation: none !important; }
}
```

#### Step 4 — GSAP animation script (paste at bottom of `<body>`)
```javascript
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const blobs = [
    { id: '#b1', duration: 22, xRange: 180, yRange: 140 },
    { id: '#b2', duration: 28, xRange: 200, yRange: 160 },
    { id: '#b3', duration: 18, xRange: 150, yRange: 200 },
    { id: '#b4', duration: 32, xRange: 220, yRange: 120 },
    { id: '#b5', duration: 25, xRange: 170, yRange: 180 },
  ];

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function animateBlob(blob) {
    gsap.to(blob.id, {
      x: randomBetween(-blob.xRange, blob.xRange),
      y: randomBetween(-blob.yRange, blob.yRange),
      scale: randomBetween(0.85, 1.2),
      opacity: randomBetween(0.35, 0.65),
      duration: blob.duration,
      ease: 'sine.inOut',
      onComplete: () => animateBlob(blob),
    });
  }

  /* Stagger starts so blobs don't move in sync */
  blobs.forEach((blob, i) => {
    gsap.delayedCall(i * 1.8, () => animateBlob(blob));
  });

  /* Subtle scroll parallax — blobs drift at different speeds */
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    gsap.to('#b1', { y: scrollY * 0.08,  duration: 1.2, ease: 'power1.out' });
    gsap.to('#b2', { y: -scrollY * 0.05, duration: 1.4, ease: 'power1.out' });
    gsap.to('#b3', { y: scrollY * 0.06,  duration: 1.0, ease: 'power1.out' });
    gsap.to('#b4', { y: -scrollY * 0.04, duration: 1.6, ease: 'power1.out' });
    gsap.to('#b5', { y: scrollY * 0.03,  duration: 1.3, ease: 'power1.out' });
  }, { passive: true });
})();
```

#### How it works
- 5 large blurred `div` blobs sit on a fixed canvas behind everything
- GSAP continuously moves each blob to a new random position at its own pace (18–32 seconds per move), with subtle scale and opacity breathing
- As the user scrolls, each blob drifts at a different parallax speed, giving the background a three-dimensional, living feel
- All sections are `transparent` so the blobs show through the entire page seamlessly

#### Tuning guide
| Want | Change |
|------|--------|
| More/less visible blobs | Adjust `opacity: 0.55` on `.blob` |
| Sharper/softer edges | Change `filter: blur(90px)` — lower = harder |
| Faster movement | Reduce `duration` values in the JS array |
| Different colours | Swap `background` hex on `#b1`–`#b5` within the beige palette |

- All sections use `background: transparent` — the blob layer shows through everywhere
- Sections are separated by whitespace/padding only, NOT by different background colours

---

## 📐 Layout Rules
- Max content width: `1200px`, centred with `auto` margins
- Section padding: `100px 0` (desktop), `60px 0` (mobile)
- Border radius for all image containers: `16px`
- Squircle shape for work item boxes (use `border-radius: 24px` or CSS `clip-path` squircle approximation)
- Smooth scroll: `scroll-behavior: smooth` on `html`

---

## 📋 Section Order & Specifications

---

### 1. WHAT WE HAVE TO OFFER

**Reference:** Image 1 (top screenshot) — the "What we offer?" section

**Layout:**
- Section label at top centre: `★ SERVICES` in uppercase tracking, small size, colour `#94847D`
- Main heading: `What We Have to Offer` — large, centred, serif weight
- Subtext: single line centred description of the studio's range
- Below: **3-column interactive panel**
  - **Left column:** Vertical tab list of service categories (e.g. Branding, Strategy, Design, etc. — pull from current kalpandco.com service names). Active tab has a dark filled pill background (`#94847D`, white text). Inactive tabs are outlined/ghost style with `#C1B6AF` border
  - **Centre column:** Feature image for the active tab. Rounded corners `16px`. Image fills the column height. On tab switch, image cross-fades
  - **Right column:** Service detail panel
    - Small label at top (e.g. `✦ AS YOU WISH`)
    - Service name in large bold/italic mixed weight (like "Tailored *Private Tours*")
    - 2–3 line description paragraph
    - Small feature bullet with icon
    - CTA link: `EXPLORE [SERVICE] ↗` in small caps, `#94847D`, underline on hover

**Interaction:** Clicking a left-tab updates image + right content with a fade transition (300ms ease).

**Beige pill tabs styling:**
```css
.tab-active {
  background: #94847D;
  color: #fff;
  border-radius: 100px;
  padding: 10px 24px;
}
.tab-inactive {
  background: transparent;
  color: #94847D;
  border: 1px solid #C1B6AF;
  border-radius: 100px;
  padding: 10px 24px;
}
```

---

### 2. OUR WORK

**Reference:** Current kalpandco.com work section, with rounded corners added

**Changes from current:**
- Add `border-radius: 16px` (or squircle `border-radius: 20px 20px 20px 20px / 20px 20px 20px 20px` with slight squircle) to every project image/card
- Hover: subtle scale-up `transform: scale(1.02)` with `transition: 0.3s ease`
- All card backgrounds: `transparent` (inherits the animated bg)
- Project titles in Montserrat 600
- Category tags in Montserrat 300, `#94847D`

**No other structural changes** — preserve the current grid layout and content.

---

### 3. OUR TRUSTED BRANDS *(replaces "Our Clients")*

**Reference:** coca-colacompany.com/about-us — "A World of Beverages" section

**Concept:** Full-width horizontally scrolling marquee of client/brand logos with continuous auto-scroll animation. Two rows scrolling in opposite directions for depth.

**Implementation:**

```html
<section class="trusted-brands">
  <!-- <p class="section-label">★ TRUSTED BY</p> -->
  <h2>Brands We've Worked With</h2>

  <!-- Row 1: scrolls left -->
  <div class="marquee-track">
    <div class="marquee-inner marquee-left">
      <!-- Repeat logo set twice for seamless loop -->
      <img src="logo1.svg" alt="Brand 1" />
      <img src="logo2.svg" alt="Brand 2" />
      <!-- ... all client logos ... -->
      <!-- Duplicate set below -->
      <img src="logo1.svg" alt="Brand 1" />
      ...
    </div>
  </div>

  <!-- Row 2: scrolls right -->
  <div class="marquee-track">
    <div class="marquee-inner marquee-right">
      ...same logos in different order...
    </div>
  </div>
</section>
```

```css
.marquee-track {
  overflow: hidden;
  width: 100%;
  padding: 16px 0;
}
.marquee-inner {
  display: flex;
  gap: 60px;
  width: max-content;
  align-items: center;
}
.marquee-left {
  animation: scrollLeft 30s linear infinite;
}
.marquee-right {
  animation: scrollRight 30s linear infinite;
}
@keyframes scrollLeft {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes scrollRight {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
.marquee-inner img {
  height: 48px;
  width: auto;
  object-fit: contain;
  opacity: 0.65;
  filter: grayscale(0.3);
  transition: opacity 0.3s, filter 0.3s;
}
.marquee-inner img:hover {
  opacity: 1;
  filter: grayscale(0);
}
/* Pause on hover */
.marquee-track:hover .marquee-inner {
  animation-play-state: paused;
}
```

- All logos should be consistent size (height 48px), with `object-fit: contain`
- Light transparent overlay on left/right edges (CSS mask) for a fade-out effect at edges
- Section has no background colour — transparent, shows animated wash

---

### 4. ABOUT US

**Reference:** Image 2 — "ARMONIA EXCURSIONS" section layout

**Section Title:** `ABOUT US` (centred, large heading)

**Layout — 3 parts stacked:**

#### Part A: Hero Identity Block
- Full-width row: **left** = about us text block, **right** = large image (taller, spanning, `border-radius: 16px`)
- Text block contains:
  - Label: `↗ ABOUT US` small caps
  - Large studio name: `KALP & CO.` — display size, Montserrat 700
  - 1 paragraph brand description

#### Part B: Vision / Mission / Values
Three equal columns, each as a minimal card:
```
[ VISION ]          [ MISSION ]         [ VALUES ]
___________         ___________         ___________
Short bold          Short bold          Short bold
headline            headline            headline

Descriptor          Descriptor          Descriptor
text below          text below          text below
```
- Cards have a thin `1px solid #C1B6AF` border, `border-radius: 12px`, transparent bg
- Montserrat 500 for headings, 300 for body

#### Part C: Why Choose Us
- Keep current content from kalpandco.com
- Display as a horizontal grid of 3–4 icons + text blocks
- Icons: simple line icons in `#94847D`

---

### 5. OUR PROCESS

**No changes to structure or content.** Keep exactly as on current kalpandco.com.

Minor style updates:
- Step numbers: Montserrat 700, colour `#94847D`
- Step divider lines: `#C1B6AF`
- Background: `transparent`

---

### 6. FROM THE STUDIO *(replaces or renames current section)*

**Reference:** Image 2 — "Join Our Community" section

**Concept:** Full-width editorial-style section — large overlapping image + text block, similar to the lush green "Join Our Community" layout in the reference.

**Layout:**
```
[ Large editorial image — 60% width, rounded corners ]
                              [ Text block — 40% width ]
                              Label: ★ FROM THE STUDIO
                              Large heading: "Inside the
                              world of Kalp & Co."
                              Body paragraph
                              [ CTA Button ]
```

- Images: 2–3 behind-the-scenes studio/work images stacked with slight offset (CSS `z-index` layering)
- The image group has `border-radius: 20px` clipping
- Background: transparent (shows animated wash)
- Text overlaps slightly over the images on desktop for editorial feel
- On mobile: image above, text below, full-width

**CTA Button styling:**
```css
.cta-btn {
  background: #94847D;
  color: #fff;
  border-radius: 100px;
  padding: 14px 36px;
  font-family: Montserrat, Helvetica, sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}
.cta-btn:hover {
  background: #7F736E;
  transform: translateY(-2px);
}
```

---

### 7. WHAT THEY SAY *(Testimonials)*

**No structural changes.** Keep current layout and content from kalpandco.com.

Style updates:
- Quote marks: large decorative `#C1B6AF` colour
- Card bg: `transparent` with `1px solid #C1B6AF` border, `border-radius: 16px`
- Name in Montserrat 600, `#94847D`
- Testimonial text in Montserrat 300 italic

---

### 8. MEET THE PEOPLE LEADING THE WAY *(Team)*

**Reference:** Current kalpandco.com team section

**Change:** Add `border-radius: 16px` to all team member profile photos.

Other updates:
- Hover on photo: subtle scale `1.03` and a faint `box-shadow: 0 8px 32px rgba(148,132,125,0.2)`
- Name: Montserrat 700
- Role/title: Montserrat 400, `#94847D`
- Bio: Montserrat 300

---

### 9. CONTACT US

**Reference:** Image 2 bottom — contact section layout

**Layout — 2 columns:**
- **Left:** Contact information + form
  - Section label: `GET IN TOUCH`
  - Heading: `Contact Us`
  - Contact info block (address, email, phone) — each with a small icon and Montserrat 400
  - Contact form fields: Name, Email, Message — minimal style, `border-bottom: 1px solid #C1B6AF`, no box border, transparent bg
  - Submit button: pill shape, `#94847D`

- **Right:** Large image of studio/office space, `border-radius: 16px`
  - Below image: embedded Google Maps or static map preview in a card with `border-radius: 12px`

**Form styling:**
```css
.contact-input {
  background: transparent;
  border: none;
  border-bottom: 1.5px solid #C1B6AF;
  outline: none;
  font-family: Montserrat, Helvetica, sans-serif;
  font-size: 15px;
  color: #2D2926;
  padding: 12px 0;
  width: 100%;
  transition: border-color 0.2s;
}
.contact-input:focus {
  border-bottom-color: #94847D;
}
```

---

## 🧭 Navigation (Header)

- Sticky header: transparent background with `backdrop-filter: blur(12px)` — shows the animation through it
- Logo on the left (Kalp & Co. wordmark)
- Nav links centred or right: Montserrat 500, colour `#2D2926`
- Active/hover underline in `#94847D`
- CTA button (e.g. "Let's Talk"): pill button, `#94847D` background

---

## 🦶 Footer

**Reference:** Image 2 bottom — newsletter/footer section

- **Two rows:**
  - Row 1: Logo + nav links + social icons
  - Row 2: Newsletter subscription input + copyright line
- Background: `transparent` (animated wash shows through)
- Top border: `1px solid #C1B6AF`
- Font: Montserrat 300, colour `#7F736E`
- Social icons: `#94847D` fill, `24px` size

---

## 📱 Responsive Notes

| Breakpoint | Key Changes |
|------------|-------------|
| `< 1024px` | "What We Offer" stacks: tabs become horizontal scroll, image and detail below |
| `< 768px` | All multi-column sections go single-column |
| `< 768px` | About Us: image above, text below |
| `< 768px` | Trusted brands marquee slows slightly |
| `< 480px` | Section padding reduces to `40px 20px` |

---

## ⚙️ Technical Stack Notes

- **Fonts:** Load via Google Fonts — `Montserrat:wght@300;400;500;600;700`
- **Animations:** GSAP 3 required for the blob background animation and scroll parallax (loaded via CDN)
- **Marquee:** Pure CSS `animation` — no JS library needed
- **Tab component (Section 1):** Vanilla JS or React state — minimal footprint
- **No hard section background colours** — all `background: transparent` after the global body layer
- **Images:** WebP format preferred, lazy loading on all below-fold images (`loading="lazy"`)
- **Accessibility:** All animated elements respect `prefers-reduced-motion` media query

```css
@media (prefers-reduced-motion: reduce) {
  .blob { animation: none !important; }
  .marquee-left, .marquee-right { animation: none; }
}
```
The GSAP blob script also checks `prefers-reduced-motion` at runtime and exits early if enabled.

---

## 🔗 References
- Current site: https://kalpandco.com/
- Background animation reference: https://www.coca-colacompany.com/
- Marquee/brand section reference: https://www.coca-colacompany.com/about-us
- Colour palette reference: Beige palette (Image 1) — highlighted swatches `#94847D` and `#C1B6AF`
- Layout references: Images 1 & 2 attached in brief
