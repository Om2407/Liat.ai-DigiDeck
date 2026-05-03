import { motion, useInView, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

export type AudienceType = 'all' | 'tenant' | 'sponsor' | 'event';

interface StatItem {
  target: number; suffix: string; label: string; format?: boolean;
  miniFact: string; prefix?: string; icon: string; color: string; description: string;
}

const STATS: StatItem[] = [
  { target: 40, suffix: 'M+', label: 'Annual Visitors', miniFact: 'More than Disney World', icon: '◎', color: '#0891b2', description: 'Surpasses every theme park in North America' },
  { target: 3000000, suffix: '', label: 'Square Feet', format: true, miniFact: '179 football fields', icon: '⬡', color: '#a855f7', description: 'The single largest retail footprint in the USA' },
  { target: 450, suffix: '+', label: 'Global Brands', miniFact: 'Hermès to H&M', icon: '◈', color: '#f59e0b', description: 'From ultra-luxury flagships to everyday essentials' },
  { target: 8, suffix: '', label: 'Miles From Manhattan', miniFact: '20M people in reach', icon: '⊕', color: '#22c55e', description: 'The most accessible mega-destination on the East Coast' },
];

const TICKER_ITEMS = [
  '◎ 40M+ Annual Visitors', '⬡ America\'s Largest Indoor Theme Park', '◈ America\'s Largest Indoor Water Park',
  '⊕ Hermès · Gucci · Louis Vuitton · Cartier', '◎ 5,000 Seat Arena', '⬡ 8 Miles From NYC',
  '◈ Indoor Skiing — BigSNOW', '⊕ 200+ Events Per Year', '◎ 3M Square Feet of Possibility',
];

const AUDIENCE_CONTENT: Record<AudienceType, { headline: string, cta: string, highlightStatIndex: number }> = {
  all: {
    headline: "America's most visited retail destination",
    cta: "View Full Report",
    highlightStatIndex: -1,
  },
  tenant: {
    headline: "Your next flagship lives here — 40M customers waiting",
    cta: "See Retail Opportunity",
    highlightStatIndex: 2, // Global Brands
  },
  sponsor: {
    headline: "Unmatched eyeballs. One address.",
    cta: "Explore Sponsorship Reach",
    highlightStatIndex: 0, // Annual Visitors
  },
  event: {
    headline: "The stage is set. 200+ events. 40M witnesses.",
    cta: "Browse Event Calendar",
    highlightStatIndex: 1, // Square Feet
  }
};

// ── PARTICLE CANVAS ────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      size: Math.random() * 1.2 + 0.4,
      color: ['#0891b2', '#a855f7', '#f59e0b', '#22c55e'][Math.floor(Math.random() * 4)],
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) { ctx.beginPath(); ctx.strokeStyle = `rgba(8,145,178,${0.06 * (1 - dist / 90)})`; ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); }
        }
      }
      particles.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = p.color + '55'; ctx.fill(); });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[4] pointer-events-none" />;
}

