import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className, style, onClick, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const moveX = ((e.clientX - centerX) / (rect.width / 2)) * 12;
    const moveY = ((e.clientY - centerY) / (rect.height / 2)) * 12;
    x.set(moveX); y.set(moveY);
  };
  
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      onClick={onClick} 
      className={className} 
      style={{ ...style, x: springX, y: springY }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
