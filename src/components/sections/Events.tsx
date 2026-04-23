import { motion } from 'motion/react';
import { useAudience } from '../../context/AudienceContext';

const PAST_EVENTS = [
  { name: 'BTS Pop-Up',          cat: 'Brand Activation', year: '2023', icon: '🎵' },
  { name: 'WWE SmackDown',       cat: 'Live Event',        year: '2023', icon: '🏆' },
  { name: 'Nickelodeon Awards',  cat: 'Award Show',        year: '2024', icon: '🏅' },
  { name: 'NY Fashion Week',     cat: 'Industry Event',    year: '2024', icon: '👗' },
  { name: 'Samsung Launch',      cat: 'Product Launch',    year: '2024', icon: '📱' },
  { name: 'Doja Cat Concert',    cat: 'Concert',           year: '2024', icon: '🎤' },
];

const VENUE_STATS = [
  { num: '5,000+', label: 'Arena Capacity' },
  { num: '300K',   label: 'Sq Ft Expo Center' },
  { num: '200+',   label: 'Events Per Year' },
  { num: '4K',     label: 'Visual Tech' },
];

const AUDIENCE_COPY = {
  all:     { tag: 'Stage Your Legend',        headline: 'The Arena.',     sub: 'State-of-the-art concert and event venue designed to host the world\'s most iconic performers and grand-scale corporate activations.' },
  tenant:  { tag: 'Drive Your Traffic',       headline: 'Event Halo.',    sub: '200+ events per year bring waves of high-intent shoppers directly past your storefront — built-in co-marketing at scale.' },
  sponsor: { tag: 'Activate Your Brand',      headline: 'Own the Moment.', sub: 'From branded stages to naming rights — activate inside America\'s most-visited entertainment destination. 40M+ captive eyeballs.' },
  event:   { tag: 'The Perfect Venue',        headline: 'Book the Arena.', sub: '5,000-seat performing arts center + 300,000 sq ft exposition hall. Full production support. 8 miles from Manhattan.' },
};

export default function Events() {
  const { audience } = useAudience();
  const copy = AUDIENCE_COPY[audience] || AUDIENCE_COPY.all;

  return (
    <section id="events" className="min-h-screen py-24 flex items-center bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(139,92,246,0.15) 0%, transparent 60%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 50%)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Venue stats bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-4 gap-4 mb-16 p-6 rounded-2xl border border-white/8"
          style={{ background: 'rgba(139,92,246,0.06)' }}
        >
          {VENUE_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-white text-2xl md:text-3xl font-black tracking-tighter mb-1">{s.num}</p>
              <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            key={audience}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-purple-400 uppercase tracking-[0.3em] text-xs font-black block mb-5">
              {copy.tag}
            </span>
            <h2 className="text-white text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-6">
              The<br />
              <span className="italic font-serif" style={{ color: '#a78bfa' }}>{copy.headline}</span>
            </h2>
            <p className="text-white/50 mb-10 text-base leading-relaxed max-w-md">
              {copy.sub}
            </p>

            {/* Expo Center callout */}
            <div className="mb-10 p-5 rounded-2xl border border-purple-500/20" style={{ background: 'rgba(139,92,246,0.08)' }}>
              <p className="text-purple-300 text-[10px] uppercase tracking-widest font-black mb-2">Exposition Center</p>
              <p className="text-white font-black text-sm mb-1">300,000 sq ft of flexible event space</p>
              <p className="text-white/40 text-xs leading-relaxed">
                Modular floor plans for 500 to 30,000 guests. Full AV, catering, and logistics support. Adjacent parking for 30,000+ vehicles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-4 bg-purple-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-purple-500 transition-all duration-300 shadow-lg shadow-purple-900/30">
                Book Venue
              </button>
              <button className="px-10 py-4 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white/5 transition-all duration-300">
                Event Packages
              </button>
            </div>
          </motion.div>

          {/* Right — Past events */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-black mb-5">Recent Highlights</p>
            <div className="flex flex-col gap-2.5">
              {PAST_EVENTS.map((ev, i) => (
                <motion.div
                  key={ev.name}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/6 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.15)' }}>
                    {ev.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-black text-sm group-hover:text-purple-300 transition-colors">{ev.name}</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-wider mt-0.5">{ev.cat}</p>
                  </div>
                  <div className="text-white/20 text-xs font-bold flex-shrink-0">{ev.year}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-5 rounded-2xl border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <p className="text-white/30 text-[10px] uppercase tracking-widest font-black mb-2">Production Capabilities</p>
              <div className="grid grid-cols-2 gap-3">
                {['4K LED Walls', 'Dolby Sound', 'VIP Lounges', 'On-site Catering', 'Green Rooms', '30K Parking'].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                    <span className="text-white/50 text-xs font-bold">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
