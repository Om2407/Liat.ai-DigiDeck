// import { Search, Menu, MapPin, Clock } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useAudience, AUDIENCE_CONFIG } from '../context/AudienceContext';

// const NAV_LINKS = [
//   { label: 'Home',    id: 'hero' },
//   { label: 'Parks',   id: 'parks' },
//   { label: 'Shops',   id: 'retail' },
//   { label: 'Dining',  id: 'dining' },
//   { label: 'Events',  id: 'events' },
//   { label: 'Marvel',  id: 'marvel' },
//   { label: 'Contact', id: 'contact' },
// ];

// export default function Header() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { audience } = useAudience();
//   const cfg = AUDIENCE_CONFIG[audience];

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', handler, { passive: true });
//     return () => window.removeEventListener('scroll', handler);
//   }, []);

//   const scrollTo = (id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
//     setMobileOpen(false);
//   };

//   return (
//     <header
//       className="sticky top-0 z-[100] transition-all duration-500"
//       style={{
//         background: scrolled
//           ? 'rgba(9,9,11,0.92)'
//           : 'rgba(9,9,11,0.75)',
//         backdropFilter: 'blur(20px)',
//         borderBottom: '1px solid rgba(255,255,255,0.06)',
//       }}
//     >
//       <div className="container mx-auto px-6 h-16 flex items-center justify-between">

//         {/* Logo */}
//         <button
//           onClick={() => scrollTo('hero')}
//           aria-label="American Dream - Go to top"
//           className="text-lg font-black tracking-tighter uppercase whitespace-nowrap text-white hover:opacity-80 transition-opacity"
//         >
//           American <span style={{ color: cfg.color }}>Dream</span>
//           <span style={{ color: cfg.color }}>.</span>
//         </button>

//         {/* Nav */}
//         <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7 text-[10px] font-black uppercase tracking-widest text-white/40">
//           {NAV_LINKS.map(link => (
//             <button
//               key={link.id}
//               onClick={() => scrollTo(link.id)}
//               aria-label={`Navigate to ${link.label}`}
//               className="hover:text-white transition-colors duration-200"
//             >
//               {link.label}
//             </button>
//           ))}
//         </nav>

//         {/* Right */}
//         <div className="flex items-center gap-4">
//           <div className="hidden md:flex items-center gap-4 text-white/30">
//             <div className="flex items-center gap-1.5 cursor-pointer hover:text-white/70 transition-colors">
//               <MapPin size={13} />
//               <span className="text-[9px] uppercase font-bold tracking-wider">Directions</span>
//             </div>
//             <div className="flex items-center gap-1.5 border-l pl-4 cursor-pointer hover:text-white/70 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
//               <Clock size={13} />
//               <span className="text-[9px] uppercase font-bold tracking-wider">Hours</span>
//             </div>
//           </div>

//           <button aria-label="Search" className="p-2 hover:bg-white/8 rounded-full transition-colors text-white/50 hover:text-white">
//             <Search size={17} />
//           </button>

//           <button
//             onClick={() => scrollTo('contact')}
//             aria-label="Partner with us - Go to contact"
//             className="hidden sm:block px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-white transition-all hover:opacity-90"
//             style={{ backgroundColor: cfg.color, boxShadow: `0 0 20px ${cfg.color}40` }}
//           >
//             Partner With Us
//           </button>

//           <button
//             aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
//             aria-expanded={mobileOpen}
//             className="lg:hidden p-2 hover:bg-white/8 rounded-full transition-colors text-white/60"
//             onClick={() => setMobileOpen(o => !o)}
//           >
//             <Menu size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {mobileOpen && (
//         <div
//           className="lg:hidden px-6 py-4 flex flex-col gap-3"
//           style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(9,9,11,0.98)' }}
//         >
//           {NAV_LINKS.map(link => (
//             <button
//               key={link.id}
//               onClick={() => scrollTo(link.id)}
//               className="text-left text-sm font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors py-2"
//             >
//               {link.label}
//             </button>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }
// // import { Search, ShoppingCart, Menu, MapPin, Clock } from 'lucide-react';
// // import { useState } from 'react';

