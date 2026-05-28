import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import useNavigateWithTransition from '../hooks/useNavigateWithTransition';
import FormulaOneHero from './FormulaOneHero';

const LINES = [
  ['KALP', '&', 'CO'],
  ['DIGITAL', 'MARKETING'],
];

export default function TextReveal({ onNavTriggerReady }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const contentRef = useRef(null);
  const introRef = useRef(null);
  const wordRefs = useRef([]);
  const actionRefs = useRef([]);
  const navigateWithTransition = useNavigateWithTransition();
  let wordPosition = 0;

  wordRefs.current = [];
  actionRefs.current = [];

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const introDelay = 0.56;

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

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={(element) => {
        sectionRef.current = element;
      }}
      className="text-reveal"
    >
      <div ref={trackRef} className="text-reveal__track">
        <div ref={contentRef} className="text-reveal__content">
          <div
            ref={(element) => {
              introRef.current = element;

              if (onNavTriggerReady) {
                onNavTriggerReady(element);
              }
            }}
            className="text-reveal__intro"
          >
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
                Contact us
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
                View services
              </button>
            </div>
          </div>

          <FormulaOneHero />
        </div>
      </div>
    </section>
  );
}
