import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNavigateWithTransition from '../hooks/useNavigateWithTransition';
import '../styles/homeNav.css';

const MENU_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', anchor: '#about' },
  { label: 'Services', anchor: '#services' },
  { label: 'Clients', anchor: '#clients' },
  { label: 'Our Work', anchor: '#media-gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function HomeNav({ triggerElement, sentinelRef }) {
  // State to ensure intro animation runs only once
  const [introPlayed, setIntroPlayed] = useState(false);

  // Listen for the intro completion event and animate the logo merging
  useEffect(() => {
    const handler = () => {
      if (introPlayed) return;
      const heroEl = document.querySelector('.hero-brand__text');
      const navLogo = logoRef.current;
      if (!heroEl || !navLogo) return;
      const heroRect = heroEl.getBoundingClientRect();
      const navRect = navLogo.getBoundingClientRect();
      const dx = heroRect.left - navRect.left;
      const dy = heroRect.top - navRect.top;
      const scale = heroRect.width / navRect.width;
      // start from hero position
      gsap.set(navLogo, { x: dx, y: dy, scale });
      gsap.to(navLogo, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          setIntroPlayed(true);
          // Fade out the original hero brand text
          gsap.to(heroEl, { opacity: 0, duration: 0.4, ease: 'power3.out' });
        },
      });
    };
    window.addEventListener('kalpcoIntroComplete', handler);
    return () => window.removeEventListener('kalpcoIntroComplete', handler);
  }, [introPlayed]);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigateWithTransition = useNavigateWithTransition();

  // Observe sentinel (below hero) to toggle scrolled state
  useEffect(() => {
    if (!sentinelRef?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [sentinelRef]);

  // Show nav after intro
  useLayoutEffect(() => {
    if (!navRef.current) return;
    gsap.set(navRef.current, { autoAlpha: 0, y: -24, pointerEvents: 'none' });

    if (!triggerElement) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top+=80 top',
        onEnter: () => {
          navRef.current.style.pointerEvents = 'auto';
          gsap.to(navRef.current, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', overwrite: true });
        },
        onEnterBack: () => {
          navRef.current.style.pointerEvents = 'auto';
          gsap.to(navRef.current, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out', overwrite: true });
        },
        onLeaveBack: () => {
          navRef.current.style.pointerEvents = 'none';
          setIsOpen(false);
          gsap.to(navRef.current, { autoAlpha: 0, y: -24, duration: 0.32, ease: 'power3.in', overwrite: true });
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, [triggerElement]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function handleNav(item) {
    setIsOpen(false);
    if (item.to) {
      navigateWithTransition(item.to);
    } else if (item.anchor) {
      setTimeout(() => {
        const el = document.querySelector(item.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }

  return (
    <>
      <header
        ref={navRef}
        className={`home-nav${isScrolled ? ' is-scrolled' : ''}${isOpen ? ' is-open' : ''}`}
      >
        <div className="home-nav__bar">
          {/* Left spacer for centering */}
          <div className="home-nav__side" />

          {/* Center Logo */}
          <button
            ref={logoRef}
            type="button"
            className="home-nav__logo brand-text"
            data-cursor-hover
            aria-label="Go to home"
            onClick={() => { setIsOpen(false); navigateWithTransition('/'); }}
          >
            Klap &amp; Co
          </button>

          {/* Right: MENU toggle */}
          <div className="home-nav__side home-nav__side--right">
            <button
              type="button"
              className="home-nav__menu-btn"
              data-cursor-hover
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(o => !o)}
            >
              {isOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen drawer overlay */}
      <div className={`nav-drawer${isOpen ? ' nav-drawer--open' : ''}`} aria-hidden={!isOpen}>
        <div className="nav-drawer__inner">
          <nav className="nav-drawer__links" aria-label="Site navigation">
            {MENU_LINKS.map((item, i) => (
              <button
                key={item.label}
                type="button"
                className="nav-drawer__link"
                data-cursor-hover
                style={{ '--i': i }}
                onClick={() => handleNav(item)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="nav-drawer__footer">
            <p className="nav-drawer__tagline">Creative & Marketing Agency</p>
            <div className="nav-drawer__contact">
              <a href="mailto:contact@kalpandco.com" className="nav-drawer__contact-link">contact@kalpandco.com</a>
              <a href="https://www.instagram.com/kalpandco" target="_blank" rel="noreferrer" className="nav-drawer__contact-link">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
