import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { useDeck, SLIDES } from '../DeckEngine';

export type AudienceType = 'all' | 'tenant' | 'sponsor' | 'event';

const BRANDS = ["HERMÈS · GUCCI", "LOUIS VUITTON", "CARTIER · DIOR", "APPLE · ROLEX"];

function AnimatedStat({ val, label, index, inView }: { val: string, label: string, index: number, inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (val === '$180') {
      const duration = 1800;
      const start = performance.now();
      const update = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * 180));
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    } else if (val === '4hrs+') {
      const duration = 1500;
      const start = performance.now();
      const update = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * 4));
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    }
  }, [inView, val]);

  const displayVal = val === '$180' ? `$${count}` : val === '4hrs+' ? `${count}hrs+` : val;

  return (
    <div className="relative">
      {val === '2–3×' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          className="text-3xl md:text-4xl font-black text-amber-600 mb-1"
        >
          {displayVal}
        </motion.div>
      ) : (
        <div className="text-3xl md:text-4xl font-black text-amber-600 mb-1">
          {displayVal}
        </div>
      )}
      <div className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">{label}</div>

      {/* Shimmer line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: val === '2–3×' ? 1.2 : val === '$180' ? 1.8 : 1.5 }}
        className="h-px bg-amber-600/30 mt-3 origin-left w-3/4"
      />
    </div>
  );
}

export default function RetailLeasing({ currentAudience = 'all' }: { currentAudience?: AudienceType }) {
  const { go } = useDeck();
  const SLIDE_COLOR = '#b45309';
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isInitial = useRef(true);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => { isInitial.current = false; }, 1000);
      return () => clearTimeout(t);
    }
  }, [inView]);

  const CTA_TEXT = {
    tenant: "Schedule a Leasing Call →",
    sponsor: "Explore Brand Activation →",
    event: "View Event Spaces →",
    all: "Explore Leasing Opportunities →"
  }[currentAudience] || "Explore Leasing Opportunities →";

  const SUBHEAD_TEXT = {
    tenant: "Join Hermès, Gucci, Louis Vuitton — 40M customers waiting",
    sponsor: "Activate your brand where 40M consumers shop",
    event: "The most premium event backdrop in the Northeast",
    all: "Join 450+ global brands in America's #1 destination"
  }[currentAudience] || "Join 450+ global brands in America's #1 destination";

  return (
    <div ref={sectionRef} className="w-full h-screen bg-zinc-950 text-white overflow-hidden flex items-center relative">
      {/* VIDEO BACKGROUND */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.35] pointer-events-none">
        <source src="/videos/video-retail.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[rgba(8,8,8,0.88)] z-0 pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full relative z-10">

        {/* Left: Editorial Pitch */}
        <div className="flex flex-col justify-center px-8 md:px-16 pt-24 lg:pt-0 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4 text-amber-600">
              Retail Leasing
            </p>

            {/* HEADLINE ANIMATION */}
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-6">
              <span className="flex gap-3 mb-1">
                <span className="overflow-hidden block">
                  <motion.span className="block" initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 0.7, delay: 0 * 0.08, ease: [0.22, 1, 0.36, 1] }}>Your</motion.span>
                </span>
                <span className="overflow-hidden block">
                  <motion.span className="block" initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 0.7, delay: 1 * 0.08, ease: [0.22, 1, 0.36, 1] }}>Flagship.</motion.span>
                </span>
              </span>
              <span className="flex gap-3">
                <span className="overflow-hidden block">
                  <motion.span className="block" initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 0.7, delay: 2 * 0.08, ease: [0.22, 1, 0.36, 1] }}>Our</motion.span>
                </span>
                <span className="overflow-hidden block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentAudience}
                      className="block"
                      initial={{ y: '100%' }}
                      animate={inView ? { y: '0%' } : {}}
                      exit={{ y: '-100%' }}
                      transition={{
                        duration: isInitial.current ? 0.7 : 0.3,
                        delay: isInitial.current ? 3 * 0.08 : 0,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      {currentAudience === 'tenant' ? 'Traffic.' : 'Stage.'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </span>
            </h2>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-[2px] mb-8 origin-left w-32"
              style={{ backgroundColor: SLIDE_COLOR }}
            />

            {/* AUDIENCE-AWARE SUBHEADLINE */}
            <div className="min-h-[4rem] mb-8 relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentAudience}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg md:text-xl font-light text-zinc-300 leading-relaxed max-w-lg absolute top-0 left-0"
                >
                  {SUBHEAD_TEXT}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* STATS COUNT-UP */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 mt-4">
              {[
                { val: '$180', label: 'Avg spend / visit' },
                { val: '4hrs+', label: 'Avg dwell time' },
                { val: '2–3×', label: 'Revenue vs market' },
              ].map((metric, i) => (
                <AnimatedStat key={metric.val} val={metric.val} label={metric.label} index={i} inView={inView} />
              ))}
            </div>

            {/* CTA BUTTON */}
            <button
              onClick={() => {
                const idx = SLIDES.findIndex(s => s.id === 'retail');
                if (idx !== -1) go(idx);
              }}
              className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all overflow-hidden relative"
              style={{ backgroundColor: SLIDE_COLOR, color: '#fff' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentAudience}
                  className="block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {CTA_TEXT}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </div>

        {/* Right: Brands & ROI */}
        <div className="flex flex-col justify-center items-center p-8 md:p-16 relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-[120px] opacity-10 pointer-events-none"
            style={{ backgroundColor: SLIDE_COLOR }}
          />

          <div className="relative z-10 w-full max-w-lg text-center">

            {/* EYEBROW ABOVE BRANDS */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-[9px] uppercase tracking-[0.4em] text-amber-600/50 font-black mb-8 text-center"
            >
              450+ Global Brands · The Avenue
            </motion.p>

            {/* BRAND NAMES STAGGERED REVEAL */}
            <div className="text-zinc-300 font-serif text-3xl md:text-5xl leading-relaxed mb-12 flex flex-col gap-6">
              {BRANDS.map((brand, i) => (
                <motion.span
                  key={brand}
                  initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                  animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ letterSpacing: '0.02em' }}
                  whileHover={{ letterSpacing: '0.08em', color: SLIDE_COLOR, textShadow: `0 0 30px ${SLIDE_COLOR}60` }}
                  className="cursor-default transition-all duration-300"
                >
                  {brand}
                </motion.span>
              ))}
            </div>

            {/* ROI SNAPSHOT CARD */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="relative p-6 bg-zinc-950/50 backdrop-blur-md rounded-2xl inline-block text-left border border-zinc-800"
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute inset-0 rounded-2xl border pointer-events-none"
                style={{ borderColor: SLIDE_COLOR }}
              />
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">ROI Snapshot</p>
              <p className="text-sm md:text-base font-medium text-white leading-relaxed">
                A 2,000 sq ft space at American Dream =<br />
                projected <motion.span
                  animate={{ color: ['#ffffff', '#f59e0b', '#ffffff'] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="font-black inline-block"
                >
                  $4.2M annual revenue
                </motion.span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
