import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { useDeck, SLIDES } from '../DeckEngine';
import { useAudience, AUDIENCE_CONFIG, type Audience } from '../../context/AudienceContext';
import { LayoutGrid, X } from 'lucide-react';

const KB_IMAGES = [
  'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&q=85',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=85',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85',
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=85',
];

const VIDEOS = [
  '/videos/hero-main.mp4',
  '/videos/hero-panel.mp4',
];

const AUDIENCE_HERO: Record<Audience, {
  tag: string;
  headline: string[];
  sub: string;
  stats: { num: string; label: string }[];
  cta1: { label: string; section: number };
  cta2: { label: string; section: number };
}> = {
  all: {
    tag: 'East Rutherford, New Jersey',
    headline: ['AMERICAN', 'DREAM'],
    sub: "The Western Hemisphere's most spectacular entertainment & retail destination",
    stats: [
      { num: '40M+', label: 'Annual Visitors' },
      { num: '3M', label: 'Sq Ft' },
      { num: '450+', label: 'Brands' },
      { num: '8mi', label: 'From NYC' },
    ],
    cta1: { label: 'Explore the Opportunity', section: 1 },
    cta2: { label: 'Book a Venue', section: 10 },
  },
  tenant: {
    tag: '🏪 Retail Leasing Opportunity',
    headline: ['YOUR', 'FLAGSHIP.'],
    sub: "Join Hermès, Gucci, and 450+ brands on the world's most powerful retail stage.",
    stats: [
      { num: '40M+', label: 'Annual Footfall' },
      { num: '$180', label: 'Avg Spend / Visit' },
      { num: '4hrs+', label: 'Avg Dwell Time' },
      { num: '2-3×', label: 'Revenue vs Comparable' },
    ],
    cta1: { label: 'View Leasing Opportunities', section: 6 },
    cta2: { label: 'Calculate Your ROI', section: 7 },
  },
  sponsor: {
    tag: '🎯 Brand Sponsorship Platform',
    headline: ['YOUR BRAND.', 'OUR STAGE.'],
    sub: "40 million high-intent consumers. One unforgettable activation platform.",
    stats: [
      { num: '40M+', label: 'Annual Impressions' },
      { num: '$95K', label: 'Avg HHI' },
      { num: '8.4M', label: 'Social Reach' },
      { num: '200+', label: 'Events / Year' },
    ],
    cta1: { label: 'View Sponsorship Tiers', section: 11 },
    cta2: { label: 'Audience Insights', section: 1 },
  },
  event: {
    tag: '🎤 Event & Venue Booking',
    headline: ['YOUR EVENT.', 'OUR PLATFORM.'],
    sub: "5,000-seat arena. 300,000 sq ft expo center. 30,000 parking spots.",
    stats: [
      { num: '5K', label: 'Seat Capacity' },
      { num: '300K', label: 'Sq Ft Expo Hall' },
      { num: '200+', label: 'Events / Year' },
      { num: '30K', label: 'Parking Spots' },
    ],
    cta1: { label: 'Book the Venue', section: 10 },
    cta2: { label: 'View Event Packages', section: 10 },
  },
};

// --- CUSTOM HOOKS & COMPONENTS ---

function useTextScramble(text: string, trigger: boolean) {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    if (!trigger) {
      setDisplayText('');
      return;
    }
    
    let iteration = 0;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    let interval: ReturnType<typeof setInterval>;
    
    interval = setInterval(() => {
      setDisplayText(() => 
        text.split('').map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < Math.floor(iteration)) return text[idx];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      // Each iteration is ~40ms depending on interval, incrementing by 1/2 gives nice speed
      iteration += 0.5;
    }, 20);
    
    return () => clearInterval(interval);
  }, [text, trigger]);
  
  return displayText || text;
}

