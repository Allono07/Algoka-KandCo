import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

const LETTERS = ['K', '&', 'C', 'O'];
const BOX_COUNT = 24;

export default function HomeIntro({ isReady, onComplete }) {
  const rootRef = useRef(null);
  const textMaskRef = useRef(null);
  const letterRefs = useRef([]);
  const boxRefs = useRef([]);
  const hasAnimatedRef = useRef(false);

  letterRefs.current = [];
  boxRefs.current = [];

  useEffect(() => {
    if (hasAnimatedRef.current) {
      return undefined;
    }

    const observer = Observer.create({
      id: 'home-intro-lock',
      target: window,
      type: 'wheel,scroll,touch,pointer',
      preventDefault: true,
      allowClicks: true,
    });

    return () => {
      observer.kill();
    };
  }, []);

  useLayoutEffect(() => {
    if (!rootRef.current || !textMaskRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.set(rootRef.current, {
        autoAlpha: 1,
      });

      gsap.set(boxRefs.current, {
        scaleY: 1,
        transformOrigin: (index) => (index % 2 === 0 ? 'center top' : 'center bottom'),
      });

      gsap.set(letterRefs.current, {
        autoAlpha: 0,
        y: 24,
        scale: 0.9,
        filter: 'blur(8px)',
      });

      gsap.set(textMaskRef.current, {
        clipPath: 'inset(0 100% 0 0)',
      });
    }, rootRef);

    return () => {
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    if (!isReady || hasAnimatedRef.current) {
      return undefined;
    }

    hasAnimatedRef.current = true;
    const centerIndex = (LETTERS.length - 1) / 2;

    const timeline = gsap.timeline({
      defaults: {
        ease: 'power4.inOut',
      },
      onComplete: () => {
        gsap.set(rootRef.current, {
          display: 'none',
          pointerEvents: 'none',
        });

        if (typeof onComplete === 'function') {
          onComplete();
        }
      },
    });

    timeline
      .to(
        textMaskRef.current,
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
        },
        0.12
      )
      .to(
        letterRefs.current,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.78,
          ease: 'power3.out',
          stagger: 0.06,
        },
        0.12
      )
      .to(
        letterRefs.current,
        {
          autoAlpha: 0,
          x: (index) => (index <= centerIndex ? -180 - index * 28 : 180 + index * 28),
          y: (index) => (index % 2 === 0 ? -26 : 26),
          rotate: (index) => (index <= centerIndex ? -16 : 16),
          scale: 0.94,
          filter: 'blur(14px)',
          duration: 0.72,
          ease: 'power3.in',
          stagger: 0.03,
        },
        '+=2.85'
      )
      .to(
        boxRefs.current,
        {
          scaleY: 0,
          duration: 0.58,
          ease: 'power4.inOut',
          stagger: {
            each: 0.045,
            from: 'random',
          },
        },
        '+=0.08'
      )
      .to(
        rootRef.current,
        {
          autoAlpha: 0,
          duration: 0.26,
          ease: 'power2.out',
        },
        '-=0.18'
      );

    return () => {
      timeline.kill();
    };
  }, [isReady, onComplete]);

  return (
    <div ref={rootRef} className="home-intro" aria-hidden="true">
      <div className="home-intro__grid">
        {Array.from({ length: BOX_COUNT }).map((_, index) => (
          <div
            key={`intro-box-${index}`}
            ref={(element) => {
              if (element) {
                boxRefs.current[index] = element;
              }
            }}
            className="home-intro__box"
          />
        ))}
      </div>

      <div className="home-intro__center">
        <div ref={textMaskRef} className="home-intro__mask">
          <div className="home-intro__wordmark">
            {LETTERS.map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                ref={(element) => {
                  if (element) {
                    letterRefs.current[index] = element;
                  }
                }}
                className="home-intro__letter"
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
