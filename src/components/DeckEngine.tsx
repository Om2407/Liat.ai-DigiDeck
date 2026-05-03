// import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { ChevronLeft, ChevronRight, LayoutGrid, X, Play, Pause, Sparkles, Loader } from 'lucide-react';
// import { useAudience, AUDIENCE_CONFIG, type Audience } from '../context/AudienceContext';

// /* ─── Deck Context ─── */
// interface DeckCtx { current: number; total: number; go: (n: number) => void; next: () => void; prev: () => void; }
// const DeckContext = createContext<DeckCtx>({ current: 0, total: 0, go: () => {}, next: () => {}, prev: () => {} });
// export const useDeck = () => useContext(DeckContext);

// /* ─── Slide Metadata ─── */
// export interface SlideInfo { id: string; label: string; emoji: string; color: string; bg?: 'dark' | 'light'; audience?: 'all' | 'tenant' | 'sponsor' | 'event'; }

// export const SLIDES: SlideInfo[] = [
//   { id: 'hero',          label: 'Welcome',      emoji: '🏙️', color: '#1d4ed8', bg: 'dark',  audience: 'all' },
//   { id: 'overview',      label: 'The Scale',    emoji: '📊', color: '#0891b2', bg: 'light', audience: 'all' },
//   { id: 'brands',        label: 'Brands',       emoji: '🏷️', color: '#7c3aed', bg: 'light', audience: 'all' },
//   { id: 'parks',         label: 'Parks',        emoji: '🎡', color: '#ea580c', bg: 'light', audience: 'all' },
//   { id: 'waterpark',     label: 'Water Park',   emoji: '🌊', color: '#0077cc', bg: 'dark',  audience: 'all' },
//   { id: 'malltour',      label: 'Mall Tour',    emoji: '🎬', color: '#059669', bg: 'dark',  audience: 'all' },
//   { id: 'retail',        label: 'Retail',       emoji: '🛍️', color: '#b45309', bg: 'light', audience: 'tenant' },
//   { id: 'roi',           label: 'ROI Calc',     emoji: '💰', color: '#16a34a', bg: 'dark',  audience: 'tenant' },
//   { id: 'entertainment', label: 'Tech Hub',     emoji: '📱', color: '#1428a0', bg: 'dark',  audience: 'tenant' },
//   { id: 'marvel',        label: 'Marvel',       emoji: '🦸', color: '#ED1D24', bg: 'dark',  audience: 'all' },
//   { id: 'events',        label: 'Events',       emoji: '🎤', color: '#7c3aed', bg: 'dark',  audience: 'event' },
//   { id: 'sponsorship',   label: 'Sponsorship',  emoji: '🎯', color: '#f59e0b', bg: 'dark',  audience: 'sponsor' },
//   { id: 'dining',        label: 'Dining',       emoji: '🍽️', color: '#dc2626', bg: 'light', audience: 'all' },
//   { id: 'social',        label: 'Social',       emoji: '📸', color: '#3b82f6', bg: 'dark',  audience: 'all' },
//   { id: 'contact',       label: 'Partner',      emoji: '🤝', color: '#1d4ed8', bg: 'dark',  audience: 'all' },
// ];

// const GEMINI_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

// const SLIDE_CONTEXT: Record<string, string> = {
//   hero: "Opening slide for American Dream Mall sales deck — 3M sq ft, 40M+ visitors/year, 8 miles from NYC. Give a 2-sentence opening pitch.",
//   overview: "American Dream's scale: 40M+ visitors, 3M sq ft, 450+ brands, 8 miles from NYC. Give 2 compelling sentences why this scale matters.",
//   brands: "450+ global brands from Hermès to Nike at American Dream. Give a 2-sentence pitch about the brand mix opportunity.",
//   parks: "Three world-record attractions: Nickelodeon Universe, DreamWorks Water Park, Big Snow indoor ski. Pitch in 2 sentences.",
//   waterpark: "DreamWorks Water Park — America's largest indoor water park, 1.5M sq ft, 40+ slides, open 365 days. Give a 2-sentence sponsor activation pitch.",
//   malltour: "Cinematic tour of American Dream Mall. Give 2 compelling sentences about the visitor experience.",
//   retail: "Luxury retail wing: Hermès, Gucci, LV, Cartier, Dior and 450+ brands. Give a 2-sentence retail leasing pitch.",
//   roi: "ROI calculator showing projected footfall, revenue, and payback period for retail tenants. Give 2 sentences why the numbers make sense.",
//   entertainment: "Tech Hub with Apple, Samsung, Microsoft, Sony, Bose flagships. Give a 2-sentence pitch for tech retail.",
//   marvel: "Marvel Studios exclusive flagship — 5,000 sq ft of collectibles and meet-and-greets. Pitch in 2 sentences.",
//   events: "5,000-seat Performing Arts Center and 300,000 sq ft Exposition Center. Give a 2-sentence event producer pitch.",
//   sponsorship: "Brand sponsorship tiers at American Dream: Presenting Partner ($2M+), Activation Partner ($500K-$2M), Event Sponsor ($100K-$500K). 40M visitors, $95K avg HHI. Give a 2-sentence pitch to brand sponsors.",
//   dining: "100+ restaurants from Michelin-caliber to quick bites. Give a 2-sentence pitch about dining as a destination driver.",
//   social: "American Dream's social media reach: 8.4M combined followers, 40M annual visitors sharing content. Give a 2-sentence pitch about social proof and organic brand reach.",
//   contact: "Final CTA slide for leasing, sponsorship, and event bookings. Give a compelling 2-sentence closing pitch.",
// };

