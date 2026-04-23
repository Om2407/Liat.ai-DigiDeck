import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, Globe, Instagram, Twitter, MapPin, Clock, CreditCard } from 'lucide-react';

interface Brand {
  name: string;
  logo: string;
  desc: string;
  specialty: string;
  color?: string;
  url?: string;
}

export default function BrandView({ brand, onBack }: { brand: Brand, onBack: () => void }) {
  const handleVisitWebsite = () => {
    if (brand.url) {
      window.open(brand.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[200] bg-white overflow-y-auto"
    >
      {/* Dynamic Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 md:px-12 py-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to The Avenue</span>
        </button>
        <div className="text-xl font-black tracking-tighter uppercase">
          {brand.name}<span className="text-blue-600">.</span>
        </div>
        <button className="btn-primary text-[10px] px-8 py-3">Book Appointment</button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col lg:flex-row gap-20">
          {/* Logo & Visual */}
          <div className="lg:w-1/2">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-square bg-zinc-50 rounded-[3rem] overflow-hidden border border-zinc-100 flex items-center justify-center p-20 shadow-2xl shadow-zinc-200/50"
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-blue-600 uppercase tracking-[0.4em] text-[10px] font-black block mb-6">{brand.specialty}</span>
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">{brand.name}</h1>
              <p className="text-zinc-500 text-xl leading-relaxed mb-12 max-w-xl">
                {brand.desc} Exploring the intersection of tradition and innovation, {brand.name} brings the pinnacle of craftsmanship to American Dream.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-zinc-800">Location</div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-widest">Level 1, The Avenue</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase text-zinc-800">Hours Today</div>
                    <div className="text-[11px] text-zinc-400 uppercase tracking-widest">11:00 AM - 7:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleVisitWebsite}
                  className="flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors"
                >
                  Visit Official Website <Globe size={16} />
                </button>
                <div className="flex gap-2">
                  <button className="w-12 h-12 border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-50 transition-colors"><Instagram size={18} /></button>
                  <button className="w-12 h-12 border border-zinc-200 rounded-full flex items-center justify-center hover:bg-zinc-50 transition-colors"><Twitter size={18} /></button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Placeholder Content Sections */}
        <div className="mt-32 grid md:grid-cols-3 gap-12 border-t border-zinc-100 pt-32 mb-32">
          <div className="space-y-6">
            <div className="text-zinc-300 font-black text-6xl leading-none">01.</div>
            <h3 className="text-2xl font-black">Exclusive Collections</h3>
            <p className="text-zinc-500 leading-relaxed">Discover limited edition releases available exclusively at our American Dream boutique location.</p>
          </div>
          <div className="space-y-6">
            <div className="text-zinc-300 font-black text-6xl leading-none">02.</div>
            <h3 className="text-2xl font-black">Personal Shopping</h3>
            <p className="text-zinc-500 leading-relaxed">Book a session with our resident stylists for a curated, one-on-one luxury experience tailored to your needs.</p>
          </div>
          <div className="space-y-6">
            <div className="text-zinc-300 font-black text-6xl leading-none">03.</div>
            <h3 className="text-2xl font-black">In-Store Events</h3>
            <p className="text-zinc-500 leading-relaxed">Join our inner circle for exclusive previews, seasonal launches, and artisan masterclasses throughout the year.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
