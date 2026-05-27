import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FOOTER_ITEMS = [
  { label: 'Address', value: 'No.33/1 PJD No.76-22-33/1, Fourth Floor, Vittal Mallya Rd, Bengaluru, Karnataka - 560001' },
  { label: 'Email', value: 'contact@kalpandco.com' },
  { label: 'Phone', value: '94822 12222' },
  { label: 'Hours', value: 'Mon - Sat, 10:00 AM - 7:00 PM IST' },
];

export default function FooterReveal() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        '.site-footer__line',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '.site-footer [data-footer-item]',
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 78%',
          },
        }
      );
    }, footerRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="site-footer__line" aria-hidden="true" />

      <div className="site-footer__grid">
        {FOOTER_ITEMS.map((item) => (
          <div key={item.label} className="site-footer__item" data-footer-item>
            <p className="site-footer__label">{item.label}</p>
            <p className="site-footer__value">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="site-footer__bottom" data-footer-item>
        <p className="site-footer__copyright">© 2026 KALP &amp; CO. All rights reserved.</p>
        <p className="site-footer__note">Digital marketing and creative production, Bengaluru.</p>
      </div>
    </footer>
  );
}
