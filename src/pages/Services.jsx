import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useNavigateWithTransition from '../hooks/useNavigateWithTransition';

const SERVICES = [
  {
    title: 'Narrative Systems',
    copy: 'Scroll-led product stories and brand sequences built to feel more like film than templates.',
  },
  {
    title: 'Editorial Interfaces',
    copy: 'Typography-first digital experiences with motion, rhythm, and pacing that earn attention.',
  },
  {
    title: 'Launch Direction',
    copy: 'Concept-to-ship support for landing pages, campaigns, and product reveals with a sharp point of view.',
  },
  {
    title: 'Motion Engineering',
    copy: 'GSAP, canvas, and transition architecture tuned to feel seamless across routes, breakpoints, and devices.',
  },
];

export default function Services() {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const rowsRef = useRef(null);
  const ledeRef = useRef(null);
  const navigateWithTransition = useNavigateWithTransition();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const rows = rowsRef.current.querySelectorAll('.service-row');

      gsap.fromTo(
        headingRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        ledeRef.current,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          delay: 0.16,
        }
      );

      gsap.fromTo(
        rows,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: {
            trigger: rowsRef.current,
            start: 'top 78%',
          },
        }
      );
    }, rootRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="page-shell page-shell--services">
      <button
        type="button"
        className="page-shell__back"
        data-cursor-hover
        onClick={() => navigateWithTransition('/')}
      >
        <span aria-hidden="true">←</span> Home
      </button>

      <div className="page-shell__inner">
        <div className="page-shell__heading-wrap">
          <h1 ref={headingRef} className="page-shell__heading">
            What we do.
          </h1>
        </div>

        <p ref={ledeRef} className="page-shell__lede">
          We build digital launches with cinematic movement, editorial restraint, and code that
          stays intentional under pressure.
        </p>

        <div ref={rowsRef} className="services-list">
          {SERVICES.map((service) => (
            <div key={service.title} className="service-row" data-cursor-hover>
              <div className="service-row__title">{service.title}</div>
              <p className="service-row__copy">{service.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
