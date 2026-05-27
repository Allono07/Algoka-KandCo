import { useEffect, useState } from 'react';

const HERO_STORAGE_KEY_DESKTOP = 'kalp-f1-hero-played-desktop';
const HERO_STORAGE_KEY_MOBILE = 'kalp-f1-hero-played-mobile';

export default function FormulaOneHero({ isActive, variant = 'desktop' }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [animationState, setAnimationState] = useState('idle');

  useEffect(() => {
    function updateViewport() {
      setIsDesktop(window.innerWidth >= 1024);
      setIsMobile(window.innerWidth <= 768);
    }

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  useEffect(() => {
    const isVariantVisible = variant === 'desktop' ? isDesktop : isMobile;

    if (!isVariantVisible || !isActive) {
      setAnimationState('idle');
      return undefined;
    }

    const storageKey =
      variant === 'desktop' ? HERO_STORAGE_KEY_DESKTOP : HERO_STORAGE_KEY_MOBILE;
    const hasPlayed = window.sessionStorage.getItem(storageKey) === '1';

    if (hasPlayed) {
      setAnimationState('settled');
      return undefined;
    }

    window.sessionStorage.setItem(storageKey, '1');
    setAnimationState('entering');

    const settleTimer = window.setTimeout(() => {
      setAnimationState('settled');
    }, 3200);

    return () => {
      window.clearTimeout(settleTimer);
    };
  }, [isActive, isDesktop, isMobile, variant]);

  if (variant === 'desktop' && !isDesktop) {
    return null;
  }

  if (variant === 'mobile' && !isMobile) {
    return null;
  }

  return (
    <div
      className={`text-reveal__f1 text-reveal__f1--${variant} text-reveal__f1--${animationState}`}
      aria-hidden="true"
    >
      <span className="text-reveal__f1-shadow" />
      <span className="text-reveal__f1-streak text-reveal__f1-streak--primary" />
      <span className="text-reveal__f1-streak text-reveal__f1-streak--secondary" />
      <img
        className="text-reveal__f1-image"
        src={variant === 'desktop' ? '/Potrait_F1.png' : '/Landscape_F1.png'}
        alt=""
        loading="eager"
        decoding="async"
      />
    </div>
  );
}