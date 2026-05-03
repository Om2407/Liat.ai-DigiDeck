import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

// --- DATA ---
const FOOD_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', label: 'Fine Dining' },
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80', label: 'Gourmet Cuisine' },
  { url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&q=80', label: 'Fresh & Local' },
  { url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', label: 'Artisan Pizza' },
  { url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80', label: 'Breakfast & Brunch' },
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80', label: 'Sushi & Japanese' },
  { url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=80', label: 'Casual Dining' },
  { url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80', label: 'Healthy Bowls' },
];

const doubled = [...FOOD_IMAGES, ...FOOD_IMAGES];

// --- FILM GRAIN ---
function FilmGrain() {
  const [baseFreq, setBaseFreq] = useState('0.85');
  useEffect(() => {
    let frameId: number;
    let count = 0;
    const updateFreq = () => {
      if (count % 3 === 0) setBaseFreq((0.8 + Math.random() * 0.1).toString());
      count++;
      frameId = requestAnimationFrame(updateFreq);
    };
    frameId = requestAnimationFrame(updateFreq);
    return () => cancelAnimationFrame(frameId);
  }, []);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%">
        <filter id="grain-dining">
          <feTurbulence type="fractalNoise" baseFrequency={baseFreq} numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-dining)" />
      </svg>
    </div>
  );
}

// --- STAT BOX ---
function StatBox({ target, prefix = "", suffix = "", label, delay = 0 }: { target: number, prefix?: string, suffix?: string, label: string, delay?: number }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(Math.floor(ease * target));
      
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      frameId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [target, delay]);

  return (
    <div className="bg-zinc-900 border-l-2 border-[#dc2626] p-4 rounded-r-xl flex-1 flex flex-col justify-center">
      <p className="text-white font-black text-2xl xl:text-3xl mb-1">{prefix}{val}{suffix}</p>
      <p className="text-zinc-400 text-[10px] uppercase tracking-widest font-bold">{label}</p>
    </div>
  );
}

export default function DiningLifestyle() {
  const headlineWords = ['STAY', 'LONGER.', 'SPEND', 'MORE.'];

  return (
    <div className="w-full h-screen bg-zinc-950 text-white overflow-hidden flex relative font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .scroll-strip {
          animation: scrollUp 18s linear infinite;
        }
        .scroll-strip:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <FilmGrain />

      {/* AMBIENT GLOW */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#dc2626]/10 blur-[150px] rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none z-0" />

      {/* LEFT COLUMN */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-1/2 h-full flex flex-col justify-center px-16 xl:px-24 z-10"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#dc2626] mb-6">
          Dining & Lifestyle
        </p>

        <h2 className="text-[clamp(4rem,7vw,7.5rem)] leading-[0.9] mb-8" style={{ fontFamily: '"Playfair Display", serif', color: '#fef3c7' }}>
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-zinc-400 text-lg xl:text-xl font-medium mb-12"
        >
          100+ restaurants. 90 minutes added to average visit.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex gap-4 w-full max-w-2xl mb-12"
        >
          <StatBox target={100} suffix="+" label="Dining Concepts" delay={1200} />
          <StatBox target={90} prefix="+" suffix=" MIN" label="Avg Visit Extension" delay={1350} />
          <StatBox target={180} prefix="$" suffix="+" label="Per-Visit Spend" delay={1500} />
        </motion.div>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-[#dc2626] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-red-500 transition-colors w-max"
        >
          View F&B Leasing Opportunities <span className="text-lg leading-none">→</span>
        </motion.button>
      </motion.div>

      {/* RIGHT COLUMN */}
      <div className="w-1/2 h-full relative z-10 overflow-hidden bg-zinc-950/50">
        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none" />
        
        {/* Strip container */}
        <div className="w-full h-[200%] px-8 xl:px-16 absolute top-0 left-0">
          <div className="scroll-strip grid grid-cols-2 gap-3 w-full px-6 pt-4">
            {doubled.map((img, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02] shrink-0 ${i % 3 === 0 ? 'col-span-2 h-[200px]' : 'h-[160px]'}`}
              >
                <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <p className="absolute bottom-3 left-4 text-white text-[10px] font-black uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                  {img.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none" />
      </div>

    </div>
  );
}
