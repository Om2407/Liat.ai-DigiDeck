import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  MeshTransmissionMaterial, 
  Float, 
  PerspectiveCamera, 
  PresentationControls, 
  Html, 
  ContactShadows,
  Grid,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, ShoppingBag, Music, Info, ArrowRight } from 'lucide-react';

const VENUES = [
  {
    id: 'avenue',
    name: 'The Avenue',
    type: 'Luxury Retail',
    pos: [-2.5, 0.5, 0],
    color: '#D4AF37', // Luxury Gold
    emoji: '💎',
    details: {
      hours: '11:00 AM - 7:00 PM',
      icon: ShoppingBag,
      content: 'A curated collection of global luxury flagships and bespoke services.',
      meta: 'Tier 1 Luxury'
    }
  },
  {
    id: 'waterpark',
    name: 'DreamWorks',
    type: 'Water Park',
    pos: [2.5, 1, 0.5],
    color: '#00F2FF', // Cyber Cyan
    emoji: '🌊',
    details: {
      hours: '11:00 AM - 8:00 PM',
      icon: Info,
      content: 'The world’s largest indoor wave pool and record-breaking slide towers.',
      meta: '81°F Tropical Climate'
    }
  },
  {
    id: 'arena',
    name: 'The Arena',
    type: 'Live Events',
    pos: [0, -0.5, 1.5],
    color: '#FF0055', // Neon Pink
    emoji: '🎤',
    details: {
      hours: 'Showtime Specific',
      icon: Music,
      content: 'A high-definition audio-visual stadium for global concert tours.',
      meta: 'Stark Tech Sound'
    }
  }
];

function VenueGlassModel({ venue, onSelect, isSelected }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!isSelected) {
      meshRef.current.position.y = venue.pos[1] + Math.sin(t + venue.pos[0]) * 0.15;
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group position={venue.pos}>
      <Float speed={isSelected ? 0 : 3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          ref={meshRef}
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
          onClick={() => onSelect(venue)}
          castShadow
        >
          <boxGeometry args={[1.4, 2.2, 0.5]} />
          {/* Innovation: Glass Material */}
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.02}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            color={isSelected ? "#ffffff" : venue.color}
            attenuationDistance={0.5}
            attenuationColor={venue.color}
          />
        </mesh>

        {/* Floating Label inside 3D space */}
        <Html position={[0, 1.6, 0]} center distanceFactor={8}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`px-3 py-1 rounded-full whitespace-nowrap pointer-events-none flex items-center gap-2 backdrop-blur-md border ${
              isSelected ? 'bg-white text-black border-white' : 'bg-black/50 text-white border-white/20'
            }`}
          >
            <span className="text-xs font-black tracking-tighter">{venue.name.toUpperCase()}</span>
            {hovered && <ArrowRight size={10} />}
          </motion.div>
        </Html>
      </Float>
    </group>
  );
}

export default function InnovativeThreeScene() {
  const [selectedVenue, setSelectedVenue] = useState<any>(null);

  return (
    <div className="w-full h-full min-h-[600px] relative bg-[#050505] overflow-hidden">
      
      {/* 3D Background Grid Decor */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,#111_0%,transparent_100%)]" />

      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 40 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-10, -10, -10]} color={selectedVenue?.color || "#444"} intensity={1} />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.2, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 2, Math.PI / 2]}
          >
            {VENUES.map((venue) => (
              <VenueGlassModel 
                key={venue.id} 
                venue={venue} 
                onSelect={setSelectedVenue}
                isSelected={selectedVenue?.id === venue.id}
              />
            ))}

            {/* Innovative Digital Floor */}
            <Grid
              position={[0, -2.5, 0]}
              args={[20, 20]}
              cellSize={1}
              cellThickness={1}
              cellColor="#222"
              sectionSize={5}
              sectionThickness={1.5}
              sectionColor={selectedVenue?.color || "#444"}
              fadeDistance={25}
              fadeStrength={5}
              infiniteGrid
            />
          </PresentationControls>

          <ContactShadows position={[0, -2.4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* Futuristic HUD Sidebar */}
      <AnimatePresence>
        {selectedVenue && (
          <motion.div
            initial={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 100, filter: 'blur(10px)' }}
            className="absolute top-12 right-12 w-80 z-30 overflow-hidden"
          >
            {/* Scanline Effect Layer */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />

            <div className="relative bg-zinc-950/80 backdrop-blur-2xl p-8 rounded-3xl border border-white/10">
              <button 
                onClick={() => setSelectedVenue(null)}
                className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-4xl mb-4"
                >
                  {selectedVenue.emoji}
                </motion.div>
                <h4 className="text-white font-black text-3xl tracking-tighter leading-none mb-2">
                  {selectedVenue.name.toUpperCase()}
                </h4>
                <div className="inline-block px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-black uppercase tracking-widest text-white/40">
                  {selectedVenue.type}
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed mb-8 font-medium">
                {selectedVenue.details.content}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white group-hover:bg-white/10 transition-all">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase font-black">Operating Hours</p>
                    <p className="text-white text-xs font-bold">{selectedVenue.details.hours}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-white/30 uppercase font-black mb-1">Live Status</p>
                  <p className="text-sm font-black tracking-tight" style={{ color: selectedVenue.color }}>
                    {selectedVenue.details.meta}
                  </p>
                </div>

                <button 
                  className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  Enter Experience <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating UI Instructions */}
      {!selectedVenue && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-center"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/60">
              Select Venue to Inspect Data
            </p>
          </div>
        </motion.div>
      )}

      {/* Corner Watermark */}
      <div className="absolute top-8 left-8 z-20">
        <div className="text-white font-black text-xl tracking-tighter italic">
          AD <span className="text-zinc-500 font-light not-italic">DIGITAL TWIN</span>
        </div>
      </div>
    </div>
  );
}
// import { useRef, useState, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { MeshDistortMaterial, Float, PerspectiveCamera, PresentationControls, Text, Html } from '@react-three/drei';
// import * as THREE from 'three';
// import { motion, AnimatePresence } from 'motion/react';
// import { X, Clock, ShoppingBag, Music, Info } from 'lucide-react';

