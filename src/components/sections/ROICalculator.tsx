import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAudience } from '../../context/AudienceContext';

const CATEGORIES = [
  { id: 'luxury',   label: 'Luxury Flagship', multiplier: 4.8, color: '#b45309' },
  { id: 'fashion',  label: 'Fashion / Apparel', multiplier: 3.2, color: '#7c3aed' },
  { id: 'tech',     label: 'Tech / Electronics', multiplier: 4.2, color: '#1428a0' },
  { id: 'fb',       label: 'Food & Beverage', multiplier: 2.8, color: '#dc2626' },
  { id: 'beauty',   label: 'Beauty / Wellness', multiplier: 3.6, color: '#db2777' },
  { id: 'popup',    label: 'Pop-Up / Concept', multiplier: 2.2, color: '#059669' },
];

function animateNumber(target: number, setter: (n: number) => void) {
  let start = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { setter(target); clearInterval(timer); }
    else setter(Math.floor(start));
  }, 18);
  return () => clearInterval(timer);
}

export default function ROICalculator() {
  const { audience } = useAudience();
  const [sqft, setSqft] = useState(2000);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [dwell, setDwell] = useState(3);

  // Calculated values
  const annualFootfall = Math.round(40_000_000 * (sqft / 3_000_000) * (dwell / 4));
  const revenuePerVisit = category.multiplier * 18;
  const annualRevenue = Math.round(annualFootfall * revenuePerVisit);
  const payback = Math.round((sqft * 280) / (annualRevenue / 12));

  const [dispFootfall, setDispFootfall] = useState(0);
  const [dispRevenue, setDispRevenue] = useState(0);
  const [dispPayback, setDispPayback] = useState(0);

  useEffect(() => {
    const c1 = animateNumber(annualFootfall, setDispFootfall);
    const c2 = animateNumber(annualRevenue, setDispRevenue);
    const c3 = animateNumber(payback, setDispPayback);
    return () => { c1(); c2(); c3(); };
  }, [annualFootfall, annualRevenue, payback]);

  const fmt = (n: number) => n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${(n / 1_000).toFixed(0)}K`;

  const fmtNum = (n: number) => n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(1)}M`
    : `${(n / 1_000).toFixed(0)}K`;

  return (
    <section className="min-h-screen bg-zinc-950 py-16 px-6 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">

        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black block mb-3">
            Interactive Tool
          </span>
          <h2 className="text-white text-4xl md:text-6xl font-black tracking-tighter mb-4">
            ROI <span style={{ background: 'linear-gradient(135deg,#60a5fa,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Calculator</span>
          </h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            See your projected returns at American Dream. Adjust the inputs — watch your opportunity come to life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* LEFT — Controls */}
          <motion.div className="space-y-6"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>

            {/* Store size */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between mb-3">
                <span className="text-white font-black text-sm uppercase tracking-wider">Store Size</span>
                <span className="text-blue-400 font-black text-sm">{sqft.toLocaleString()} sq ft</span>
              </div>
              <input type="range" min={500} max={20000} step={500} value={sqft}
                aria-label={`Store size: ${sqft.toLocaleString()} square feet`}
                onChange={e => setSqft(Number(e.target.value))}
                className="w-full accent-blue-500 h-2 cursor-pointer" />
              <div className="flex justify-between text-white/20 text-[10px] mt-1 font-bold uppercase tracking-wider">
                <span>500 sq ft</span><span>20,000 sq ft</span>
              </div>
            </div>

            {/* Category */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-white font-black text-sm uppercase tracking-wider mb-4">Category</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setCategory(cat)}
                    className="px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 text-left"
                    style={{
                      background: category.id === cat.id ? `${cat.color}33` : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${category.id === cat.id ? cat.color : 'rgba(255,255,255,0.08)'}`,
                      color: category.id === cat.id ? cat.color : 'rgba(255,255,255,0.4)',
                    }}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dwell time */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex justify-between mb-3">
                <span className="text-white font-black text-sm uppercase tracking-wider">Avg Dwell Time</span>
                <span className="font-black text-sm" style={{ color: category.color }}>{dwell} hrs/visit</span>
              </div>
              <input type="range" min={1} max={6} step={0.5} value={dwell}
                aria-label={`Average dwell time: ${dwell} hours per visit`}
                onChange={e => setDwell(Number(e.target.value))}
                className="w-full h-2 cursor-pointer"
                style={{ accentColor: category.color }} />
              <div className="flex justify-between text-white/20 text-[10px] mt-1 font-bold uppercase tracking-wider">
                <span>1 hr</span><span>6 hrs</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Results */}
          <motion.div className="space-y-5"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>

            {[
              { label: 'Projected Annual Footfall', value: fmtNum(dispFootfall), sub: 'Unique visitors to your store', icon: '👥', color: '#60a5fa' },
              { label: 'Est. Annual Revenue', value: fmt(dispRevenue), sub: `Based on ${category.label} avg transaction`, icon: '💰', color: category.color },
              { label: 'Payback Period', value: `${dispPayback} mo`, sub: 'Based on standard fit-out cost', icon: '📅', color: '#34d399' },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="p-6 rounded-2xl border"
                style={{ background: `${stat.color}0d`, borderColor: `${stat.color}33` }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className="flex-1">
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-1">{stat.label}</p>
                    <motion.p className="font-black text-4xl tracking-tighter mb-1"
                      style={{ color: stat.color }}
                      key={stat.value}>
                      {stat.value}
                    </motion.p>
                    <p className="text-white/30 text-xs">{stat.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white shadow-xl transition-all"
              style={{ background: `linear-gradient(135deg, ${category.color}, ${category.color}bb)`, boxShadow: `0 20px 40px ${category.color}33` }}>
              📩 Get Custom Leasing Proposal
            </motion.button>

            <p className="text-white/15 text-[9px] text-center uppercase tracking-wider">
              Projections based on American Dream visitor data · 2024 averages
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
