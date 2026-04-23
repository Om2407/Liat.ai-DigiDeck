import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

const TECH_BRANDS = [
  {
    name: 'Apple Store',
    emoji: '🍎',
    color: '#e8e8e8',
    bg: 'from-zinc-800 to-zinc-900',
    accent: '#ffffff',
    floor: 'Level 1 · Wing A',
    sqft: '8,200 sq ft',
    desc: 'Flagship Apple retail — iPhone, Mac, Vision Pro & Genius Bar. Highest revenue-per-sq-ft tenant in the Northeast corridor.',
    stat: '$4,800/sq ft',
    statLabel: 'Annual Revenue',
    category: 'Consumer Electronics',
  },
  {
    name: 'Samsung',
    emoji: '📱',
    color: '#1428a0',
    bg: 'from-blue-700 to-blue-950',
    accent: '#60a5fa',
    floor: 'Level 1 · Wing B',
    sqft: '6,500 sq ft',
    desc: 'Galaxy ecosystem showroom — foldables, smart home, and immersive demo zones driving 40M+ annual brand impressions.',
    stat: '2.1M+',
    statLabel: 'Annual Footfall',
    category: 'Smart Ecosystem',
  },
  {
    name: 'Microsoft',
    emoji: '💻',
    color: '#00a4ef',
    bg: 'from-sky-700 to-blue-900',
    accent: '#38bdf8',
    floor: 'Level 2 · Center',
    sqft: '7,100 sq ft',
    desc: 'Surface, Xbox & HoloLens experience center. AI-driven productivity demos and enterprise partnership activations.',
    stat: '#1',
    statLabel: 'AI Retail Hub NE',
    category: 'AI & Productivity',
  },
  {
    name: 'Sony',
    emoji: '🎮',
    color: '#003087',
    bg: 'from-indigo-800 to-indigo-950',
    accent: '#818cf8',
    floor: 'Level 2 · East',
    sqft: '5,800 sq ft',
    desc: 'PlayStation 5, BRAVIA OLED, and WH-1000XM5 audio — live gaming tournaments draw 15K+ visitors per weekend.',
    stat: '15K+',
    statLabel: 'Weekend Visitors',
    category: 'Gaming & Audio',
  },
  {
    name: 'Bose',
    emoji: '🎧',
    color: '#1a1a1a',
    bg: 'from-zinc-700 to-zinc-950',
    accent: '#a3a3a3',
    floor: 'Level 3 · Quiet Zone',
    sqft: '3,200 sq ft',
    desc: 'Dedicated listening rooms with spatial audio demos. Premium noise-canceling tech positioned alongside luxury dining.',
    stat: '98%',
    statLabel: 'NPS Satisfaction',
    category: 'Premium Audio',
  },
  {
    name: 'B&H Photo',
    emoji: '📷',
    color: '#cc0000',
    bg: 'from-red-700 to-red-950',
    accent: '#f87171',
    floor: 'Level 3 · Creative Hub',
    sqft: '9,400 sq ft',
    desc: "NYC's iconic pro-photo destination — cameras, drones, video rigs. The only B&H outside Manhattan. Serves 50K+ creators/year.",
    stat: '50K+',
    statLabel: 'Creators Served/Yr',
    category: 'Professional Imaging',
  },
];

const STATS = [
  { value: '$2.1B', label: 'Annual Retail Sales', sub: 'Tech corridor alone' },
  { value: '6', label: 'Flagship Tech Brands', sub: 'Exclusive to American Dream' },
  { value: '40M+', label: 'Annual Footfall', sub: 'Across all tech stores' },
  { value: '8 mi', label: 'From NYC Midtown', sub: 'Largest metro in the US' },
];

