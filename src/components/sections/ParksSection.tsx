import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

const parks = [
  {
    name: 'Nickelodeon Universe',
    type: 'Theme Park',
    tagline: '35+ rides & attractions',
    color: '#ff6600',
    bg: 'from-orange-500 to-yellow-400',
    stats: [{ v: '35+', l: 'Rides' }, { v: '8', l: 'Zones' }, { v: '16', l: 'Restaurants' }],
    videoUrl: 'https://www.youtube.com/embed/8i6O_9lp7Vc?autoplay=1&mute=1&loop=1&playlist=8i6O_9lp7Vc&controls=0&rel=0&modestbranding=1&playsinline=1',
    modalUrl: 'https://www.youtube.com/embed/8i6O_9lp7Vc?autoplay=1&mute=0&loop=1&playlist=8i6O_9lp7Vc&controls=1&rel=0',
  },
  {
    name: 'DreamWorks Water Park',
    type: 'Water Park',
    tagline: "America's largest indoor water park",
    color: '#0077cc',
    bg: 'from-blue-500 to-cyan-400',
    stats: [{ v: '40+', l: 'Slides' }, { v: '1.5M', l: 'Sq Ft' }, { v: '365', l: 'Days/Yr' }],
    videoUrl: 'https://www.youtube.com/embed/QaFi9R_0gCE?autoplay=1&mute=1&loop=1&playlist=QaFi9R_0gCE&controls=0&rel=0',
    modalUrl: 'https://www.youtube.com/embed/FNBfKCGgCM0?autoplay=1&mute=0&loop=1&playlist=FNBfKCGgCM0&controls=1&rel=0',
  },
  {
    name: 'Big SNOW',
    type: 'Indoor Ski Slope',
    tagline: "America's only year-round indoor snow",
    color: '#3b5fa0',
    bg: 'from-indigo-600 to-blue-400',
    stats: [{ v: '4', l: 'Trails' }, { v: '16°F', l: 'Always' }, { v: '365', l: 'Days/Yr' }],
    videoUrl: 'https://www.youtube.com/embed/SPGRkexI_cs?autoplay=1&mute=1&loop=1&playlist=SPGRkexI_cs&controls=0&rel=0&modestbranding=1&playsinline=1',
    modalUrl: 'https://www.youtube.com/embed/SPGRkexI_cs?autoplay=1&mute=0&loop=1&playlist=SPGRkexI_cs&controls=1&rel=0',
  },
];

function TomJerryCartoon() {
  return (
    <div className="absolute -top-4 -right-4 w-20 h-20 z-20 pointer-events-none select-none">
      <motion.div
        animate={{ rotate: [0, 10, -10, 0], y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-5xl drop-shadow-lg"
      >
        🐱
      </motion.div>
    </div>
  );
}

function NickCartoon() {
  return (
    <div className="absolute -top-4 -right-4 w-20 h-20 z-20 pointer-events-none select-none">
      <motion.div
        animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="text-5xl drop-shadow-lg"
      >
        🧽
      </motion.div>
    </div>
  );
}

function SnowCartoon() {
  return (
    <div className="absolute -top-4 -right-4 w-20 h-20 z-20 pointer-events-none select-none">
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 360] }}
        transition={{ y: { duration: 2, repeat: Infinity }, rotate: { duration: 8, repeat: Infinity, ease: 'linear' } }}
        className="text-5xl drop-shadow-lg"
      >
        ❄️
      </motion.div>
    </div>
  );
}

