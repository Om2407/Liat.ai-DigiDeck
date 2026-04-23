
import { motion } from 'framer-motion';

const LUXURY_BRANDS = [
  { name: 'Hermès',        logo: 'hermes.com' },
  { name: 'Gucci',         logo: 'gucci.com' },
  { name: 'Saint Laurent', logo: 'ysl.com' },
  { name: 'Cartier',       logo: 'cartier.com' },
  { name: 'Dior',          logo: 'dior.com' },
  { name: 'Louis Vuitton', logo: 'louisvuitton.com' },
  { name: 'Chanel',        logo: 'chanel.com' },
  { name: 'Prada',         logo: 'prada.com' },
  { name: 'Balenciaga',    logo: 'balenciaga.com' },
  { name: 'Valentino',     logo: 'valentino.com' },
  { name: 'Burberry',      logo: 'burberry.com' },
  { name: 'Fendi',         logo: 'fendi.com' },
];

const LIFESTYLE_BRANDS = [
  { name: 'Apple',     logo: 'apple.com' },
  { name: 'Nike',      logo: 'nike.com' },
  { name: 'Sephora',   logo: 'sephora.com' },
  { name: 'Samsung',   logo: 'samsung.com' },
  { name: 'Uniqlo',    logo: 'uniqlo.com' },
  { name: 'Zara',      logo: 'zara.com' },
  { name: 'Lululemon', logo: 'lululemon.com' },
  { name: 'Adidas',    logo: 'adidas.com' },
  { name: 'Aritzia',   logo: 'aritzia.com' },
  { name: 'H&M',       logo: 'hm.com' },
  { name: 'MAC',       logo: 'maccosmetics.com' },
  { name: 'Old Navy',  logo: 'oldnavy.com' },
];

const TOKEN = 'pk_X0ANQ1MVQyahqiKBPz32Jg';

const LogoOrb = ({ brand }: { brand: { name: string; logo: string } }) => (
  <div className="group flex-shrink-0 flex flex-col items-center gap-4 cursor-pointer">
    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center p-5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]">
      <img
        src={`https://img.logo.dev/${brand.logo}?token=${TOKEN}&size=128`}
        alt={brand.name}
        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=1a1a1a&color=ffffff&size=128&bold=true`;
        }}
      />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 group-hover:text-white transition-colors whitespace-nowrap">
      {brand.name}
    </span>
  </div>
);

const InfiniteRow = ({ brands, reverse = false }: { brands: { name: string; logo: string }[]; reverse?: boolean }) => {
  const doubled = [...brands, ...brands];
  return (
    <div className="flex overflow-hidden py-6 select-none">
      <motion.div
        initial={{ x: reverse ? '-50%' : '0%' }}
        animate={{ x: reverse ? '0%' : '-50%' }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="flex gap-10 items-center px-5"
      >
        {doubled.map((brand, idx) => (
          <LogoOrb key={`${brand.name}-${idx}`} brand={brand} />
        ))}
      </motion.div>
    </div>
  );
};

export default function BrandLogoStrip() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#050505]">
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 text-center mb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-6 bg-zinc-800/50 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md"
        >
          <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">Explore Retail</span>
        </motion.div>

        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
          WORLD-CLASS <br />
          <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500">
            EXPERIENCES
          </span>
        </h2>

        {/* The Avenue branding */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <div className="h-px w-12 bg-zinc-700" />
          <div className="flex flex-col items-center">
            <span className="text-white text-2xl font-light tracking-[0.3em] uppercase">The</span>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-white" strokeWidth="5">
                <path d="M10 90 L50 10 L90 90 M28 65 L72 65" />
              </svg>
              <span className="text-white text-3xl font-bold tracking-[0.15em] uppercase">Avenue</span>
            </div>
          </div>
          <div className="h-px w-12 bg-zinc-700" />
        </div>
      </div>

      {/* Marquee rows */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-[#050505] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-[#050505] to-transparent" />

        <InfiniteRow brands={LUXURY_BRANDS} />
        <InfiniteRow brands={LIFESTYLE_BRANDS} reverse />
      </div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]"
      >
        Over 450 Flagship Stores & Exclusive Retailers
      </motion.p>
    </section>
  );
}
// import { motion } from 'framer-motion';

// const LUXURY_BRANDS = [
//   { name: 'Hermès', logo: 'hermes.com' },
//   { name: 'Gucci', logo: 'gucci.com' },
//   { name: 'Saint Laurent', logo: 'ysl.com' },
//   { name: 'Cartier', logo: 'cartier.com' },
//   { name: 'Dior', logo: 'dior.com' },
//   { name: 'Louis Vuitton', logo: 'louisvuitton.com' },
//   { name: 'Chanel', logo: 'chanel.com' },
//   { name: 'Prada', logo: 'prada.com' },
//   { name: 'Balenciaga', logo: 'balenciaga.com' },
//   { name: 'Valentino', logo: 'valentino.com' },
//   { name: 'Burberry', logo: 'burberry.com' },
//   { name: 'Fendi', logo: 'fendi.com' },
// ];

// const LIFESTYLE_BRANDS = [
//   { name: 'Apple', logo: 'apple.com' },
//   { name: 'Nike', logo: 'nike.com' },
//   { name: 'Sephora', logo: 'sephora.com' },
//   { name: 'Samsung', logo: 'samsung.com' },
//   { name: 'Uniqlo', logo: 'uniqlo.com' },
//   { name: 'Zara', logo: 'zara.com' },
//   { name: 'Lululemon', logo: 'lululemon.com' },
//   { name: 'Adidas', logo: 'adidas.com' },
//   { name: 'Aritzia', logo: 'aritzia.com' },
//   { name: 'H&M', logo: 'hm.com' },
//   { name: 'MAC', logo: 'maccosmetics.com' },
//   { name: 'Old Navy', logo: 'oldnavy.com' },
// ];

// const LogoOrb = ({ brand }) => (
//   <div className="group flex-shrink-0 flex flex-col items-center gap-4 cursor-pointer">
//     <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center p-5 shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)]">
//       <img
//         src={`https://logo.clearbit.com/${brand.logo}`}
//         alt={brand.name}
//         className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
//         onError={(e) => {
//           e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(brand.name)}&background=1a1a1a&color=ffffff&size=128&bold=true`;
//         }}
//       />
//     </div>
//     <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 group-hover:text-white transition-colors whitespace-nowrap">
//       {brand.name}
//     </span>
//   </div>
// );

