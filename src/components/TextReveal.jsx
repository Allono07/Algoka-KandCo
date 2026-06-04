import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useNavigateWithTransition from '../hooks/useNavigateWithTransition';
gsap.registerPlugin(ScrollTrigger);
const LINES = [
  ['KALP', '&', 'CO'],
  ['DIGITAL', 'MARKETING'],
];

export default function TextReveal({ onNavTriggerReady, children }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const contentRef = useRef(null);
  const introRef = useRef(null);
  const wordRefs = useRef([]);
  const actionRefs = useRef([]);
  const navigateWithTransition = useNavigateWithTransition();
  let wordPosition = 0;

  // Ensure refs arrays are fresh each render
  wordRefs.current = [];
  actionRefs.current = [];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const introDelay = 0.56;

      // Initial state for words
      gsap.set(wordRefs.current, {
        scale: 2.2,
        y: (i) => 60 + i * 6,
        opacity: 0,
        transformOrigin: 'center center',
      });

      // Initial state for buttons
      gsap.set(actionRefs.current, { y: 40, opacity: 0 });

      // Ensure content is visible
      gsap.set(contentRef.current, { opacity: 1, y: 0 });

      // Scroll‑triggered timeline matching pre‑dev behavior
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
            duration: 2.2,
            stagger: 0.12,
          },
          introDelay
        )
        .to(
          actionRefs.current,
          {
            y: 0,
            opacity: 1,
            ease: 'power3.out',
            duration: 0.68,
            stagger: 0.15,
          },
          introDelay + 1.34
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={el => (sectionRef.current = el)} className="text-reveal">
      <div ref={trackRef} className="text-reveal__track">
        <div ref={contentRef} className="text-reveal__content">
          <div
            ref={el => {
              introRef.current = el;
              if (onNavTriggerReady) onNavTriggerReady(el);
            }}
            className="text-reveal__intro"
          >
            <h2 className="text-reveal__heading">
              {LINES.map((line, lineIdx) => (
                <span key={line.join('-')} className="text-reveal__line">
                  {line.map((word, wordIdx) => {
                    const key = `${lineIdx}-${wordIdx}-${word}`;
                    const curIdx = wordPosition;
                    wordPosition += 1;
                    return (
                      <span
                        key={key}
                        ref={el => {
                          if (el) wordRefs.current[curIdx] = el;
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
                ref={el => {
                  if (el) actionRefs.current[0] = el;
                }}
                type="button"
                className="pill-button pill-button--solid"
                data-cursor-hover
                onClick={() => navigateWithTransition('/contact')}
              >
                Contact us
              </button>
              <button
                ref={el => {
                  if (el) actionRefs.current[1] = el;
                }}
                type="button"
                className="pill-button pill-button--outline"
                data-cursor-hover
                onClick={() => navigateWithTransition('/services')}
              >
                View services
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
