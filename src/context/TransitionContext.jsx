import { createContext, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import Curtain from '../components/Curtain';

export const TransitionContext = createContext(null);

function animateCurtain(element, vars) {
  return new Promise((resolve) => {
    gsap.to(element, {
      duration: 0.5,
      ease: 'power3.inOut',
      ...vars,
      onComplete: resolve,
    });
  });
}

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const curtainRef = useRef(null);
  const shouldOpenRef = useRef(false);
  const isTransitioningRef = useRef(false);

  useLayoutEffect(() => {
    if (!curtainRef.current) {
      return;
    }

    gsap.set(curtainRef.current, {
      scaleY: 0,
      transformOrigin: 'bottom center',
    });
  }, []);

  useEffect(() => {
    if (!shouldOpenRef.current || !curtainRef.current) {
      return;
    }

    shouldOpenRef.current = false;
    window.scrollTo(0, 0);

    gsap.set(curtainRef.current, {
      scaleY: 1,
      transformOrigin: 'top center',
    });

    animateCurtain(curtainRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
    }).then(() => {
      isTransitioningRef.current = false;
    });
  }, [location.pathname]);

  async function navigateWithTransition(to, options = {}) {
    const targetPath =
      typeof to === 'string' ? to : typeof to?.pathname === 'string' ? to.pathname : '';

    if (options?.state?.returnToHomeContent) {
      window.__kalpReturnToHomeContent = true;
    }

    if (isTransitioningRef.current || !curtainRef.current || targetPath === location.pathname) {
      return;
    }

    isTransitioningRef.current = true;

    await animateCurtain(curtainRef.current, {
      scaleY: 1,
      transformOrigin: 'bottom center',
    });

    shouldOpenRef.current = true;
    window.scrollTo(0, 0);
    navigate(to, options);
  }

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      <Curtain ref={curtainRef} />
    </TransitionContext.Provider>
  );
}
