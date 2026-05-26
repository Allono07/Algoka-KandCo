"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DESKTOP_FRAMES = Array.from({ length: 60 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/video-project-1/Video_Project_1_${frameNumber}.png`;
});

const MOBILE_FRAMES = Array.from({ length: 60 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `/video-project-2/Video_Project_2_${frameNumber}.png`;
});

const SERVICES = [
  {
    id: '01',
    title: 'SEO & Web Development',
    copy: 'Search-led websites and technical builds made to support visibility, performance, and long-term reliability.',
  },
  {
    id: '02',
    title: 'Social Media Management',
    copy: 'Planning, publishing, and day-to-day brand communication with a consistent voice and visual system.',
  },
  {
    id: '03',
    title: 'Performance Marketing',
    copy: 'Paid campaigns tuned for reach, leads, and measurable return with clean reporting and optimization.',
  },
  {
    id: '04',
    title: 'Influencer Marketing',
    copy: 'Creator partnerships aligned to audience fit, campaign goals, and brand positioning.',
  },
  {
    id: '05',
    title: 'Film Making & Production',
    copy: 'Commercial shoots, reels, and production support for campaign and brand storytelling.',
  },
];

const CONTACT = [
  {
    label: 'Address',
    value: 'No.33/1 PJD No.76-22-33/1, Fourth Floor, Vittal Mallya Rd, Bengaluru, Karnataka - 560001',
  },
  { label: 'Email', value: 'contact@kalpandco.com', href: 'mailto:contact@kalpandco.com' },
  { label: 'Phone', value: '94822 12222', href: 'tel:+919482212222' },
  { label: 'Hours', value: 'Mon - Sat, 10:00 AM - 7:00 PM IST' },
];

const WORD_RAIL = ['KALP & CO', 'BENGALURU', 'DIGITAL MARKETING', 'CREATIVE PRODUCTION'];

function useViewportMode() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  return isMobile;
}

