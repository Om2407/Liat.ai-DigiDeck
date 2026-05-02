import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, animate, useScroll, useTransform } from 'motion/react';

// ── FILM GRAIN ─────────────────────────────────────────────
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

// ── SCRAMBLE ───────────────────────────────────────────────
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";
function useScramble(text: string, trigger: boolean, duration: number = 1000) {
  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {
    if (!trigger) return;
    const start = Date.now();
    let frameId: number;
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      if (progress === 1) { setDisplayText(text); return; }
      const resolvedCount = Math.floor(progress * text.length);
      setDisplayText(text.split('').map((char, index) => {
        if (char === ' ') return ' ';
        if (index < resolvedCount) return char;
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }).join(''));
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [text, trigger, duration]);
  return displayText;
}

// ── TILT CARD ──────────────────────────────────────────────
const TiltCard = ({ children, className, style, onClick, onMouseEnter, onMouseLeave }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    rotateX.set(((my - rect.height / 2) / rect.height) * -14);
    rotateY.set(((mx - rect.width / 2) / rect.width) * 14);
    x.set(mx); y.set(my);
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    rotateX.set(0); rotateY.set(0);
    if (onMouseLeave) onMouseLeave(e);
  };
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.13) 0%, transparent 55%)`;
  return (
    <motion.div className={className} style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={onMouseEnter} onClick={onClick}>
      {children}
      <motion.div className="absolute inset-0 pointer-events-none z-50 rounded-2xl" style={{ background }} />
    </motion.div>
  );
};

// ── MAGNETIC BUTTON ────────────────────────────────────────
const MagneticButton = ({ children, className, style, onClick }: any) => {
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
    <motion.button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      onClick={onClick} className={className} style={{ ...style, x: springX, y: springY }}>
      {children}
    </motion.button>
  );
};

// ── COUNT PILL ─────────────────────────────────────────────
const CountPill = ({ text }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const match = text.match(/^(.*?)(\d+)(.*)$/);
  useEffect(() => {
    if (isVisible && match && countRef.current) {
      const target = parseInt(match[2], 10);
      animate(0, target, { duration: 1.5, ease: "easeOut", onUpdate: (v) => { if (countRef.current) countRef.current.textContent = Math.round(v).toString(); } });
    }
  }, [isVisible, match]);
  if (!match) return <span ref={ref}>{text}</span>;
  return <span ref={ref}>{match[1]}<span ref={countRef}>0</span>{match[3]}</span>;
};

// ── DATA ───────────────────────────────────────────────────
const ATTRACTIONS = [
  {
    id: 'nick', name: 'Nickelodeon Universe', emoji: '🎡', color: '#f97316',
    stats: "35+ Rides", sub: "America's Largest Indoor Theme Park",
    audienceSub: { tenant: "4M+ captive shoppers annually", sponsor: "Logo on 35+ ride signage", event: "Private buyout available" },
    fact: "4M+ riders annually", youtubeId: '4OD1JlNJ_ZE', img: '/images/nick.jpg',
  },
  {
    id: 'water', name: 'DreamWorks Water Park', emoji: '🌊', color: '#0891b2',
    stats: "40+ Slides", sub: "America's Largest Indoor Water Park",
    audienceSub: { tenant: "35M+ annual footfall exposure", sponsor: "DreamWorks IP co-branding rights", event: "After-hours private pool parties" },
    fact: "Open 365 days a year", youtubeId: 'TxwlwzOALcg', img: '/images/water.jpg',
  },
  {
    id: 'snow', name: 'Big SNOW', emoji: '⛷️', color: '#a855f7',
    stats: "Indoor Skiing", sub: "Only Indoor Ski Resort in North America",
    audienceSub: { tenant: "High-income demographic overlap", sponsor: "Exclusive lift & gear branding", event: "Corporate ski days & team events" },
    fact: "Open year-round, rain or shine", youtubeId: 'U2Hs7PnTET0', img: '/images/snow.jpg',
  },
  {
    id: 'arts', name: 'Performing Arts', emoji: '🎭', color: '#ec4899',
    stats: "5,000 Seats", sub: "World-Class Performing Arts Center",
    audienceSub: { tenant: "Cultural anchor driving evening traffic", sponsor: "Exclusive naming rights available", event: "5,000-seat capacity for live events" },
    fact: "200+ events per year", youtubeId: '3uczy_O7-uQ', img: '/images/arts.jpg',
  },
  {
    id: 'marvel', name: 'Marvel Experience', emoji: '🦸', color: '#ef4444',
    stats: "Exclusive Flagship", sub: "Marvel's Only Mall Experience",
    audienceSub: { tenant: "Prime co-location opportunity", sponsor: "Marvel IP experiential marketing", event: "Themed private corporate events" },
    fact: "Meet & greet + collectibles", youtubeId: 'pVxOVlm_lE8', img: '/images/marvel.jpg',
  },
];

export type AudienceType = 'all' | 'tenant' | 'sponsor' | 'event';

const HEADLINES: Record<AudienceType, string> = {
  all: "Where records are broken every day.",
  tenant: "35M+ annual visitors. Your brand, front and center.",
  sponsor: "5 world-record venues. Infinite brand moments.",
  event: "From intimate gatherings to 5,000-seat spectacles.",
};

const STATS: Record<AudienceType, { icon: string; text: string }[]> = {
  all: [{ icon: '🏆', text: '3 World Records' }, { icon: '🎢', text: '18M+ Annual Riders' }, { icon: '📅', text: 'Open 365 Days' }],
  tenant: [{ icon: '📍', text: 'Prime Visibility Zones' }, { icon: '🛍️', text: '35M+ Annual Footfall' }, { icon: '💰', text: 'Revenue Share Models' }],
  sponsor: [{ icon: '🎯', text: '5 Activation Venues' }, { icon: '📱', text: 'Social Reach 2M+' }, { icon: '🤝', text: 'IP Co-Branding Rights' }],
  event: [{ icon: '🎪', text: '5,000 Seat Capacity' }, { icon: '🏔️', text: 'Private Venue Buyouts' }, { icon: '📋', text: 'Turnkey Event Packages' }],
};

// ── VENUE MODAL (PHASE 2) ──────────────────────────────────
const VenueModal = ({ modalCard, currentAudience, onClose }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const videoY = useTransform(scrollY, [0, 500], [0, 150]);
  const videoOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.98 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[500] bg-[#030303] overflow-y-auto overflow-x-hidden flex flex-col"
    >
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 w-full px-8 py-6 flex justify-between items-center"
        style={{ background: 'linear-gradient(to bottom, rgba(3,3,3,0.9), transparent)' }}>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10"
            style={{ background: `linear-gradient(135deg, ${modalCard.color}40, transparent)` }}>
            <span className="text-xl">{modalCard.emoji}</span>
          </div>
          <div>
            <h2 className="text-white font-black uppercase tracking-widest text-sm">{modalCard.name}</h2>
            <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold">{modalCard.stats}</p>
          </div>
        </div>
        <button onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Cinematic Hero Video with Parallax */}
      <motion.div style={{ y: videoY, opacity: videoOpacity }} className="relative w-full h-[60vh] md:h-[75vh] flex-shrink-0">
        <iframe className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={`https://www.youtube.com/embed/${modalCard.youtubeId}?autoplay=1&loop=1&playlist=${modalCard.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&mute=1`}
          allow="autoplay; encrypted-media" />

        <div className="absolute inset-0" style={{
          background: `linear-gradient(to top, #030303 0%, ${modalCard.color}20 50%, transparent 100%)`
        }} />

        {/* Action Floating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 p-2 pr-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          <MagneticButton className="px-8 py-4 rounded-full text-white font-black uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-2xl"
            style={{ backgroundColor: modalCard.color, boxShadow: `0 0 40px ${modalCard.color}80` }}>
            Book This Venue
          </MagneticButton>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Available 2026</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Deep Dive Data Grid */}
      <div className="max-w-6xl mx-auto w-full px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 bg-[#030303]">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="col-span-1 md:col-span-2 p-10 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
            style={{ background: `radial-gradient(circle at center, ${modalCard.color}, transparent)` }} />
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">The Opportunity</h4>
          <p className="text-3xl font-thin text-white leading-snug">
            {currentAudience === 'all' ? modalCard.sub : modalCard.audienceSub[currentAudience as keyof typeof modalCard.audienceSub]}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Key Metric</h5>
              <p className="text-2xl font-black text-white">{modalCard.fact}</p>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Primary Audience</h5>
              <p className="text-2xl font-black text-white">Gen-Z & Millennials</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="col-span-1 p-10 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center relative overflow-hidden"
          style={{ background: `linear-gradient(145deg, ${modalCard.color}15, transparent)` }}>
          <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-6"
            style={{ color: modalCard.color }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-2">Sponsorship Tier</h4>
          <p className="text-2xl font-black text-white uppercase tracking-wider">Title Partner</p>
          <MagneticButton className="mt-8 text-[9px] font-black uppercase tracking-[0.2em] px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors">
            View Rate Card
          </MagneticButton>
        </motion.div>

      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden border-t border-white/10 bg-[#030303] py-6 pb-12 mt-auto relative z-10">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/30"
        >
          {Array(8).fill("✦ PAST SPONSORS: COCA-COLA ✦ HYUNDAI ✦ M&M'S ✦ RED BULL ✦ L'OREAL").map((txt, i) => (
            <span key={i}>{txt}</span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// ── MAIN ───────────────────────────────────────────────────
export default function EntertainmentDeck({ currentAudience = 'all' }: { currentAudience?: AudienceType }) {
  const angleRef = useRef(0);
  const rafRef = useRef<number>();
  const pausedRef = useRef(false);
  const hoveredIdRef = useRef<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wheelRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [frontColor, setFrontColor] = useState(ATTRACTIONS[0].color);
  const [frontIndex, setFrontIndex] = useState(0);
  const [modalCard, setModalCard] = useState<typeof ATTRACTIONS[0] | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [entered, setEntered] = useState(false);

  const [trail, setTrail] = useState<{ x: number; y: number; id: number; color: string }[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailRef = useRef(0);

  // Scramble trigger
  useEffect(() => { const t = setTimeout(() => setEntered(true), 120); return () => clearTimeout(t); }, []);
  const headline1 = useScramble("NOTHING ELSE", entered, 1200);
  const headline2 = useScramble("COMES CLOSE.", entered, 1400);

  // Wheel RAF
  useEffect(() => {
    let lastGlowUpdate = 0;
    const tick = (time: number) => {
      if (!pausedRef.current) angleRef.current += 0.22;
      let maxZ = -1000, currentFrontIndex = 0;

      ATTRACTIONS.forEach((attr, i) => {
        const el = cardRefs.current[i]; if (!el) return;
        const rad = ((i * 72) + angleRef.current) * Math.PI / 180;
        const x = 350 + 300 * Math.cos(rad);
        const y = 140 + 100 * Math.sin(rad);
        const zIndex = Math.round(y);
        if (zIndex > maxZ) { maxZ = zIndex; currentFrontIndex = i; }
        const normalizedY = (y - 40) / 200;
        const isHov = hoveredIdRef.current === attr.id;
        const scale = isHov ? 1.48 : 0.72 + normalizedY * 0.38;
        const opacity = hoveredIdRef.current && !isHov ? 0.15 : 0.55 + normalizedY * 0.45;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.zIndex = isHov ? '999' : String(zIndex);
        el.style.transform = `translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(opacity);
      });

      if (time - lastGlowUpdate > 500) {
        setFrontIndex(currentFrontIndex);
        setFrontColor(ATTRACTIONS[currentFrontIndex].color);
        lastGlowUpdate = time;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    // Entry: cards fly in with rotateY flip
    ATTRACTIONS.forEach((_, i) => {
      const el = cardRefs.current[i];
      if (el) { el.style.opacity = '0'; el.style.transform = 'translate(-50%,-50%) scale(0) rotateY(90deg)'; }
      setTimeout(() => {
        const el = cardRefs.current[i]; if (!el) return;
        el.style.transition = 'opacity 0.55s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity = '0.6';
        el.style.transform = 'translate(-50%,-50%) scale(0.8) rotateY(0deg)';
        setTimeout(() => { el.style.transition = ''; }, 750);
      }, i * 130 + 250);
    });

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const handleMouseEnter = (attr: typeof ATTRACTIONS[0]) => {
    pausedRef.current = true; hoveredIdRef.current = attr.id; setHoveredId(attr.id);
  };
  const handleMouseLeave = () => {
    pausedRef.current = false; hoveredIdRef.current = null; setHoveredId(null);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = Date.now();
    if (now - lastTrailRef.current < 35) return;
    lastTrailRef.current = now;
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    trailIdRef.current += 1;
    const pt = { x: e.clientX - rect.left, y: e.clientY - rect.top, id: trailIdRef.current, color: frontColor };
    setTrail(prev => { const u = [...prev, pt]; return u.length > 8 ? u.slice(u.length - 8) : u; });
    setTimeout(() => setTrail(prev => prev.filter(p => p.id !== pt.id)), 550);
  };

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center">
      {/* ── AMBIENT VIDEO BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay loop muted playsInline
          className="absolute w-full h-full object-cover"
          src="/videos/entertainment.mp4"
        />
        {/* Dark cinematic overlay for text readability */}
        <div className="absolute inset-0 bg-[#050505]/65" />
        {/* Dynamic color gradient overlay */}
        <div className="absolute inset-0 mix-blend-overlay" style={{ background: `linear-gradient(to top, #050505 0%, ${frontColor}40 50%, #050505 100%)`, transition: 'background 1.5s ease' }} />
      </div>



      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Light leak top-left */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[160px] opacity-8 pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)' }} />

      {/* Light leak bottom-right */}
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full blur-[140px] opacity-6 pointer-events-none z-0"
        style={{ background: `radial-gradient(circle, ${frontColor}60 0%, transparent 70%)`, transition: 'background 1.5s ease' }} />

      {/* Ambient glow — center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-[140px] opacity-15 pointer-events-none z-0"
        style={{ backgroundColor: frontColor, transition: 'background-color 1s ease' }} />

      <AnimatePresence>
        {hoveredId && (
          <motion.div key={hoveredId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[90px] pointer-events-none z-0"
            style={{ backgroundColor: (ATTRACTIONS.find(a => a.id === hoveredId)?.color ?? '#fff') + '60' }} />
        )}
      </AnimatePresence>

      {/* ── HEADER ── */}
      <div className="relative z-10 text-center mb-8 flex flex-col items-center">
        {/* Eyebrow with expanding lines */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={entered ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.05 }}
          className="flex items-center gap-4 mb-4">
          <motion.div initial={{ scaleX: 0 }} animate={entered ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
            className="w-14 h-px bg-cyan-500/40 origin-right" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">World-Record Attractions</p>
          <motion.div initial={{ scaleX: 0 }} animate={entered ? { scaleX: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
            className="w-14 h-px bg-cyan-500/40 origin-left" />
        </motion.div>

        {/* Headlines — clip + scramble + letter-spacing collapse */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden">
            <motion.span className="block font-black uppercase leading-[0.88] text-white"
              style={{
                fontSize: 'clamp(2.2rem,5vw,5rem)',
                letterSpacing: entered ? '-0.03em' : '0.2em',
                filter: entered ? 'blur(0px)' : 'blur(10px)',
                transition: 'letter-spacing 1s ease, filter 0.8s ease',
              }}
              initial={{ y: '105%' }} animate={entered ? { y: '0%' } : {}}
              transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}>
              {headline1}
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span className="block font-black uppercase leading-[0.88] italic"
              style={{
                fontSize: 'clamp(2.2rem,5vw,5rem)',
                color: frontColor,
                letterSpacing: entered ? '-0.03em' : '0.2em',
                filter: entered ? 'blur(0px)' : 'blur(10px)',
                transition: 'color 1s ease, letter-spacing 1s ease, filter 0.8s ease',
              }}
              initial={{ y: '105%' }} animate={entered ? { y: '0%' } : {}}
              transition={{ duration: 0.95, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
              {headline2}
            </motion.span>
          </div>
        </div>
      </div>

      {/* ── WHEEL ── */}
      <div ref={wheelRef} onMouseMove={handleMouseMove} className="relative z-10 mx-auto" style={{ width: 700, height: 280 }}>

        {/* Cursor trail — bigger dots, longer life */}
        <AnimatePresence>
          {trail.map((p) => (
            <motion.div key={p.id}
              initial={{ opacity: 0.9, scale: 1.2 }}
              animate={{ opacity: 0, scale: 0.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
              className="absolute rounded-full pointer-events-none"
              style={{ left: p.x, top: p.y, width: 12, height: 12, transform: 'translate(-50%,-50%)', backgroundColor: p.color, boxShadow: `0 0 16px ${p.color}, 0 0 4px ${p.color}` }} />
          ))}
        </AnimatePresence>

        {/* Cards */}
        {ATTRACTIONS.map((attr, i) => (
          <div key={attr.id} ref={(el) => { cardRefs.current[i] = el; }} className="absolute" style={{ width: 175, height: 210 }}>
            <TiltCard
              onMouseEnter={() => handleMouseEnter(attr)}
              onMouseLeave={() => handleMouseLeave()}
              onClick={() => { setModalCard(attr); pausedRef.current = true; }}
              className="w-full h-full rounded-2xl overflow-hidden cursor-pointer flex flex-col"
              style={{
                border: `1px solid ${hoveredId === attr.id ? attr.color + '90' : frontIndex === i ? attr.color + '60' : attr.color + '35'}`,
                background: `linear-gradient(145deg, ${attr.color}18, ${attr.color}06, #080808)`,
                backdropFilter: 'blur(16px)',
                boxShadow: hoveredId === attr.id
                  ? `0 28px 80px ${attr.color}55, 0 0 0 1px ${attr.color}40, 0 0 60px ${attr.color}20`
                  : frontIndex === i ? `0 0 40px ${attr.color}45` : 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
            >
              {/* Top 60% */}
              <div className="relative overflow-hidden" style={{ height: '60%' }}>
                {!imgErrors[attr.id] ? (
                  <img src={attr.img} alt={attr.name}
                    onError={() => setImgErrors(prev => ({ ...prev, [attr.id]: true }))}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: hoveredId === attr.id ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.7s ease', filter: hoveredId === attr.id ? 'brightness(0.28) saturate(1.3)' : 'brightness(0.82)' }} />
                ) : (
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${attr.color}50, #080808)` }} />
                )}

                {/* YT thumbnail on hover */}
                <img src={`https://img.youtube.com/vi/${attr.youtubeId}/maxresdefault.jpg`} alt=""
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  style={{ opacity: hoveredId === attr.id ? 0.6 : 0, transition: 'opacity 0.5s ease' }} />

                <div className="absolute inset-0" style={{
                  background: hoveredId === attr.id
                    ? `linear-gradient(135deg, ${attr.color}40, rgba(0,0,0,0.55))`
                    : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)',
                  transition: 'background 0.4s ease',
                }} />

                {/* Emoji */}
                <motion.span className="absolute top-3 left-3 text-xl z-10"
                  animate={{ opacity: hoveredId === attr.id ? 0 : 1, scale: hoveredId === attr.id ? 0.5 : 1 }}
                  transition={{ duration: 0.25 }}>
                  {attr.emoji}
                </motion.span>

                {/* Hover overlay */}
                <AnimatePresence>
                  {hoveredId === attr.id && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex flex-col items-center justify-center z-20">
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[7px] font-black uppercase tracking-widest text-white">Live Preview</span>
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], boxShadow: [`0 0 20px ${attr.color}80`, `0 0 40px ${attr.color}cc`, `0 0 20px ${attr.color}80`] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                        style={{ background: `linear-gradient(135deg, ${attr.color}, ${attr.color}88)` }}>
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                      </motion.div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/90">Click to Watch</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom 40% */}
              <div className="flex flex-col justify-center px-3 border-t relative z-20"
                style={{ height: '40%', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.07)' }}>
                <h3 className="font-black text-[11px] uppercase tracking-wide text-white leading-tight mb-0.5 line-clamp-2" title={attr.name}>{attr.name}</h3>
                <p className="text-[10px] font-bold mb-0.5" style={{ color: attr.color }}>{attr.stats}</p>
                <div className="relative h-3 w-full overflow-hidden">
                  <AnimatePresence>
                    <motion.p key={currentAudience}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 top-0 w-full text-[8px] text-white/35 uppercase tracking-wider line-clamp-1">
                      {currentAudience === 'all' ? attr.sub : attr.audienceSub[currentAudience as keyof typeof attr.audienceSub]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-6 mb-4 z-10">
        {ATTRACTIONS.map((attr, i) => (
          <motion.div key={attr.id}
            animate={{ width: i === frontIndex ? 24 : 6, backgroundColor: i === frontIndex ? attr.color : 'rgba(255,255,255,0.15)', boxShadow: i === frontIndex ? `0 0 8px ${attr.color}` : 'none' }}
            transition={{ duration: 0.4 }} className="h-1.5 rounded-full" />
        ))}
      </div>

      {/* Audience headline banner */}
      <div className="z-10 mb-4 h-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentAudience}
            initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="text-[13px] font-black uppercase tracking-widest text-center px-4"
            style={{ color: frontColor, transition: 'color 1s ease' }}>
            {HEADLINES[currentAudience]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stat pills */}
      <div className="flex flex-wrap justify-center z-10 min-h-[40px]">
        <AnimatePresence mode="wait">
          <motion.div key={currentAudience} className="flex flex-wrap justify-center gap-3"
            initial="hidden" animate="visible" exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
            }}>
            {STATS[currentAudience].map((stat) => (
              <motion.div key={stat.text}
                variants={{
                  hidden: { opacity: 0, y: 16, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
                  exit: { opacity: 0, y: -12, scale: 0.9, transition: { duration: 0.3 } },
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white/55 shrink-0"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(10px)' }}>
                <span>{stat.icon}</span>
                <CountPill text={stat.text} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── EXPANDABLE VENUE SUB-MODULE (PHASE 2) ── */}
      <AnimatePresence>
        {modalCard && (
          <VenueModal
            modalCard={modalCard}
            currentAudience={currentAudience}
            onClose={() => { setModalCard(null); pausedRef.current = false; }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}