function FilmGrain() {
  const [baseFreq, setBaseFreq] = useState('0.85');
  
  useEffect(() => {
    let frameId: number;
    let count = 0;
    const updateFreq = () => {
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
    <div className="fixed inset-0 z-[5] pointer-events-none opacity-[0.035]">
      <svg width="100%" height="100%">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency={baseFreq} numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

function CursorSpotlight() {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(29,78,216,0.12), transparent 70%)`;

  return (
    <motion.div
      className="absolute inset-0 z-[6] pointer-events-none"
      style={{ background }}
    />
  );
}

function MagneticButton({ 
  children, 
  onClick, 
  className, 
  style 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string; 
  style?: React.CSSProperties 
}) {
  const ref = useRef<HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Move max ~12px
    const maxMove = 12;
    const moveX = (distanceX / (rect.width / 2)) * maxMove;
    const moveY = (distanceY / (rect.height / 2)) * maxMove;
    
    x.set(moveX);
    y.set(moveY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={{ ...style, x: springX, y: springY }}
    >
      {children}
    </motion.button>
  );
}

function CountUpStat({ finalString, delay }: { finalString: string, delay: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const match = finalString.match(/^([^0-9]*)(\d+)(.*?)$/);
  
  useEffect(() => {
    if (!match) return;
    const target = parseInt(match[2], 10);
    const duration = 2000;
    const startTime = performance.now();
    let animationFrameId: number;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime - (delay * 1000);
      if (elapsed < 0) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }
      
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(update);
      } else {
        setDisplayValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [finalString, delay, match]);

  if (!match) return <span>{finalString}</span>;

  return (
    <span>
      {match[1]}{displayValue}{match[3]}
    </span>
  );
}

// --- MAIN HERO COMPONENT ---

export default function Hero() {
  const { go } = useDeck();
  const { audience } = useAudience();
  const [activeBg, setActiveBg] = useState(0);
  const [gridOpen, setGridOpen] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(true);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);

  // Cinematic Intro Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroPlaying(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Trigger text scramble after intro
  useEffect(() => {
    if (!introPlaying) {
      const timer = setTimeout(() => setScrambleTrigger(true), 500);
      return () => clearTimeout(timer);
    }
  }, [introPlaying]);

  // Ken Burns Interval
  useEffect(() => {
    const t = setInterval(() => {
      setActiveBg((p) => (p + 1) % KB_IMAGES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const copy = AUDIENCE_HERO[audience];
  const cfg = AUDIENCE_CONFIG[audience];

  // Scramble hooks for headlines
  const headlineLine1 = useTextScramble(copy.headline[0] || '', scrambleTrigger);
  const headlineLine2 = useTextScramble(copy.headline[1] || '', scrambleTrigger);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      
      <FilmGrain />
      <CursorSpotlight />

      {/* INTRO OVERLAY */}
      <AnimatePresence>
        {introPlaying && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-white/60 font-thin uppercase tracking-widest text-xs md:text-sm mb-4"
            >
              THE WESTERN HEMISPHERE'S
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-white font-black uppercase text-xl md:text-3xl tracking-wide"
            >
              MOST POWERFUL COMMERCIAL PLATFORM.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KEN BURNS BACKGROUND */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeBg}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${KB_IMAGES[activeBg]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1.0 }}
              transition={{ duration: 6.5, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* OVERLAYS */}
      <div className="absolute inset-0 z-[2] bg-black/55" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-zinc-950/95 via-zinc-950/50 to-transparent" />

      {/* LOCATION TAG */}
      {!introPlaying && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute top-24 left-12 lg:left-16 z-[20]"
        >
          <p className="text-[11px] font-thin uppercase tracking-[0.4em] text-white/80" style={{ color: cfg.color }}>
            {copy.tag}
          </p>
        </motion.div>
      )}

      {/* MAIN CONTENT */}
      {!introPlaying && (
        <div className="absolute left-12 lg:left-16 top-1/2 -translate-y-1/2 z-[20] w-full max-w-7xl flex justify-between items-center pr-12 lg:pr-16">
          
          {/* LEFT TEXT */}
          <div className="flex-1 text-left">
            <h1 className="text-white font-black leading-[0.85] tracking-tighter mb-6 flex flex-col">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(4rem, 10vw, 9rem)' }}
              >
                {scrambleTrigger ? headlineLine1 : copy.headline[0]}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', color: cfg.color }}
              >
                {scrambleTrigger ? headlineLine2 : copy.headline[1]}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="text-white/80 text-xl md:text-2xl font-thin mb-12 max-w-lg leading-relaxed"
            >
              {copy.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <MagneticButton
                onClick={() => go(copy.cta1.section)}
                className="px-10 py-4 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: cfg.color, boxShadow: `0 8px 30px ${cfg.color}50` }}
              >
                {copy.cta1.label}
              </MagneticButton>
              <MagneticButton
                onClick={() => go(copy.cta2.section)}
                className="px-10 py-4 border-2 border-white/30 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white/10 transition-all"
              >
                {copy.cta2.label}
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT VIDEO CARDS */}
          <div className="hidden lg:flex flex-col gap-6 w-[280px] flex-shrink-0 z-[20]">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, rotate: -1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video group cursor-pointer"
            >
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src={VIDEOS[1]} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                <motion.div className="w-2 h-2 rounded-full bg-red-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="text-white text-[9px] font-black uppercase tracking-widest">Live Cam</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video group cursor-pointer"
            >
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src={VIDEOS[0]} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                 <span className="text-white/80 text-[10px] font-black uppercase tracking-widest">Featured Reel</span>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* BOTTOM STATS BAR */}
      {!introPlaying && (
        <div className="absolute bottom-0 left-0 w-full backdrop-blur-md border-t border-white/10 bg-black/20 z-[20] px-12 lg:px-16 py-6">
          <div className="max-w-7xl mx-auto flex flex-wrap gap-12 lg:gap-24">
            {copy.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + (i * 0.1), duration: 0.5 }}
                className="flex flex-col"
              >
                <p className="font-black text-3xl md:text-4xl tracking-tighter" style={{ color: cfg.color === '#3b82f6' ? 'white' : cfg.color }}>
                  <CountUpStat finalString={s.num} delay={1.2 + (i * 0.1)} />
                </p>
                <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-bold mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ALL SLIDES BUTTON */}
      {!introPlaying && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          onClick={() => setGridOpen(true)}
          className="absolute bottom-8 right-8 z-[30] flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/20 backdrop-blur-md text-white hover:bg-white/10 transition-all hover:scale-105"
        >
          <LayoutGrid size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">All Slides</span>
        </motion.button>
      )}

      {/* SLIDE OVERVIEW GRID OVERLAY */}
      <AnimatePresence>
        {gridOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8"
          >
            <button
              onClick={() => setGridOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all"
            >
              <X size={24} />
            </button>
            
            <div className="text-center mb-12">
              <h2 className="text-white font-black text-3xl tracking-widest uppercase mb-3">Where do you want to go?</h2>
              <p className="text-white/50 font-thin tracking-widest uppercase text-sm">Select a section to explore</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
              {SLIDES.map((slide, i) => (
                <motion.button
                  key={slide.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onClick={() => {
                    setGridOpen(false);
                    go(i);
                  }}
                  className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden transition-all hover:scale-105"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" style={{ backgroundColor: slide.color }} />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-current rounded-3xl transition-colors duration-300" style={{ color: slide.color }} />
                  
                  <span className="absolute top-4 left-4 text-white/30 text-[10px] font-black">{String(i + 1).padStart(2, '0')}</span>
                  
                  <span className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{slide.emoji}</span>
                  <span className="text-white font-bold tracking-widest uppercase text-xs">{slide.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
