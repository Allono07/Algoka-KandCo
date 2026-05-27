import { useEffect, useState } from 'react';

export default function FormulaOneHero({ isActive }) {
  const [stage, setStage] = useState('idle');

  useEffect(() => {
    if (!isActive) {
      setStage('idle');
      return undefined;
    }

    setStage('entering');

    const settleTimer = window.setTimeout(() => {
      setStage('settled');
    }, 2600);

    return () => {
      window.clearTimeout(settleTimer);
    };
  }, [isActive]);

  return (
    <div className={`text-reveal__f1 text-reveal__f1--${stage}`} aria-hidden="true">
      <picture className="text-reveal__f1-picture">
        <source media="(max-width: 767px)" srcSet="/Landscape_F1.png" />
        <img className="text-reveal__f1-image" src="/Potrait_F1.png" alt="" loading="eager" decoding="async" />
      </picture>
    </div>
  );
}