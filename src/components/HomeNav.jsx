import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNavigateWithTransition from '../hooks/useNavigateWithTransition';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

export default function HomeNav({ triggerElement }) {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigateWithTransition = useNavigateWithTransition();

  useLayoutEffect(() => {
    if (!navRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(navRef.current, {
        autoAlpha: 0,
        y: -24,
        pointerEvents: 'none',
      });

      if (!triggerElement) {
        return;
      }

      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top+=120 top',
        end: 'bottom bottom',
        onEnter: () => {
          navRef.current.style.pointerEvents = 'auto';
          gsap.to(navRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: 'power3.out',
            overwrite: true,
          });
        },
        onEnterBack: () => {
          navRef.current.style.pointerEvents = 'auto';
          gsap.to(navRef.current, {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: 'power3.out',
            overwrite: true,
          });
        },
        onLeaveBack: () => {
          navRef.current.style.pointerEvents = 'none';
          setIsOpen(false);
          gsap.to(navRef.current, {
            autoAlpha: 0,
            y: -24,
            duration: 0.32,
            ease: 'power3.out',
            overwrite: true,
          });
        },
      });
    }, navRef);

    return () => {
      context.revert();
    };
  }, [triggerElement]);

  function handleNavigate(to) {
    setIsOpen(false);
    navigateWithTransition(to);
  }

  return (
    <header ref={navRef} className={`home-nav ${isOpen ? 'is-open' : ''}`}>
      <div className="home-nav__bar">
        <button
          type="button"
          className="home-nav__brand"
          data-cursor-hover
          aria-label="Go to home"
          onClick={() => handleNavigate('/')}
        >
          <span className="home-nav__mark" aria-hidden="true">
            <span className="home-nav__mark-line" />
          </span>
        </button>

        <nav className="home-nav__links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              className="home-nav__link"
              data-cursor-hover
              onClick={() => handleNavigate(item.to)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="home-nav__actions">
          <button
            type="button"
            className="home-nav__icon"
            data-cursor-hover
            aria-label="Search"
          >
            <span className="home-nav__icon-search" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="home-nav__cta"
            data-cursor-hover
            onClick={() => handleNavigate('/contact')}
          >
            Start a project
          </button>

          <button
            type="button"
            className="home-nav__menu"
            data-cursor-hover
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            onClick={() => setIsOpen((current) => !current)}
          >
            Menu
          </button>
        </div>
      </div>

      <div className="home-nav__drawer">
        <button
          type="button"
          className="home-nav__drawer-link home-nav__drawer-link--cta"
          data-cursor-hover
          onClick={() => handleNavigate('/contact')}
        >
          Start a project
        </button>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className="home-nav__drawer-link"
            data-cursor-hover
            onClick={() => handleNavigate(item.to)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
