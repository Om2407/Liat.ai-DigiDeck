import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars, Float, Text, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlayCircle } from 'lucide-react';

function SlideTube() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Create a wavy path for the slide
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, -2, 10),
      new THREE.Vector3(-3, -8, 20),
      new THREE.Vector3(4, -15, 30),
      new THREE.Vector3(0, -20, 40),
    ]);
  }, []);

  return (
    <mesh ref={meshRef}>
      <tubeGeometry args={[curve, 100, 1.2, 20, false]} />
      <meshStandardMaterial 
        color="#00A3E0" 
        wireframe={false} 
        side={THREE.DoubleSide} 
        transparent 
        opacity={0.3}
        roughness={0.1}
        metalness={0.8}
      />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe 
        side={THREE.DoubleSide} 
        transparent 
        opacity={0.1}
      />
    </mesh>
  );
}

function RideCamera({ active }: { active: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const [progress, setProgress] = useState(0);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, -2, 10),
      new THREE.Vector3(-3, -8, 20),
      new THREE.Vector3(4, -15, 30),
      new THREE.Vector3(0, -20, 42),
    ]);
  }, []);

  useFrame((state, delta) => {
    if (!active) return;
    
    // Slow down at the end and loop
    const newProgress = (progress + delta * 0.15) % 1;
    setProgress(newProgress);

    const point = curve.getPointAt(newProgress);
    const lookAt = curve.getPointAt(Math.min(newProgress + 0.01, 1));
    
    cameraRef.current.position.copy(point);
    cameraRef.current.lookAt(lookAt);
    
    // Add some "shake"
    cameraRef.current.position.x += Math.sin(state.clock.elapsedTime * 10) * 0.05;
    cameraRef.current.position.y += Math.cos(state.clock.elapsedTime * 10) * 0.05;
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={75} />;
}

export default function WaterParkSimulation({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black"
    >
      <div className="absolute top-8 left-8 z-[210] flex items-center gap-4">
        <button 
          onClick={() => onOpenChange(false)}
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
        >
          <X size={24} />
        </button>
        <div>
          <h2 className="text-xl font-serif italic text-white leading-none mb-1">DreamWorks Ride Sim</h2>
          <p className="text-[10px] uppercase tracking-widest text-[#00A3E0] font-bold">Virtual Experience Alpha</p>
        </div>
      </div>

      {!isPlaying && (
        <div className="absolute inset-0 z-[205] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-4xl font-serif mb-6 italic text-white italic">Ready for the Drop?</h3>
            <button 
              onClick={() => setIsPlaying(true)}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-20 h-20 rounded-full bg-[#00A3E0] flex items-center justify-center shadow-[0_0_40px_rgba(0,163,224,0.5)] group-hover:scale-110 transition-transform">
                <PlayCircle size={40} className="text-white" fill="currentColor" />
              </div>
              <span className="text-xs uppercase tracking-[0.3em] font-bold text-white/50 group-hover:text-white transition-colors">Start Simulation</span>
            </button>
          </motion.div>
        </div>
      )}

      {/* Speed Lines/Overlay */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none z-[203] overflow-hidden">
           <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />
           <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
           <motion.div 
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="absolute inset-0 border-[20px] border-[#00A3E0]/20"
           />
        </div>
      )}

      <Canvas>
        <color attach="background" args={['#050505']} />
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <SlideTube />
        <RideCamera active={isPlaying} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00A3E0" />
        
        {/* Decorative particles */}
        <Float speed={5} rotationIntensity={2} floatIntensity={10}>
          <Text
            fontSize={0.5}
            color="#00A3E0"
            font="/fonts/Inter-Bold.woff"
            position={[0, -2, 5]}
            rotation={[0, 0, 0]}
            fillOpacity={0.2}
          >
            ADRENALINE
          </Text>
        </Float>
      </Canvas>
    </motion.div>
  );
}
