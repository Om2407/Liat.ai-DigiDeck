import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDeck } from '../DeckEngine';

const CountUp = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

export default function TheScale() {
  const { go } = useDeck();
  return (
    <div className="relative w-full h-screen bg-zinc-950 text-white overflow-hidden flex flex-col justify-between">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 p-8 md:p-16 pt-32 lg:pt-32">
        {/* Left: Stats */}
        <div className="flex flex-col justify-center max-w-3xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-12 text-[#0891b2]"
          >
            The Numbers<br />Don't Lie.
          </motion.h2>

          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {[
              { end: 40, suffix: 'M+', label: 'Annual Visitors', delay: 0.1 },
              { end: 3000000, suffix: '', label: 'Square Feet', delay: 0.2 },
              { end: 450, suffix: '+', label: 'Global Brands', delay: 0.3 },
              { end: 8, suffix: '', label: 'Miles from Manhattan', delay: 0.4 },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: stat.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tight leading-none mb-2">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-zinc-400 font-medium uppercase tracking-widest text-xs md:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Context */}
        <div className="flex flex-col justify-center items-start lg:items-end mt-12 lg:mt-0 lg:text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md"
          >
            <p className="text-xl md:text-2xl font-light text-zinc-300 leading-relaxed">
              More visitors than Disney World. More brands than any mall in North America. Eight miles from 20 million people.
            </p>
            <button 
              onClick={() => go(2)}
              className="mt-8 px-8 py-4 border border-zinc-700 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
            >
              Explore Retail →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 w-full px-8 md:px-16 pb-24 md:pb-32"
      >
        <div className="w-full h-[1px] bg-zinc-800 mb-6" />
        <p className="text-zinc-500 font-medium uppercase tracking-widest text-[10px] md:text-xs">
          The largest entertainment & retail destination in the Western Hemisphere
        </p>
      </motion.div>
    </div>
  );
}
