import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function FluidCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const scale = useMotionValue(1);
  const [cursorLabel, setCursorLabel] = useState('');

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  const springScale = useSpring(scale, { damping: 20, stiffness: 200 });

  useEffect(() => {
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 12);
      cursorY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isButton = target.closest('button, a, [data-cursor]');
      const isImage = target.closest('img, video, canvas');

      if (isButton) {
        scale.set(2.5);
        setCursorLabel('');
      } else if (isImage) {
        scale.set(3);
        setCursorLabel('VIEW');
      } else {
        scale.set(1);
        setCursorLabel('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, scale]);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: springX,
        top: springY,
        scale: springScale,
        pointerEvents: 'none',
        zIndex: 99999,
        mixBlendMode: 'difference',
      }}
      className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
    >
      {cursorLabel && (
        <span className="text-black text-[6px] font-black uppercase tracking-widest whitespace-nowrap">
          {cursorLabel}
        </span>
      )}
    </motion.div>
  );
}