// /* ─── Theme-aware button styles ─── */
// const darkBtn = {
//   bg: 'rgba(0,0,0,0.45)',
//   border: 'rgba(255,255,255,0.18)',
//   text: 'rgba(255,255,255,0.85)',
//   hover: 'rgba(0,0,0,0.65)',
// };
// const lightBtn = {
//   bg: 'rgba(255,255,255,0.92)',
//   border: 'rgba(0,0,0,0.12)',
//   text: 'rgba(20,20,20,0.85)',
//   hover: 'rgba(255,255,255,1)',
// };

// /* ─── Gemini AI Button ─── */
// function GeminiButton({ slideId, color, theme }: { slideId: string; color: string; theme: 'dark'|'light' }) {
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState('');
//   const [loading, setLoading] = useState(false);

//   const ask = async () => {
//     if (loading) return;
//     setOpen(true); setLoading(true); setText('');
//     const context = SLIDE_CONTEXT[slideId] || 'American Dream Mall — pitch this section in 2 compelling sentences.';
//     try {
//       if (GEMINI_KEY) {
//         const res = await fetch(
//           `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
//           { method: 'POST', headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: context }] }], generationConfig: { maxOutputTokens: 120, temperature: 0.8 } }) }
//         );
//         const data = await res.json();
//         setText(data?.candidates?.[0]?.content?.parts?.[0]?.text || getFallback(slideId));
//       } else {
//         await new Promise(r => setTimeout(r, 700));
//         setText(getFallback(slideId));
//       }
//     } catch { setText(getFallback(slideId)); }
//     setLoading(false);
//   };

//   const getFallback = (id: string) => ({
//     hero: "American Dream isn't just a mall — it's the Western Hemisphere's most powerful commercial platform, delivering 40 million high-intent consumers annually to your brand.",
//     overview: "With 3 million square feet, 40M+ annual visitors, and proximity to 20 million NYC-metro consumers, American Dream offers unmatched scale and reach for any retail partner.",
//     brands: "Alongside 450+ global brands, your presence here signals premium positioning — placing you among the world's most recognized names in the most trafficked destination in the Northeast.",
//     parks: "Three world-record attractions create 4+ hour dwell times, turning every visitor into a high-intent, engaged shopper — something no standalone retail location can replicate.",
//     waterpark: "The DreamWorks Water Park draws families year-round, creating sponsorship and activation opportunities with a captive, joyful audience of 18,000+ daily visitors.",
//     malltour: "Every inch of American Dream is engineered for experience — from its iconic architecture to its curated tenant mix, creating an environment where brands thrive and visitors return.",
//     retail: "American Dream's luxury wing delivers white-glove retail conditions with the foot traffic of a theme park — a combination that consistently generates 2-3x revenue vs comparable locations.",
//     roi: "The numbers speak for themselves — American Dream tenants consistently outperform market benchmarks, backed by co-marketing, foot traffic guarantees, and a built-in 40M+ audience.",
//     entertainment: "The Tech Hub positions your brand alongside Apple and Samsung in the most tech-forward retail environment in the Northeast — drawing high-income, early-adopter consumers daily.",
//     marvel: "The Marvel flagship at American Dream is more than retail — it's a cultural destination that generates earned media, social content, and brand equity with every visit.",
//     events: "From 5,000-seat concerts to 300,000 sq ft convention activations, American Dream's venues deliver the scale, logistics, and audience that event producers dream of.",
//     sponsorship: "With 40M annual visitors, $95K average household income, and 8.4M social followers, American Dream delivers brand exposure that no single media buy can replicate — at a cost-per-impression that outperforms every alternative.",
//     dining: "Dining at American Dream extends dwell time by an average of 90 minutes — turning a shopping trip into a full-day experience that benefits every tenant in the property.",
//     social: "40 million annual visitors organically generate millions of social impressions for brands inside American Dream — making your presence here the most cost-effective brand amplification strategy available.",
//     contact: "The opportunity to be part of American Dream is rare, time-sensitive, and backed by proven ROI. The question isn't whether you can afford to be here — it's whether you can afford not to be.",
//   }[id] || "American Dream delivers unmatched scale, premium demographics, and proven ROI for every partner, tenant, and event producer in the building.");

//   const t = theme === 'light' ? lightBtn : darkBtn;

//   return (
//     <>
//       <motion.button onClick={ask}
//         whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//         className="fixed bottom-28 left-1/2 -translate-x-1/2 z-[240] flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"
//         style={{ background: `${color}dd`, color: '#fff', backdropFilter: 'blur(12px)', border: `1px solid ${color}`, boxShadow: `0 4px 20px ${color}44` }}
//       >
//         <Sparkles size={13} /> Ask AI About This
//       </motion.button>

