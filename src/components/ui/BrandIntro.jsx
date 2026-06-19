import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function BrandIntro({ onComplete }) {
  const [visible, setVisible] = useState(true);

  const kControls = useAnimation();
  const wordControls = useAnimation();
  const groupControls = useAnimation();
  const circleControls = useAnimation();
  const overlayControls = useAnimation();

  useEffect(() => {
    const placeholder = document.getElementById('loader-placeholder');
    if (placeholder) {
      placeholder.remove();
    }

    if (!visible) return;
    let cancelled = false;

    (async () => {
      // Phase 1: K fades in
      await kControls.start({ opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } });

      // Word fades in shortly after
      await new Promise(r => setTimeout(r, 400));
      await wordControls.start({ opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } });

      // Hold
      await new Promise(r => setTimeout(r, 2850));
      if (cancelled) return;

      // Phase 2 & 3: zoom group + expand reveal circle
      groupControls.start({ scale: 3.5, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } });
      circleControls.start({
        scale: 40,
        opacity: 1,
        transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
      });

      setTimeout(() => {
        groupControls.start({ opacity: 0, transition: { duration: 0.5, ease: 'linear' } });
      }, 400);

      await new Promise(r => setTimeout(r, 500));
      if (cancelled) return;

      // Phase 4: fade overlay out
      await overlayControls.start({ opacity: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } });

      if (!cancelled) {
        onComplete?.();
        setVisible(false);
      }
    })();

    return () => { cancelled = true; };
  }, [visible, kControls, wordControls, groupControls, circleControls, overlayControls]);

  if (!visible) return null;

  return (
    <motion.div className="brand-intro-overlay" initial={{ opacity: 1 }} animate={overlayControls}>
      <div className="brand-intro-center">
        <motion.div
          className="brand-intro-group"
          initial={{ scale: 1, opacity: 1 }}
          animate={groupControls}
          style={{ willChange: 'transform, opacity' }}
        >
          <motion.div className="brand-intro-k" initial={{ opacity: 0 }} animate={kControls}>
            K
          </motion.div>
          <motion.div className="brand-intro-word" initial={{ opacity: 0 }} animate={wordControls}>
            KALP&amp;CO
          </motion.div>
        </motion.div>

        <motion.div
          className="brand-intro-circle"
          initial={{ scale: 0, opacity: 0 }}
          animate={circleControls}
        />
      </div>
    </motion.div>
  );
}