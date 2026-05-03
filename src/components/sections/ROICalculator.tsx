import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import CountUp from '../ui/CountUp';
import FilmGrain from '../ui/FilmGrain';

export type AudienceType = 'all' | 'tenant' | 'sponsor' | 'event';

const ZONES = [
  { id: 'avenue', label: 'The Avenue (Luxury)', multiplier: 2.0 },
  { id: 'entertainment', label: 'Entertainment District', multiplier: 1.8 },
  { id: 'fb', label: 'F&B District', multiplier: 1.5 },
  { id: 'tech', label: 'Tech Corridor', multiplier: 1.2 },
];

const BRAND_TIERS = ['Emerging', 'Established', 'Premium', 'Luxury'];



export default function ROICalculator({ currentAudience = 'all' }: { currentAudience?: AudienceType }) {
  // Left Column States
  const [spaceSize, setSpaceSize] = useState(2500);
  const [zone, setZone] = useState(0); // index of ZONES
  const [monthlyRent, setMonthlyRent] = useState(50000);
  const [brandTier, setBrandTier] = useState(1); // 0=Emerging, 1=Established, 2=Premium, 3=Luxury

  // Derived Values
  const activeZone = ZONES[zone];
  const conversionRate = BRAND_TIERS[brandTier] === 'Luxury' ? 0.08 : 0.12;
  const setupCostPerSqFt = 250;

  const visitors = spaceSize * 12 + activeZone.multiplier * 50000;
  const revenue = visitors * 180 * conversionRate;
  const roi = monthlyRent > 0 ? ((revenue - monthlyRent) / monthlyRent) * 100 : 0;
  const profit = revenue - monthlyRent;
  const paybackPeriod = profit > 0 ? (spaceSize * setupCostPerSqFt) / profit : 999;

  // Chart Data (12 months with slight random variation + growth)
  const [chartData, setChartData] = useState<number[]>([]);
  useEffect(() => {
    const newData = Array.from({ length: 12 }).map((_, i) => {
      const growth = 1 + (i * 0.02); // 2% month over month growth
      const seasonal = 1 + (Math.sin(i / 1.5) * 0.1); // seasonal variation
      return revenue * growth * seasonal;
    });
    setChartData(newData);
  }, [revenue]);

  const maxChartValue = Math.max(...chartData, 1);

  return (
    <div className="relative w-full h-full min-h-screen bg-zinc-950 text-white overflow-hidden flex items-center justify-center p-8 lg:p-16 pt-24">
      
      {/* Film Grain */}
      <FilmGrain className="absolute inset-0 pointer-events-none z-0" opacity={0.025} />

      <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20 relative z-10">
        
        {/* LEFT COLUMN - CONTROLS */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <p className="text-emerald-500 font-black tracking-[0.3em] uppercase text-xs mb-4">ROI Calculator</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
            See Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Return.</span>
          </h2>

          <div className="space-y-8 flex-1" data-ai-context={`ROI Calculator: Space=${spaceSize}sqft, Zone=${activeZone.label}, Budget=$${monthlyRent}/mo, projected ROI=${Math.round(roi)}%`}>
            
            {/* Space Size Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold tracking-widest uppercase text-zinc-400">Space Size</label>
                <span className="text-emerald-400 font-black">{spaceSize.toLocaleString()} sq ft</span>
              </div>
              <input 
                type="range" min="500" max="10000" step="100" value={spaceSize}
                onChange={(e) => setSpaceSize(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 focus:outline-none"
              />
            </div>

            {/* Zone Dropdown */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold tracking-widest uppercase text-zinc-400">Zone</label>
                <span className="text-emerald-400 font-black">{activeZone.label}</span>
              </div>
              <div className="relative">
                <select 
                  value={zone} 
                  onChange={(e) => setZone(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 appearance-none font-bold text-sm outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                >
                  {ZONES.map((z, i) => <option key={z.id} value={i}>{z.label}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500 font-black text-xs">▼</div>
              </div>
            </div>

            {/* Monthly Rent Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold tracking-widest uppercase text-zinc-400">Monthly Rent Budget</label>
                <span className="text-emerald-400 font-black">${monthlyRent.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="10000" max="200000" step="5000" value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 focus:outline-none"
              />
            </div>

            {/* Brand Tier Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-xs font-bold tracking-widest uppercase text-zinc-400">Brand Tier</label>
                <span className="text-emerald-400 font-black">{BRAND_TIERS[brandTier]}</span>
              </div>
              <input 
                type="range" min="0" max="3" step="1" value={brandTier}
                onChange={(e) => setBrandTier(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-wider mt-1">
                <span>Emerging</span>
                <span>Luxury</span>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT COLUMN - RESULTS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col"
        >
          <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-8">
            
            {/* Card 1 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2 relative z-10">Projected Monthly Visitors</p>
              <p className="text-3xl lg:text-4xl font-black text-emerald-400 tracking-tighter relative z-10">
                <CountUp value={visitors} />
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2 relative z-10">Est. Monthly Revenue</p>
              <p className="text-3xl lg:text-4xl font-black text-emerald-400 tracking-tighter relative z-10">
                <CountUp value={revenue} isCurrency />
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2 relative z-10">Projected ROI</p>
              <p className={`text-3xl lg:text-4xl font-black tracking-tighter relative z-10 ${roi >= 0 ? 'text-emerald-400' : 'text-red-500'}`}>
                {roi > 0 && '+'}<CountUp value={roi} isPercent />
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div whileHover={{ scale: 1.02 }} className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <p className="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-500 mb-2 relative z-10">Payback Period</p>
              <p className="text-3xl lg:text-4xl font-black text-white tracking-tighter relative z-10">
                {paybackPeriod > 120 ? '>10 yrs' : <><CountUp value={paybackPeriod} isDecimals /> <span className="text-lg text-zinc-500 uppercase tracking-widest">mos</span></>}
              </p>
            </motion.div>

          </div>

          {/* Chart Area */}
          <div className="flex-1 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-6 lg:p-8 flex flex-col justify-end min-h-[220px] relative overflow-hidden">
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Year 1 Projection</span>
            </div>
            
            <div className="flex items-end justify-between gap-1 h-32 mt-8 w-full relative z-10">
              {chartData.map((val, i) => {
                const heightPercent = maxChartValue > 0 ? (val / maxChartValue) * 100 : 0;
                return (
                  <div key={i} className="flex flex-col items-center flex-1 gap-2 group">
                    <motion.div 
                      className="w-full rounded-t-sm bg-gradient-to-t from-emerald-900/40 to-emerald-500 transition-all duration-300 relative"
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-zinc-800 text-white text-[9px] font-bold px-2 py-1 rounded pointer-events-none transition-opacity whitespace-nowrap z-20">
                        ${Math.round(val).toLocaleString()}
                      </div>
                    </motion.div>
                    <span className="text-[9px] font-bold uppercase text-zinc-600 tracking-wider">
                      {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full py-5 rounded-2xl bg-emerald-500 text-zinc-950 font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-400 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]"
          >
            Ready to Calculate Your Custom Package? →
          </motion.button>

        </motion.div>

      </div>
    </div>
  );
}