// // const NAV_LINKS = [
// //   { label: 'Home',         id: 'hero' },
// //   { label: 'Parks',        id: 'parks' },
// //   { label: 'Shops',        id: 'retail' },
// //   { label: 'Dining',       id: 'dining' },
// //   { label: 'Events',       id: 'events' },
// //   { label: 'Marvel',       id: 'marvel' },
// //   { label: 'Contact',      id: 'contact' }
// // ];

// // export default function Header() {
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   const scrollTo = (id: string) => {
// //     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
// //     setMobileOpen(false);
// //   };

// //   return (
// //     <header className="sticky top-0 z-[100] bg-white/95 backdrop-blur-md border-b border-zinc-100">
// //       <div className="container mx-auto px-6 h-20 flex items-center justify-between">

// //         {/* Logo + Nav */}
// //         <div className="flex items-center gap-10">
// //           <button onClick={() => scrollTo('hero')} className="text-xl font-black tracking-tighter uppercase whitespace-nowrap hover:text-blue-600 transition-colors">
// //             American Dream<span className="text-blue-600">.</span>
// //           </button>
// //           <nav className="hidden lg:flex items-center gap-7 text-[11px] font-black uppercase tracking-widest text-zinc-400">
// //             {NAV_LINKS.map(link => (
// //               <button
// //                 key={link.id}
// //                 onClick={() => scrollTo(link.id)}
// //                 className="hover:text-blue-600 transition-colors"
// //               >
// //                 {link.label}
// //               </button>
// //             ))}
// //           </nav>
// //         </div>

// //         {/* Right actions */}
// //         <div className="flex items-center gap-5">
// //           <div className="hidden md:flex items-center gap-4 text-zinc-400">
// //             <div className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-700 transition-colors">
// //               <MapPin size={15} />
// //               <span className="text-[10px] uppercase font-bold tracking-wider">Directions</span>
// //             </div>
// //             <div className="flex items-center gap-1.5 border-l pl-4 border-zinc-100 cursor-pointer hover:text-zinc-700 transition-colors">
// //               <Clock size={15} />
// //               <span className="text-[10px] uppercase font-bold tracking-wider">Hours</span>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-1">
// //             <button className="p-2 hover:bg-zinc-50 rounded-full transition-colors"><Search size={19} /></button>
// //             <button className="p-2 hover:bg-zinc-50 rounded-full transition-colors"><ShoppingCart size={19} /></button>
// //             <button
// //               className="lg:hidden p-2 hover:bg-zinc-50 rounded-full transition-colors"
// //               onClick={() => setMobileOpen(o => !o)}
// //             >
// //               <Menu size={19} />
// //             </button>
// //           </div>

// //           <button
// //             onClick={() => scrollTo('contact')}
// //             className="hidden sm:block btn-primary text-[10px] uppercase tracking-widest px-6 py-3"
// //           >
// //             Book Tickets
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile menu */}
// //       {mobileOpen && (
// //         <div className="lg:hidden border-t border-zinc-100 bg-white px-6 py-4 flex flex-col gap-3">
// //           {NAV_LINKS.map(link => (
// //             <button
// //               key={link.id}
// //               onClick={() => scrollTo(link.id)}
// //               className="text-left text-sm font-black uppercase tracking-widest text-zinc-500 hover:text-blue-600 transition-colors py-2"
// //             >
// //               {link.label}
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //     </header>
// //   );
// // }


import { Search, Menu, MapPin, Clock, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useAudience, AUDIENCE_CONFIG, type Audience } from '../context/AudienceContext';

const NAV_LINKS = [
  { label: 'Home', id: 'hero' },
  { label: 'Parks', id: 'parks' },
  { label: 'Shops', id: 'retail' },
  { label: 'Dining', id: 'dining' },
  { label: 'Events', id: 'events' },
  { label: 'Marvel', id: 'marvel' },
  { label: 'Contact', id: 'contact' },
];