// ── STAT CARD ──────────────────────────────────────────────
function StatCard({ stat, index, inView, isHighlighted }: { stat: StatItem; index: number; inView: boolean; isHighlighted: boolean }) {
  const [count, setCount] = useState(0);
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [4, -4]);
  const rotateY = useTransform(x, [-80, 80], [-4, 4]);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect(); if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2); y.set(e.clientY - rect.top - rect.height / 2);
  }, [x, y]);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const duration = 2200, start = performance.now();
      const update = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * stat.target));
        if (progress < 1) requestAnimationFrame(update); else setCount(stat.target);
      };
      requestAnimationFrame(update);
    }, index * 150 + 400);
    return () => clearTimeout(timer);
  }, [inView, stat.target, index]);

  const display = stat.format ? count.toLocaleString('en-US') : count;
  const isGlowActive = hovered || isHighlighted;

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 30, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1 + 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setHovered(false); }}
      className="relative cursor-pointer"
    >
      <motion.div
        className="relative p-5 rounded-2xl border overflow-hidden transition-colors duration-300"
        animate={isHighlighted ? {
          boxShadow: [`0 16px 48px ${stat.color}18,inset 0 0 30px ${stat.color}06`, `0 16px 48px ${stat.color}35,inset 0 0 50px ${stat.color}15`, `0 16px 48px ${stat.color}18,inset 0 0 30px ${stat.color}06`]
        } : {
          boxShadow: isGlowActive ? `0 16px 48px ${stat.color}18,inset 0 0 30px ${stat.color}06` : 'none'
        }}
        transition={isHighlighted ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        style={{
          background: isGlowActive ? `linear-gradient(135deg,${stat.color}12,${stat.color}04)` : 'rgba(255,255,255,0.03)',
          borderColor: isGlowActive ? `${stat.color}50` : 'rgba(255,255,255,0.07)',
        }}
      >
        {/* Shimmer sweep */}
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={inView ? { x: '200%', opacity: [0, 1, 0] } : {}}
          transition={{ duration: 1.5, delay: index * 0.2 + 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-10 w-1/2 h-full pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${stat.color}40, transparent)`,
            transform: 'skewX(-20deg)',
          }}
        />

        <motion.div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg,transparent,${stat.color},transparent)` }}
          animate={{ opacity: isGlowActive ? 1 : 0 }} transition={{ duration: 0.3 }} />

        <div className="absolute top-3 right-3 text-base opacity-25" style={{ color: stat.color }}>{stat.icon}</div>
        <div className="w-2 h-2 rounded-full mb-3" style={{ background: stat.color, boxShadow: `0 0 8px ${stat.color}` }} />

        <div className="flex items-baseline gap-0 mb-1 relative z-20">
          <motion.span 
            initial={{ filter: 'blur(8px)', opacity: 0 }}
            animate={inView ? { filter: 'blur(0px)', opacity: 1 } : {}}
            transition={{ duration: 1, delay: index * 0.1 + 0.4 }}
            className="font-black leading-none tracking-tighter transition-colors duration-300"
            style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)', color: isGlowActive ? stat.color : 'white', textShadow: isGlowActive ? `0 0 24px ${stat.color}70` : 'none' }}>
            {display}
          </motion.span>
          <span className="font-black text-lg ml-0.5 transition-colors duration-300"
            style={{ color: isGlowActive ? stat.color : 'rgba(255,255,255,0.4)' }}>{stat.suffix}</span>
        </div>

        <p className="text-[8px] uppercase tracking-[0.3em] text-white/25 font-bold mb-2 relative z-20">{stat.label}</p>

        <AnimatePresence>
          {hovered && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden mt-3 relative z-20">
              <div className="pt-2 border-t" style={{ borderColor: `${stat.color}25` }}>
                <p className="text-[9px] text-white/40 leading-relaxed mb-2">{stat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: `${stat.color}18`, color: stat.color }}>
                    <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: stat.color }} />{stat.miniFact}
                  </span>
                  
                  {/* Sparkline */}
                  <div className="flex items-end gap-[3px] h-4">
                    {[40, 70, 45, 90, 65, 100].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        className="w-1 rounded-t-sm"
                        style={{ background: stat.color, opacity: 0.4 + (i * 0.1) }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

// ── LIVE COUNTER ───────────────────────────────────────────
function LiveVisitorCounter() {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 20000) + 95000);
  useEffect(() => {
    const iv = setInterval(() => setCount(p => p + Math.floor(Math.random() * 18) + 8), 1800);
    return () => clearInterval(iv);
  }, []);
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative w-2.5 h-2.5 flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-50" />
      </div>
      <span className="text-white font-black text-sm tabular-nums">{count.toLocaleString()}</span>
      <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">visited today</span>
    </div>
  );
}

