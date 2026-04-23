import { motion } from 'motion/react';
import { useState } from 'react';

const STATS = [
  { label: 'Annual Visitors', value: '40M+', icon: '👥', desc: 'More than most global theme parks' },
  { label: 'Square Footage', value: '3M',   icon: '📐', desc: "Western hemisphere's largest" },
  { label: 'Luxury Brands',  value: '450+', icon: '🛍️', desc: 'From flagship to pop-up' },
  { label: 'From NYC',       value: '8 mi', icon: '🗽', desc: '20 min via NJ Transit' },
];

const GEMINI_INSIGHTS = [
  { q: 'Why is American Dream unique?',       emoji: '✦' },
  { q: 'What ROI can retail tenants expect?', emoji: '📈' },
  { q: 'What events have been hosted here?',  emoji: '🎤' },
  { q: 'Who visits American Dream Mall?',     emoji: '👥' },
];

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const CONTEXT = `You are a concise marketing expert for American Dream Mall, NJ. Facts: 3M sq ft, 40M+ visitors/year, 8 miles from NYC, Nickelodeon Universe theme park, DreamWorks Water Park (America's largest indoor), Big Snow ski slope, SEA LIFE Aquarium, IMAX, 450+ brands including Hermès/Gucci/LV. Answer in 2-3 compelling sentences max. Be specific and data-driven.`;

const FALLBACKS: Record<string, string> = {
  'Why is American Dream unique?': "American Dream is the only destination on Earth combining a luxury retail mall, indoor theme park, America's largest indoor waterpark, and year-round indoor ski slope — all within 20 minutes of 20 million people in the NYC metro.",
  'What ROI can retail tenants expect?': 'With 40M+ annual visitors spending an average of $180 per visit and dwell times averaging 4+ hours, tenants at American Dream consistently outperform comparable locations by 2-3x — backed by co-marketing support and a built-in audience that no standalone location can replicate.',
  'What events have been hosted here?': "American Dream has hosted WWE SmackDown, the Nickelodeon Kids' Choice Awards, NY Fashion Week activations, BTS pop-ups, Samsung product launches, and Doja Cat concerts — making it one of the most versatile event venues in the Northeast.",
  'Who visits American Dream Mall?': 'Visitors skew 18-45 with above-average household incomes, drawn from the NYC tri-state area (20M+ people), plus international tourists — delivering a uniquely affluent, diverse, and high-intent consumer audience for retail partners.',
};

// Working YouTube video — American Dream Mall official tour
const MALL_TOUR_URL = 'https://www.youtube.com/embed/TxZdLKVjtQQ?autoplay=1&mute=1&loop=1&playlist=TxZdLKVjtQQ&controls=0&showinfo=0&rel=0&modestbranding=1';