//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             className="fixed bottom-40 left-1/2 -translate-x-1/2 z-[241] w-[420px] max-w-[calc(100vw-2rem)] rounded-2xl p-6 shadow-2xl"
//             style={{ background: 'rgba(10,10,10,0.96)', border: `1px solid ${color}44`, backdropFilter: 'blur(20px)' }}
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <Sparkles size={14} style={{ color }} />
//                 <span className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>Gemini AI Pitch</span>
//               </div>
//               <button onClick={() => setOpen(false)} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white">
//                 <X size={12} />
//               </button>
//             </div>
//             {loading
//               ? <div className="flex items-center gap-3 text-white/40"><Loader size={14} className="animate-spin" /><span className="text-xs">Generating pitch...</span></div>
//               : <p className="text-white/80 text-sm leading-relaxed">{text}</p>
//             }
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// /* ─── Color Toggle ─── */
// function ColorToggle({ slides, current, go, theme }: { slides: SlideInfo[]; current: number; go: (n: number) => void; theme: 'dark'|'light' }) {
//   const [open, setOpen] = useState(false);
//   const t = theme === 'light' ? lightBtn : darkBtn;

//   return (
//     <div className="fixed left-5 bottom-8 z-[250]">
//       <motion.button onClick={() => setOpen(o => !o)}
//         whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//         className="flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all shadow-lg"
//         style={{ background: t.bg, borderColor: t.border, color: t.text }}
//       >
//         <div className="flex gap-0.5">
//           {slides.slice(0, 6).map((s, i) => (
//             <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
//           ))}
//         </div>
//         <span className="text-[9px] font-black uppercase tracking-widest hidden sm:block">Slides</span>
//       </motion.button>

//       <AnimatePresence>
//         {open && (
//           <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
//             className="absolute bottom-12 left-0 rounded-2xl p-4 shadow-2xl"
//             style={{ background: 'rgba(10,10,10,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', width: 260 }}
//           >
//             <p className="text-white/40 text-[9px] uppercase tracking-widest font-black mb-3">Jump to Slide</p>
//             <div className="grid grid-cols-1 gap-1">
//               {slides.map((s, i) => (
//                 <motion.button key={s.id} onClick={() => { go(i); setOpen(false); }} whileHover={{ x: 4 }}
//                   className="flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all group"
//                   style={{ background: current === i ? `${s.color}22` : 'transparent' }}
//                 >
//                   <div className="flex-shrink-0 w-8 h-5 rounded-full flex items-center justify-center text-xs"
//                     style={{ background: s.color, boxShadow: current === i ? `0 0 10px ${s.color}88` : 'none' }}>
//                     {s.emoji}
//                   </div>
//                   <span className={`text-[11px] font-black uppercase tracking-wider flex-1 ${current === i ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
//                     {String(i + 1).padStart(2, '0')} {s.label}
//                   </span>
//                   {current === i && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ─── Audience Switcher ─── */
// function AudienceSwitcher() {
//   const { audience, setAudience } = useAudience();
//   const [open, setOpen] = useState(false);
//   const cfg = AUDIENCE_CONFIG[audience];

//   return (
//     <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[250]">
//       <motion.button onClick={() => setOpen(o => !o)}
//         whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
//         className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-xl"
//         style={{ background: `${cfg.color}cc`, border: `1px solid ${cfg.color}`, backdropFilter: 'blur(12px)' }}
//       >
//         <span>{cfg.emoji}</span><span>{cfg.label}</span><span className="opacity-60 text-[8px]">▼</span>
//       </motion.button>

//       <AnimatePresence>
//         {open && (
//           <>
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />
//             <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }}
//               className="absolute top-12 left-1/2 -translate-x-1/2 rounded-2xl p-3 shadow-2xl"
//               style={{ background: 'rgba(10,10,10,0.97)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', minWidth: 280 }}
//             >
//               <p className="text-white/30 text-[9px] uppercase tracking-widest font-black text-center mb-3">Select Your Role</p>
//               <div className="grid grid-cols-2 gap-2">
//                 {(Object.entries(AUDIENCE_CONFIG) as [Audience, typeof AUDIENCE_CONFIG.all][]).map(([key, c]) => (
//                   <motion.button key={key} onClick={() => { setAudience(key); setOpen(false); }}
//                     whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
//                     className="p-4 rounded-xl text-left transition-all"
//                     style={{ background: audience === key ? `${c.color}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${audience === key ? c.color : 'rgba(255,255,255,0.08)'}` }}
//                   >
//                     <div className="text-2xl mb-1">{c.emoji}</div>
//                     <p className="text-white font-black text-xs leading-tight">{c.label}</p>
//                     <p className="text-[9px] mt-0.5 font-bold" style={{ color: c.color }}>{c.desc}</p>
//                   </motion.button>
//                 ))}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ─── Auto Present with Countdown ─── */
// function AutoPresent({ current, total, next, theme }: { current: number; total: number; next: () => void; theme: 'dark'|'light' }) {
//   const [active, setActive] = useState(false);
//   const [countdown, setCountdown] = useState(9);
//   const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const countRef = useRef<ReturnType<typeof setInterval> | null>(null);
//   const DURATION = 9;
//   const t = theme === 'light' ? lightBtn : darkBtn;

//   useEffect(() => {
//     if (timerRef.current) clearInterval(timerRef.current);
//     if (countRef.current) clearInterval(countRef.current);
//     if (active) {
//       setCountdown(DURATION);
//       timerRef.current = setInterval(() => {
//         if (current < total - 1) { next(); setCountdown(DURATION); }
//         else setActive(false);
//       }, DURATION * 1000);
//       countRef.current = setInterval(() => {
//         setCountdown(c => c > 0 ? c - 1 : DURATION);
//       }, 1000);
//     }
//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//       if (countRef.current) clearInterval(countRef.current);
//     };
//   }, [active, current, total, next]);