// const VENUES = [
//   {
//     id: 'avenue',
//     name: 'The Avenue',
//     type: 'Luxury Retail',
//     pos: [-2, 0, 0],
//     color: '#C5A059',
//     details: {
//       hours: '11:00 AM - 7:00 PM',
//       icon: ShoppingBag,
//       content: 'Home to flagship boutiques including Hermès, Gucci, and Saint Laurent.',
//       meta: '450+ Brands'
//     }
//   },
//   {
//     id: 'waterpark',
//     name: 'DreamWorks Water Park',
//     type: 'Entertainment',
//     pos: [2, 1, 0],
//     color: '#00A3E0',
//     details: {
//       hours: '11:00 AM - 8:00 PM',
//       icon: Info,
//       content: 'North America\'s largest indoor water park. 81°F year-round.',
//       meta: 'Record-Breaking Slides'
//     }
//   },
//   {
//     id: 'arena',
//     name: 'The Arena',
//     type: 'Events',
//     pos: [0, -1.5, 0],
//     color: '#E11D48',
//     details: {
//       hours: 'Event Dependent',
//       icon: Music,
//       content: 'State-of-the-art concert venue hosting global icons and activations.',
//       meta: '5,000 Capacity'
//     }
//   }
// ];

// function VenueModel({ venue, onSelect, isSelected }: { venue: typeof VENUES[0], onSelect: (v: any) => void, isSelected: boolean }) {
//   const meshRef = useRef<THREE.Mesh>(null!);
//   const [hovered, setHover] = useState(false);

//   useFrame((state) => {
//     if (isSelected) return;
//     const t = state.clock.getElapsedTime();
//     meshRef.current.position.y = venue.pos[1] + Math.sin(t + venue.pos[0]) * 0.1;
//   });

//   return (
//     <group position={venue.pos as [number, number, number]}>
//       <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
//         <mesh 
//           ref={meshRef}
//           onPointerOver={() => setHover(true)}
//           onPointerOut={() => setHover(false)}
//           onClick={() => onSelect(venue)}
//         >
//           <boxGeometry args={[1.2, 1.8, 0.4]} />
//           <MeshDistortMaterial
//             color={isSelected ? '#ffffff' : venue.color}
//             speed={isSelected ? 5 : 2}
//             distort={0.3}
//             radius={1}
//             emissive={venue.color}
//             emissiveIntensity={hovered || isSelected ? 0.5 : 0.2}
//           />
//         </mesh>
        
//         <Text
//           position={[0, 1.2, 0]}
//           fontSize={0.15}
//           color="white"
//           anchorX="center"
//           anchorY="middle"
//           font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGkyMZhrib2Bg-4.woff"
//         >
//           {venue.name.toUpperCase()}
//         </Text>
//       </Float>
//     </group>
//   );
// }

// export default function ThreeScene() {
//   const [selectedVenue, setSelectedVenue] = useState<typeof VENUES[0] | null>(null);

//   return (
//     <div className="w-full h-full min-h-[400px] relative group">
//       <Canvas shadows dpr={[1, 2]}>
//         <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
//         <ambientLight intensity={0.5} />
//         <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
//         <PresentationControls
//           global
//           snap
//           rotation={[0, 0.3, 0]}
//           polar={[-Math.PI / 3, Math.PI / 3]}
//           azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
//         >
//           {VENUES.map((venue) => (
//             <VenueModel 
//               key={venue.id} 
//               venue={venue} 
//               onSelect={setSelectedVenue}
//               isSelected={selectedVenue?.id === venue.id}
//             />
//           ))}
          
//           <gridHelper args={[20, 20, 0x444444, 0x222222]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -2]} />
//         </PresentationControls>
//       </Canvas>

//       {/* Overlay Details */}
//       <AnimatePresence>
//         {selectedVenue && (
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             className="absolute top-8 right-8 w-72 glass p-6 rounded-2xl z-20 border-l-4"
//             style={{ borderLeftColor: selectedVenue.color }}
//           >
//             <button 
//               onClick={() => setSelectedVenue(null)}
//               className="absolute top-4 right-4 text-white/40 hover:text-white"
//             >
//               <X size={16} />
//             </button>
            
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 rounded-lg bg-white/10" style={{ color: selectedVenue.color }}>
//                 <selectedVenue.details.icon size={20} />
//               </div>
//               <div>
//                 <h4 className="text-white font-serif italic text-lg leading-none">{selectedVenue.name}</h4>
//                 <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{selectedVenue.type}</p>
//               </div>
//             </div>

//             <p className="text-xs text-white/70 leading-relaxed mb-6">
//               {selectedVenue.details.content}
//             </p>

//             <div className="space-y-3">
//               <div className="flex items-center gap-3 text-xs text-white/50">
//                 <Clock size={14} className="text-luxury-gold" />
//                 <span>{selectedVenue.details.hours}</span>
//               </div>
//               <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-luxury-gold font-bold bg-luxury-gold/5 p-2 rounded border border-luxury-gold/10">
//                 <span>{selectedVenue.details.meta}</span>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {!selectedVenue && (
//         <div className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
//           <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
//             Click a Venue to Explore Details
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