export default function Overview() {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeQ, setActiveQ] = useState('');

  const askGemini = async (question: string) => {
    if (loading) return;
    setActiveQ(question);
    setLoading(true);
    setInsight('');

    if (!GEMINI_KEY) {
      setTimeout(() => {
        setInsight(FALLBACKS[question] || 'American Dream Mall — 3M sq ft of world-class entertainment and retail, just 8 miles from NYC.');
        setLoading(false);
      }, 900);
      return;
    }

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
      const res = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: `${CONTEXT}\n\nQuestion: ${question}`,
      });
      setInsight(res.text || FALLBACKS[question] || '');
    } catch {
      setInsight(FALLBACKS[question] || 'American Dream — where retail meets entertainment at scale.');
    }
    setLoading(false);
  };

  return (
    <section id="overview" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">

        {/* ── Section Label ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-blue-600 uppercase tracking-[0.4em] text-[10px] font-black block mb-4">
            The Scale of Ambition
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 leading-[0.88]">
            More Than a Mall.<br />
            <span className="italic text-blue-600">A Global Icon.</span>
          </h2>
        </motion.div>

        {/* ── Stats Row — full width horizontal ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-20 border border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 flex flex-col items-center text-center group hover:bg-blue-600 transition-all duration-500 cursor-default ${i < 3 ? 'border-r border-zinc-100' : ''}`}
            >
              <span className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{s.icon}</span>
              <span className="text-4xl md:text-5xl font-black text-blue-600 group-hover:text-white tracking-tighter block mb-1 transition-colors duration-300">
                {s.value}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-zinc-900 group-hover:text-white font-black block mb-1 transition-colors duration-300">
                {s.label}
              </span>
              <span className="text-[10px] text-zinc-400 group-hover:text-blue-100 transition-colors duration-300">
                {s.desc}
              </span>
            </motion.div>
          ))}
        </div>

        {/* ── Two column: Text + Video ── */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-zinc-500 text-lg leading-relaxed mb-10 max-w-xl">
              Located just miles from New York City, American Dream represents the next evolution
              of consumer experience — combining world-class retail with record-breaking attractions
              that no other property on Earth can match.
            </p>

            {/* Feature bullets */}
            <div className="space-y-4 mb-10">
              {[
                { icon: '🏙️', text: '8 miles from Midtown Manhattan — 20 min via NJ Transit' },
                { icon: '🎢', text: '6 world-class attractions under one roof' },
                { icon: '💎', text: 'Luxury flagship district — Hermès, Gucci, LV and more' },
                { icon: '🎪', text: '200+ events annually — concerts, activations, launches' },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-4 group">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <span className="text-zinc-600 text-base group-hover:text-zinc-900 transition-colors">{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {}}
              className="px-10 py-4 bg-zinc-900 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              Partner With Us
            </button>
          </motion.div>

          {/* Right — Working YouTube video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100 border border-zinc-100"
            style={{ aspectRatio: '16/10' }}
          >
            <iframe
              src={MALL_TOUR_URL}
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 'none' }}
              title="American Dream Mall Experience"
            />

            {/* Live badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-900">🎬 Live Experience</p>
            </div>

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-zinc-900/80 to-transparent pointer-events-none">
              <p className="text-white text-xs font-black uppercase tracking-wider">American Dream Mall</p>
              <p className="text-white/60 text-xs">East Rutherford, NJ · 3M sq ft</p>
            </div>
          </motion.div>
        </div>

        {/* ── Gemini AI Insight Widget ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden border border-zinc-100 shadow-xl"
        >
          {/* Header */}
          <div className="bg-zinc-950 px-8 py-6 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              ✦
            </div>
            <div>
              <p className="text-white font-black text-base tracking-tight">AI Insights — Powered by Gemini</p>
              <p className="text-white/40 text-xs uppercase tracking-widest">Instant answers about the opportunity</p>
            </div>
            <div className={`ml-auto px-3 py-1 rounded-full border ${GEMINI_KEY ? 'bg-green-500/20 border-green-500/30' : 'bg-yellow-500/20 border-yellow-500/30'}`}>
              <p className={`text-[9px] font-black uppercase tracking-wider ${GEMINI_KEY ? 'text-green-400' : 'text-yellow-400'}`}>
                {GEMINI_KEY ? 'Live AI' : 'Demo Mode'}
              </p>
            </div>
          </div>

          <div className="bg-white p-8">
            {/* Question buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {GEMINI_INSIGHTS.map(item => (
                <button
                  key={item.q}
                  onClick={() => askGemini(item.q)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 border-2 group ${
                    activeQ === item.q
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-zinc-100 hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-sm'
                  }`}
                >
                  <span className="text-2xl block mb-2">{item.emoji}</span>
                  <p className="text-[10px] font-black uppercase tracking-wider text-zinc-600 group-hover:text-blue-700 leading-relaxed">
                    {item.q}
                  </p>
                  {activeQ === item.q && (
                    <div className="mt-2 w-4 h-0.5 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Answer */}
            <div className="min-h-[90px] p-6 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center">
              {loading ? (
                <div className="flex gap-2 items-center w-full">
                  {[0,1,2].map(i => (
                    <motion.span
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-blue-400"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -5, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                  <span className="text-zinc-400 text-sm ml-3 italic">Generating insight...</span>
                </div>
              ) : insight ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-4 w-full"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xs flex-shrink-0 mt-0.5">
                    ✦
                  </div>
                  <p className="text-zinc-700 text-base leading-relaxed font-medium">{insight}</p>
                </motion.div>
              ) : (
                <p className="text-zinc-300 text-sm italic">← Click a question above to get an AI-powered insight</p>
              )}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
