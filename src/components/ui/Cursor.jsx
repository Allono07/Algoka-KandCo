import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);

    const addHover = () => {
      document.querySelectorAll('a, button, [cursor-pointer]').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };
    addHover();

    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        animate={{ x: pos.x - 6, y: pos.y - 6, scale: hovered ? 0 : 1 }}
        transition={{ type: 'spring', mass: 0.1, stiffness: 800, damping: 20 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: 12, height: 12,
          borderRadius: '50%', background: 'var(--color-accent)',
          pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'difference'
        }}
      />
      {/* Outer ring */}
      <motion.div
        animate={{ x: pos.x - 20, y: pos.y - 20, scale: hovered ? 2 : 1, opacity: hovered ? 0.4 : 0.6 }}
        transition={{ type: 'spring', mass: 0.4, stiffness: 150, damping: 20 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: 40, height: 40,
          borderRadius: '50%', border: '1px solid var(--color-accent)',
          pointerEvents: 'none', zIndex: 9998
        }}
      />
    </>
  );
}
