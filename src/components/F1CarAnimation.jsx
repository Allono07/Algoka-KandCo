import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function F1CarAnimation({ shouldStart }) {
  const hasAnimatedRef = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)');

    function handleChange(event) {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (!shouldStart || hasAnimatedRef.current) {
      return undefined;
    }

    let startTimer;

    startTimer = window.setTimeout(() => {
      if (hasAnimatedRef.current) {
        return;
      }

      hasAnimatedRef.current = true;
      setShouldAnimate(true);
    }, 400);

    return () => {
      if (startTimer) {
        window.clearTimeout(startTimer);
      }
    };
  }, [isMobile, shouldStart]);

  const startY = isMobile ? 1200 : 1400;

  return (
    <div className="text-reveal__f1" aria-hidden="true">
      <motion.div
        className="text-reveal__f1-motion"
        initial={{
          x: 0,
          y: isMobile ? 1200 : 1400,
          rotate: 0,
          filter: 'blur(0px)',
        }}
        animate={
          shouldAnimate
            ? {
                y: 0,
                x: 0,
                rotate: 0,
                filter: ['blur(12px)', 'blur(10px)', 'blur(4px)', 'blur(0px)'],
              }
            : { y: startY, x: 0, rotate: 0, filter: 'blur(0px)' }
        }
        transition={{
          y: {
            type: 'spring',
            stiffness: 125,
            damping: 22,
            mass: 0.85,
            duration: 1.35,
          },
          filter: {
            duration: 1.2,
            times: [0, 0.35, 0.7, 1],
            ease: 'easeOut',
          },
        }}
      >
        <picture className="text-reveal__f1-picture">
          <source media="(max-width: 767px)" srcSet="/Landscape_F1.png" />
          <img className="text-reveal__f1-image" src="/Potrait_F1.png" alt="" loading="eager" decoding="async" />
        </picture>
      </motion.div>
    </div>
  );
}