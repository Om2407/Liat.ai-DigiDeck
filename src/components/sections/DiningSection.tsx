// import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const RESTAURANTS = [
  { name: 'Around The Clock', cuisine: 'All-Day American',    query: 'american diner food restaurant' },
  { name: 'Carpaccio',        cuisine: 'Italian Fine Dining', query: 'italian pasta fine dining restaurant' },
  { name: 'House of Que',     cuisine: 'BBQ & Southern',      query: 'bbq ribs southern food restaurant' },
  { name: 'Jarana',           cuisine: 'Mexican Street Food', query: 'mexican tacos street food colorful' },
  { name: 'Sushi Neko',       cuisine: 'Japanese Omakase',    query: 'sushi omakase japanese restaurant' },
  { name: 'The Rooftop',      cuisine: 'Sky Bar & Tapas',     query: 'rooftop bar cocktails city view' },
  { name: 'Shake Shack',      cuisine: 'Premium Burgers',     query: 'gourmet burger shake shack food' },
  { name: 'Sugar Factory',    cuisine: 'Desserts & Drinks',   query: 'dessert colorful candy sweet shop' },
];

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY || '';

interface RestaurantWithImage {
  name: string;
  cuisine: string;
  query: string;
  imgUrl: string | null;
}

export default function DiningSection() {
  const [items, setItems] = useState<RestaurantWithImage[]>(
    RESTAURANTS.map(r => ({ ...r, imgUrl: null }))
  );

  useEffect(() => {
    // Fetch images from Pexels for each restaurant
    const fetchImages = async () => {
      const updated = await Promise.all(
        RESTAURANTS.map(async (r) => {
          try {
            const res = await fetch(
              `https://api.pexels.com/v1/search?query=${encodeURIComponent(r.query)}&per_page=1&orientation=portrait`,
              { headers: { Authorization: PEXELS_API_KEY } }
            );
            const data = await res.json();
            const url = data?.photos?.[0]?.src?.large || null;
            return { ...r, imgUrl: url };
          } catch {
            return { ...r, imgUrl: null };
          }
        })
      );
      setItems(updated);
    };
    fetchImages();
  }, []);

  const FALLBACK_COLORS = [
    'from-amber-400 to-orange-500',
    'from-red-400 to-pink-500',
    'from-orange-600 to-red-600',
    'from-yellow-400 to-green-500',
    'from-indigo-400 to-purple-500',
    'from-sky-400 to-blue-600',
    'from-green-400 to-emerald-600',
    'from-pink-400 to-rose-500',
  ];

  const FALLBACK_EMOJI = ['🕐', '🍝', '🍖', '🌮', '🍣', '🥂', '🍔', '🍭'];

  return (
    <section id="dining" className="py-24 bg-white border-t border-zinc-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-blue-600 uppercase tracking-[0.4em] text-[10px] font-black block mb-3">
            100+ Restaurants & Eateries
          </span>
          <h2 className="section-title">Great Eats For All</h2>
          <p className="section-subtitle">
            From Michelin-caliber cuisine to quick and delicious bites — dining at American Dream is a destination in itself.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -4 }}
              className="rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="aspect-[4/5] relative">
                {item.imgUrl ? (
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${FALLBACK_COLORS[i]} flex items-center justify-center`}>
                    <motion.span
                      className="text-6xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3 + i * 0.3, repeat: Infinity }}
                    >
                      {FALLBACK_EMOJI[i]}
                    </motion.span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-black text-base leading-tight">{item.name}</h3>
                  <p className="text-white/70 text-[10px] uppercase tracking-widest mt-0.5 font-bold">{item.cuisine}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 border-2 border-zinc-900 font-black text-xs uppercase tracking-widest rounded-full hover:bg-zinc-900 hover:text-white transition-all duration-300">
            Explore All Dining
          </button>
        </div>
      </div>
    </section>
  );
}