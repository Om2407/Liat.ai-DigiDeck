import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FilmGrain from '../ui/FilmGrain';

export type AudienceType = 'all' | 'tenant' | 'sponsor' | 'event';

const TIERS = [
  {
    name: 'Presenting Partner', price: '$2M+', color: '#f59e0b',
    perks: ['Naming rights — Arena or Water Park', 'Year-round LED billboard (300K daily views)', 'Branded entrance experience', 'VIP suite access for 100 events/yr', 'Co-branded digital & social campaigns', 'Exclusive category rights'],
    tag: 'Premier',
  },
  {
    name: 'Activation Partner', price: '$500K–$2M', color: '#8b5cf6',
    perks: ['Dedicated brand activation zone (5,000 sq ft)', 'Seasonal pop-up rights (4x/year)', 'In-venue digital screen network', 'Event co-sponsorship (50 events/yr)', 'Social media integration & tagging', 'Consumer data & insights reports'],
    tag: 'Most Popular',
  },
  {
    name: 'Event Sponsor', price: '$100K–$500K', color: '#10b981',
    perks: ['Single event naming rights', 'Branded merchandise & giveaways', 'On-site activation booth (1,000 sq ft)', 'Social mentions & email blasts', 'Press release co-branding', 'Post-event performance report'],
    tag: 'Entry Level',
  },
];


function VerticalStream() {
  const count = 500;
  const amberRef = useRef<THREE.InstancedMesh>(null);
  const whiteRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * 1.5,
      y: Math.random() * 30 - 15,
      z: (Math.random() - 0.5) * 1.5,
      speed: 0.5 + Math.random() * 2,
      size: 0.05 + Math.random() * 0.12,
      isAmber: i % 2 === 0,
    })), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    let ai = 0, wi = 0;
    particles.forEach((p) => {
      const y = ((p.y + t * p.speed) % 30) - 15;
      dummy.position.set(p.x, y, p.z);
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      if (p.isAmber && amberRef.current) {
        amberRef.current.setMatrixAt(ai++, dummy.matrix);
      } else if (whiteRef.current) {
        whiteRef.current.setMatrixAt(wi++, dummy.matrix);
      }
    });
    if (amberRef.current) amberRef.current.instanceMatrix.needsUpdate = true;
    if (whiteRef.current) whiteRef.current.instanceMatrix.needsUpdate = true;
  });

  const amberCount = Math.ceil(count / 2);
  const whiteCount = Math.floor(count / 2);

  return (
    <>
      <instancedMesh ref={amberRef} args={[undefined, undefined, amberCount]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#f59e0b" toneMapped={false} transparent opacity={0.7} />
      </instancedMesh>
      <instancedMesh ref={whiteRef} args={[undefined, undefined, whiteCount]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} transparent opacity={0.3} />
      </instancedMesh>
    </>
  );
}

