import { motion } from 'framer-motion';

export default function DiningLifestyle() {
  return (
    <div className="w-full h-screen bg-zinc-950 text-white overflow-hidden flex items-center relative">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full z-10">
        
        {/* Left: Editorial Copy */}
        <div className="flex flex-col justify-center px-8 md:px-16 pt-24 lg:pt-0 relative">
          {/* subtle accent glow */}
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2" />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4 text-red-600">
              Dining & Lifestyle
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-6">
              Stay Longer.<br />Spend More.
            </h2>
            <p className="text-lg md:text-xl font-light text-zinc-300 leading-relaxed max-w-lg mb-12">
              100+ restaurants from Michelin-caliber dining to vibrant casual. Dining at American Dream adds <span className="text-white font-bold">90+ minutes</span> to the average visit.
            </p>

            <div className="text-zinc-500 font-serif text-lg md:text-2xl leading-relaxed tracking-wide flex flex-col gap-2">
              <span>CARPACCIO · SUSHI NEKO</span>
              <span>SUGAR FACTORY</span>
              <span>SHAKE SHACK · DIN TAI FUNG</span>
            </div>
          </motion.div>
        </div>

        {/* Right: Social Proof */}
        <div className="bg-zinc-900 flex flex-col justify-center items-center lg:items-start p-8 md:p-16 border-l border-zinc-800 relative">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <div className="mb-12">
              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-500 mb-8 border-b border-zinc-800 pb-4">
                Social Proof & Reach
              </h3>

              <div className="flex flex-col gap-8">
                {/* Stat 1 */}
                <div>
                  <p className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-1">8.4M</p>
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest">Combined social followers</p>
                </div>

                {/* Stat 2 */}
                <div>
                  <p className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-1">40M</p>
                  <p className="text-red-500 text-xs font-bold uppercase tracking-widest">Annual organic impressions</p>
                </div>

                {/* Stat 3 */}
                <div className="p-6 border border-zinc-800 bg-zinc-950/50 rounded-2xl mt-4">
                  <p className="text-2xl font-black uppercase tracking-tight text-white mb-2">#1</p>
                  <p className="text-zinc-400 text-sm font-medium">Most-Instagrammed mall in the United States</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
