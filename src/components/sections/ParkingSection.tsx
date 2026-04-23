import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, ContactShadows, MeshWobbleMaterial } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Navigation, Hotel, Car, Bus, ArrowUpRight, Globe } from 'lucide-react';
import * as THREE from 'three';

// --- 3D INTERACTIVE MAP ELEMENT ---
function MapVisual() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group rotation={[-Math.PI / 4, 0, 0]}>
      {/* Abstract Map Grid */}
      <gridHelper args={[20, 40, 0xff0000, 0x333333]} position={[0, -1, 0]} />
      
      {/* Pulsing Location Sphere */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1, 0]} />
          <MeshWobbleMaterial color="#ED1D24" speed={2} factor={0.6} metalness={0.8} />
        </mesh>
      </Float>
      
      <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
    </group>
  );
}

// --- 3D MAGNETIC CARD COMPONENT ---
const MagneticCard = ({ icon: Icon, title, desc, gradient, delay }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  function handleMouse(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative cursor-pointer group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      
      <div className="relative bg-zinc-950/40 backdrop-blur-3xl border border-white/10 p-8 rounded-[2rem] h-44 flex items-center gap-6 overflow-hidden">
        <div className="bg-white/5 p-4 rounded-2xl group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500">
          <Icon size={32} className="text-white" strokeWidth={1.5} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-white text-xl font-bold tracking-tight">{title}</h3>
          <p className="text-white/40 text-sm mt-1">{desc}</p>
        </div>

        <ArrowUpRight className="text-white/20 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </div>
    </motion.div>
  );
};

export default function InnovativeParking() {
  return (
    <section className="relative min-h-screen bg-[#050505] py-20 px-6 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full -mr-64 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -ml-64 -mb-32" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT: SPATIAL MAP VIEW */}
        <div className="lg:col-span-7 relative h-[650px] group">
          
          {/* Glass Container */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent border border-white/20 shadow-2xl overflow-hidden backdrop-blur-sm">
            
            {/* 3D Canvas */}
            <div className="absolute inset-0 z-0">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={35} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Suspense fallback={null}>
                  <MapVisual />
                </Suspense>
              </Canvas>
            </div>

            {/* Futuristic HUD overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#000_150%)]" />
            <div className="absolute top-12 left-12 right-12 flex justify-between items-start z-10">
              <div className="bg-black/50 backdrop-blur-md p-6 rounded-3xl border border-white/10 max-w-xs">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-black">Active Destination</span>
                </div>
                <h2 className="text-white text-2xl font-black tracking-tighter leading-none mb-2">1 AMERICAN DREAM WAY</h2>
                <p className="text-white/40 text-xs">East Rutherford, NJ 07073</p>
                
                <div className="mt-8 space-y-3">
                  <motion.button whileHover={{ scale: 1.02 }} className="w-full bg-white text-black py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg">
                    <Navigation size={14} /> Open Navigation
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} className="w-full bg-white/10 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 backdrop-blur-md border border-white/10">
                    <Globe size={14} /> Explore Area
                  </motion.button>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white/60 text-[10px] font-bold tracking-[0.2em] uppercase">
                  40.8067° N, 74.0679° W
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: LOGISTICS STACK */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="mb-4">
            <span className="text-red-500 text-xs font-black tracking-[0.4em] uppercase">Logistics & Access</span>
            <h3 className="text-white text-4xl font-black tracking-tighter mt-2 leading-none">
              Seamless Arrivals. <br/>
              <span className="text-zinc-600 italic">Every Time.</span>
            </h3>
          </div>

          <MagneticCard 
            icon={Hotel} 
            title="Premium Stays" 
            desc="Luxury hotels with direct mall access."
            gradient="from-pink-500 to-rose-600"
            delay={0.1}
          />
          
          <MagneticCard 
            icon={Car} 
            title="Smart Parking" 
            desc="11,000+ spaces with live availability."
            gradient="from-blue-500 to-cyan-600"
            delay={0.2}
          />

          <MagneticCard 
            icon={Bus} 
            title="Transit Hub" 
            desc="Dedicated bus and rail connections."
            gradient="from-amber-400 to-orange-600"
            delay={0.3}
          />

          <div className="mt-4 p-6 rounded-[2rem] border border-white/5 bg-white/5 flex items-center justify-between">
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">System Status: Optimal</p>
            <div className="flex gap-2">
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <div className="w-1 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}