// const InfiniteRow = ({ brands, reverse = false }) => {
//   const doubled = [...brands, ...brands];
//   return (
//     <div className="flex overflow-hidden py-6 select-none">
//       <motion.div
//         initial={{ x: reverse ? '-50%' : '0%' }}
//         animate={{ x: reverse ? '0%' : '-50%' }}
//         transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
//         className="flex gap-10 items-center px-5"
//         whileHover={{ animationPlayState: 'paused' }}
//       >
//         {doubled.map((brand, idx) => (
//           <LogoOrb key={`${brand.name}-${idx}`} brand={brand} />
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default function BrandLogoStrip() {
//   return (
//     <section className="relative py-24 overflow-hidden bg-[#050505]">
//       {/* Dot texture */}
//       <div
//         className="absolute inset-0 opacity-[0.07] pointer-events-none"
//         style={{
//           backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
//           backgroundSize: '24px 24px',
//         }}
//       />

//       {/* Header */}
//       <div className="relative z-10 text-center mb-16 px-6">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="inline-block mb-6 bg-zinc-800/50 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md"
//         >
//           <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">Explore Retail</span>
//         </motion.div>

//         <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
//           WORLD-CLASS <br />
//           <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-zinc-200 to-zinc-500">
//             EXPERIENCES
//           </span>
//         </h2>

//         {/* The Avenue branding */}
//         <div className="flex items-center justify-center gap-6 mt-6">
//           <div className="h-px w-12 bg-zinc-700" />
//           <div className="flex flex-col items-center">
//             <span className="text-white text-2xl font-light tracking-[0.3em] uppercase">The</span>
//             <div className="flex items-center gap-2">
//               <svg viewBox="0 0 100 100" className="w-7 h-7 fill-none stroke-white" strokeWidth="5">
//                 <path d="M10 90 L50 10 L90 90 M28 65 L72 65" />
//               </svg>
//               <span className="text-white text-3xl font-bold tracking-[0.15em] uppercase">Avenue</span>
//             </div>
//           </div>
//           <div className="h-px w-12 bg-zinc-700" />
//         </div>
//       </div>

//       {/* Marquee rows */}
//       <div className="relative">
//         <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-[#050505] to-transparent" />
//         <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-[#050505] to-transparent" />

//         <InfiniteRow brands={LUXURY_BRANDS} />
//         <InfiniteRow brands={LIFESTYLE_BRANDS} reverse />
//       </div>

//       {/* Footer text */}
//       <motion.p
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ delay: 0.4 }}
//         className="mt-16 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]"
//       >
//         Over 450 Flagship Stores & Exclusive Retailers
//       </motion.p>
//     </section>
//   );
// }
// // import { motion } from 'motion/react';

// // interface Brand { name: string; letter: string; color: string; }

