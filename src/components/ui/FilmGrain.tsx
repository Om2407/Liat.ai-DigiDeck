import React, { useEffect, useState, useRef } from 'react';

interface FilmGrainProps {
  className?: string;
  opacity?: number;
}

export default function FilmGrain({ 
  className = "fixed inset-0 z-[5] pointer-events-none", 
  opacity = 0.035 
}: FilmGrainProps) {
  const [baseFreq, setBaseFreq] = useState('0.85');
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frameId: number;
    let count = 0;
    const updateFreq = () => {
      if (!isVisible.current) {
        frameId = requestAnimationFrame(updateFreq);
        return;
      }
      if (count % 3 === 0) { // animate grain every 3 frames
        const freq = 0.8 + Math.random() * 0.1;
        setBaseFreq(freq.toString());
      }
      count++;
      frameId = requestAnimationFrame(updateFreq);
    };
    frameId = requestAnimationFrame(updateFreq);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ opacity }}>
      <svg width="100%" height="100%">
        <filter id="global-grain">
          <feTurbulence type="fractalNoise" baseFrequency={baseFreq} numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#global-grain)" />
      </svg>
    </div>
  );
}