const AUDIENCE_META: Record<Audience, { pitch: string; badge: string }> = {
  all: { pitch: 'Explore the full American Dream experience', badge: 'EXPLORE' },
  tenant: { pitch: '40M+ annual customers. Your next flagship.', badge: 'LEASE' },
  sponsor: { pitch: 'Unmatched eyeballs. One iconic address.', badge: 'SPONSOR' },
  event: { pitch: '5,000-seat arena. 200+ events per year.', badge: 'BOOK' },
};

// ── 3D Tilt Card for each audience option ──────────────────────
function AudienceCard({
  id, cfg, meta, isActive, onClick,
}: {
  id: Audience;
  cfg: typeof AUDIENCE_CONFIG[Audience];
  meta: typeof AUDIENCE_META[Audience];
  isActive: boolean;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  const glowX = useTransform(x, [-0.5, 0.5], ['20%', '80%']);
  const glowY = useTransform(y, [-0.5, 0.5], ['20%', '80%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
        background: isActive
          ? `linear-gradient(135deg, ${cfg.color}22, ${cfg.color}08)`
          : 'rgba(255,255,255,0.03)',
        borderColor: isActive ? `${cfg.color}60` : 'rgba(255,255,255,0.07)',
        boxShadow: isActive ? `0 8px 32px ${cfg.color}20, inset 0 0 20px ${cfg.color}08` : 'none',
      }}
      className="relative w-full text-left rounded-2xl overflow-hidden border transition-all duration-300 group"
    >
      {/* Dynamic glow that follows cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(120px circle at ${glowX} ${glowY}, ${cfg.color}20, transparent)`,
        }}
      />

      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)` }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative p-4 flex items-start gap-3" style={{ transform: 'translateZ(20px)' }}>
        {/* Emoji with glow bg */}
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all duration-300"
          style={{
            background: `${cfg.color}18`,
            border: `1px solid ${cfg.color}30`,
            boxShadow: isActive ? `0 0 16px ${cfg.color}30` : 'none',
          }}
        >
          {cfg.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[11px] font-black uppercase tracking-widest transition-colors duration-300"
              style={{ color: isActive ? cfg.color : 'rgba(255,255,255,0.8)' }}
            >
              {cfg.label}
            </span>
            {isActive && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                style={{ background: `${cfg.color}25`, color: cfg.color }}
              >
                ACTIVE
              </motion.span>
            )}
          </div>
          <p className="text-[9px] text-white/35 leading-relaxed">{meta.pitch}</p>
        </div>

        {/* Arrow */}
        <motion.div
          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
          style={{ background: isActive ? cfg.color : 'rgba(255,255,255,0.06)' }}
          animate={{ x: isActive ? 0 : -4, opacity: isActive ? 1 : 0.4 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-[8px]">→</span>
        </motion.div>
      </div>

      {/* Badge bottom right */}
      <div className="absolute bottom-3 right-3">
        <span
          className="text-[6px] font-black uppercase tracking-[0.3em] opacity-25"
          style={{ color: cfg.color }}
        >
          {meta.badge}
        </span>
      </div>
    </motion.button>
  );
}

// ── Audience Switcher Pill + Dropdown ──────────────────────────
function AudienceSwitcher() {
  const { audience, setAudience } = useAudience();
  const [open, setOpen] = useState(false);
  const cfg = AUDIENCE_CONFIG[audience];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (id: Audience) => {
    setAudience(id);
    setTimeout(() => setOpen(false), 180);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger pill */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-300"
        style={{
          background: open
            ? `linear-gradient(135deg, ${cfg.color}30, ${cfg.color}10)`
            : `linear-gradient(135deg, ${cfg.color}18, ${cfg.color}06)`,
          borderColor: open ? `${cfg.color}80` : `${cfg.color}40`,
          color: cfg.color,
          boxShadow: open ? `0 0 24px ${cfg.color}30, inset 0 0 12px ${cfg.color}10` : `0 0 12px ${cfg.color}15`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <span className="text-sm leading-none">{cfg.emoji}</span>
        <span>{cfg.label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={11} />
        </motion.div>

        {/* Pulse ring when active */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ boxShadow: [`0 0 0 0px ${cfg.color}40`, `0 0 0 6px ${cfg.color}00`] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        />
      </motion.button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 z-[200]"
            style={{ filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.8))' }}
          >
            {/* Glass panel */}
            <div
              className="rounded-2xl overflow-hidden border p-2 flex flex-col gap-1.5"
              style={{
                background: 'rgba(8,8,8,0.92)',
                backdropFilter: 'blur(24px)',
                borderColor: 'rgba(255,255,255,0.08)',
                boxShadow: `0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {/* Header */}
              <div className="px-3 pt-1 pb-2 border-b border-white/5 flex items-center justify-between">
                <p className="text-[8px] uppercase tracking-[0.4em] text-white/25 font-black">View As</p>
                <button
                  onClick={() => setOpen(false)}
                  className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X size={9} className="text-white/40" />
                </button>
              </div>

              {/* Cards */}
              {(Object.entries(AUDIENCE_CONFIG) as [Audience, typeof AUDIENCE_CONFIG[Audience]][]).map(([id, audienceCfg], i) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <AudienceCard
                    id={id}
                    cfg={audienceCfg}
                    meta={AUDIENCE_META[id]}
                    isActive={audience === id}
                    onClick={() => handleSelect(id)}
                  />
                </motion.div>
              ))}

              {/* Footer */}
              <div className="px-3 pt-2 border-t border-white/5">
                <p className="text-[7px] text-white/15 uppercase tracking-widest text-center">
                  Content adapts to your selected role
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
              style={{ background: 'rgba(8,8,8,0.92)', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none', borderRight: 'none' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Main Header ─────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { audience } = useAudience();
  const cfg = AUDIENCE_CONFIG[audience];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-[100] transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(6,6,6,0.95)' : 'rgba(6,6,6,0.7)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Colored top accent line based on audience */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.color}60, transparent)` }}
        key={audience}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('hero')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="text-lg font-black tracking-tighter uppercase whitespace-nowrap text-white"
        >
          American{' '}
          <motion.span
            style={{ color: cfg.color }}
            key={audience}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Dream
          </motion.span>
          <motion.span style={{ color: cfg.color }} key={`dot-${audience}`}>.</motion.span>
        </motion.button>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-[10px] font-black uppercase tracking-widest text-white/35">
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="relative hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                style={{ background: cfg.color }}
              />
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Audience Switcher — CENTER STAGE */}
          <AudienceSwitcher />

          <div className="hidden md:flex items-center gap-3 text-white/25 ml-1">
            <button className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
              <MapPin size={12} />
              <span className="text-[8px] uppercase font-bold tracking-wider">Directions</span>
            </button>
            <div className="w-px h-3 bg-white/10" />
            <button className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
              <Clock size={12} />
              <span className="text-[8px] uppercase font-bold tracking-wider">Hours</span>
            </button>
          </div>

          <button className="p-2 hover:bg-white/8 rounded-full transition-colors text-white/40 hover:text-white">
            <Search size={16} />
          </button>

          <motion.button
            onClick={() => scrollTo('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:block px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-white transition-all"
            style={{
              background: `linear-gradient(135deg, ${cfg.color}, ${cfg.color}cc)`,
              boxShadow: `0 4px 20px ${cfg.color}40`,
            }}
          >
            Partner With Us
          </motion.button>

          <button
            className="lg:hidden p-2 hover:bg-white/8 rounded-full transition-colors text-white/50"
            onClick={() => setMobileOpen(o => !o)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(6,6,6,0.98)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => scrollTo(link.id)}
                  className="text-left text-sm font-black uppercase tracking-widest text-white/35 hover:text-white transition-colors py-2.5 border-b border-white/5"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-3">
                <AudienceSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}