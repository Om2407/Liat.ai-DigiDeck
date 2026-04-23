import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const SYSTEM_CONTEXT = `You are the American Dream Mall AI concierge. Be knowledgeable, professional, and enthusiastic.
Key facts:
- 3 million sq ft, Western Hemisphere's largest entertainment & retail destination.
- 40M+ annual visitors, 8 miles from NYC, 20 min from Penn Station.
- Attractions: Nickelodeon Universe (35+ rides), DreamWorks Water Park (40+ slides, America's largest indoor), Big Snow indoor ski slope, SEA LIFE Aquarium, IMAX Cinema.
- Luxury (The Avenue): Hermès, Gucci, Louis Vuitton, Dior, Cartier, Chanel, Prada, Valentino.
- Tech: Apple, Samsung, Microsoft, Sony, Bose, B&H Photo.
- Events: 5,000-seat Performing Arts Center, 300K sq ft Exposition Center.
- Dining: 100+ restaurants including Carpaccio, Sushi Neko, Sugar Factory, Shake Shack.
- Marvel Studios exclusive retail flagship.
Keep answers to 2-3 sentences. Use emojis occasionally. End with a helpful suggestion.`;

const QUICK_ACTIONS = [
  { label: 'Attractions', icon: '🎡' },
  { label: 'Luxury Shops', icon: '👜' },
  { label: 'Leasing Info', icon: '📈' },
  { label: 'Dining',       icon: '🍕' },
];

const FALLBACK: Record<string, string> = {
  attract: "American Dream hosts Nickelodeon Universe (35+ rides 🎡), DreamWorks Water Park — America's largest indoor water park 🌊, Big SNOW ski slope ⛷️, SEA LIFE Aquarium, and IMAX Cinema. Want details on any specific attraction?",
  luxury:  "The Avenue features flagship boutiques — Hermès, Gucci, Louis Vuitton, Dior, Cartier, and more 👜. All within 20 min of NYC, serving the tri-state area's most affluent shoppers. Shall I share leasing opportunities in The Avenue?",
  leas:    "We offer spaces from 2,000 to 50,000+ sq ft 📈. With 40M+ annual visitors and NYC proximity, tenants see 2–3x revenue vs comparable locations. Contact leasing@americandream.com to start a conversation!",
  din:     "100+ dining options await 🍽️ — from fine dining at Carpaccio and Sushi Neko to Sugar Factory desserts and Shake Shack. Our rooftop bar offers skyline views. Dining here is a destination in itself!",
  default: "American Dream is the Western Hemisphere's largest entertainment & retail destination — 3M sq ft, 40M+ visitors/year, 8 miles from NYC 🌟. How can I guide your journey today?",
};

function getFallback(input: string): string {
  const l = input.toLowerCase();
  for (const [k, v] of Object.entries(FALLBACK)) {
    if (k !== 'default' && l.includes(k)) return v;
  }
  return FALLBACK.default;
}

interface Message { role: 'user' | 'assistant'; content: string; }

function useTypewriter(text: string, active: boolean, onDone?: () => void) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    setDisplay('');
    let i = 0;
    const timer = setInterval(() => {
      setDisplay(text.slice(0, i));
      i++;
      if (i > text.length) { clearInterval(timer); onDone?.(); }
    }, 14);
    return () => clearInterval(timer);
  }, [text, active]);
  return display;
}

const OrbIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

function AIBubble({ content, isLatest, onDone }: { content: string; isLatest: boolean; onDone?: () => void }) {
  const text = useTypewriter(content, isLatest, onDone);
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-[10px] flex-shrink-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
        <OrbIcon size={14} />
      </div>
      <div className="max-w-[85%] px-4 py-3 text-[13px] leading-relaxed text-zinc-200 rounded-[18px_18px_18px_4px]"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {text}
      </div>
    </div>
  );
}

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] px-4 py-3 text-[13px] leading-relaxed text-white rounded-[18px_18px_4px_18px]"
        style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 4px 20px rgba(59,130,246,0.25)' }}>
        {content}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="w-7 h-7 rounded-[10px] flex-shrink-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
        <OrbIcon size={14} />
      </div>
      <div className="flex gap-1.5 px-4 py-3.5 rounded-[18px_18px_18px_4px]"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay }} />
        ))}
      </div>
    </div>
  );
}