export default function ParksSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <section id="parks" className="py-28 bg-zinc-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 uppercase tracking-[0.4em] text-[10px] font-black block mb-3">
            World-Class Attractions
          </span>
          <h2 className="section-title">Parks & Experiences</h2>
          <p className="section-subtitle">
            Three record-breaking destinations that no other property on Earth can match.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {parks.map((park, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-visible shadow-xl shadow-zinc-200/50 group relative"
            >
              {/* Cartoon corner characters */}
              {i === 0 && <NickCartoon />}
              {i === 1 && <TomJerryCartoon />}
              {i === 2 && <SnowCartoon />}

              {/* Card top — background looping video */}
              <div
                className={`h-52 bg-gradient-to-br ${park.bg} relative flex items-center justify-center rounded-t-3xl overflow-hidden cursor-pointer`}
                onClick={() => setActiveVideo(i)}
              >
                {/* Muted background video */}
                <iframe
                  src={park.videoUrl}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  allow="autoplay; encrypted-media"
                  style={{
                    border: 'none',
                    // Scale up to hide YouTube's black letterbox bars
                    transform: 'scale(1.5)',
                    transformOrigin: 'center center',
                  }}
                  title={park.name}
                />

                {/* Light gradient overlay — keeps badge readable, video still visible */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent`} />

                {/* Play button on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center z-10">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                    <span className="text-2xl ml-1">▶</span>
                  </div>
                </div>

                {/* Type badge */}
                <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
                  <span className="text-white text-[9px] font-black uppercase tracking-widest">{park.type}</span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-8">
                <h3 className="text-xl font-black mb-2 tracking-tight">{park.name}</h3>
                <p className="text-zinc-400 text-sm mb-6">{park.tagline}</p>

                <div className="flex gap-6 mb-6 pb-6 border-b border-zinc-100">
                  {park.stats.map((s) => (
                    <div key={s.l}>
                      <p className="text-zinc-900 font-black text-lg tracking-tighter">{s.v}</p>
                      <p className="text-zinc-400 text-[9px] uppercase tracking-widest font-bold">{s.l}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActiveVideo(i)}
                  className="flex items-center gap-2 text-sm font-black text-blue-600 group/btn"
                >
                  Watch Video <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-primary text-xs uppercase tracking-widest px-10 py-4">
            Explore All Attractions
          </button>
        </div>
      </div>

      {/* Full video modal — with sound + controls */}
      <AnimatePresence>
        {activeVideo !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] bg-black/90 flex items-center justify-center p-6"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '16/9' }}
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={parks[activeVideo].modalUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ border: 'none' }}
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
// import { motion, AnimatePresence } from 'motion/react';
// import { ChevronRight, X } from 'lucide-react';
// import { useState } from 'react';

// const parks = [
//   {
//     name: 'Nickelodeon Universe',
//     type: 'Theme Park',
//     tagline: '35+ rides & attractions',
//     color: '#ff6600',
//     bg: 'from-orange-500 to-yellow-400',
//     emoji: '🎡',
//     cartoon: '🟠', // Nickelodeon orange blob
//     cartoonStyle: 'top-3 right-3',
//     stats: [{ v: '35+', l: 'Rides' }, { v: '8', l: 'Zones' }, { v: '16', l: 'Restaurants' }],
//     videoUrl: 'https://youtube.com/shorts/8i6O_9lp7Vc?si=992BynHzXmFkHRmz',
//     character: '/images/nickelodeon-char.png',
//   },
//   {
//     name: 'DreamWorks Water Park',
//     type: 'Water Park',
//     tagline: "America's largest indoor water park",
//     color: '#0077cc',
//     bg: 'from-blue-500 to-cyan-400',
//     emoji: '🌊',
//     cartoon: '🐠',
//     cartoonStyle: 'top-3 right-3',
//     stats: [{ v: '40+', l: 'Slides' }, { v: '1.5M', l: 'Sq Ft' }, { v: '365', l: 'Days/Yr' }],
//     videoUrl: 'https://www.youtube.com/embed/FNBfKCGgCM0?autoplay=1&mute=1&loop=1&playlist=FNBfKCGgCM0&controls=0&rel=0',
//     character: null,
//   },
//   {
//     name: 'Big SNOW',
//     type: 'Indoor Ski Slope',
//     tagline: "America's only year-round indoor snow",
//     color: '#3b5fa0',
//     bg: 'from-indigo-600 to-blue-400',
//     emoji: '⛷️',
//     cartoon: '❄️',
//     cartoonStyle: 'top-3 right-3',
//     stats: [{ v: '4', l: 'Trails' }, { v: '16°F', l: 'Always' }, { v: '365', l: 'Days/Yr' }],
//     videoUrl: 'https://www.youtube.com/embed/SPGRkexI_cs?autoplay=1&mute=1&loop=1&playlist=SPGRkexI_cs&controls=0&rel=0',
//     character: null,
//   },
// ];

// // Tom & Jerry style cartoon for Water Park corner
// function TomJerryCartoon() {
//   return (
//     <div className="absolute -top-4 -right-4 w-20 h-20 z-20 pointer-events-none select-none">
//       <motion.div
//         animate={{ rotate: [0, 10, -10, 0], y: [0, -4, 0] }}
//         transition={{ duration: 2, repeat: Infinity }}
//         className="text-5xl drop-shadow-lg"
//       >
//         🐱
//       </motion.div>
//     </div>
//   );
// }

// function NickCartoon() {
//   return (
//     <div className="absolute -top-4 -right-4 w-20 h-20 z-20 pointer-events-none select-none">
//       <motion.div
//         animate={{ scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] }}
//         transition={{ duration: 1.8, repeat: Infinity }}
//         className="text-5xl drop-shadow-lg"
//       >
//         🧽
//       </motion.div>
//     </div>
//   );
// }

// function SnowCartoon() {
//   return (
//     <div className="absolute -top-4 -right-4 w-20 h-20 z-20 pointer-events-none select-none">
//       <motion.div
//         animate={{ y: [0, -6, 0], rotate: [0, 360] }}
//         transition={{ y: { duration: 2, repeat: Infinity }, rotate: { duration: 8, repeat: Infinity, ease: 'linear' } }}
//         className="text-5xl drop-shadow-lg"
//       >
//         ❄️
//       </motion.div>
//     </div>
//   );
// }

// export default function ParksSection() {
//   const [activeVideo, setActiveVideo] = useState<number | null>(null);

//   return (
//     <section id="parks" className="py-28 bg-zinc-50">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <span className="text-blue-600 uppercase tracking-[0.4em] text-[10px] font-black block mb-3">
//             World-Class Attractions
//           </span>
//           <h2 className="section-title">Parks & Experiences</h2>
//           <p className="section-subtitle">
//             Three record-breaking destinations that no other property on Earth can match.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {parks.map((park, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.12, duration: 0.6 }}
//               whileHover={{ y: -10 }}
//               className="bg-white rounded-3xl overflow-visible shadow-xl shadow-zinc-200/50 group relative"
//             >
//               {/* Cartoon corner character */}
//               {i === 0 && <NickCartoon />}
//               {i === 1 && <TomJerryCartoon />}
//               {i === 2 && <SnowCartoon />}

//               {/* Gradient hero with play button */}
//               <div
//                 className={`h-52 bg-gradient-to-br ${park.bg} relative flex items-center justify-center rounded-t-3xl overflow-hidden cursor-pointer`}
//                 onClick={() => setActiveVideo(i)}
//               >
//                 <motion.span
//                   className="text-7xl"
//                   animate={{ y: [0, -8, 0] }}
//                   transition={{ duration: 2.5 + i, repeat: Infinity }}
//                 >
//                   {park.emoji}
//                 </motion.span>

//                 {/* Play button overlay */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
//                   <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
//                     <span className="text-2xl ml-1">▶</span>
//                   </div>
//                 </div>

//                 <div className="absolute top-5 left-5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
//                   <span className="text-white text-[9px] font-black uppercase tracking-widest">{park.type}</span>
//                 </div>
//               </div>

//               <div className="p-8">
//                 <h3 className="text-xl font-black mb-2 tracking-tight">{park.name}</h3>
//                 <p className="text-zinc-400 text-sm mb-6">{park.tagline}</p>

//                 <div className="flex gap-6 mb-6 pb-6 border-b border-zinc-100">
//                   {park.stats.map((s) => (
//                     <div key={s.l}>
//                       <p className="text-zinc-900 font-black text-lg tracking-tighter">{s.v}</p>
//                       <p className="text-zinc-400 text-[9px] uppercase tracking-widest font-bold">{s.l}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   onClick={() => setActiveVideo(i)}
//                   className="flex items-center gap-2 text-sm font-black text-blue-600 group/btn"
//                 >
//                   Watch Video <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         <div className="mt-16 text-center">
//           <button className="btn-primary text-xs uppercase tracking-widest px-10 py-4">
//             Explore All Attractions
//           </button>
//         </div>
//       </div>

//       {/* Video Modal */}
//       <AnimatePresence>
//         {activeVideo !== null && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[500] bg-black/90 flex items-center justify-center p-6"
//             onClick={() => setActiveVideo(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
//               style={{ aspectRatio: '16/9' }}
//               onClick={e => e.stopPropagation()}
//             >
//               <iframe
//                 src={parks[activeVideo].videoUrl}
//                 className="w-full h-full"
//                 allow="autoplay; encrypted-media"
//                 allowFullScreen
//                 style={{ border: 'none' }}
//               />
//               <button
//                 onClick={() => setActiveVideo(null)}
//                 className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
//               >
//                 <X size={18} />
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
