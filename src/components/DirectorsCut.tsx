import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import FilmGrain from './ui/FilmGrain';
import type { Audience } from '../context/AudienceContext';

interface DirectorsCutProps {
  onSelect: (audience: Audience) => void;
}

const CARDS = [
  { id: 'all' as Audience, title: 'ALL VISITORS', icon: '🌐', color: '#60a5fa', sub: 'Full overview experience' },
  { id: 'tenant' as Audience, title: 'RETAIL TENANT', icon: '🏪', color: '#f59e0b', sub: 'Leasing & revenue focus', badge: 'MOST REQUESTED' },
  { id: 'sponsor' as Audience, title: 'BRAND SPONSOR', icon: '🎯', color: '#8b5cf6', sub: 'Activation & reach focus' },
  { id: 'event' as Audience, title: 'EVENT PRODUCER', icon: '🎪', color: '#10b981', sub: 'Venues & capacity focus' },
];

export default function DirectorsCut({ onSelect }: DirectorsCutProps) {
  const [selectedId, setSelectedId] = useState<Audience | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleSelect = (id: Audience) => {
    setSelectedId(id);
    setTimeout(() => setIsExiting(true), 600);
    setTimeout(() => onSelect(id), 1400); // Trigger after exit animation
  };


  const selectedColor = selectedId ? CARDS.find(c => c.id === selectedId)?.color : 'transparent';

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div 
          key="directors-cut"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden"
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
            
            @keyframes floatOrb1 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 30px) scale(0.9); }
            }
            @keyframes floatOrb2 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(-40px, 30px) scale(1.15); }
              66% { transform: translate(20px, -40px) scale(0.85); }
            }
            @keyframes floatOrb3 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(25px, 25px) scale(1.05); }
            }
          `}</style>

          <FilmGrain opacity={0.03} />

          {/* Orb 1 — blue left */}
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)',
              animation: 'floatOrb1 8s ease-in-out infinite',
              filter: 'blur(40px)',
            }}
          />

          {/* Orb 2 — purple right */}
          <div className="absolute top-[30%] right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
              animation: 'floatOrb2 10s ease-in-out infinite',
              filter: 'blur(60px)',
            }}
          />

          {/* Orb 3 — amber center-bottom */}
          <div className="absolute bottom-[10%] left-[40%] w-[400px] h-[400px] rounded-full pointer-events-none z-0"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
              animation: 'floatOrb3 12s ease-in-out infinite',
              filter: 'blur(50px)',
            }}
          />

          {/* Subtle grid overlay */}
          <div className="absolute inset-0 pointer-events-none z-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />

          {/* Top and bottom vignette */}
          <div className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)'
            }}
          />

          <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center">
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold mb-6 text-center"
            >
              AMERICAN DREAM · DIRECTORS CUT
            </motion.p>

            <h1 
              className="text-[clamp(4rem,8vw,8rem)] text-[#fef3c7] leading-[0.9] text-center mb-16 uppercase"
              style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.05em' }}
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  WHO'S IN
                </motion.div>
              </div>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  THE ROOM?
                </motion.div>
              </div>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {CARDS.map((card, i) => {
                const isSelected = selectedId === card.id;
                const isFaded = selectedId && !isSelected;

                return (
                  <motion.button
                    key={card.id}
                    onClick={() => !selectedId && handleSelect(card.id)}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ 
                      opacity: isFaded ? 0.1 : 1, 
                      y: 0,
                      scale: isSelected ? 1.05 : 1
                    }}
                    transition={{ 
                      opacity: { duration: selectedId ? 0.4 : 0.8 },
                      scale: { duration: 0.6, type: "spring" },
                      y: { delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                    }}
                    whileHover={!selectedId ? { y: -8, scale: 1.03 } : {}}
                    className={`relative bg-zinc-900 border flex flex-col items-center justify-center text-center p-8 rounded-2xl group transition-all duration-300 ${selectedId ? 'cursor-default' : 'cursor-pointer'}`}
                    style={{ 
                      borderColor: isSelected ? card.color : `${card.color}40`,
                      boxShadow: isSelected ? `0 0 40px ${card.color}40` : 'none'
                    }}
                  >
                    {/* Glow on hover */}
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `0 0 30px ${card.color}20 inset, 0 0 20px ${card.color}20` }}
                    />

                    {card.badge && (
                      <div 
                        className="absolute -top-3 right-4 px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest text-zinc-950"
                        style={{ backgroundColor: card.color }}
                      >
                        {card.badge}
                      </div>
                    )}

                    <span className="text-4xl mb-6 block transition-transform duration-300 group-hover:scale-110">
                      {card.icon}
                    </span>
                    
                    <h3 className="text-white font-black tracking-widest text-sm mb-2" style={{ color: card.color }}>
                      {card.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-xs font-medium">
                      {card.sub}
                    </p>
                  </motion.button>
                )
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 w-full px-8 flex justify-between items-center z-10 text-xs"
          >
            <p className="text-zinc-600 font-medium">
              You can switch audience anytime during presentation.
            </p>
            <button 
              onClick={() => !selectedId && handleSelect('all')}
              className="text-zinc-600 hover:text-white uppercase tracking-widest font-bold transition-colors"
            >
              Skip →
            </button>
          </motion.div>

        </motion.div>
      ) : (
        <motion.div 
          key="flash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen"
          style={{ backgroundColor: selectedColor }}
        />
      )}
    </AnimatePresence>
  );
}