export default function AIConcierge() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState<Message[]>([
    { role: 'assistant', content: "Hello. I am the Dream Core AI. How may I guide your journey through American Dream today? 🌟" }
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const [writing, setWriting] = useState(false);
  const [latestIdx, setLatest] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || typing || writing) return;
    setInput('');
    const updated: Message[] = [...msgs, { role: 'user', content: msg }];
    setMsgs(updated);
    setTyping(true);

    let reply = '';
    try {
      if (GEMINI_API_KEY) {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
              contents: updated.map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
              })),
            })
          }
        );
        const data = await res.json();
        reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || getFallback(msg);
      } else {
        await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
        reply = getFallback(msg);
      }
    } catch {
      reply = getFallback(msg);
    }

    const next = [...updated, { role: 'assistant' as const, content: reply }];
    setTyping(false);
    setWriting(true);
    setLatest(next.length - 1);
    setMsgs(next);
  };

  return (
    <>
      {/* Floating orb button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-8 right-8 z-[200] w-16 h-16 flex items-center justify-center"
        style={{ filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.5))' }}
      >
        {/* Pulsing ring */}
        <motion.div className="absolute inset-0 rounded-2xl"
          style={{ background: 'rgba(99,102,241,0.25)', borderRadius: 20 }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }} />

        <motion.div
          animate={{ borderRadius: open ? 28 : [20, 14, 20] }}
          transition={{ duration: 2, repeat: open ? 0 : Infinity }}
          className="relative w-full h-full flex items-center justify-center text-white"
          style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                className="text-xl font-light leading-none">✕</motion.span>
            ) : (
              <motion.div key="bars" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-1 items-center">
                {[0, 0.1, 0.2].map((delay, i) => (
                  <motion.div key={i} className="w-0.5 bg-white rounded-full"
                    animate={{ height: [4, 14, 4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay }} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 24, stiffness: 300 }}
            className="fixed bottom-28 right-8 z-[199] flex flex-col overflow-hidden"
            style={{
              width: 400,
              height: 600,
              maxWidth: 'calc(100vw - 2rem)',
              borderRadius: 28,
              background: 'rgba(5,5,10,0.85)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
            }}
          >
            {/* Scanning line */}
            <motion.div className="absolute left-0 right-0 h-px z-20 pointer-events-none"
              style={{ background: 'linear-gradient(90deg,transparent,#6366f1,transparent)' }}
              animate={{ top: ['0%', '100%'], opacity: [1, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              {/* Orb with ring */}
              <div className="relative flex-shrink-0">
                <motion.div className="absolute inset-0 rounded-2xl"
                  style={{ border: '1px solid rgba(99,102,241,0.6)', borderRadius: 16 }}
                  animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }} />
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center relative"
                  style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
                  <OrbIcon size={20} />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm tracking-tight">Dream Core AI</p>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.18em]">Concierge · v2.0</p>
              </div>
              {/* Live indicator */}
              <div className="flex items-center gap-1.5">
                <motion.div className="w-2 h-2 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest">Live</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
              {msgs.map((m, i) =>
                m.role === 'assistant' ? (
                  <AIBubble key={i} content={m.content} isLatest={i === latestIdx && writing}
                    onDone={() => setWriting(false)} />
                ) : (
                  <UserBubble key={i} content={m.content} />
                )
              )}
              {typing && <TypingDots />}
              <div ref={bottomRef} />
            </div>

            {/* Quick action chips */}
            <div className="flex gap-2 px-4 pb-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {QUICK_ACTIONS.map(a => (
                <button key={a.label} onClick={() => send(a.label)}
                  className="whitespace-nowrap flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold text-zinc-300 rounded-full transition-all hover:text-indigo-300"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
                  <span style={{ fontSize: 13 }}>{a.icon}</span> {a.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-5 pt-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl transition-all"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Query the Dream Core..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-[13px] placeholder-zinc-600 py-2"
                />
                <motion.button
                  onClick={() => send()}
                  disabled={!input.trim() || typing || writing}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-20 transition-opacity flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
              <p className="text-center text-[9px] text-zinc-700 mt-3 uppercase tracking-[0.25em]">
                Powered by Gemini · American Dream
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
// import { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'motion/react';

// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// const SYSTEM_CONTEXT = `You are the American Dream Mall AI concierge. Be knowledgeable, professional, and enthusiastic.
// Key facts:
// - 3 million sq ft, Western Hemisphere's largest entertainment & retail destination
// - 40M+ annual visitors, 8 miles from Midtown Manhattan, 20 min from Times Square
// - Attractions: Nickelodeon Universe (35+ rides), DreamWorks Water Park (America's largest indoor, 40+ slides), Big Snow indoor ski, SEA LIFE Aquarium, ice skating, IMAX cinema
// - 450+ brands including Hermès, Gucci, Louis Vuitton, Dior, Cartier, Apple, Nike, Sephora
// - Marvel Studios exclusive retail flagship
// - Events: 5,000-seat Performing Arts Center, 300K sq ft Exposition Center
// - Tech corridor: Apple, Samsung, Microsoft, Sony, Bose, B&H Photo
// - Contact: leasing@americandream.com
// Keep answers to 2-3 sentences. End with a soft CTA.`;

// // Fallback FAQ when no API key
// const FAQ: Record<string, string> = {
//   default: "Welcome! American Dream is the Western Hemisphere's largest entertainment & retail destination — 3M sq ft, 40M+ visitors/year, just 8 miles from NYC. How can I help you today?",
//   attract: "We have Nickelodeon Universe (35+ rides), DreamWorks Water Park (America's largest indoor), Big Snow indoor ski, SEA LIFE Aquarium, IMAX cinema, and the Marvel Studios flagship store!",
//   leas: "We offer leasing for luxury flagships, mid-tier retail, F&B, tech showrooms, and pop-up spaces. Contact leasing@americandream.com for a personalized pitch.",
//   sponsor: "Sponsorship tiers range from digital activations to full venue naming rights — 40M+ annual visitors, NYC proximity. Reach our team via Contact section.",
//   nyc: "Just 8 miles from Midtown Manhattan — 20 minutes via NJ Transit or a short drive via the NJ Turnpike. Perfect for the entire tri-state market.",
//   event: "Our 5,000-seat Performing Arts Center and 300,000 sq ft Exposition Center host concerts, product launches, and corporate activations. Email leasing@americandream.com.",
//   marvel: "The Marvel Studios exclusive flagship is inside American Dream — 5,000 sq ft of collectibles, merch, and character meet-and-greets. Earth's mightiest shopping experience!",
//   tech: "Our tech corridor features Apple, Samsung, Microsoft, Sony, Bose, and B&H Photo — the most comprehensive tech retail destination in the Northeast.",
// };

// function getFallback(input: string): string {
//   const l = input.toLowerCase();
//   for (const [k, v] of Object.entries(FAQ)) {
//     if (k !== 'default' && l.includes(k)) return v;
//   }
//   return FAQ.default;
// }

// const QUICK = ['What attractions are here?', 'Tell me about leasing', 'Sponsorship packages?', 'Marvel store?'];
// interface Message { role: 'user' | 'assistant'; content: string; }

// export default function AIConcierge() {
//   const [open, setOpen] = useState(false);
//   const [msgs, setMsgs] = useState<Message[]>([
//     { role: 'assistant', content: "Welcome to American Dream! I'm your AI concierge powered by Gemini. Ask me anything about attractions, leasing, or events. 🏙️" }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [pulse, setPulse] = useState(true);
//   const bottomRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (open) { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); setPulse(false); }
//   }, [msgs, open]);

//   const send = async (text?: string) => {
//     const msg = (text || input).trim();
//     if (!msg || loading) return;
//     setInput('');
//     setLoading(true);
//     const updated: Message[] = [...msgs, { role: 'user', content: msg }];
//     setMsgs(updated);

//     // Try Gemini API
//     if (GEMINI_API_KEY) {
//       try {
//         const history = updated.slice(0, -1).map(m => ({
//           role: m.role === 'user' ? 'user' : 'model',
//           parts: [{ text: m.content }]
//         }));
//         const res = await fetch(
//           `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               system_instruction: { parts: [{ text: SYSTEM_CONTEXT }] },
//               contents: [...history, { role: 'user', parts: [{ text: msg }] }],
//               generationConfig: { maxOutputTokens: 200, temperature: 0.7 }
//             })
//           }
//         );
//         const data = await res.json();
//         const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || getFallback(msg);
//         setMsgs([...updated, { role: 'assistant', content: reply }]);
//       } catch {
//         setMsgs([...updated, { role: 'assistant', content: getFallback(msg) }]);
//       }
//     } else {
//       // No API key — use FAQ fallback with slight delay
//       setTimeout(() => {
//         setMsgs([...updated, { role: 'assistant', content: getFallback(msg) }]);
//       }, 600);
//     }
//     setLoading(false);
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <motion.button
//         onClick={() => setOpen(o => !o)}
//         whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
//         className="fixed bottom-8 right-8 z-[200] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white text-2xl"
//         style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', boxShadow: '0 8px 30px rgba(59,130,246,0.5)' }}
//       >
//         {open ? '✕' : '💬'}
//         {pulse && !open && (
//           <motion.div className="absolute inset-0 rounded-full border-2 border-blue-400"
//             animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }} />
//         )}
//       </motion.button>

//       {/* Chat Panel */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.95 }}
//             transition={{ duration: 0.25 }}
//             className="fixed bottom-28 right-8 z-[199] w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200"
//             style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)' }}
//           >
//             {/* Header */}
//             <div className="p-5 border-b border-zinc-100 flex items-center gap-3"
//               style={{ background: 'linear-gradient(135deg, #1e40af, #3b82f6)' }}>
//               <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg">🏙️</div>
//               <div>
//                 <p className="text-white font-black text-sm">American Dream</p>
//                 <p className="text-white/70 text-[10px] uppercase tracking-widest">Gemini AI Concierge</p>
//               </div>
//               <div className="ml-auto w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
//             </div>

//             {/* Messages */}
//             <div className="h-64 overflow-y-auto p-5 flex flex-col gap-4 scroll-smooth">
//               {msgs.map((m, i) => (
//                 <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
//                   className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
//                     m.role === 'user' ? 'self-end bg-blue-600 text-white rounded-br-sm' : 'self-start bg-zinc-100 text-zinc-800 rounded-bl-sm'
//                   }`}>
//                   {m.content}
//                 </motion.div>
//               ))}
//               {loading && (
//                 <div className="self-start bg-zinc-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
//                   {[0,1,2].map(i => (
//                     <motion.div key={i} className="w-2 h-2 bg-zinc-400 rounded-full"
//                       animate={{ y: [0,-5,0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i*0.15 }} />
//                   ))}
//                 </div>
//               )}
//               <div ref={bottomRef} />
//             </div>

//             {/* Quick Replies */}
//             <div className="px-4 pb-2 flex flex-wrap gap-2">
//               {QUICK.map(q => (
//                 <button key={q} onClick={() => send(q)}
//                   className="px-3 py-1.5 bg-zinc-100 text-zinc-600 text-[10px] font-bold uppercase tracking-wider rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors">
//                   {q}
//                 </button>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="p-4 border-t border-zinc-100 flex gap-2">
//               <input value={input} onChange={e => setInput(e.target.value)}
//                 onKeyDown={e => e.key === 'Enter' && send()}
//                 placeholder="Ask anything..."
//                 className="flex-1 bg-zinc-100 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder-zinc-400 outline-none focus:bg-zinc-200 transition-colors" />
//               <button onClick={() => send()} disabled={!input.trim() || loading}
//                 className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg hover:bg-blue-500 transition-colors disabled:opacity-30">
//                 ↑
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