//   const radius = 10;
//   const circ = 2 * Math.PI * radius;
//   const dash = (countdown / DURATION) * circ;

//   return (
//     <motion.button
//       onClick={() => { setActive(a => !a); setCountdown(DURATION); }}
//       whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//       className="fixed top-5 right-36 z-[250] flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all text-[10px] font-black uppercase tracking-widest shadow-lg"
//       style={{
//         background: active ? 'rgba(16,185,129,0.15)' : t.bg,
//         borderColor: active ? '#10b981' : t.border,
//         color: active ? '#10b981' : t.text,
//       }}
//     >
//       {active ? (
//         <>
//           <svg width="22" height="22" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
//             <circle cx="11" cy="11" r={radius} fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="2.5" />
//             <motion.circle cx="11" cy="11" r={radius} fill="none" stroke="#10b981" strokeWidth="2.5"
//               strokeDasharray={circ} strokeDashoffset={circ - dash}
//               transition={{ duration: 0.5 }} />
//           </svg>
//           <span>{countdown}s</span>
//           <Pause size={11} />
//           <span>Stop</span>
//         </>
//       ) : (
//         <><Play size={12} /><span>Present</span></>
//       )}
//     </motion.button>
//   );
// }

// /* ─── Progress Bar ─── */
// function ProgressBar({ current, total, color }: { current: number; total: number; color: string }) {
//   return (
//     <div className="fixed top-0 left-0 right-0 h-1 z-[260] bg-black/10">
//       <motion.div className="h-full shadow-sm" style={{ background: color, boxShadow: `0 0 8px ${color}88` }}
//         animate={{ width: `${((current + 1) / total) * 100}%` }}
//         transition={{ duration: 0.4, ease: 'easeOut' }} />
//     </div>
//   );
// }

// /* ─── Sidebar ─── */
// function Sidebar({ open, onClose, current, go }: { open: boolean; onClose: () => void; current: number; go: (n: number) => void; }) {
//   return (
//     <AnimatePresence>
//       {open && (
//         <>
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 z-[300] backdrop-blur-sm" onClick={onClose} />
//           <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
//             transition={{ type: 'spring', damping: 28, stiffness: 300 }}
//             className="fixed left-0 top-0 bottom-0 w-72 z-[301] flex flex-col bg-zinc-950 border-r border-white/10 shadow-2xl">
//             <div className="p-6 border-b border-white/10 flex items-center justify-between">
//               <div>
//                 <p className="text-white font-black text-sm uppercase tracking-widest">All Slides</p>
//                 <p className="text-white/30 text-xs mt-0.5">{SLIDES.length} sections</p>
//               </div>
//               <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
//                 <X size={14} />
//               </button>
//             </div>
//             <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
//               {SLIDES.map((s, i) => (
//                 <motion.button key={s.id} onClick={() => { go(i); onClose(); }} whileHover={{ x: 4 }}
//                   className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${current === i ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5'}`}>
//                   <span className="text-white/30 text-[10px] font-black w-5 text-right flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
//                   <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
//                     style={{ background: `${s.color}33`, border: `1px solid ${s.color}55` }}>{s.emoji}</div>
//                   <p className={`text-sm font-black flex-1 ${current === i ? 'text-white' : 'text-white/50'}`}>{s.label}</p>
//                   {current === i && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ─── Nav Arrow Button — always visible ─── */
// function NavBtn({ onClick, disabled, children, theme }: { onClick: () => void; disabled: boolean; children: React.ReactNode; theme: 'dark'|'light' }) {
//   const t = theme === 'light' ? lightBtn : darkBtn;
//   return (
//     <motion.button onClick={onClick} disabled={disabled}
//       whileHover={{ scale: disabled ? 1 : 1.1 }} whileTap={{ scale: disabled ? 1 : 0.95 }}
//       className="w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-lg disabled:opacity-30"
//       style={{ background: t.bg, borderColor: t.border, color: t.text }}
//     >
//       {children}
//     </motion.button>
//   );
// }

// /* ─── Main Engine ─── */
// export default function DeckEngine({ slides }: { slides: React.ReactNode[] }) {
//   const [current, setCurrent] = useState(0);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [direction, setDirection] = useState(1);
//   const total = slides.length;

//   const go = useCallback((n: number) => {
//     if (n < 0 || n >= total) return;
//     setDirection(n > current ? 1 : -1);
//     setCurrent(n);
//   }, [current, total]);

//   const next = useCallback(() => go(current + 1), [current, go]);
//   const prev = useCallback(() => go(current - 1), [current, go]);

//   useEffect(() => {
//     const h = (e: KeyboardEvent) => {
//       if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
//       if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
//       if (e.key === 'Escape') setSidebarOpen(false);
//     };
//     window.addEventListener('keydown', h);
//     return () => window.removeEventListener('keydown', h);
//   }, [next, prev]);

//   const slideInfo = SLIDES[current] || SLIDES[0];
//   const theme = slideInfo.bg || 'dark';
//   const t = theme === 'light' ? lightBtn : darkBtn;

//   const variants = {
//     enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
//     center: { x: 0, opacity: 1 },
//     exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
//   };

//   return (
//     <DeckContext.Provider value={{ current, total, go, next, prev }}>
//       <div className="fixed inset-0 overflow-hidden bg-zinc-950">
//         <ProgressBar current={current} total={total} color={slideInfo.color} />

