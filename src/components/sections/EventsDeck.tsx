import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDeck } from '../DeckEngine';
import FilmGrain from '../ui/FilmGrain';
import CountUp from '../ui/CountUp';

export type AudienceType = 'all' | 'tenant' | 'sponsor' | 'event';


function StageFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, -5]}>
      <planeGeometry args={[60, 40]} />
      <meshStandardMaterial
        color="#0a0a0f"
        metalness={0.9}
        roughness={0.1}
        opacity={0.8}
        transparent
      />
    </mesh>
  );
}

function ConcertLights() {
  const light1 = useRef<THREE.SpotLight>(null);
  const light2 = useRef<THREE.SpotLight>(null);
  const light3 = useRef<THREE.SpotLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.7) * 15;
      light1.current.position.z = Math.cos(t * 0.5) * 5 - 8;
    }
    if (light2.current) {
      light2.current.position.x = Math.sin(t * 0.4 + 2) * 12;
      light2.current.position.z = Math.cos(t * 0.6 + 1) * 5 - 8;
    }
    if (light3.current) {
      light3.current.position.x = Math.sin(t * 0.9 + 4) * 10;
      light3.current.position.z = Math.cos(t * 0.3 + 3) * 5 - 8;
    }
  });

  return (
    <>
      <spotLight
        ref={light1}
        position={[0, 20, -8]}
        angle={0.15}
        penumbra={0.8}
        intensity={80}
        color="#8b5cf6"
        castShadow={false}
        target-position={[0, -8, -5]}
      />
      <spotLight
        ref={light2}
        position={[5, 20, -8]}
        angle={0.12}
        penumbra={0.9}
        intensity={60}
        color="#f59e0b"
        castShadow={false}
        target-position={[0, -8, -5]}
      />
      <spotLight
        ref={light3}
        position={[-5, 20, -8]}
        angle={0.18}
        penumbra={0.7}
        intensity={50}
        color="#ffffff"
        castShadow={false}
        target-position={[0, -8, -5]}
      />
    </>
  );
}

