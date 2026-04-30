import { useState } from 'react';
import { motion } from 'framer-motion';

const PANELS = [
  {
    id: 'nick',
    title: 'Nickelodeon Universe',
    stats: '35+ Rides',
    desc: "America's Largest Indoor Theme Park",
    bg: 'from-orange-600/20 to-orange-900/40',
    border: 'border-orange-500/30',
    hover: 'hover:border-orange-500',
    color: 'text-orange-500',
  },
  {
    id: 'water',
    title: 'DreamWorks Water Park',
    stats: '40+ Slides',
    desc: "America's Largest Indoor Water Park",
    bg: 'from-blue-600/20 to-blue-900/40',
    border: 'border-blue-500/30',
    hover: 'hover:border-blue-500',
    color: 'text-blue-500',
  },
  {
    id: 'snow',
    title: 'Big SNOW + Marvel',
    stats: 'Indoor Skiing + Marvel',
    desc: 'Open 365 Days a Year',
    bg: 'from-purple-600/20 to-purple-900/40',
    border: 'border-purple-500/30',
    hover: 'hover:border-purple-500',
    color: 'text-purple-500',
  },
];

export default function EntertainmentDeck() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen bg-zinc-950 text-white overflow-hidden flex flex-col">
      {/* Header */}
      <div className="pt-16 pb-8 px-8 md:px-16 text-center z-10">
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-3 text-zinc-400"
        >
          World-Record Attractions
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-tighter leading-none"
        >
          Nothing Else Comes Close.
        </motion.h2>
      </div>

      {/* Panels */}
      <div className="flex-1 w-full flex flex-col md:flex-row gap-4 px-8 md:px-16 pb-24 z-10">
        {PANELS.map((panel, i) => (
          <motion.div
            key={panel.id}
            onMouseEnter={() => setHovered(panel.id)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
            className={`flex-1 relative rounded-3xl border ${panel.border} ${panel.hover} overflow-hidden bg-gradient-to-b ${panel.bg} transition-all duration-500 flex flex-col justify-end p-8`}
            style={{ 
              transform: hovered === panel.id ? 'scale(1.02)' : 'scale(1)',
              zIndex: hovered === panel.id ? 20 : 10
            }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-500" style={{ opacity: hovered === panel.id ? 0 : 1 }} />
            
            <div className="relative z-10">
              <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 ${panel.color}`}>
                {panel.title}
              </h3>
              <p className="text-xl font-bold text-white mb-2">{panel.stats}</p>
              
              <div 
                className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: hovered === panel.id ? '100px' : '0px', opacity: hovered === panel.id ? 1 : 0 }}
              >
                <p className="text-sm md:text-base text-zinc-300 mt-2 font-medium">
                  {panel.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Stat */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-0 w-full text-center z-10"
      >
        <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-500">
          <span className="text-white">4+ hour</span> average dwell time — <span className="text-white">3× longer</span> than a traditional mall
        </p>
      </motion.div>
    </div>
  );
}