export default function Entertainment({ onStartSim }: { onStartSim?: () => void }) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const lineW = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      id="entertainment"
      className="relative py-28 bg-zinc-950 overflow-hidden"
    >
      {/* Parallax grid bg */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(rgba(96,165,250,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.8) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Radial vignette */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 70%), radial-gradient(ellipse at 100% 100%, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
        />
      </motion.div>

      {/* Scanning line — cinematic feel */}
      <motion.div
        animate={{ y: [-600, 1400] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent z-20 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-6">

        {/* ── HEADER ── */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black block mb-4">
              Tech & Innovation Hub
            </span>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                The Future of<br />
                <span style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #6366f1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  Tech Retail
                </span>
              </h2>
              {/* Scroll-animated line */}
              <motion.div className="hidden md:block h-px bg-blue-500/30 flex-1 ml-8 mb-4" style={{ width: lineW }} />
            </div>

            <p className="text-white/40 text-lg leading-relaxed max-w-2xl">
              American Dream's tech corridor is the Northeast's most comprehensive — six flagship
              destinations, 40M+ annual visitors, and $2.1B in annual retail sales all within 8 miles of NYC.
            </p>
          </motion.div>
        </div>

        {/* ── STAT STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="p-5 rounded-2xl border border-white/8 bg-white/[0.03] text-center"
            >
              <p className="text-white font-black text-2xl md:text-3xl tracking-tighter mb-1">{s.value}</p>
              <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold mb-0.5">{s.label}</p>
              <p className="text-white/25 text-[9px]">{s.sub}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── BRAND CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-20">
          {TECH_BRANDS.map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 border ${
                activeCard === i ? 'border-blue-500/60' : 'border-white/8 hover:border-blue-500/30'
              }`}
            >
              {/* Card gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${brand.bg}`} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at top left, ${brand.color}22, transparent 70%)` }}
              />

              <div className="relative z-10 p-7">
                {/* Top row */}
                <div className="flex items-start justify-between mb-5">
                  <motion.div
                    className="text-4xl"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3 + i * 0.4, repeat: Infinity }}
                  >
                    {brand.emoji}
                  </motion.div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 rounded-full bg-white/10 text-white/50 text-[8px] font-black uppercase tracking-wider">
                      {brand.category}
                    </span>
                  </div>
                </div>

                {/* Name + floor */}
                <h3 className="text-white font-black text-lg tracking-tight mb-1">{brand.name}</h3>
                <p className="text-white/35 text-[10px] uppercase tracking-widest font-bold mb-4">{brand.floor} · {brand.sqft}</p>

                {/* Description — expands on click */}
                <p className="text-white/50 text-xs leading-relaxed mb-5">{brand.desc}</p>

                {/* Key stat */}
                <div className="flex items-end justify-between pt-4 border-t border-white/10">
                  <div>
                    <p className="text-white font-black text-xl tracking-tighter" style={{ color: brand.accent }}>
                      {brand.stat}
                    </p>
                    <p className="text-white/30 text-[9px] uppercase tracking-widest">{brand.statLabel}</p>
                  </div>
                  <motion.div
                    animate={{ x: activeCard === i ? 4 : 0 }}
                    className="text-white/20 group-hover:text-white/60 transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-1"
                  >
                    Details →
                  </motion.div>
                </div>
              </div>

              {/* Expanded detail panel */}
              <motion.div
                initial={false}
                animate={{ height: activeCard === i ? 'auto' : 0, opacity: activeCard === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-7 pb-7 border-t border-white/10 pt-4">
                  <p className="text-white/60 text-xs mb-3 leading-relaxed">
                    <span className="text-white/80 font-bold">Leasing opportunity:</span> Premium co-tenancy with
                    America's top tech brands. High foot traffic, demographic overlap with luxury buyers, and
                    direct access to 20M NYC metro consumers.
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); }}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Inquire About Adjacent Space →
                  </button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM CTA STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-white/10"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(99,102,241,0.05))' }}
        >
          <div className="p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-black mb-2">
                Leasing & Partnership Inquiry
              </p>
              <h3 className="text-white font-black text-2xl md:text-3xl tracking-tighter mb-2">
                Position Your Brand in the<br />
                <span className="text-blue-400">Northeast's #1 Tech Destination</span>
              </h3>
              <p className="text-white/35 text-sm max-w-md">
                Adjacent retail space, co-marketing packages, and exclusive brand activation zones available now.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <button
                onClick={() => {}}
                className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-full transition-all hover:scale-105 shadow-xl shadow-blue-900/30 whitespace-nowrap"
              >
                Lease Tech Space
              </button>
              <button
                onClick={() => {}}
                className="px-10 py-4 border border-white/15 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white/5 transition-all whitespace-nowrap"
              >
                Brand Activation Inquiry
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
//2gemini// import React, { Suspense, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { MeshDistortMaterial, Sphere, Float, PerspectiveCamera } from '@react-three/drei';
// import * as THREE from 'three';

// // --- 3D Background Element ---
// function TechCore() {
//   const meshRef = useRef<THREE.Mesh>(null);
  
//   useFrame((state) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
//       meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
//     }
//   });

//   return (
//     <Float speed={2} rotationIntensity={1} floatIntensity={2}>
//       <Sphere args={[1, 64, 64]} scale={1.5}>
//         <MeshDistortMaterial
//           color="#3b82f6"
//           attach="material"
//           distort={0.4}
//           speed={2}
//           roughness={0.1}
//           metalness={1}
//         />
//       </Sphere>
//     </Float>
//   );
// }

// const TECH_BRANDS = [
//   { name: 'Apple Store', logo: '', color: '#fff', desc: 'Experience the ecosystem of tomorrow.', floor: 'L1' },
//   { name: 'Samsung', logo: 'S', color: '#1428a0', desc: 'Foldables and smart living solutions.', floor: 'L1' },
//   { name: 'Microsoft', logo: 'M', color: '#00a4ef', desc: 'AI-driven hardware and productivity.', floor: 'L2' },
//   { name: 'Sony', logo: 'S', color: '#555', desc: 'The pinnacle of gaming and audio tech.', floor: 'L2' },
//   { name: 'Bose', logo: 'B', color: '#fff', desc: 'Immersion through sound science.', floor: 'L3' },
//   { name: 'B&H Photo', logo: 'BH', color: '#e60000', desc: 'The professional’s lens to the world.', floor: 'L3' },
// ];

// export default function InnovativeEntertainment() {
//   return (
//     <section className="relative min-h-screen bg-[#020205] py-24 overflow-hidden">
      
//       {/* 3D Scene Layer */}
//       <div className="absolute inset-0 z-0 opacity-40">
//         <Canvas>
//           <PerspectiveCamera makeDefault position={[0, 0, 5]} />
//           <ambientLight intensity={0.5} />
//           <pointLight position={[10, 10, 10]} color="#3b82f6" intensity={2} />
//           <Suspense fallback={null}>
//             <TechCore />
//           </Suspense>
//         </Canvas>
//       </div>

//       {/* Futuristic Background Grid */}
//       <div className="absolute inset-0 z-0 opacity-20"
//         style={{ 
//           backgroundImage: `linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)`,
//           backgroundSize: '100px 100px',
//           maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
//         }} 
//       />

//       <div className="container mx-auto px-6 relative z-10">
        
//         {/* Header */}
//         <div className="text-center mb-24">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.5em] mb-6"
//           >
//             Digital Frontier
//           </motion.div>
//           <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
//             TECH <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700">MATRIX</span>
//           </h2>
//           <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium italic">
//             "The intersection of hardware, imagination, and retail evolution."
//           </p>
//         </div>

//         {/* Modules Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {TECH_BRANDS.map((brand, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ scale: 1.02, rotateY: 5 }}
//               className="relative group h-64"
//             >
//               {/* The "Hologram" Card */}
//               <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-500 group-hover:border-blue-500/50 group-hover:bg-blue-500/5">
                
//                 {/* Brand Logo/Icon Background Decoration */}
//                 <div className="absolute -right-4 -top-4 text-9xl font-black text-white/5 group-hover:text-blue-500/10 transition-colors">
//                   {brand.logo}
//                 </div>

//                 <div className="relative z-10 h-full flex flex-col justify-between">
//                   <div>
//                     <div className="flex justify-between items-start mb-4">
//                       <h3 className="text-2xl font-black text-white tracking-tight">{brand.name}</h3>
//                       <span className="text-[10px] font-bold text-blue-500 border border-blue-500/50 px-2 py-1 rounded">
//                         {brand.floor}
//                       </span>
//                     </div>
//                     <p className="text-zinc-400 text-sm leading-relaxed max-w-[80%]">
//                       {brand.desc}
//                     </p>
//                   </div>

//                   <motion.div 
//                     initial={{ width: 0 }}
//                     whileInView={{ width: '100%' }}
//                     className="h-[1px] bg-gradient-to-r from-blue-500 to-transparent opacity-50"
//                   />
                  
//                   <div className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
//                     <span>View Specifications</span>
//                     <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Action Bar */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           className="mt-24 flex flex-col md:flex-row items-center justify-center gap-8"
//         >
//           <button className="group relative px-10 py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-full overflow-hidden transition-all hover:scale-105">
//             <span className="relative z-10 group-hover:text-white transition-colors">Initialize Partnership</span>
//             <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//           </button>
          
//           <div className="h-px w-24 bg-zinc-800 hidden md:block" />
          
//           <div className="flex gap-4">
//             {['01', '02', '03'].map((n) => (
//               <div key={n} className="text-zinc-700 font-black text-xl hover:text-blue-500 cursor-help transition-colors">
//                 {n}
//               </div>
//             ))}
//           </div>
//         </motion.div>
//       </div>

//       {/* Scanning Light Effect */}
//       <motion.div
//         animate={{ y: [-500, 1000] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
//         className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-20 pointer-events-none"
//       />
//     </section>
//   );
// }
// import { motion } from 'motion/react';

// const TECH_BRANDS = [
//   { name: 'Apple Store',   color: '#555', bg: 'from-zinc-800 to-zinc-900', emoji: '🍎', desc: 'Latest iPhone, Mac, Vision Pro & more', floor: 'Level 1' },
//   { name: 'Samsung',       color: '#1428a0', bg: 'from-blue-800 to-blue-950', emoji: '📱', desc: 'Galaxy, tablets & smart home ecosystem', floor: 'Level 1' },
//   { name: 'Microsoft',     color: '#00a4ef', bg: 'from-sky-700 to-blue-900', emoji: '💻', desc: 'Surface, Xbox, HoloLens experience', floor: 'Level 2' },
//   { name: 'Sony',          color: '#003087', bg: 'from-indigo-800 to-indigo-950', emoji: '🎮', desc: 'PlayStation 5, OLED TVs & audio gear', floor: 'Level 2' },
//   { name: 'Bose',          color: '#222', bg: 'from-zinc-700 to-zinc-900', emoji: '🎧', desc: 'Premium audio & noise-canceling headphones', floor: 'Level 3' },
//   { name: 'B&H Photo',     color: '#e60000', bg: 'from-red-700 to-red-950', emoji: '📷', desc: 'Pro cameras, drones & video equipment', floor: 'Level 3' },
// ];

// export default function Entertainment() {
//   return (
//     <section id="entertainment" className="py-28 bg-zinc-950 relative overflow-hidden">
//       {/* Subtle grid background */}
//       <div className="absolute inset-0 z-0 opacity-10"
//         style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="text-center mb-16">
//           <span className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black block mb-3">
//             Tech & Innovation Hub
//           </span>
//           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
//             The Future of<br />
//             <span style={{ background: 'linear-gradient(135deg,#60a5fa,#3b82f6)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
//               Tech Retail
//             </span>
//           </h2>
//           <p className="text-white/40 max-w-xl mx-auto text-base">
//             From cutting-edge smartphones to professional cameras — American Dream's tech corridor
//             is the most comprehensive in the Northeast.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
//           {TECH_BRANDS.map((brand, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.08, duration: 0.5 }}
//               whileHover={{ y: -6, scale: 1.02 }}
//               className={`bg-gradient-to-br ${brand.bg} rounded-2xl p-6 cursor-pointer group border border-white/5 hover:border-blue-500/30 transition-all duration-300`}
//             >
//               <motion.div
//                 className="text-4xl mb-4"
//                 animate={{ scale: [1, 1.1, 1] }}
//                 transition={{ duration: 3 + i * 0.3, repeat: Infinity }}
//               >
//                 {brand.emoji}
//               </motion.div>
//               <h3 className="text-white font-black text-base mb-1">{brand.name}</h3>
//               <p className="text-white/40 text-xs leading-relaxed mb-3">{brand.desc}</p>
//               <span className="inline-block px-2 py-1 rounded-full bg-white/10 text-white/60 text-[9px] font-black uppercase tracking-wider">
//                 {brand.floor}
//               </span>
//             </motion.div>
//           ))}
//         </div>

//         {/* Bottom CTA */}
//         <div className="mt-16 text-center">
//           <div className="inline-flex flex-col sm:flex-row gap-4">
//             <button
//               onClick={() => {}}
//               className="px-12 py-5 bg-blue-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-500 transition-all"
//             >
//               Lease Tech Space
//             </button>
//             <button className="px-12 py-5 border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white/5 transition-all">
//               Explore All Stores
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
