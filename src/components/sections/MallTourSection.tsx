import { useRef, useState } from 'react';
import { motion } from 'motion/react';

// Only 1st Pexels URL confirmed working
const BG_VIDEO = 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4';

export default function MallTourSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left — Video (portrait) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-zinc-300/50"
            style={{ aspectRatio: '4/5', maxHeight: '620px' }}
          >
            <video
              ref={videoRef}
              autoPlay muted loop playsInline preload="auto"
              onCanPlay={() => setVideoReady(true)}
              className="w-full h-full object-cover"
              style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 1s ease' }}
            >
              <source src={BG_VIDEO} type="video/mp4" />
            </video>

            {/* Fallback while loading */}
            {!videoReady && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-zinc-200 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}

            {/* Live badge */}
            <div className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-900">Live Experience</p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900/70 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-white text-xs font-black uppercase tracking-wider">American Dream Mall</p>
              <p className="text-white/60 text-xs">East Rutherford, NJ · 3M sq ft</p>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className="text-blue-600 uppercase tracking-[0.4em] text-[10px] font-black block mb-5">
              The Experience
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 leading-[0.85] mb-8">
              See It.<br />
              Feel It.<br />
              <span className="text-blue-600">Be Part of It.</span>
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed mb-10">
              American Dream is more than a destination — it's an atmosphere.
              Every corner is engineered to create unforgettable moments that
              keep 40M+ visitors coming back year after year.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { num: '$180',  label: 'Avg Spend/Visit',     icon: '💳' },
                { num: '4.2hr', label: 'Avg Dwell Time',      icon: '⏱️' },
                { num: '20min', label: 'From Times Square',   icon: '🗽' },
                { num: '200+',  label: 'Annual Events',       icon: '🎪' },
              ].map(item => (
                <div key={item.label} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-zinc-900 font-black text-xl tracking-tighter">{item.num}</p>
                    <p className="text-zinc-400 text-[9px] uppercase tracking-wider font-bold">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {}}
              className="px-12 py-5 bg-zinc-900 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-zinc-700 transition-all"
            >
              Schedule a Private Tour
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
