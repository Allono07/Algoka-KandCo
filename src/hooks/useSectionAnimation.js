import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to animate a section when it scrolls into view.
 * @param {React.RefObject} ref - Ref to the root element of the section.
 * @param {object} [opts] - GSAP animation options.
 */
export default function useSectionAnimation(ref, opts = {}) {
  useEffect(() => {
    if (!ref.current) return;
    const defaults = { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' };
    const animation = { ...defaults, ...opts };
    gsap.from(ref.current, {
      ...animation,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [ref, opts]);
}
