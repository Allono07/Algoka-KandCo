import { useState } from 'react';
import Canvas from '../components/Canvas';
import HomeNav from '../components/HomeNav';
import TextReveal from '../components/TextReveal';

export default function Home() {
  const [navTriggerElement, setNavTriggerElement] = useState(null);

  return (
    <main className="page-root home-page">
      <HomeNav triggerElement={navTriggerElement} />
      <Canvas />
      <TextReveal onNavTriggerReady={setNavTriggerElement} />
    </main>
  );
}
