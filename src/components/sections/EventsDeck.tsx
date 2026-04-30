import { motion } from 'framer-motion';

export default function EventsDeck() {
  return (
    <div className="w-full h-screen bg-zinc-950 text-white overflow-hidden flex items-center relative">
      
      {/* Background abstract element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full z-10">
        
        {/* Left: Copy & Venues */}
        <div className="flex flex-col justify-center px-8 md:px-16 pt-24 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-4 text-purple-500">
              Event Hosting
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase tracking-tighter leading-[0.9] mb-12">
              Your Event.<br />Our Platform.
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6 mb-12">
            {/* Venue 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎤</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-1 text-white">Performing Arts Center</h3>
                  <p className="text-purple-400 font-bold mb-2">5,000 Seats</p>
                  <p className="text-zinc-400 text-sm md:text-base">Concerts · Award Shows · Corporate Events</p>
                </div>
              </div>
            </motion.div>

            {/* Venue 2 */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">🏛️</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-1 text-white">Exposition Center</h3>
                  <p className="text-purple-400 font-bold mb-2">300,000 Sq Ft</p>
                  <p className="text-zinc-400 text-sm md:text-base">Trade Shows · Conventions · Product Launches</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full text-sm font-bold uppercase tracking-widest text-white transition-colors mb-8">
              Book Your Event →
            </button>

            <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-zinc-500">
              200+ Events / Year <span className="text-zinc-700 mx-2">·</span> 30,000 Parking Spots <span className="text-zinc-700 mx-2">·</span> 20 min from Penn Station
            </p>
          </motion.div>
        </div>

        {/* Right: Stylized Visual */}
        <div className="hidden lg:flex flex-col justify-center items-center relative p-16">
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-lg aspect-[4/5] rounded-[40px] border border-zinc-800 bg-gradient-to-tr from-zinc-900 to-zinc-950 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-16 h-16 rounded-full border border-zinc-700 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Scale</p>
                <p className="text-xl font-bold text-white">Unmatched</p>
              </div>
            </div>

            <div className="relative z-10">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-8" />
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-300">
                The Stage <br />Is Set.
              </h3>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