// --- THREE.JS STADIUM PARTICLES ---
const CrowdParticles = () => {
  const purpleRef = useRef<THREE.InstancedMesh>(null);
  const amberRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const pts = [];
    const rows = 30;
    const perRow = 80;
    for (let row = 0; row < rows; row++) {
      const radius = 8 + row * 1.2;
      const y = row * 0.6 - 5;
      for (let j = 0; j < perRow; j++) {
        const angle = (j / perRow) * Math.PI; // half circle = stadium front
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle) - 10;
        pts.push({
          x, y, z,
          row,
          col: j,
          isAmber: Math.random() > 0.75,
        });
      }
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    let pi = 0, ai = 0;

    particles.forEach((p) => {
      // Stadium wave: ripple based on column position + time
      const wave = Math.sin(t * 2 - p.col * 0.3) * 1.2;
      // Breathe: slow global pulse
      const breathe = Math.sin(t * 0.8 + p.row * 0.2) * 0.3;
      // Excitement: random flicker on some particles
      const flicker = Math.sin(t * 8 + p.col * p.row) * 0.1;

      dummy.position.set(p.x, p.y + wave + breathe + flicker, p.z);
      dummy.scale.setScalar(0.8 + Math.abs(Math.sin(t + p.col)) * 0.4);
      dummy.updateMatrix();

      if (p.isAmber && amberRef.current) {
        amberRef.current.setMatrixAt(ai++, dummy.matrix);
      } else if (purpleRef.current) {
        purpleRef.current.setMatrixAt(pi++, dummy.matrix);
      }
    });

    if (purpleRef.current) purpleRef.current.instanceMatrix.needsUpdate = true;
    if (amberRef.current) amberRef.current.instanceMatrix.needsUpdate = true;
  });

  const purpleCount = Math.floor(particles.length * 0.75);
  const amberCount = particles.length - purpleCount;

  return (
    <>
      <instancedMesh ref={purpleRef} args={[undefined, undefined, purpleCount]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial color="#8b5cf6" toneMapped={false} transparent opacity={0.85} />
      </instancedMesh>
      <instancedMesh ref={amberRef} args={[undefined, undefined, amberCount]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshBasicMaterial color="#f59e0b" toneMapped={false} transparent opacity={0.9} />
      </instancedMesh>
    </>
  );
};

export default function EventsDeck({ currentAudience = 'all' }: { currentAudience?: AudienceType }) {
  const { go } = useDeck();
  
  const headline = currentAudience === 'event'
    ? "YOUR STAGE.\n40 MILLION WITNESSES."
    : "CONCERTS.\nCONVENTIONS.\nCULTURE.";

  return (
    <div className="w-full h-screen bg-zinc-950 text-white overflow-hidden flex relative font-sans">
      <FilmGrain className="absolute inset-0 z-0 pointer-events-none" opacity={0.03} />

      {/* Global Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-900/20 blur-[150px] rounded-full pointer-events-none translate-x-1/4 translate-y-1/4 z-0" />

      {/* LEFT PANEL (60%) */}
      <motion.div
        initial={{ x: '-20%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full lg:w-[60%] h-full relative z-10 flex flex-col justify-center px-16 xl:px-24"
      >
        <div className="mb-12" data-ai-context="Events slide: 5,000-seat Performing Arts Center, 300K sq ft Expo Center, 200+ events per year">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-500 mb-4"
          >
            Event Platform
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[clamp(2.5rem,4vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.85] whitespace-pre-line"
          >
            {headline}
          </motion.h2>
        </div>

        {/* VENUE CARDS */}
        <div className="flex gap-6 mb-12 w-full max-w-3xl">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex-1 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-md relative overflow-hidden group transition-colors hover:border-amber-500/50 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 relative z-10">Performing Arts Center</h3>
            <p className="text-3xl xl:text-4xl font-black text-amber-500 tracking-tighter mb-4 relative z-10">5,000 SEATS</p>
            <p className="text-xs xl:text-sm font-medium text-zinc-300 mb-6 line-clamp-2 relative z-10">Concerts · Award Shows · Corporate Events</p>
            <div className="inline-block px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-[9px] font-bold text-amber-500 uppercase tracking-widest relative z-10">
              SOLD OUT 80% OF DATES
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex-1 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-md relative overflow-hidden group transition-colors hover:border-purple-500/50 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 relative z-10">Exposition Center</h3>
            <p className="text-3xl xl:text-4xl font-black text-purple-500 tracking-tighter mb-4 relative z-10">300K SQ FT</p>
            <p className="text-xs xl:text-sm font-medium text-zinc-300 mb-6 line-clamp-2 relative z-10">Trade Shows · Product Launches · Conventions</p>
            <div className="inline-block px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-[9px] font-bold text-purple-500 uppercase tracking-widest relative z-10">
              200+ EVENTS / YEAR
            </div>
          </motion.div>
        </div>

        {/* STAT STRIP & CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-between w-full max-w-3xl"
        >
          <div className="flex gap-4 xl:gap-8 text-[9px] xl:text-[11px] font-black uppercase tracking-widest text-zinc-400">
            <div className="flex items-center gap-1 xl:gap-2">
              <span className="text-white"><CountUp value={20} duration={2} /></span> <span className="text-zinc-600">MIN FROM NYC</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-700 my-auto" />
            <div className="flex items-center gap-1 xl:gap-2">
              <span className="text-white"><CountUp value={30000} duration={2} /></span> <span className="text-zinc-600">PARKING</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-700 my-auto" />
            <div className="flex items-center gap-1 xl:gap-2">
              <span className="text-white"><CountUp value={5} suffix="M" duration={2} /></span> <span className="text-zinc-600">EVENT VISITORS / YR</span>
            </div>
          </div>

          <button onClick={() => go(8)} className="px-6 xl:px-8 py-3 xl:py-4 bg-purple-600 hover:bg-purple-500 transition-colors rounded-full text-white text-[9px] xl:text-[10px] font-black uppercase tracking-[0.2em] shrink-0 ml-4">
            Book Your Event →
          </button>
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL (40%) - THREE.JS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="hidden lg:block lg:w-[40%] h-full relative z-0"
      >
        <Canvas camera={{ position: [0, 2, 22], fov: 60 }} shadows>
          <ambientLight intensity={0.2} />
          <ConcertLights />
          <StageFloor />
          <CrowdParticles />
        </Canvas>

        {/* Overlay Text */}
        <div className="absolute bottom-16 w-full text-center pointer-events-none z-10">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">
            Your Brand On This Stage
          </p>
        </div>

        {/* Gradient mask to blend edges smoothly */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent pointer-events-none z-0" />
      </motion.div>
    </div>
  );
}