export default function Page() {
  const isMobile = useViewportMode();
  const [sequenceComplete, setSequenceComplete] = useState(false);

  const sequenceWrapRef = useRef(null);
  const sequenceCanvasRef = useRef(null);
  const sequenceFrameRef = useRef(0);
  const sequenceImagesRef = useRef([]);
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const stackWrapRef = useRef(null);

  const frameSources = useMemo(() => (isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES), [isMobile]);

  useEffect(() => {
    if (!sequenceCanvasRef.current || !sequenceWrapRef.current) return undefined;

    const canvas = sequenceCanvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return undefined;

    let resizeTimeout;
    let scrubTrigger;
    let cancelled = false;

    const drawCover = (image) => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / devicePixelRatio;
      const height = canvas.height / devicePixelRatio;
      const imageRatio = image.width / image.height;
      const canvasRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let drawX = 0;
      let drawY = 0;

      if (imageRatio > canvasRatio) {
        drawHeight = height;
        drawWidth = height * imageRatio;
        drawX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imageRatio;
        drawY = (height - drawHeight) / 2;
      }

      context.clearRect(0, 0, width, height);
      context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    };

    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const frame = sequenceImagesRef.current[sequenceFrameRef.current];
      if (frame) {
        drawCover(frame);
      }
    };

    const paintFrame = (frameIndex) => {
      const frame = sequenceImagesRef.current[frameIndex];
      if (!frame) return;
      sequenceFrameRef.current = frameIndex;
      drawCover(frame);
    };

    const preload = async () => {
      const loadedFrames = await Promise.all(
        frameSources.map(
          (source) =>
            new Promise((resolve) => {
              const image = new Image();
              image.src = source;
              image.onload = () => resolve(image);
              image.onerror = () => resolve(null);
            })
        )
      );

      const frames = loadedFrames.filter(Boolean);
      if (!frames.length || cancelled) return;

      sequenceImagesRef.current = frames;
      sequenceFrameRef.current = 0;
      resizeCanvas();
      drawCover(frames[0]);

      scrubTrigger = ScrollTrigger.create({
        trigger: sequenceWrapRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 12}`,
        pin: true,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const frameIndex = Math.floor(self.progress * (frames.length - 1));
          paintFrame(frameIndex);
          setSequenceComplete(self.progress >= 0.995);
        },
        onLeave: () => {
          sequenceFrameRef.current = frames.length - 1;
          drawCover(frames[frames.length - 1]);
          setSequenceComplete(true);
        },
        onEnterBack: () => {
          setSequenceComplete(false);
        },
        onLeaveBack: () => {
          setSequenceComplete(false);
          sequenceFrameRef.current = 0;
          drawCover(frames[0]);
        },
        onRefresh: () => {
          const frame = sequenceImagesRef.current[sequenceFrameRef.current] || frames[0];
          if (frame) drawCover(frame);
        },
      });
    };

    preload();

    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        resizeCanvas();
        scrubTrigger?.refresh();
      }, 120);
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', onResize);
      scrubTrigger?.kill();
    };
  }, [frameSources]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const heroSplit = new SplitType(headlineRef.current, { types: 'words, chars', tagName: 'span' });
      const sublineSplit = new SplitType(sublineRef.current, { types: 'words', tagName: 'span' });

      gsap.from(heroSplit.words, {
        y: 60,
        autoAlpha: 0,
        stagger: 0.04,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 78%',
        },
      });

      gsap.from(sublineSplit.words, {
        y: 28,
        autoAlpha: 0,
        stagger: 0.025,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 76%',
        },
      });

      const revealBlocks = gsap.utils.toArray('[data-reveal]');
      revealBlocks.forEach((block) => {
        gsap.fromTo(
          block,
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: block,
              start: 'top 82%',
            },
          }
        );
      });

      const cards = gsap.utils.toArray('[data-card]');
      gsap.from(cards, {
        y: 28,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0] || heroRef.current,
          start: 'top 80%',
        },
      });

      const serviceArticles = gsap.utils.toArray('.service-article');
      serviceArticles.forEach((article, index) => {
        gsap.fromTo(
          article,
          { y: 36, scale: 0.97, rotateX: 6, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            rotateX: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: article,
              start: 'top 84%',
              end: 'top 58%',
              scrub: 0.6,
            },
            delay: index * 0.02,
          }
        );
      });

      const lines = gsap.utils.toArray('[data-line]');
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: line,
              start: 'top 82%',
            },
          }
        );
      });

      const stackCards = gsap.utils.toArray('[data-stack-card]');
      if (stackWrapRef.current && stackCards.length) {
        ScrollTrigger.create({
          trigger: stackWrapRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: true,
          pin: '.stack-pin',
          anticipatePin: 1,
        });

        stackCards.forEach((card, index) => {
          gsap.to(card, {
            yPercent: -12 * index,
            scale: 1 - index * 0.03,
            ease: 'none',
            scrollTrigger: {
              trigger: stackWrapRef.current,
              start: 'top top',
              end: '+=200%',
              scrub: true,
            },
          });
        });
      }

      return () => {
        heroSplit.revert();
        sublineSplit.revert();
      };
    });

    return () => {
      context.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="site-shell relative min-h-screen bg-[#f6f1ea] text-[#171717]">
      <section ref={sequenceWrapRef} className="camera-sequence-shell relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-[#f3ebdf]">
        <div className="sticky top-0 h-screen w-screen overflow-hidden">
          <canvas ref={sequenceCanvasRef} className="camera-sequence-canvas absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(203,147,73,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(248,243,234,0.3))]" />
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#f3ebdf] to-transparent" />
          <div className="sequence-arrows absolute inset-x-0 bottom-8 flex items-center justify-center gap-2" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <div style={{ visibility: sequenceComplete ? 'visible' : 'hidden' }} className="transition-opacity duration-500">
      <section ref={stackWrapRef} id="about" className="stack-wrap relative px-5 pb-3 pt-2 sm:px-8 md:px-12 lg:px-16">
        <div className="stack-pin container rounded-[2rem] border border-[#d7be92]/32 bg-[#fbf5ec]/96 p-6 shadow-[0_32px_104px_rgba(73,50,22,0.08)] backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            <div>
              <p className="text-[0.64rem] uppercase tracking-[0.4em] text-[#b68142]">About</p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,4.6rem)] uppercase leading-[0.92] tracking-[-0.04em] text-[#1f160f]">
                Clear digital work for brands that want a professional presence.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-[#5a4631]">
                KALP & CO works across digital marketing, social media, paid media, influencer partnerships, and film production. The focus is simple: keep the message clean, the presentation professional, and the delivery consistent.
              </p>
            </div>

            <div className="stack-card-stage">
              {[
                'Understand the brief and define the right communication direction.',
                'Build the visual and motion system with a consistent brand tone.',
                'Deliver the campaign, website, or production work with practical clarity.',
                'Refine the result so it stays usable, professional, and easy to extend.',
              ].map((step, index) => (
                <div key={step} data-stack-card className="stack-card card p-5 shadow-[0_18px_44px_rgba(68,47,20,0.08)]">
                  <div className="text-[0.62rem] uppercase tracking-[0.34em] text-[#ad7639]">Stage {String(index + 1).padStart(2, '0')}</div>
                  <p className="mt-3 font-display text-[clamp(1.35rem,1.8vw,1.85rem)] leading-[1.04] text-[#22160d]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={heroRef} className="hero-stage relative overflow-hidden px-5 py-2 sm:px-8 md:px-12 lg:px-16">
        <div className="container">
          <div className="flex items-center justify-between gap-6 border-b border-[#d7bb8b]/35 pb-4">
            <div className="font-display text-lg font-semibold tracking-wide text-[#171717]">KALP & CO</div>
            <nav className="hidden items-center gap-6 text-sm text-[rgba(0,0,0,0.62)] md:flex">
              <a href="#services" className="transition-opacity hover:opacity-70">Services</a>
              <a href="#about" className="transition-opacity hover:opacity-70">About</a>
              <a href="#contact" className="transition-opacity hover:opacity-70">Contact</a>
            </nav>
          </div>

          <div className="grid gap-8 py-4 lg:grid-cols-[1.18fr_0.82fr] lg:items-end lg:py-7">
            <div data-reveal className="relative">
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[#d6b67f]/40 bg-[#fff9ef]/90 px-4 py-2 text-[0.62rem] uppercase tracking-[0.34em] text-[#8e6536]">
                Full-spectrum digital marketing and creative agency in Bengaluru
              </div>
              <h1 ref={headlineRef} className="max-w-5xl font-display text-[clamp(3.2rem,8vw,8.6rem)] font-medium uppercase leading-[0.88] tracking-[-0.05em] text-[#1f160f]">
                KALP & CO.
              </h1>
              <p ref={sublineRef} className="mt-5 max-w-3xl text-base leading-8 text-[#5a4631] sm:text-lg">
                We keep the opening frame-by-frame transition intact, then continue with a measured scroll-led site focused on the company’s real services, contact details, and brand presence.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <motion.a href="#contact" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary">
                  Contact us
                </motion.a>
                <motion.a href="#services" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-secondary">
                  View services
                </motion.a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { value: 'Bengaluru', label: 'Based in' },
                { value: '05', label: 'Service areas' },
                { value: '01', label: 'Single focused brand system' },
              ].map((item) => (
                <div key={item.label} data-card className="card p-5 shadow-[0_16px_42px_rgba(66,46,19,0.06)] backdrop-blur-md">
                  <div className="font-display text-3xl leading-none text-[#b07b3c]">{item.value}</div>
                  <div className="mt-3 text-[0.66rem] uppercase tracking-[0.3em] text-[#6a543d]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="word-rail">
        <div className="word-rail-track">
          {Array.from({ length: 2 }).flatMap((_, loop) => WORD_RAIL.map((item) => <span key={`${item}-${loop}`}>{item}</span>))}
        </div>
      </section>

      <section id="services" className="relative overflow-hidden px-5 py-2 sm:px-8 md:px-12 lg:px-16">
        <div className="container">
          <div data-line className="h-px w-full origin-left bg-gradient-to-r from-transparent via-[#c99658] to-transparent" />
          <div className="mt-2 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((item) => (
              <article key={item.title} data-card className="service-article card p-6 shadow-[0_24px_72px_rgba(70,48,20,0.06)] backdrop-blur-xl">
                <div className="text-[0.62rem] uppercase tracking-[0.42em] text-[#b68142]">{item.id}</div>
                <h2 className="mt-4 font-display text-[clamp(1.9rem,2.3vw,2.6rem)] leading-[0.96] tracking-[-0.04em] text-[#22170f]">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#5a4631]">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden px-5 py-2 sm:px-8 md:px-12 lg:px-16">
        <div className="container">
          <div data-line className="h-px w-full origin-left bg-gradient-to-r from-transparent via-[#c99658] to-transparent" />
          <div className="mt-2 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
            <div data-reveal className="card p-6 shadow-[0_24px_72px_rgba(68,47,20,0.06)] backdrop-blur-xl md:p-7">
              <p className="text-[0.64rem] uppercase tracking-[0.4em] text-[#b68142]">Contact</p>
              <h2 className="mt-4 font-display text-[clamp(2.1rem,4vw,4.6rem)] uppercase leading-[0.92] tracking-[-0.04em] text-[#1f160f]">
                Reach out to KALP & CO.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-[#5a4631]">
                For inquiries, use the contact details below. The site now keeps the original frame intro, with the rest of the page kept clear and professional.
              </p>
            </div>

            <div className="grid gap-4">
              {CONTACT.map((item) => (
                <div key={item.label} data-card className="card p-5 shadow-[0_18px_52px_rgba(68,47,20,0.06)] backdrop-blur-xl">
                  <div className="text-[0.64rem] uppercase tracking-[0.4em] text-[#b68142]">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="mt-3 block text-base text-[#1f160f] transition-colors duration-300 hover:text-[#9a6a32]">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-base text-[#1f160f]">{item.value}</p>
                  )}
                </div>
              ))}

              <a href="https://www.instagram.com/kalpandco?igsh=aWo1YTE0Z3BpMmx4&utm_source=qr" target="_blank" rel="noreferrer" className="btn-secondary w-fit">
                Instagram @kalpandco
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="px-5 pb-5 pt-1 text-[0.64rem] uppercase tracking-[0.35em] text-[#7a5d3b] sm:px-8 md:px-12 lg:px-16">
        <div className="container flex flex-col gap-3 border-t border-[#d6b67f]/30 pt-5 md:flex-row md:items-center md:justify-between">
          <span>KALP & CO</span>
          <span>Bengaluru, India</span>
        </div>
      </footer>
      </div>
    </main>
  );
}