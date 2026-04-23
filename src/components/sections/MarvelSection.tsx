
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { img } from 'motion/react-client';

function MarvelLogo() {
  return (
    <motion.div
      className="relative inline-block overflow-hidden rounded-sm"
      whileHover={{ scale: 1.05 }}
    >
      <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg" className="w-48 md:w-64 h-auto shadow-2xl">
        <defs>
          <linearGradient id="glint" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect width="300" height="80" fill="#ED1D24"/>
        <text x="150" y="62" textAnchor="middle" fontFamily="Arial Black, sans-serif"
          fontSize="72" fontWeight="900" fill="white" letterSpacing="-2" style={{ fontStyle: 'italic' }}>
          MARVEL
        </text>
        <motion.rect
          width="100" height="80" fill="url(#glint)"
          animate={{ x: [-100, 400] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
}

const HERO_CARDS = [
  {
    name: 'Spider-Man',
    color: '#CC0000',
    img: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b/portrait_uncanny.jpg',
    tagline: 'With great power...'
  },
  {
    name: 'Iron Man',
    color: '#D4AF37',
    img: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55/portrait_uncanny.jpg',
    tagline: 'I am Iron Man.'
  },
  {
    name: 'Black Panther',
    color: '#4B0082',
    // img: 'https://i.annihil.us/u/prod/marvel/i/mg/1/c0/537ba2bfd6cf5/portrait_uncanny.jpg',
    img: 'https://www.pixelstalk.net/wp-content/uploads/images6/Black-Panther-HD-Wallpaper-Free-download.jpg',
    tagline: 'Wakanda Forever.'
  },
  {
    name: 'Thor',
    color: '#007FFF',
    img: 'https://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350/portrait_uncanny.jpg',
    tagline: 'The God of Thunder.'
  },
  {
    name: 'Hulk',
    color: '#2E7D32',
    img: 'https://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg',
    tagline: 'Hulk Smash!'
  },
  {
    name: 'Captain America',
    color: '#1565C0',
    img: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087/portrait_uncanny.jpg',
    tagline: 'I can do this all day.'
  },
];

const HeroCard = ({ hero, index }: { hero: typeof HERO_CARDS[0]; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="relative group h-[400px] w-full cursor-pointer"
    >
      <div className="absolute inset-0 bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-red-500/50">
        {/* Real Marvel API image */}
        <img
          src={hero.img}
          alt={hero.name}
          className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
        />

        {/* Halftone comic overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: `radial-gradient(${hero.color} 1px, transparent 0)`,
          backgroundSize: '10px 10px'
        }} />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

        {/* Text */}
        <div className="absolute bottom-0 left-0 p-6 w-full group-hover:-translate-y-2 transition-transform duration-300">
          <p className="text-red-500 font-bold text-xs tracking-widest uppercase mb-1">{hero.tagline}</p>
          <h3 className="text-white text-3xl font-black uppercase tracking-tighter">{hero.name}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default function MarvelSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-[#050505] py-24 selection:bg-red-600 selection:text-white">

      {/* Grid background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(#ffffff05 1px, transparent 1px), linear-gradient(90deg, #ffffff05 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6">

        {/* Header */}
        <motion.div style={{ opacity: titleOpacity }} className="text-center mb-24">
          <MarvelLogo />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="h-1 w-24 bg-red-600 mx-auto my-8"
          />
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-6 leading-none">
            UNLEASH THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 italic">
              MULTIVERSE
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            Step into the largest Marvel retail hub in existence. A cinematic experience where
            the heroes of Earth-616 and beyond come to life.
          </p>
        </motion.div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {HERO_CARDS.map((hero, i) => (
            <HeroCard key={hero.name} hero={hero} index={i} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-32">
          {[
            { n: '12K+', l: 'Rare Collectibles' },
            { n: '50+', l: 'Exclusive Drops' },
            { n: 'LIVE', l: 'Hero Meetups' },
            { n: 'VR', l: 'Stark Tech Lab' },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
              className="bg-zinc-900 border-2 border-zinc-800 p-8 rounded-tr-3xl rounded-bl-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-600/10 rounded-full -mr-8 -mt-8 group-hover:scale-[5] transition-transform duration-700" />
              <p className="text-4xl font-black text-white mb-2">{s.n}</p>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">{s.l}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="flex flex-col items-center justify-center space-y-8">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(237,29,36,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-16 py-6 bg-red-600 text-white text-sm font-black uppercase tracking-[0.3em] rounded-full overflow-hidden transition-all"
          >
            <span className="relative z-10">Get Your Access Pass</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 flex items-center justify-center text-red-600 font-black opacity-0 group-hover:opacity-100 z-20 transition-opacity delay-100">
              AVENGERS ASSEMBLE!
            </span>
          </motion.button>
          <p className="text-zinc-600 text-xs font-bold tracking-widest uppercase">
            Official Stark Industries Partnership
          </p>
        </motion.div>

      </div>

      {/* Comic panel skews */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-blue-600/5 skew-x-12 -translate-x-1/2 pointer-events-none" />
    </section>
  );
}