//         {/* Slides */}
//         <AnimatePresence custom={direction} mode="wait">
//           <motion.div key={current} custom={direction} variants={variants}
//             initial="enter" animate="center" exit="exit"
//             transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
//             className="absolute inset-0 overflow-y-auto overflow-x-hidden">
//             {slides[current]}
//           </motion.div>
//         </AnimatePresence>

//         {/* ── TOP BAR ── */}
//         {/* Menu - top left */}
//         <motion.button onClick={() => setSidebarOpen(true)}
//           whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//           className="fixed top-5 left-5 z-[250] flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all shadow-lg"
//           style={{ background: t.bg, borderColor: t.border, color: t.text }}
//         >
//           <LayoutGrid size={15} />
//           <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Menu</span>
//         </motion.button>

//         {/* Audience Switcher - top center */}
//         <AudienceSwitcher />

//         {/* Present - top right */}
//         <AutoPresent current={current} total={total} next={next} theme={theme} />

//         {/* Slide label - top right corner */}
//         <div className="fixed top-5 right-5 z-[250] flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border shadow-lg"
//           style={{ background: t.bg, borderColor: t.border }}>
//           <span className="text-base">{slideInfo.emoji}</span>
//           <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block" style={{ color: t.text }}>{slideInfo.label}</span>
//         </div>

//         {/* ── BOTTOM BAR ── */}
//         {/* Color Toggle - bottom left */}
//         <ColorToggle slides={SLIDES} current={current} go={go} theme={theme} />

//         {/* Nav - bottom center */}
//         <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[250] flex items-center gap-3">
//           <NavBtn onClick={prev} disabled={current === 0} theme={theme}>
//             <ChevronLeft size={20} />
//           </NavBtn>

//           {/* Dots pill */}
//           <div className="flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md border shadow-lg"
//             style={{ background: t.bg, borderColor: t.border }}>
//             <span className="text-xs font-black tabular-nums" style={{ color: t.text, opacity: 0.5 }}>
//               {String(current + 1).padStart(2, '0')}
//             </span>
//             <div className="flex gap-1">
//               {SLIDES.map((s, i) => (
//                 <button key={i} onClick={() => go(i)} title={s.label}
//                   className="transition-all duration-300 rounded-full hover:opacity-100"
//                   style={{ width: current === i ? 18 : 6, height: 6, background: current === i ? s.color : (theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)') }} />
//               ))}
//             </div>
//             <span className="text-xs font-black tabular-nums" style={{ color: t.text, opacity: 0.5 }}>
//               {String(total).padStart(2, '0')}
//             </span>
//           </div>

//           <NavBtn onClick={next} disabled={current === total - 1} theme={theme}>
//             <ChevronRight size={20} />
//           </NavBtn>
//         </div>

//         {/* Gemini AI - above nav */}
//         <GeminiButton slideId={slideInfo.id} color={slideInfo.color} theme={theme} />

//         {/* Keyboard hint - bottom right */}
//         <div className="fixed bottom-10 right-5 z-[250] hidden md:flex items-center gap-1.5"
//           style={{ color: theme === 'light' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)' }}>
//           <kbd className="text-[9px] border rounded px-1.5 py-0.5"
//             style={{ borderColor: theme === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)' }}>←</kbd>
//           <kbd className="text-[9px] border rounded px-1.5 py-0.5"
//             style={{ borderColor: theme === 'light' ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)' }}>→</kbd>
//           <span className="text-[9px] uppercase tracking-wider">navigate</span>
//         </div>

//         <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} current={current} go={go} />
//       </div>
//     </DeckContext.Provider>
//   );
// }
import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, LayoutGrid, X, Play, Pause } from 'lucide-react';
import { useAudience, AUDIENCE_CONFIG, type Audience } from '../context/AudienceContext';
import html2canvas from 'html2canvas';
import * as THREE from 'three';
import WebGLTransition from './WebGLTransition';

/* ─── Deck Context ─── */
interface DeckCtx { current: number; total: number; go: (n: number) => void; next: () => void; prev: () => void; }
const DeckContext = createContext<DeckCtx>({ current: 0, total: 0, go: () => { }, next: () => { }, prev: () => { } });
export const useDeck = () => useContext(DeckContext);

/* ─── Slide Metadata ─── */
export interface SlideInfo { id: string; label: string; emoji: string; color: string; bg?: 'dark' | 'light'; audience?: 'all' | 'tenant' | 'sponsor' | 'event'; }

export const SLIDES: SlideInfo[] = [
  { id: 'hero', label: 'Welcome', emoji: '🏙️', color: '#1d4ed8', bg: 'dark', audience: 'all' },
  { id: 'scale', label: 'The Scale', emoji: '📊', color: '#0891b2', bg: 'dark', audience: 'all' },
  { id: 'retail', label: 'Retail', emoji: '🛍️', color: '#b45309', bg: 'dark', audience: 'tenant' },
  { id: 'entertain', label: 'Entertainment', emoji: '🎡', color: '#ea580c', bg: 'dark', audience: 'all' },
  { id: 'events', label: 'Events', emoji: '🎤', color: '#7c3aed', bg: 'dark', audience: 'event' },
  { id: 'sponsorship', label: 'Sponsorship', emoji: '🎯', color: '#f59e0b', bg: 'dark', audience: 'sponsor' },
  { id: 'roi', label: 'ROI Calc', emoji: '💰', color: '#10b981', bg: 'dark', audience: 'tenant' },
  { id: 'dining', label: 'Lifestyle', emoji: '🍽️', color: '#dc2626', bg: 'dark', audience: 'all' },
  { id: 'contact', label: 'Partner', emoji: '🤝', color: '#1d4ed8', bg: 'dark', audience: 'all' },
];

