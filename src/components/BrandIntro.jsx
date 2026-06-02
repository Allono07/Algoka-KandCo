import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import '../styles/brandIntro.css';

export default function BrandIntro() {
  const [visible, setVisible] = useState(true);

  const kControls = useAnimation();
  const wordControls = useAnimation();
  const groupControls = useAnimation();
  const circleControls = useAnimation();
  const overlayControls = useAnimation();

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;

    (async () => {
      // Phase 1: K fades in
      await kControls.start({ opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } });

      // 400ms later, word fades in
      await new Promise((r) => setTimeout(r, 400));
      await wordControls.start({ opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } });

      // Wait ~2850ms after word fully visible to match earlier intro duration
      await new Promise((r) => setTimeout(r, 2850));

      if (cancelled) return;

      // Phase 2 & 3: zoom group & expand white circle (start simultaneously)
      groupControls.start({ scale: 3.5, transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] } });
      circleControls.start({
        scale: 40,
        opacity: 1,
        transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
      });

      // Start fading the group opacity 400ms into the zoom (remaining 500ms)
      setTimeout(() => {
        groupControls.start({ opacity: 0, transition: { duration: 0.5, ease: 'linear' } });
      }, 400);

      // Shorter white hold so the landing page appears sooner.
      await new Promise((r) => setTimeout(r, 500));

      if (cancelled) return;

      // Mark content as ready before fading so the landing page is fully prepared underneath.
      try {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('kalpcoIntroComplete'));
        }
      } catch (e) {
        // ignore
      }

      // Phase 4: smoother overlay fade with less blank time.
      await overlayControls.start({ opacity: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] } });

      try {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('kalpcoIntroHidden'));
        }
      } catch (e) {
        // ignore
      }

      if (!cancelled) setVisible(false);
    })();

    return () => {
      cancelled = true;
    };
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
          <motion.div
            className="brand-intro-k"
            initial={{ opacity: 0 }}
            animate={kControls}
            style={{ willChange: 'opacity, transform' }}
          >
            K
          </motion.div>

          <motion.div
            className="brand-intro-word"
            initial={{ opacity: 0 }}
            animate={wordControls}
            style={{ willChange: 'opacity, transform' }}
          >
            KALP&CO
          </motion.div>
        </motion.div>

        <motion.div
          className="brand-intro-circle"
          initial={{ scale: 0, opacity: 0 }}
          animate={circleControls}
          style={{ willChange: 'transform, opacity' }}
        />
      </div>
    </motion.div>
  );
}
