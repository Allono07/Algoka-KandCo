import { useState } from 'react';
import Canvas from '../components/Canvas';
import FooterReveal from '../components/FooterReveal';
import HomeIntro from '../components/HomeIntro';
import HomeNav from '../components/HomeNav';
import TextReveal from '../components/TextReveal';

export default function Home() {
  const [navTriggerElement, setNavTriggerElement] = useState(null);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <main className="page-root home-page">
      {!isIntroComplete ? (
        <HomeIntro isReady={isHeroReady} onComplete={() => setIsIntroComplete(true)} />
      ) : null}
      <HomeNav triggerElement={navTriggerElement} />
      <Canvas onReadyChange={setIsHeroReady} />
      <TextReveal onNavTriggerReady={setNavTriggerElement} />
      <FooterReveal />
    </main>
  );
}