const GEMINI_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

const getSlideContext = (slideId: string, audience: string): string => {
  const base: Record<string, string> = {
    hero: "Opening slide for American Dream Mall sales deck — 3M sq ft, 40M+ visitors/year, 8 miles from NYC. Give a 2-sentence opening pitch.",
    scale: "American Dream's scale: 40M+ visitors, 3M sq ft, 450+ brands, 8 miles from NYC. Give 2 compelling sentences why this scale matters.",
    retail: "Luxury retail wing: Hermès, Gucci, LV, Cartier, Dior and 450+ brands. Give a 2-sentence retail leasing pitch.",
    entertain: "Three world-record attractions: Nickelodeon Universe, DreamWorks Water Park, Big Snow indoor ski. Pitch in 2 sentences.",
    events: "5,000-seat Performing Arts Center and 300,000 sq ft Exposition Center. Give a 2-sentence event producer pitch.",
    sponsorship: "Brand sponsorship tiers at American Dream: Presenting Partner ($2M+), Activation Partner ($500K-$2M), Event Sponsor ($100K-$500K). 40M visitors, $95K avg HHI. Give a 2-sentence pitch to brand sponsors.",
    roi: "ROI calculator showing projected footfall, revenue, and payback period for retail tenants. Give 2 sentences why the numbers make sense.",
    dining: "100+ restaurants from Michelin-caliber to quick bites. Give a 2-sentence pitch about dining as a destination driver.",
    contact: "Final CTA slide for leasing, sponsorship, and event bookings. Give a compelling 2-sentence closing pitch.",
  };
  let ctx = base[slideId] || 'American Dream Mall — pitch this section in 2 compelling sentences.';
  if (['scale', 'retail', 'events', 'sponsorship'].includes(slideId)) {
    if (audience === 'tenant') ctx += " ...focus on retail leasing opportunity";
    if (audience === 'sponsor') ctx += " ...focus on brand visibility and ROI";
    if (audience === 'event') ctx += " ...focus on venue capabilities and booking";
  }
  return ctx;
};

/* ─── Theme-aware button styles ─── */
const darkBtn = {
  bg: 'rgba(0,0,0,0.45)',
  border: 'rgba(255,255,255,0.18)',
  text: 'rgba(255,255,255,0.85)',
  hover: 'rgba(0,0,0,0.65)',
};
const lightBtn = {
  bg: 'rgba(255,255,255,0.92)',
  border: 'rgba(0,0,0,0.12)',
  text: 'rgba(20,20,20,0.85)',
  hover: 'rgba(255,255,255,1)',
};



