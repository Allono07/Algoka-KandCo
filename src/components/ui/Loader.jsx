import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          style={{
            position: 'fixed', inset: 0, background: 'var(--color-black)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10000, flexDirection: 'column', gap: '24px'
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-display)', fontSize: '36px', fontWeight: 800,
              letterSpacing: '0.1em', color: 'var(--color-white)'
            }}
          >
            KALP<span style={{ color: 'var(--color-accent)' }}>&</span>CO
          </motion.div>
          <div style={{ width: '200px', height: '1px', background: 'var(--color-border)' }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{ height: '100%', background: 'var(--color-accent)', transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
