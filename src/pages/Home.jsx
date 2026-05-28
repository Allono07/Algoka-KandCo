import { useEffect, useState } from 'react';
import Canvas from '../components/Canvas';
import F1CarAnimation from '../components/F1CarAnimation';
import FooterReveal from '../components/FooterReveal';
import HomeIntro from '../components/HomeIntro';
import HomeNav from '../components/HomeNav';
import TextReveal from '../components/TextReveal';

export default function Home() {
  const [navTriggerElement, setNavTriggerElement] = useState(null);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [shouldStartF1Animation, setShouldStartF1Animation] = useState(false);
  const [shouldReturnToHomeContent] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return Boolean(window.__kalpReturnToHomeContent);
  });
  const [isIntroComplete, setIsIntroComplete] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return Boolean(window.__kalpReturnToHomeContent);
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.__kalpReturnToHomeContent) {
      delete window.__kalpReturnToHomeContent;
    }
  }, []);

  useEffect(() => {
    if (!isIntroComplete || !isHeroReady || !shouldReturnToHomeContent) {
      return;
    }

    const target = document.querySelector('.text-reveal');

    if (!target) {
      return;
    }

    window.scrollTo({ top: target.offsetTop, left: 0, behavior: 'auto' });
  }, [isHeroReady, isIntroComplete, shouldReturnToHomeContent]);

  useEffect(() => {
    if (shouldStartF1Animation) {
      return undefined;
    }

    function checkScrollProgress() {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;

      if (totalScrollable <= 0) {
        return;
      }

      const progress = window.scrollY / totalScrollable;

      if (progress >= 0.42) {
        setShouldStartF1Animation(true);
      }
    }

    checkScrollProgress();
    window.addEventListener('scroll', checkScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScrollProgress);
    };
  }, [shouldStartF1Animation]);

  function handleIntroComplete() {
    setIsIntroComplete(true);
  }

  return (
    <main className="page-root home-page">
      {!isIntroComplete ? (
        <HomeIntro isReady={isHeroReady} onComplete={handleIntroComplete} />
      ) : null}
      <HomeNav triggerElement={navTriggerElement} />
      <Canvas onReadyChange={setIsHeroReady} />
      <TextReveal isIntroComplete={isIntroComplete} onNavTriggerReady={setNavTriggerElement}>
        <F1CarAnimation shouldStart={shouldStartF1Animation} />
      </TextReveal>
      <FooterReveal />
    </main>
  );
}
