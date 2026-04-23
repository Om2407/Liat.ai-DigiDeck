import { useRef, useState } from 'react';
import { motion } from 'motion/react';

const FEATURES = [
  { icon: '🌊', title: '40+ Slides & Attractions', desc: 'From gentle lazy rivers to extreme speed slides' },
  { icon: '🏄', title: 'Wave Pool', desc: 'Olympic-size wave simulation pool' },
  { icon: '🍹', title: 'Poolside Dining', desc: 'Full-service restaurant and bar by the water' },
  { icon: '👨‍👩‍👧', title: 'Family Zones', desc: "Dedicated kids' areas — safe, fun, and exciting" },
];

export default function WaterParkSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-zinc-950">

      {/* YouTube background — actual DreamWorks Water Park footage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/iKVRc4WvCC8?autoplay=1&mute=1&loop=1&playlist=iKVRc4WvCC8&controls=0&showinfo=0&rel=0&modestbranding=1&start=9"
          className="absolute pointer-events-none"
          allow="autoplay; encrypted-media"
          title="DreamWorks Water Park"
          style={{
            border: 'none',
            width: '130%',
            height: '130%',
            top: '-15%',
            left: '-15%',
            opacity: 0.45,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/60 to-zinc-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/40" />
      </div>

      <div className="relative z-10 container mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">

        {/* Left — Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black block mb-5">
            DreamWorks Water Park
          </span>
          <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-8">
            America's<br />
            <span style={{ background: 'linear-gradient(135deg,#38bdf8,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Largest<br />Indoor
            </span><br />
            Water Park
          </h2>
          <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
            Open year-round — rain or shine. 1.5 million sq ft of water-based thrill,
            relaxation, and family fun. No sunscreen required.
          </p>
          <div className="grid grid-cols-2 gap-5 mb-10">
            {FEATURES.map(f => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">{f.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            <button className="px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-500 transition-all">
              Book Tickets
            </button>
            <button className="px-10 py-4 border-2 border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-full hover:border-white/50 transition-all">
              View Packages
            </button>
          </div>
        </motion.div>

        {/* Right — Stats */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="grid grid-cols-2 gap-5"
        >
          {[
            { num: '40+',  label: 'Slides & Rides',  sub: 'For all thrill levels'    },
            { num: '1.5M', label: 'Sq Ft',           sub: 'Largest indoor in US'     },
            { num: '365',  label: 'Days/Year',        sub: 'Always open, rain or sun' },
            { num: '18K+', label: 'Daily Visitors',   sub: 'Peak season capacity'     },
          ].map(stat => (
            <div key={stat.label} className="p-6 rounded-2xl border border-white/10 backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.04)' }}>
              <p className="text-blue-400 text-4xl font-black tracking-tighter mb-1">{stat.num}</p>
              <p className="text-white text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-white/30 text-xs mt-1">{stat.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