// // const ROW1: Brand[] = [
// //   { name: 'Hermès',        letter: 'H',   color: '#de7a31' },
// //   { name: 'Gucci',         letter: 'G',   color: '#006633' },
// //   { name: 'Saint Laurent', letter: 'YSL', color: '#1a1a1a' },
// //   { name: 'Cartier',       letter: 'C',   color: '#CC0000' },
// //   { name: 'Dior',          letter: 'D',   color: '#2d2d2d' },
// //   { name: 'Louis Vuitton', letter: 'LV',  color: '#211205' },
// //   { name: 'Chanel',        letter: '✦',   color: '#000000' },
// //   { name: 'Balenciaga',    letter: 'B',   color: '#0a0a0a' },
// //   { name: 'Prada',         letter: 'P',   color: '#333333' },
// //   { name: 'Valentino',     letter: 'V',   color: '#cc0000' },
// // ];

// // const ROW2: Brand[] = [
// //   { name: 'Apple',     letter: '🍎', color: '#555' },
// //   { name: 'Nike',      letter: '✓',  color: '#111' },
// //   { name: 'Sephora',   letter: 'S',  color: '#000' },
// //   { name: 'Samsung',   letter: 'S',  color: '#1428a0' },
// //   { name: 'Uniqlo',    letter: 'U',  color: '#e60012' },
// //   { name: 'Lululemon', letter: 'L',  color: '#000' },
// //   { name: 'Zara',      letter: 'Z',  color: '#000' },
// //   { name: 'H&M',       letter: 'H',  color: '#e50010' },
// //   { name: 'Adidas',    letter: 'A',  color: '#000' },
// //   { name: 'MAC',       letter: 'M',  color: '#1a1a1a' },
// // ];

// // function LogoCircle({ brand }: { brand: Brand }) {
// //   return (
// //     <motion.div
// //       whileHover={{ scale: 1.15, y: -6 }}
// //       transition={{ duration: 0.2 }}
// //       className="flex-shrink-0 flex flex-col items-center gap-2.5 cursor-pointer"
// //     >
// //       <motion.div
// //         animate={{ rotate: [0, 360] }}
// //         transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
// //         className="relative"
// //       >
// //         {/* Outer orbit ring */}
// //         <div className="absolute inset-0 rounded-full border border-dashed opacity-20"
// //           style={{ borderColor: brand.color, margin: '-4px' }} />
// //         {/* Main circle */}
// //         <div
// //           className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black shadow-lg"
// //           style={{
// //             background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.2), ${brand.color})`,
// //             fontSize: brand.letter.length > 2 ? '0.5rem' : brand.letter.startsWith('🍎') ? '1.2rem' : '0.85rem',
// //           }}
// //         >
// //           {brand.letter}
// //         </div>
// //       </motion.div>
// //       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 whitespace-nowrap">
// //         {brand.name}
// //       </span>
// //     </motion.div>
// //   );
// // }

// // function InfiniteRow({ brands, direction = 1, speed = 35 }: { brands: Brand[]; direction?: number; speed?: number }) {
// //   const doubled = [...brands, ...brands, ...brands];
// //   return (
// //     <div className="overflow-hidden relative">
// //       <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
// //         style={{ background: 'linear-gradient(to right, white, transparent)' }} />
// //       <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
// //         style={{ background: 'linear-gradient(to left, white, transparent)' }} />
// //       <motion.div
// //         className="flex items-center gap-10 py-4 px-5"
// //         animate={{ x: direction > 0 ? ['0%', '-33.33%'] : ['-33.33%', '0%'] }}
// //         transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
// //       >
// //         {doubled.map((b, i) => <LogoCircle key={`${b.name}-${i}`} brand={b} />)}
// //       </motion.div>
// //     </div>
// //   );
// // }

// // export default function BrandLogoStrip() {
// //   return (
// //     <section className="py-20 bg-white overflow-hidden border-y border-zinc-100">
// //       <div className="text-center mb-12 px-6">
// //         <span className="text-blue-600 uppercase tracking-[0.4em] text-[10px] font-black block mb-3">
// //           450+ Brands
// //         </span>
// //         <h2 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tighter mb-3">
// //           The World's Best.<br />
// //           <span className="text-blue-600">All Under One Roof.</span>
// //         </h2>
// //         <p className="text-zinc-400 text-base max-w-lg mx-auto">
// //           From ultra-luxury flagships to everyday essentials — American Dream defines what retail looks like next.
// //         </p>
// //       </div>
// //       <div className="flex flex-col gap-10">
// //         <InfiniteRow brands={ROW1} direction={1}  speed={38} />
// //         <InfiniteRow brands={ROW2} direction={-1} speed={32} />
// //       </div>
// //     </section>
// //   );
// // }
