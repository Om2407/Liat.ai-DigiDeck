import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Play, Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const SOCIAL_POSTS = [
  { id: 1, type: 'instagram', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600', label: 'Nickelodeon Universe', tag: '@americandream', likes: '12.4K', views: '890K', caption: 'Biggest indoor theme park in North America 🎡 #AmericanDream #NickelodeonUniverse' },
  { id: 2, type: 'tiktok',    img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=600', label: 'DreamWorks Water Park', tag: '@americandreamnj', likes: '34.2K', views: '2.1M', caption: "America's largest indoor water park 🌊 Open 365 days! #WaterPark" },
  { id: 3, type: 'instagram', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600', label: 'Dining Experience', tag: '@americandream', likes: '7.1K', views: '340K', caption: '100+ restaurants under one roof 🍽️ #AmericanDream #Dining' },
  { id: 4, type: 'tiktok',    img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600', label: 'Luxury Shopping', tag: '@americandreamnj', likes: '22.7K', views: '1.4M', caption: 'Hermès, Gucci, LV — all in one place 🛍️ #LuxuryShopping' },
  { id: 5, type: 'instagram', img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=600', label: 'Live Events Arena', tag: '@americandream', likes: '41.3K', views: '3.8M', caption: 'Another sold-out night 🎤 #LiveEvents #Concert #AmericanDream' },
  { id: 6, type: 'tiktok',    img: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=600', label: 'The Avenue Luxury', tag: '@americandreamnj', likes: '18.9K', views: '960K', caption: 'The most exclusive luxury corridor in the Northeast ✨ #TheAvenue' },
];

const PLATFORM_STATS = [
  { platform: 'Instagram', handle: '@americandream', followers: '2.1M', color: '#E1306C', icon: '📸' },
  { platform: 'TikTok',    handle: '@americandreamnj', followers: '4.8M', color: '#010101', icon: '▶️' },
  { platform: 'YouTube',   handle: 'American Dream Mall', followers: '1.5M', color: '#FF0000', icon: '🎬' },
];

const REACH_STATS = [
  { num: '8.4M', label: 'Total Followers' },
  { num: '120M+', label: 'Monthly Impressions' },
  { num: '4.2%', label: 'Avg Engagement Rate' },
  { num: '340+', label: 'Brand Tags / Day' },
];

export default function SocialSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const filtered = activeFilter === 'All' ? SOCIAL_POSTS
    : SOCIAL_POSTS.filter(p => activeFilter === 'Instagram' ? p.type === 'instagram' : p.type === 'tiktok');

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section id="social" className="bg-zinc-950 py-24 px-6 overflow-hidden relative">
      {/* bg glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(225,48,108,0.07) 0%, transparent 55%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.05) 0%, transparent 50%)' }} />
      </div>

      <div className="container mx-auto relative z-10 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-10 gap-8">
          <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-pink-400 uppercase tracking-[0.35em] text-[10px] font-black mb-4">Social Proof</p>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.88]">
              The World<br />
              <span className="italic font-serif" style={{ color: '#f472b6' }}>Is Watching.</span>
            </h2>
            <p className="text-white/40 mt-4 text-sm max-w-sm leading-relaxed">
              8.4M followers. 120M+ monthly impressions. Your brand gets this reach the moment you open here.
            </p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-3">
            {['All', 'Instagram', 'TikTok'].map(f => (
              <motion.button key={f} onClick={() => setActiveFilter(f)}
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-300 border"
                style={{
                  background: activeFilter === f ? 'rgba(244,114,182,0.15)' : 'rgba(255,255,255,0.04)',
                  borderColor: activeFilter === f ? '#f472b6' : 'rgba(255,255,255,0.08)',
                  color: activeFilter === f ? '#fff' : 'rgba(255,255,255,0.4)',
                }}>
                {f === 'Instagram' ? '📸' : f === 'TikTok' ? '▶️' : '✦'} {f}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Reach stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-5 rounded-2xl"
          style={{ background: 'rgba(244,114,182,0.05)', border: '1px solid rgba(244,114,182,0.12)' }}
        >
          {REACH_STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="text-center">
              <p className="text-white font-black text-2xl md:text-3xl tracking-tighter mb-0.5" style={{ color: '#f472b6' }}>{s.num}</p>
              <p className="text-white/30 text-[9px] uppercase tracking-widest font-bold">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Post grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <motion.div key={post.id} layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: '4/5', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <img src={post.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.label} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Platform badge */}
                <div className="absolute top-4 right-4 backdrop-blur-md p-2.5 rounded-xl border border-white/10" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  {post.type === 'instagram' ? <Instagram size={15} className="text-pink-400" /> : <Play size={15} className="text-white" fill="white" />}
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-white/60 text-[9px] font-black uppercase tracking-widest backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10" style={{ background: 'rgba(0,0,0,0.4)' }}>
                    {post.tag}
                  </span>
                </div>

                {/* Views badge - visible on hover */}
                <div className="absolute top-12 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 mt-2">
                  <div className="flex items-center gap-1 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 mt-2" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <TrendingUp size={10} className="text-pink-400" />
                    <span className="text-white text-[9px] font-black">{post.views}</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-white font-black text-sm tracking-tight mb-2">{post.label}</p>
                  <p className="text-white/50 text-xs leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 line-clamp-2">{post.caption}</p>
                  <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-white text-xs font-bold">
                      <Heart size={13} fill={likedPosts.has(post.id) ? '#ef4444' : 'none'} stroke={likedPosts.has(post.id) ? '#ef4444' : 'white'} />
                      {post.likes}
                    </button>
                    <div className="flex items-center gap-3 text-white/40">
                      <MessageCircle size={12} />
                      <Share2 size={12} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Platform cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {PLATFORM_STATS.map((p, i) => (
            <motion.div key={p.platform}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-white/6 flex items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div className="text-2xl">{p.icon}</div>
              <div className="flex-1">
                <p className="text-white font-black text-sm">{p.platform}</p>
                <p className="text-white/30 text-[10px] font-bold">{p.handle}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-lg tracking-tighter" style={{ color: p.color === '#010101' ? '#fff' : p.color }}>{p.followers}</p>
                <p className="text-white/25 text-[9px] uppercase tracking-wider">followers</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sponsor CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center p-8 rounded-3xl"
          style={{ background: 'rgba(244,114,182,0.06)', border: '1px solid rgba(244,114,182,0.12)' }}
        >
          <p className="text-white/60 text-sm mb-2">Your brand, featured to 8.4M followers</p>
          <p className="text-white font-black text-lg mb-6">Co-branded content campaigns included in all partnership tiers.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest text-white"
              style={{ background: 'linear-gradient(135deg,#E1306C,#833ab4)' }}>
              <Instagram size={15} /> Partner With Us
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest text-white border border-white/15 hover:bg-white/5 transition-all">
              <Play size={14} fill="white" /> View Media Kit
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// import { motion, AnimatePresence } from 'motion/react';
// import { Instagram, Play, Heart, MessageCircle, Share2 } from 'lucide-react';
// import { useState } from 'react';

// const SOCIAL_POSTS = [
//   {
//     id: 1, type: 'instagram',
//     img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600',
//     label: 'Nickelodeon Universe',
//     tag: '@americandream',
//     likes: '12.4K',
//     caption: 'Biggest indoor theme park in North America 🎡 #AmericanDream #NickelodeonUniverse',
//   },
//   {
//     id: 2, type: 'instagram',
//     img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=600',
//     label: 'DreamWorks Water Park',
//     tag: '@americandream',
//     likes: '9.8K',
//     caption: "America's largest indoor water park 🌊 Open 365 days a year! #WaterPark #DreamWorks",
//   },
//   {
//     id: 3, type: 'tiktok',
//     img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
//     label: 'Big Snow Ski Slope',
//     tag: '@americandreamnj',
//     likes: '34.2K',
//     caption: 'Skiing in New Jersey?! Yes, really ❄️ #BigSnow #IndoorSkiing #NJ',
//   },
//   {
//     id: 4, type: 'instagram',
//     img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=600',
//     label: 'Dining Experience',
//     tag: '@americandream',
//     likes: '7.1K',
//     caption: '100+ restaurants under one roof 🍽️ Fine dining to fast casual #AmericanDream #Dining',
//   },
//   {
//     id: 5, type: 'tiktok',
//     img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600',
//     label: 'Luxury Shopping',
//     tag: '@americandreamnj',
//     likes: '22.7K',
//     caption: 'Hermès, Gucci, LV — all in one place 🛍️ #LuxuryShopping #AmericanDream',
//   },
//   {
//     id: 6, type: 'instagram',
//     img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=600',
//     label: 'Live Events',
//     tag: '@americandream',
//     likes: '41.3K',
//     caption: 'Another sold-out night 🎤 Book your event: americandream.com #LiveEvents #Concert',
//   },
// ];

// const FILTERS = [
//   { icon: Share2,    label: 'All',       color: '#3b82f6' },
//   { icon: Instagram, label: 'Instagram', color: '#E1306C' },
//   { icon: Play,      label: 'TikTok',    color: '#010101' },
// ];

// export default function SocialSection() {
//   const [activeFilter, setActiveFilter] = useState('All');
//   const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

//   const filtered = activeFilter === 'All'
//     ? SOCIAL_POSTS
//     : SOCIAL_POSTS.filter(p =>
//         activeFilter === 'Instagram' ? p.type === 'instagram' : p.type === 'tiktok'
//       );

//   const toggleLike = (id: number) => {
//     setLikedPosts(prev => {
//       const next = new Set(prev);
//       next.has(id) ? next.delete(id) : next.add(id);
//       return next;
//     });
//   };

//   return (
//     <section id="social" className="bg-zinc-950 py-24 px-6 overflow-hidden relative">
//       <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%)' }} />

//       <div className="container mx-auto relative z-10">
//         <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-14 gap-8">
//           <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
//             <p className="text-white/40 uppercase tracking-[0.35em] text-[10px] font-black mb-3">Social Proof</p>
//             <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.88]">
//               The World<br />
//               <span className="italic font-serif" style={{ color: '#60a5fa' }}>Is Watching.</span>
//             </h2>
//             <p className="text-white/40 mt-4 text-sm max-w-sm leading-relaxed">
//               40M+ annual visitors share their experience. This is the organic reach your brand gains by being here.
//             </p>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap gap-3">
//             {FILTERS.map(({ icon: Icon, label, color }) => (
//               <motion.button
//                 key={label}
//                 onClick={() => setActiveFilter(label)}
//                 whileHover={{ scale: 1.05, y: -2 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-2.5 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 border"
//                 style={{
//                   background: activeFilter === label ? `${color}22` : 'rgba(255,255,255,0.05)',
//                   borderColor: activeFilter === label ? color : 'rgba(255,255,255,0.1)',
//                   color: activeFilter === label ? '#fff' : 'rgba(255,255,255,0.5)',
//                 }}
//               >
//                 <Icon size={14} />
//                 {label}
//               </motion.button>
//             ))}
//           </motion.div>
//         </div>

//         <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//           <AnimatePresence mode="popLayout">
//             {filtered.map((post, i) => (
//               <motion.div
//                 key={post.id}
//                 layout
//                 initial={{ opacity: 0, y: 40, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ delay: i * 0.07, duration: 0.4 }}
//                 className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
//                 style={{ border: '1px solid rgba(255,255,255,0.08)' }}
//               >
//                 <img src={post.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={post.label} />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

//                 <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
//                   {post.type === 'instagram'
//                     ? <Instagram size={16} className="text-pink-400" />
//                     : <Play size={16} className="text-white" fill="white" />
//                   }
//                 </div>
//                 <div className="absolute top-4 left-4">
//                   <span className="text-white/60 text-[10px] font-black uppercase tracking-widest bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
//                     {post.tag}
//                   </span>
//                 </div>

//                 <div className="absolute bottom-0 left-0 right-0 p-5">
//                   <p className="text-white font-black text-sm tracking-tight mb-2">{post.label}</p>
//                   <p className="text-white/50 text-xs leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 line-clamp-2">
//                     {post.caption}
//                   </p>
//                   <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-white text-xs font-bold">
//                       <Heart size={14} fill={likedPosts.has(post.id) ? '#ef4444' : 'none'} stroke={likedPosts.has(post.id) ? '#ef4444' : 'white'} />
//                       {post.likes}
//                     </button>
//                     <div className="flex items-center gap-3 text-white/40">
//                       <MessageCircle size={13} />
//                       <Share2 size={13} />
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>

//         <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} className="mt-14 text-center">
//           <p className="text-white/40 text-sm mb-6">Follow us for daily updates, exclusive offers & behind-the-scenes content</p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <a href="https://instagram.com/americandream" target="_blank" rel="noopener noreferrer">
//               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-2.5 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest border border-white/20 text-white hover:bg-white/10 transition-all">
//                 <Instagram size={16} className="text-pink-400" /> Follow on Instagram
//               </motion.button>
//             </a>
//             <a href="https://tiktok.com/@americandreamnj" target="_blank" rel="noopener noreferrer">
//               <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
//                 className="flex items-center gap-2.5 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest border border-white/20 text-white hover:bg-white/10 transition-all">
//                 <Play size={16} fill="white" /> Follow on TikTok
//               </motion.button>
//             </a>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
