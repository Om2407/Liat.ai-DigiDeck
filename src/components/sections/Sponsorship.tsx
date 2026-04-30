import { motion } from 'framer-motion';

const TIERS = [
  {
    name: 'Presenting Partner',
    price: '$2M+',
    color: '#f59e0b',
    perks: [
      'Naming rights — Arena or Water Park',
      'Year-round LED billboard (300K daily views)',
      'Branded entrance experience',
      'VIP suite access for 100 events/yr',
      'Co-branded digital & social campaigns',
      'Exclusive category rights',
    ],
    tag: 'Premier',
  },
  {
    name: 'Activation Partner',
    price: '$500K–$2M',
    color: '#8b5cf6',
    perks: [
      'Dedicated brand activation zone (5,000 sq ft)',
      'Seasonal pop-up rights (4x/year)',
      'In-venue digital screen network',
      'Event co-sponsorship (50 events/yr)',
      'Social media integration & tagging',
      'Consumer data & insights reports',
    ],
    tag: 'Most Popular',
  },
  {
    name: 'Event Sponsor',
    price: '$100K–$500K',
    color: '#10b981',
    perks: [
      'Single event naming rights',
      'Branded merchandise & giveaways',
      'On-site activation booth (1,000 sq ft)',
      'Social mentions & email blasts',
      'Press release co-branding',
      'Post-event performance report',
    ],
    tag: 'Entry Level',
  },
];

export default function Sponsorship() {
  return (
    <div className="w-full h-screen bg-zinc-950 text-white overflow-hidden flex flex-col justify-center relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.1) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.07) 0%, transparent 50%)' }} />
      </div>

      <div className="container mx-auto px-8 md:px-16 relative z-10 flex flex-col items-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-amber-500 uppercase tracking-[0.4em] text-[10px] font-black block mb-4">
            Brand Partnerships
          </span>
          <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-black tracking-tighter leading-[0.85] mb-6">
            Own the <span className="italic font-serif text-amber-500">Audience.</span>
          </h2>
          
          <p className="text-zinc-300 font-medium uppercase tracking-widest text-xs md:text-sm">
            40M Visitors <span className="text-zinc-700 mx-3">·</span> $95K Avg HHI <span className="text-zinc-700 mx-3">·</span> 8.4M Social Followers
          </p>
        </motion.div>

        {/* Tier cards - Horizontal layout */}
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-6 mb-8">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 + 0.2, duration: 0.8 }}
              whileHover={{ y: -6 }}
              className="flex-1 relative p-6 lg:p-8 rounded-3xl border transition-all duration-500 cursor-pointer group flex flex-col"
              style={{
                background: i === 1 ? `${tier.color}0d` : 'rgba(255,255,255,0.02)',
                borderColor: i === 1 ? `${tier.color}44` : 'rgba(255,255,255,0.05)',
              }}
            >
              <div className="absolute -top-3 left-6">
                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ background: tier.color, color: '#000' }}>
                  {tier.tag}
                </span>
              </div>

              <div className="mb-6 pt-2">
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black mb-1">{tier.name}</p>
                <p className="text-3xl lg:text-4xl font-black tracking-tighter" style={{ color: tier.color }}>{tier.price}</p>
                <p className="text-zinc-600 text-xs mt-1">per year</p>
              </div>

              <div className="flex flex-col gap-3 flex-1 mb-6">
                {tier.perks.map((perk) => (
                  <div key={perk} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: tier.color }} />
                    <span className="text-zinc-400 text-xs lg:text-sm leading-tight group-hover:text-zinc-300 transition-colors">{perk}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 mt-auto"
                style={{
                  background: i === 1 ? tier.color : 'transparent',
                  border: `1px solid ${i === 1 ? tier.color : 'rgba(255,255,255,0.1)'}`,
                  color: i === 1 ? '#000' : '#fff',
                }}
              >
                Inquire Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center text-zinc-600 text-[10px] uppercase tracking-widest"
        >
          Custom packages available. All partnerships include audience data reports and co-marketing support.
        </motion.p>
      </div>
    </div>
  );
}