// ── MAP ────────────────────────────────────────────────────
function MapSection({ inView }: { inView: boolean }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const drawAnimId = useRef<number | null>(null);

  const initMap = useCallback(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-74.15, 40.77], zoom: 10, pitch: 55, bearing: -15,
      interactive: true, attributionControl: false,
    });
    mapRef.current = map;

    map.on('load', () => {
      setMapLoaded(true);
      map.flyTo({ center: [-74.0776, 40.8133], zoom: 13.5, pitch: 62, bearing: -20, duration: 3800, essential: true });

      // 3D buildings layer
      try {
        map.addLayer({
          id: '3d-buildings', type: 'fill-extrusion',
          source: { type: 'vector', url: 'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf' } as never,
          'source-layer': 'building', minzoom: 11,
          paint: {
            'fill-extrusion-color': ['interpolate', ['linear'], ['get', 'render_height'], 0, '#0d1117', 50, '#111827', 200, '#1e293b'],
            'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 11, 0, 16, ['get', 'render_height']],
            'fill-extrusion-base': 0, 'fill-extrusion-opacity': 0.75,
          },
        });
      } catch (_) { /* fallback: no 3D buildings if source unavailable */ }

      // Mall marker — native geojson point
      map.addSource('mall-point', {
        type: 'geojson',
        data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [-74.0776, 40.8133] } }
      });
      map.addLayer({
        id: 'mall-dot',
        type: 'circle',
        source: 'mall-point',
        paint: {
          'circle-radius': 11,
          'circle-color': '#0891b2',
          'circle-stroke-width': 3,
          'circle-stroke-color': '#ffffff'
        }
      });
      
      map.on('click', 'mall-dot', () => { setShowPopup(true); });
      map.on('mouseenter', 'mall-dot', () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', 'mall-dot', () => { map.getCanvas().style.cursor = ''; });

      // NYC marker
      const nycEl = document.createElement('div');
      nycEl.style.cssText = 'width:8px;height:8px;background:rgba(255,255,255,.5);border-radius:50%;border:2px solid white;';
      new maplibregl.Marker({ element: nycEl }).setLngLat([-74.006, 40.7128])
        .setPopup(new maplibregl.Popup({ offset: 15, closeButton: false })
          .setHTML('<div style="background:#0a0a0a;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 12px;font-family:sans-serif;color:white;font-size:11px;font-weight:700;">New York City</div>'))
        .addTo(map);

      // Route
      map.addSource('route', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-74.006, 40.7128], [-74.0776, 40.8133]] } } });
      map.addLayer({ id: 'route-glow', type: 'line', source: 'route', paint: { 'line-color': '#0891b2', 'line-width': 10, 'line-opacity': 0.1 } });
      map.addLayer({ 
        id: 'route', 
        type: 'line', 
        source: 'route', 
        layout: { 'line-join': 'round', 'line-cap': 'round' }, 
        paint: { 
          'line-color': '#0891b2', 
          'line-width': 2, 
          'line-dasharray': [0, 1000], 
          'line-opacity': 0.85 
        } 
      });

      // Animate line draw
      let startTime = performance.now();
      const animateRoute = (timestamp: number) => {
        if (!mapRef.current || !mapRef.current.getLayer('route')) return;
        const progress = Math.min((timestamp - startTime) / 2500, 1);
        
        if (progress < 1) {
          mapRef.current.setPaintProperty('route', 'line-dasharray', [progress * 250, 1000]);
          drawAnimId.current = requestAnimationFrame(animateRoute);
        } else {
          const pulsePhase = (timestamp - startTime - 2500) / 1500;
          const op = 0.4 + 0.45 * (0.5 + 0.5 * Math.sin(pulsePhase * Math.PI * 2));
          mapRef.current.setPaintProperty('route', 'line-dasharray', [3, 4]);
          mapRef.current.setPaintProperty('route', 'line-opacity', op);
          drawAnimId.current = requestAnimationFrame(animateRoute);
        }
      };
      drawAnimId.current = requestAnimationFrame(animateRoute);
    });
    return map;
  }, []);

  useEffect(() => {
    if (!inView) return;
    const map = initMap();
    return () => { 
      if (drawAnimId.current) cancelAnimationFrame(drawAnimId.current);
      if (map) { map.remove(); mapRef.current = null; } 
    };
  }, [inView, initMap]);

  return (
    <div className="absolute right-0 top-0 w-[44%] h-full z-[10]">
      <div className="absolute inset-y-0 left-0 w-52 bg-gradient-to-r from-[#080808] to-transparent z-[15] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#080808] to-transparent z-[15] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#080808] to-transparent z-[15] pointer-events-none" />

      <AnimatePresence>
        {!mapLoaded && (
          <motion.div exit={{ opacity: 0 }} className="absolute inset-0 bg-zinc-900 z-[20] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-[9px] text-white/30 uppercase tracking-widest">Loading 3D Map</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Distance info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={mapLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 3.8 }}
        className="absolute bottom-24 left-8 z-[20] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl"
        style={{ maxWidth: 180 }}
      >
        <p className="text-[8px] text-cyan-400 font-black uppercase tracking-widest mb-1">📍 East Rutherford, NJ</p>
        <p className="text-white font-black text-sm uppercase tracking-wide">8 mi from Manhattan</p>
        <p className="text-white/35 text-[8px] uppercase tracking-wider mt-0.5">20M people within reach</p>
        <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-[7px] text-white/25 uppercase tracking-widest">Click blue dot for preview</p>
        </div>
      </motion.div>

      {/* Zoom controls */}
      <div className="absolute top-8 right-5 z-[20] flex flex-col gap-1.5">
        {[{ l: '+', f: () => mapRef.current?.zoomIn() }, { l: '−', f: () => mapRef.current?.zoomOut() }, { l: '⊙', f: () => mapRef.current?.flyTo({ center: [-74.0776, 40.8133], zoom: 13.5, pitch: 62, duration: 1500 }) }].map(({ l, f }) => (
          <button key={l} onClick={f} className="w-7 h-7 bg-black/60 backdrop-blur border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-cyan-500/40 transition-all flex items-center justify-center text-sm font-bold">{l}</button>
        ))}
      </div>

      {/* ── VIDEO POPUP on marker click ── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-[35] rounded-2xl overflow-hidden border border-white/12 shadow-2xl"
            style={{
              bottom: '7rem', left: '2rem', width: '17rem',
              background: '#0a0a0a',
              boxShadow: '0 30px 80px rgba(0,0,0,.85), 0 0 0 1px rgba(8,145,178,.25)',
            }}
          >
            {/* Video */}
            <div className="relative w-full overflow-hidden" style={{ height: '9rem' }}>
              <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-90">
                <source src="/videos/hero-main.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              {/* Live badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/65 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] text-white/70 font-bold uppercase tracking-widest">Live Venue</span>
              </div>
              {/* Close */}
              <button onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 border border-white/20 text-white/60 hover:text-white flex items-center justify-center text-sm font-bold transition-all hover:bg-black/90">
                ×
              </button>
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[8px] text-cyan-400 font-black uppercase tracking-[0.25em] mb-0.5">American Dream</p>
                  <p className="text-white font-black text-sm leading-tight">East Rutherford, NJ</p>
                </div>
                <div className="flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2 py-1">
                  <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[7px] text-cyan-400 font-bold uppercase tracking-widest">Open Now</span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[{ val: '3M', label: 'Sq Ft' }, { val: '40M+', label: 'Visitors' }, { val: '450+', label: 'Brands' }].map(s => (
                  <div key={s.label} className="text-center rounded-xl py-2 border" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}>
                    <p className="text-white font-black text-sm leading-none">{s.val}</p>
                    <p className="text-white/25 text-[7px] uppercase tracking-wider mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-white transition-opacity hover:opacity-80"
                style={{ background: 'linear-gradient(135deg,#0891b2,#0e7490)' }}
              >
                Schedule a Tour →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── PROGRESS BARS ──────────────────────────────────────────
function ProgressBars({ inView }: { inView: boolean }) {
  const bars = [
    { label: 'Retail', value: 92, color: '#0891b2' },
    { label: 'F&B', value: 78, color: '#a855f7' },
    { label: 'Entmt', value: 95, color: '#f59e0b' },
    { label: 'Luxury', value: 88, color: '#22c55e' },
  ];
  return (
    <div className="flex items-end gap-3 h-14 flex-shrink-0">
      {bars.map((bar, i) => (
        <div key={bar.label} className="flex flex-col items-center gap-1">
          <div className="w-4 h-10 bg-white/5 rounded-full overflow-hidden relative">
            <motion.div className="absolute bottom-0 left-0 right-0 rounded-full" style={{ background: bar.color }}
              initial={{ height: '0%' }} animate={inView ? { height: `${bar.value}%` } : {}}
              transition={{ duration: 1.2, delay: i * 0.1 + 1.0, ease: 'easeOut' }} />
          </div>
          <span className="text-[6px] uppercase tracking-widest text-white/20 font-bold">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── TICKER ─────────────────────────────────────────────────
function Ticker() {
  const repeated = useMemo(() => [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS], []);
  return (
    <div className="absolute bottom-0 left-0 w-full z-[25] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
      <div className="bg-black/55 backdrop-blur-md py-2.5 flex whitespace-nowrap">
        <motion.div animate={{ x: ['0%', '-33.333%'] }} transition={{ duration: 38, repeat: Infinity, ease: 'linear' }} className="flex items-center min-w-max">
          {repeated.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/30 px-3">{item}</span>
              <span className="text-cyan-500/35 text-[8px]">·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────
export default function TheScale({ currentAudience = 'all' }: { currentAudience?: AudienceType }) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });
  const content = AUDIENCE_CONTENT[currentAudience];

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: '#080808', height: '100dvh', minHeight: 600 }}>
      {/* Video BG */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-15">
        <source src="/videos/scale-bg.mp4" type="video/mp4" />
        <source src="/videos/hero-main.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(8,8,8,0.82)' }} />
      <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(105deg,rgba(8,8,8,1) 38%,rgba(8,8,8,0.55) 62%,transparent 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-28 z-[2]" style={{ background: 'linear-gradient(to top,#080808,transparent)' }} />
      <div className="absolute inset-0 z-[3] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

      <ParticleField />
      <MapSection inView={inView} />

      {/* ── LEFT COLUMN ── */}
      <div
        className="absolute inset-y-0 left-0 z-[20] flex flex-col justify-between"
        style={{ width: '56%', padding: 'clamp(4rem,6vh,6rem) 3rem clamp(3.5rem,5vh,5rem) 3rem' }}
      >
        {/* TOP */}
        <div>
          {/* Eyebrow */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }} className="flex items-center gap-3 mb-5">
            <motion.div initial={{ width: 0 }} animate={inView ? { width: 28 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="h-px bg-cyan-500" />
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-cyan-500">The Scale</p>
          </motion.div>

          {/* Headline */}
          <div className="mb-4 overflow-hidden">
            <motion.div initial={{ y: '100%' }} animate={inView ? { y: '0%' } : {}} transition={{ duration: 0.85, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}>
              <span className="font-black leading-[0.9] tracking-tighter text-white block" style={{ fontSize: 'clamp(2.6rem,5vw,5rem)' }}>
                THE NUMBERS
              </span>
            </motion.div>
            <div className="flex items-center gap-4 mt-1">
              <motion.span
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="font-black italic leading-[0.9] tracking-tighter"
                style={{ fontSize: 'clamp(2.6rem,5vw,5rem)', color: '#0891b2' }}
              >
                DON'T LIE.
              </motion.span>
              <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
                className="flex-1 h-px origin-left" style={{ background: 'linear-gradient(90deg,#0891b2,transparent)' }} />
            </div>

            {/* Subtext */}
            <motion.div 
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
              className="mt-5"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentAudience}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/80 text-xs md:text-sm font-bold tracking-[0.2em] uppercase"
                >
                  {content.headline}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Live counter */}
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}>
            <LiveVisitorCounter />
          </motion.div>
        </div>

        {/* MIDDLE: 2×2 grid */}
        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} inView={inView} isHighlighted={content.highlightStatIndex === i} />)}
        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 1.1 }}
          className="flex items-end gap-6"
        >
          <ProgressBars inView={inView} />
          <div className="flex flex-col gap-0.5 pb-0.5">
            <p className="text-[7px] uppercase tracking-widest text-white/20 font-bold">Tenant Mix</p>
            <p className="text-[9px] text-white/40">All categories at peak</p>
          </div>
          <div className="ml-auto">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/25 text-cyan-400 text-[8px] font-black uppercase tracking-widest transition-all"
              style={{ background: 'rgba(8,145,178,0.08)', backdropFilter: 'blur(10px)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentAudience}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {content.cta}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Ticker />
    </section>
  );
}