/* ─── Color Toggle ─── */
function ColorToggle({ slides, current, go, theme }: { slides: SlideInfo[]; current: number; go: (n: number) => void; theme: 'dark' | 'light' }) {
  const [open, setOpen] = useState(false);
  const t = theme === 'light' ? lightBtn : darkBtn;

  return (
    <div className="fixed left-5 bottom-8 z-[250]">
      <motion.button onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all shadow-lg"
        style={{ background: t.bg, borderColor: t.border, color: t.text }}
      >
        <LayoutGrid size={14} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-12 left-0 rounded-2xl p-4 shadow-2xl"
            style={{ background: 'rgba(10,10,10,0.97)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', width: 260 }}
          >
            <p className="text-white/40 text-[9px] uppercase tracking-widest font-black mb-3">Jump to Slide</p>
            <div className="grid grid-cols-1 gap-1">
              {slides.map((s, i) => (
                <motion.button key={s.id} onClick={() => { go(i); setOpen(false); }} whileHover={{ x: 4 }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all group"
                  style={{ background: current === i ? `${s.color}22` : 'transparent' }}
                >
                  <div className="flex-shrink-0 w-8 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: s.color, boxShadow: current === i ? `0 0 10px ${s.color}88` : 'none' }}>
                    {s.emoji}
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-wider flex-1 ${current === i ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                    {String(i + 1).padStart(2, '0')} {s.label}
                  </span>
                  {current === i && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Audience Switcher ─── */
function AudienceSwitcher() {
  const { audience, setAudience } = useAudience();
  const [open, setOpen] = useState(false);
  const cfg = AUDIENCE_CONFIG[audience];

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[250]">
      <motion.button onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-xl"
        style={{ background: `${cfg.color}cc`, border: `1px solid ${cfg.color}`, backdropFilter: 'blur(12px)' }}
      >
        <span>{cfg.emoji}</span><span>{cfg.label}</span><span className="opacity-60 text-[8px]">▼</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[-1]" onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-12 left-1/2 -translate-x-1/2 rounded-2xl p-3 shadow-2xl"
              style={{ background: 'rgba(10,10,10,0.97)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(20px)', minWidth: 280 }}
            >
              <p className="text-white/30 text-[9px] uppercase tracking-widest font-black text-center mb-3">Select Your Role</p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(AUDIENCE_CONFIG) as [Audience, typeof AUDIENCE_CONFIG.all][]).map(([key, c]) => (
                  <motion.button key={key} onClick={() => { setAudience(key); setOpen(false); }}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="p-4 rounded-xl text-left transition-all"
                    style={{ background: audience === key ? `${c.color}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${audience === key ? c.color : 'rgba(255,255,255,0.08)'}` }}
                  >
                    <div className="text-2xl mb-1">{c.emoji}</div>
                    <p className="text-white font-black text-xs leading-tight">{c.label}</p>
                    <p className="text-[9px] mt-0.5 font-bold" style={{ color: c.color }}>{c.desc}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Auto Present with Countdown ─── */
function AutoPresent({ current, total, next, theme }: { current: number; total: number; next: () => void; theme: 'dark' | 'light' }) {
  const [active, setActive] = useState(false);
  const [countdown, setCountdown] = useState(9);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 9;
  const t = theme === 'light' ? lightBtn : darkBtn;

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (countRef.current) clearInterval(countRef.current);
    if (active) {
      setCountdown(DURATION);
      timerRef.current = setInterval(() => {
        if (current < total - 1) { next(); setCountdown(DURATION); }
        else setActive(false);
      }, DURATION * 1000);
      countRef.current = setInterval(() => {
        setCountdown(c => c > 0 ? c - 1 : DURATION);
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (countRef.current) clearInterval(countRef.current);
    };
  }, [active, current, total, next]);

  const radius = 10;
  const circ = 2 * Math.PI * radius;
  const dash = (countdown / DURATION) * circ;

  return (
    <motion.button
      onClick={() => { setActive(a => !a); setCountdown(DURATION); }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={active ? {
        boxShadow: ['0 0 0px #10b981', '0 0 15px #10b98188', '0 0 0px #10b981'],
      } : {}}
      transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
      className="w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-lg"
      style={{
        background: active ? 'rgba(16,185,129,0.15)' : t.bg,
        borderColor: active ? '#10b981' : t.border,
        color: active ? '#10b981' : t.text,
      }}
      title={active ? `Auto-presenting (${countdown}s)` : "Auto Present"}
    >
      {active ? (
        <div className="relative flex items-center justify-center">
          <svg width="22" height="22" className="absolute" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="11" cy="11" r={radius} fill="none" stroke="rgba(16,185,129,0.2)" strokeWidth="2.5" />
            <motion.circle cx="11" cy="11" r={radius} fill="none" stroke="#10b981" strokeWidth="2.5"
              strokeDasharray={circ} strokeDashoffset={circ - dash}
              transition={{ duration: 0.5 }} />
          </svg>
          <Pause size={10} />
        </div>
      ) : (
        <Play size={14} style={{ marginLeft: 2 }} />
      )}
    </motion.button>
  );
}

/* ─── Progress Bar ─── */
function ProgressBar({ current, total, color }: { current: number; total: number; color: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[260] bg-black/10">
      <motion.div className="h-full shadow-sm" style={{ background: color, boxShadow: `0 0 8px ${color}88` }}
        animate={{ width: `${((current + 1) / total) * 100}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }} />
    </div>
  );
}

/* ─── Sidebar ─── */
function Sidebar({ open, onClose, current, go }: { open: boolean; onClose: () => void; current: number; go: (n: number) => void; }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[300] backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-72 z-[301] flex flex-col bg-zinc-950 border-r border-white/10 shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-white font-black text-sm uppercase tracking-widest">All Slides</p>
                <p className="text-white/30 text-xs mt-0.5">{SLIDES.length} sections</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20">
                <X size={14} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1.5">
              {SLIDES.map((s, i) => (
                <motion.button key={s.id} onClick={() => { go(i); onClose(); }} whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all ${current === i ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5'}`}>
                  <span className="text-white/30 text-[10px] font-black w-5 text-right flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                    style={{ background: `${s.color}33`, border: `1px solid ${s.color}55` }}>{s.emoji}</div>
                  <p className={`text-sm font-black flex-1 ${current === i ? 'text-white' : 'text-white/50'}`}>{s.label}</p>
                  {current === i && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Nav Arrow Button — always visible ─── */
function NavBtn({ onClick, disabled, children, theme }: { onClick: () => void; disabled: boolean; children: React.ReactNode; theme: 'dark' | 'light' }) {
  const t = theme === 'light' ? lightBtn : darkBtn;
  return (
    <motion.button onClick={onClick} disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.1 }} whileTap={{ scale: disabled ? 1 : 0.95 }}
      className="w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all shadow-lg disabled:opacity-30"
      style={{ background: t.bg, borderColor: t.border, color: t.text }}
    >
      {children}
    </motion.button>
  );
}

/* ─── Main Engine ─── */
export default function DeckEngine({ slides }: { slides: React.ReactNode[] }) {
  const { audience } = useAudience();
  const [current, setCurrent] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // WebGL Transition State
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [textures, setTextures] = useState<{t1: THREE.Texture, t2: THREE.Texture} | null>(null);
  
  const currentRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const capture = async (el: HTMLElement) => {
    const canvas = await html2canvas(el, { backgroundColor: '#080808', useCORS: true, logging: false });
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  const go = useCallback((n: number) => {
    if (n < 0 || n >= total || isTransitioning || n === current) return;
    setIsTransitioning(true);

    // Bypass WebGL if we don't have refs
    if (!currentRef.current) {
      setCurrent(n);
      setIsTransitioning(false);
      return;
    }

    // Skip WebGL transition if slide contains canvas (e.g. Three.js particles)
    const hasCanvas = currentRef.current?.querySelector('canvas');
    if (hasCanvas) {
      setCurrent(n);
      setIsTransitioning(false);
      return;
    }

    // 1. Render next slide off-screen to capture
    setNextIndex(n);

    // Wait for next slide to mount, then capture both
    setTimeout(async () => {
      try {
        if (currentRef.current && nextRef.current) {
          const [tex1, tex2] = await Promise.all([
            capture(currentRef.current),
            capture(nextRef.current)
          ]);
          setTextures({ t1: tex1, t2: tex2 });
        } else {
          throw new Error("Missing refs for capture");
        }
      } catch (err) {
        console.error("WebGL Transition Capture Failed:", err);
        setCurrent(n);
        setIsTransitioning(false);
        setNextIndex(null);
      }
    }, 150);
  }, [current, total, isTransitioning]);

  const handleTransitionComplete = useCallback(() => {
    setCurrent(nextIndex as number);
    setNextIndex(null);
    setTextures(null);
    setIsTransitioning(false);
  }, [nextIndex]);

  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      if (e.key === 'Escape') setSidebarOpen(false);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [next, prev]);

  const slideInfo = SLIDES[current] || SLIDES[0];
  const theme = slideInfo.bg || 'dark';
  const t = theme === 'light' ? lightBtn : darkBtn;

  return (
    <DeckContext.Provider value={{ current, total, go, next, prev }}>
      <div className="fixed inset-0 overflow-hidden bg-zinc-950">
        <ProgressBar current={current} total={total} color={slideInfo.color} />

        {/* Slides */}
        <div ref={currentRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden z-[10]">
          {slides[current]}
        </div>

        {/* Next Slide (Off-screen for capture) */}
        {nextIndex !== null && textures === null && (
          <div ref={nextRef} className="absolute inset-0 overflow-y-auto overflow-x-hidden z-[-1]" style={{ opacity: 0.99 }}>
            {slides[nextIndex]}
          </div>
        )}

        {/* WebGL Overlay */}
        {textures && (
          <WebGLTransition texture1={textures.t1} texture2={textures.t2} onComplete={handleTransitionComplete} />
        )}

        {/* ── TOP BAR ── */}
        {/* Menu - top left */}
        <motion.button onClick={() => setSidebarOpen(true)}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="fixed top-5 left-5 z-[250] flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all shadow-lg"
          style={{ background: t.bg, borderColor: t.border, color: t.text }}
        >
          <LayoutGrid size={15} />
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Menu</span>
        </motion.button>

        {/* Audience Switcher - top center */}
        <AudienceSwitcher />

        {/* Slide label - top right corner */}
        <div className="fixed top-5 right-5 z-[250] flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md border shadow-lg"
          style={{ background: t.bg, borderColor: t.border }}>
          <span className="text-base">{slideInfo.emoji}</span>
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block" style={{ color: t.text }}>{slideInfo.label}</span>
        </div>

        {/* ── BOTTOM BAR ── */}
        {/* Color Toggle - bottom left */}
        <ColorToggle slides={SLIDES} current={current} go={go} theme={theme} />

        {/* Nav - bottom center */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[250] flex items-center gap-3">
          <NavBtn onClick={prev} disabled={current === 0} theme={theme}>
            <ChevronLeft size={20} />
          </NavBtn>

          {/* Slide Tab Bar (Desktop) & Dots (Mobile) */}
          <div className="flex items-center px-2 py-2 rounded-full backdrop-blur-md border shadow-lg overflow-x-auto no-scrollbar max-w-[calc(100vw-12rem)] md:max-w-[calc(100vw-18rem)]"
            style={{ background: t.bg, borderColor: t.border }}>

            {/* Desktop Tabs */}
            <div className="hidden md:flex items-center gap-1 min-w-max">
              {SLIDES.map((s, i) => {
                const isActive = current === i;
                return (
                  <button key={i} onClick={() => go(i)} title={s.label}
                    className="flex flex-col items-center justify-center min-w-[80px] h-[48px] px-2 rounded-full transition-all duration-300 flex-shrink-0"
                    style={{
                      background: isActive ? s.color : 'transparent',
                      color: isActive ? '#fff' : (theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)')
                    }}
                  >
                    <span className="text-sm mb-0.5" style={{ filter: isActive ? 'none' : 'grayscale(100%) opacity(70%)' }}>{s.emoji}</span>
                    <span className="text-[9px] font-black uppercase tracking-wider leading-none" style={{ opacity: isActive ? 1 : 0.7 }}>{s.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Dots */}
            <div className="flex md:hidden items-center gap-2 px-3 h-[48px]">
              {SLIDES.map((s, i) => (
                <button key={i} onClick={() => go(i)} title={s.label}
                  className="transition-all duration-300 rounded-full hover:opacity-100"
                  style={{ width: current === i ? 18 : 6, height: 6, background: current === i ? s.color : (theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)') }} />
              ))}
            </div>
          </div>

          <NavBtn onClick={next} disabled={current === total - 1} theme={theme}>
            <ChevronRight size={20} />
          </NavBtn>

          <AutoPresent current={current} total={total} next={next} theme={theme} />
        </div>


        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} current={current} go={go} />
      </div>
    </DeckContext.Provider>
  );
}