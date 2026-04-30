import { motion } from 'framer-motion';
import { useDeck } from '../DeckEngine';

export default function RetailLeasing() {
  const { go } = useDeck();
  const SLIDE_COLOR = '#b45309';

  return (
    <div className="w-full h-screen bg-zinc-950 text-white overflow-hidden flex items-center">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full">
        
        {/* Left: Editorial Pitch */}
        <div className="flex flex-col justify-center px-8 md:px-16 pt-24 lg:pt-0 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4 text-amber-600">
              Retail Leasing
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-6">
              Your Flagship.<br />Our Stage.
            </h2>
            <p className="text-lg md:text-xl font-light text-zinc-300 leading-relaxed max-w-lg mb-12">
              Join Hermès, Gucci, Louis Vuitton, and 450+ global brands in the most trafficked luxury destination in the Northeast.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {[
                { val: '$180', label: 'Avg spend / visit' },
                { val: '4hrs+', label: 'Avg dwell time' },
                { val: '2–3×', label: 'Revenue vs market' },
              ].map((metric, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-black text-amber-600 mb-1">{metric.val}</div>
                  <div className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">{metric.label}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => go(3)} // goes to next slide
              className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all"
              style={{ backgroundColor: SLIDE_COLOR, color: '#fff' }}
            >
              Explore Entertainment →
            </button>
          </motion.div>
        </div>

        {/* Right: Brands & ROI */}
        <div className="bg-zinc-900 flex flex-col justify-center items-center p-8 md:p-16 relative overflow-hidden">
          {/* subtle background glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-[120px] opacity-10 pointer-events-none"
            style={{ backgroundColor: SLIDE_COLOR }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative z-10 w-full max-w-lg text-center"
          >
            <div className="text-zinc-400 font-serif text-2xl md:text-4xl leading-relaxed mb-16 tracking-wide flex flex-col gap-4">
              <span>HERMÈS · GUCCI</span>
              <span>LOUIS VUITTON</span>
              <span>CARTIER · DIOR</span>
              <span>APPLE · ROLEX</span>
            </div>

            <div className="p-6 border border-zinc-800 bg-zinc-950/50 backdrop-blur-md rounded-2xl inline-block text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">ROI Snapshot</p>
              <p className="text-sm md:text-base font-medium text-white leading-relaxed">
                A 2,000 sq ft space at American Dream =<br />
                projected <span className="text-amber-500 font-black">$4.2M annual revenue</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