export default function Sponsorship({ currentAudience = 'all' }: { currentAudience?: AudienceType }) {
  const headline = currentAudience === 'sponsor' ? "SPONSOR THE UNMATCHED." : "OWN THE AUDIENCE.";

  return (
    <div className="w-full h-screen bg-zinc-950 text-white overflow-hidden flex relative font-sans">
      <FilmGrain className="absolute inset-0 z-0 pointer-events-none" opacity={0.03} />

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, #f59e0b, #fef3c7, #f59e0b, #92400e, #f59e0b);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* AMBIENT GLOWS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-[18%] w-[500px] h-[500px] bg-amber-600/8 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-[50%] w-[500px] h-[500px] bg-purple-600/8 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-[82%] w-[500px] h-[500px] bg-emerald-600/8 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* MAIN CONTENT */}
      <div className="w-[calc(100%-80px)] h-full flex flex-col z-10 relative" style={{ padding: '72px 48px 16px 48px' }}>

        {/* TOP — headline + stats */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex items-end justify-between pb-4 border-b border-zinc-800 shrink-0"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 mb-1">
              Brand Partnerships
            </p>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-black tracking-tighter leading-[0.9] uppercase">
              {headline}
            </h2>
          </div>
          <div className="text-zinc-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-4 pb-1">
            <span>40M Visitors</span>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>$95K Avg HHI</span>
            <div className="w-1 h-1 rounded-full bg-zinc-700" />
            <span>120M Monthly Impressions</span>
          </div>
        </motion.div>

        {/* MIDDLE — tier cards */}
        <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-5 py-4 min-h-0">
          {TIERS.map((tier, i) => {
            const isPresenting = i === 0;
            const isActivation = i === 1;

            return (
              <motion.div
                key={tier.name}
                data-ai-context={isPresenting ? "Sponsorship slide: Viewing $2M+ Presenting Partner tier — naming rights, 300K daily LED views" : isActivation ? "Sponsorship slide: Viewing $500K-$2M Activation Partner tier — most popular tier" : "Sponsorship slide: Viewing $100K-$500K Event Sponsor tier — entry level partnership"}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 + 0.2, duration: 0.7 }}
                whileHover={{ y: -6 }}
                className={`flex-1 relative flex flex-col rounded-2xl transition-all duration-300 group ${isActivation ? 'scale-[1.01]' : ''}`}
                style={{
                  padding: '20px',
                  backgroundColor: isPresenting
                    ? 'rgba(30, 27, 20, 0.6)'
                    : isActivation
                      ? 'rgba(139, 92, 246, 0.06)'
                      : 'rgba(20, 24, 22, 0.5)',
                  border: `1px solid ${isPresenting
                    ? 'rgba(245,158,11,0.35)'
                    : isActivation
                      ? 'rgba(139,92,246,0.45)'
                      : 'rgba(16,185,129,0.25)'}`,
                }}
              >
                {/* hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                  style={{ boxShadow: `0 0 50px ${tier.color}18 inset, 0 0 20px ${tier.color}25` }}
                />

                {/* Tag + Name + Price */}
                <div className="mb-4 relative z-10">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3"
                    style={{ backgroundColor: tier.color, color: '#000' }}
                  >
                    {tier.tag}
                  </span>
                  <p className="text-zinc-500 text-[9px] uppercase tracking-widest font-black mb-1">{tier.name}</p>
                  {isPresenting ? (
                    <>
                      <p className="text-4xl xl:text-5xl font-black tracking-tighter gold-shimmer">{tier.price}</p>
                      <span className="inline-flex items-center gap-1.5 mt-1 text-amber-500 text-[9px] uppercase tracking-widest font-black">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                        LIMITED AVAILABILITY
                      </span>
                    </>
                  ) : (
                    <p className="text-4xl xl:text-5xl font-black tracking-tighter" style={{ color: tier.color }}>
                      {tier.price}
                    </p>
                  )}
                </div>

                {/* Perks */}
                <div className="flex flex-col gap-3 flex-1 relative z-10">
                  {tier.perks.map((perk, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: tier.color }} />
                      <span className="text-zinc-400 text-[11px] xl:text-xs leading-snug">{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  className="w-full mt-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-300 relative z-10 shrink-0"
                  style={{
                    border: `1px solid ${tier.color}`,
                    backgroundColor: isActivation ? tier.color : 'transparent',
                    color: isActivation ? '#000' : tier.color,
                  }}
                >
                  Inquire Now
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="shrink-0 flex flex-col justify-center items-center border-t border-zinc-800 pt-3 pb-2"
        >
          <p className="text-zinc-600 text-[9px] uppercase tracking-widest mb-2 text-center">
            Custom packages available. All partnerships include audience data reports and co-marketing support.
          </p>
          <div className="flex gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
            <span className="flex items-center gap-1.5"><span>📱</span> Instagram Integration</span>
            <div className="w-1 h-1 rounded-full bg-zinc-700 my-auto" />
            <span className="flex items-center gap-1.5"><span>📺</span> In-Venue Digital</span>
            <div className="w-1 h-1 rounded-full bg-zinc-700 my-auto" />
            <span className="flex items-center gap-1.5"><span>🤝</span> Co-Marketing</span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT EDGE THREE.JS */}
      <div className="w-[80px] h-full absolute right-0 top-0 border-l border-zinc-800/50 bg-zinc-950/50 z-20">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <VerticalStream />
        </Canvas>
      </div>
    </div>
  );
}