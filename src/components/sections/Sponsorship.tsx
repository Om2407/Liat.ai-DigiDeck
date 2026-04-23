import { motion } from 'motion/react';

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

const AUDIENCE_STATS = [
  { label: 'Annual Visitors',    value: '40M+',  desc: 'High-intent consumers' },
  { label: 'Avg Household Income', value: '$95K', desc: 'Above national average' },
  { label: 'Age 18–45',          value: '62%',   desc: 'Prime spending demographic' },
  { label: 'Social Reach',       value: '8.4M',  desc: 'Combined followers' },
];

export default function Sponsorship() {
  return (
    <section id="sponsorship" className="min-h-screen py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.1) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.07) 0%, transparent 50%)' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 uppercase tracking-[0.4em] text-[10px] font-black block mb-4">
            Brand Partnerships
          </span>
          <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-6">
            Own the<br />
            <span className="italic font-serif" style={{ color: '#f59e0b' }}>Audience.</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-base leading-relaxed">
            40 million annual visitors. One destination. Position your brand at the intersection of luxury, entertainment, and culture.
          </p>
        </motion.div>

        {/* Audience stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {AUDIENCE_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl border border-white/8 text-center"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <p className="text-white text-3xl font-black tracking-tighter mb-1">{s.value}</p>
              <p className="text-white/60 text-xs font-black uppercase tracking-wider mb-0.5">{s.label}</p>
              <p className="text-white/30 text-[10px]">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tier cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="relative p-7 rounded-3xl border transition-all duration-500 cursor-pointer group"
              style={{
                background: i === 1 ? `${tier.color}0d` : 'rgba(255,255,255,0.03)',
                borderColor: i === 1 ? `${tier.color}44` : 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Tag */}
              <div className="absolute -top-3 left-6">
                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full"
                  style={{ background: tier.color, color: '#000' }}>
                  {tier.tag}
                </span>
              </div>

              <div className="mb-6 pt-2">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-black mb-1">{tier.name}</p>
                <p className="text-white text-4xl font-black tracking-tighter" style={{ color: tier.color }}>{tier.price}</p>
                <p className="text-white/30 text-xs mt-1">per year</p>
              </div>

              <div className="flex flex-col gap-2.5 mb-7">
                {tier.perks.map((perk) => (
                  <div key={perk} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: tier.color }} />
                    <span className="text-white/60 text-xs leading-relaxed group-hover:text-white/75 transition-colors">{perk}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300"
                style={{
                  background: i === 1 ? tier.color : 'transparent',
                  border: `1px solid ${i === 1 ? tier.color : 'rgba(255,255,255,0.15)'}`,
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
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-white/25 text-xs"
        >
          Custom packages available. All partnerships include audience data reports and co-marketing support.
        </motion.p>
      </div>
    </section>
  );
}
