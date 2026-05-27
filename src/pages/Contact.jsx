import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useNavigateWithTransition from '../hooks/useNavigateWithTransition';

const CONTACT_ITEMS = [
  {
    label: 'Address',
    value: 'No.33/1 PJD No.76-22-33/1, Fourth Floor, Vittal Mallya Rd, Bengaluru, Karnataka - 560001',
  },
  {
    label: 'Email',
    value: 'contact@kalpandco.com',
    href: 'mailto:contact@kalpandco.com',
  },
  {
    label: 'Phone',
    value: '94822 12222',
    href: 'tel:+919482212222',
  },
  {
    label: 'Hours',
    value: 'Mon - Sat, 10:00 AM - 7:00 PM IST',
  },
];

export default function Contact() {
  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const detailsRef = useRef(null);
  const ledeRef = useRef(null);
  const navigateWithTransition = useNavigateWithTransition();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const animatedItems = [
        ledeRef.current,
        ...detailsRef.current.querySelectorAll('.service-row, .contact-social'),
      ];

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
        animatedItems,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.12,
        }
      );
    }, rootRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="page-shell page-shell--contact">
      <button
        type="button"
        className="page-shell__back"
        data-cursor-hover
        onClick={() => navigateWithTransition('/', { state: { returnToHomeContent: true } })}
      >
        <span aria-hidden="true">←</span> Home
      </button>

      <div className="page-shell__inner">
        <div className="page-shell__heading-wrap">
          <h1 ref={headingRef} className="page-shell__heading">
            Let&apos;s talk.
          </h1>
        </div>

        <p ref={ledeRef} className="page-shell__lede">
          For inquiries, use the direct details below.
        </p>

        <div ref={detailsRef} className="services-list">
          {CONTACT_ITEMS.map((item) => (
            <div key={item.label} className="service-row" data-cursor-hover>
              <div className="service-row__title">{item.label}</div>
              {item.href ? (
                <a className="service-row__copy" href={item.href}>
                  {item.value}
                </a>
              ) : (
                <p className="service-row__copy">{item.value}</p>
              )}
            </div>
          ))}

          <a
            href="https://www.instagram.com/kalpandco?igsh=aWo1YTE0Z3BpMmx4&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            className="pill-button pill-button--solid page-shell__submit contact-social"
            data-cursor-hover
          >
            Instagram @kalpandco
          </a>
        </div>
      </div>
    </main>
  );
}
