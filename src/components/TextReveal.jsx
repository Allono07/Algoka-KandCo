import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useNavigateWithTransition from '../hooks/useNavigateWithTransition';

const LINES = [
  ['So', 'are', 'you'],
  ['ready', 'to', 'build'],
  ['with', 'us?'],
];

const FOOTER_ITEMS = [
  { label: 'Location', value: 'Chennai / Remote' },
  { label: 'Phone', value: '+91 00000 00000' },
  { label: 'Email', value: 'hello@algoka.studio' },
  { label: 'Availability', value: 'New projects from Q3 2026' },
];

export default function TextReveal({ navTriggerRef }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const contentRef = useRef(null);
  const wordRefs = useRef([]);
  const actionRefs = useRef([]);
  const footerLineRef = useRef(null);
  const footerItemRefs = useRef([]);
  const navigateWithTransition = useNavigateWithTransition();
  let wordPosition = 0;

  wordRefs.current = [];
  actionRefs.current = [];
  footerItemRefs.current = [];

  function setSectionRef(element) {
    sectionRef.current = element;

    if (navTriggerRef) {
      navTriggerRef.current = element;
    }
  }

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const introDelay = 0.26;

      gsap.set(wordRefs.current, {
        scale: 2.2,
        y: (index) => 60 + index * 6,
        opacity: 0,
        transformOrigin: 'center center',
      });

      gsap.set(actionRefs.current, {
        y: 40,
        opacity: 0,
      });

      gsap.set(footerLineRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
      });

      gsap.set(footerItemRefs.current, {
        y: 48,
        opacity: 0,
      });

      gsap.set(contentRef.current, {
        opacity: 1,
        y: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.05,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          wordRefs.current,
          {
            scale: 1,
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 1.8,
            stagger: 0.11,
          },
          introDelay
        )
        .to(
          actionRefs.current,
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 0.55,
            stagger: 0.15,
          },
          introDelay + 1.12
        )
        .to(
          footerLineRef.current,
          {
            scaleX: 1,
            duration: 0.55,
            ease: 'power3.out',
          },
          introDelay + 1.56
        )
        .to(
          footerItemRefs.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
          },
          introDelay + 1.62
        );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={setSectionRef} className="text-reveal">
      <div ref={trackRef} className="text-reveal__track">
        <div ref={contentRef} className="text-reveal__content">
          <div className="text-reveal__intro">
            <h2 className="text-reveal__heading">
              {LINES.map((line, lineIndex) => (
                <span key={line.join('-')} className="text-reveal__line">
                  {line.map((word, wordIndex) => {
                    const wordKey = `${lineIndex}-${wordIndex}-${word}`;
                    const currentIndex = wordPosition;

                    wordPosition += 1;

                    return (
                      <span
                        key={wordKey}
                        ref={(element) => {
                          if (element) {
                            wordRefs.current[currentIndex] = element;
                          }
                        }}
                        className="text-reveal__word"
                      >
                        {word}
                      </span>
                    );
                  })}
                </span>
              ))}
            </h2>

            <div className="text-reveal__actions">
              <button
                ref={(element) => {
                  if (element) {
                    actionRefs.current[0] = element;
                  }
                }}
                type="button"
                className="pill-button pill-button--solid"
                data-cursor-hover
                onClick={() => navigateWithTransition('/contact')}
              >
                Contact
              </button>

              <button
                ref={(element) => {
                  if (element) {
                    actionRefs.current[1] = element;
                  }
                }}
                type="button"
                className="pill-button pill-button--outline"
                data-cursor-hover
                onClick={() => navigateWithTransition('/services')}
              >
                Services
              </button>
            </div>
          </div>

          <footer className="site-footer site-footer--inline">
            <div ref={footerLineRef} className="site-footer__line" aria-hidden="true" />

            <div className="site-footer__grid">
              {FOOTER_ITEMS.map((item, index) => (
                <div
                  key={item.label}
                  ref={(element) => {
                    if (element) {
                      footerItemRefs.current[index] = element;
                    }
                  }}
                  className="site-footer__item"
                >
                  <p className="site-footer__label">{item.label}</p>
                  <p className="site-footer__value">{item.value}</p>
                </div>
              ))}
            </div>

            <div
              ref={(element) => {
                if (element) {
                  footerItemRefs.current[FOOTER_ITEMS.length] = element;
                }
              }}
              className="site-footer__bottom"
            >
              <p className="site-footer__copyright">© 2026 Algoka. All rights reserved.</p>
              <p className="site-footer__note">
                Built to move slowly where the brand needs to breathe.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
}
