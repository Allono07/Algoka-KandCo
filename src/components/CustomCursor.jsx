import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, label, select, [data-cursor-hover]';

function getInteractiveElement(target) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || !cursorRef.current) {
      return undefined;
    }

    const cursor = cursorRef.current;
    const bodyClass = 'cursor-ready';

    document.body.classList.add(bodyClass);
    gsap.set(cursor, {
      autoAlpha: 0,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    function handleMove(event) {
      gsap.to(cursor, {
        autoAlpha: 1,
        x: event.clientX,
        y: event.clientY,
        duration: 0.15,
        ease: 'power3.out',
        overwrite: true,
      });
    }

    function handleOver(event) {
      if (getInteractiveElement(event.target)) {
        cursor.classList.add('is-active');
      }
    }

    function handleOut(event) {
      const leavingInteractive = getInteractiveElement(event.target);
      const enteringInteractive = getInteractiveElement(event.relatedTarget);

      if (leavingInteractive && !enteringInteractive) {
        cursor.classList.remove('is-active');
      }
    }

    function hideCursor() {
      gsap.to(cursor, {
        autoAlpha: 0,
        duration: 0.18,
        overwrite: true,
      });
      cursor.classList.remove('is-active');
    }

    window.addEventListener('mousemove', handleMove);
    document.documentElement.addEventListener('mouseleave', hideCursor);
    window.addEventListener('blur', hideCursor);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      document.body.classList.remove(bodyClass);
      window.removeEventListener('mousemove', handleMove);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('blur', hideCursor);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
