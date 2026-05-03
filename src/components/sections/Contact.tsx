
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import jsPDF from 'jspdf';

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

const PITCH_CATEGORIES = [
  'Luxury Retail',
  'Tech Retail',
  'F&B / Restaurant',
  'Pop-up / Activation',
  'Corporate Sponsor',
  'Event Producer',
  'Entertainment Brand',
];

function getFallbackPitch(brand: string, category: string): string {
  const zone = category.includes('Luxury')
    ? 'The Avenue luxury corridor'
    : category.includes('Tech')
    ? 'tech innovation corridor'
    : category.includes('F&B')
    ? 'world-class dining district'
    : category.includes('Event')
    ? '5,000-seat Performing Arts Center'
    : 'premium activation zone';

  return `${brand} operates at the intersection of culture and commerce — exactly where American Dream lives. With 40M+ annual visitors and a location just 8 miles from Midtown Manhattan, we deliver an audience no standalone destination can match: affluent, high-intent, and deeply engaged. The NYC tri-state area's 20 million residents, combined with millions of international tourists, make American Dream the single most powerful platform for ${category.toLowerCase()} brands in the Northeast.

For ${brand}, we envision a flagship presence inside our ${zone} — a space designed for brands that refuse to be ordinary. With dwell times averaging 4+ hours and per-visit spend of $180+, your activation reaches consumers who are already in a buying mindset. Our 200+ annual events create built-in co-marketing moments — from product launches to celebrity appearances — that no traditional mall can offer.

We have a limited number of prime positions opening for Q1 and are actively curating the right partners. ${brand} is exactly the caliber we want in this space. Let's schedule a private walkthrough — I'm confident you'll see why this is unlike any retail opportunity available today.`;
}

async function generatePitch(brandName: string, category: string): Promise<string> {
  if (!GEMINI_KEY) return getFallbackPitch(brandName, category);

  const prompt = `You are a senior leasing & partnerships director at American Dream Mall — the Western Hemisphere's largest entertainment & retail destination (3M sq ft, 40M+ annual visitors, 8 miles from NYC, NJ).

Write a compelling, personalized 3-paragraph sales pitch for "${brandName}" (category: ${category}) on why they should open/partner at American Dream Mall.

Paragraph 1: Why American Dream is the perfect platform for this specific brand — reference 40M+ visitors, NYC proximity, affluent tri-state demographic, average $180 spend per visit.
Paragraph 2: The specific opportunity for this brand — name the relevant zone (The Avenue for luxury, tech corridor for tech, dining district for F&B, Expo Center/Arena for events/sponsors), co-marketing upside, foot traffic numbers, 4+ hour dwell time.
Paragraph 3: Urgency + exclusivity + clear next step CTA.

Tone: confident, premium, specific. Exactly 3 paragraphs. No bullet points. No headers.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 700, temperature: 0.85 },
        }),
      }
    );
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || getFallbackPitch(brandName, category);
  } catch {
    return getFallbackPitch(brandName, category);
  }
}

export type AudienceType = 'all' | 'tenant' | 'sponsor' | 'event';

const generateProposal = (audience: AudienceType, brandName: string) => {
  const doc = new jsPDF();
  const pageW = doc.internal.pageSize.getWidth();
  
  // Background — dark
  doc.setFillColor(5, 5, 5);
  doc.rect(0, 0, pageW, 297, 'F');

  // Header bar
  doc.setFillColor(20, 20, 30);
  doc.rect(0, 0, pageW, 40, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('AMERICAN DREAM', 15, 18);
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 180);
  doc.text('PARTNERSHIP PROPOSAL', 15, 26);
  doc.text(`Prepared for: ${brandName || 'Your Brand'}`, 15, 34);

  // Date
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 120);
  doc.text(new Date().toLocaleDateString('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  }), pageW - 15, 34, { align: 'right' });

  // Audience-aware content
  const content: Record<AudienceType, {
    title: string;
    color: [number, number, number];
    sections: { heading: string; body: string }[];
  }> = {
    all: {
      title: 'FULL OVERVIEW PARTNERSHIP',
      color: [96, 165, 250],
      sections: [
        { heading: 'WHY AMERICAN DREAM', body: 'The Western Hemisphere\'s largest entertainment and retail destination. 40M+ annual visitors. 3M sq ft. 8 miles from NYC.' },
        { heading: 'THE OPPORTUNITY', body: 'A platform unlike any other — combining retail, entertainment, dining, and events under one roof with an affluent tri-state audience.' },
        { heading: 'KEY METRICS', body: '40M+ Annual Visitors · $180 Avg Per-Visit Spend · 4+ Hour Avg Dwell Time · $95K Average Household Income' },
        { heading: 'NEXT STEPS', body: 'Schedule a private walkthrough. Our team will prepare a custom proposal tailored to your brand objectives and timeline.' },
      ]
    },
    tenant: {
      title: 'RETAIL LEASING PROPOSAL',
      color: [245, 158, 11],
      sections: [
        { heading: 'THE RETAIL PLATFORM', body: 'Join Hermès, Gucci, Apple, and 450+ brands on the world\'s most powerful retail stage. Our visitors are high-intent buyers with $95K+ average household income.' },
        { heading: 'YOUR SPACE', body: 'Premium locations available across The Avenue (luxury), Entertainment District, and F&B corridor. Spaces from 500 to 50,000+ sq ft.' },
        { heading: 'REVENUE POTENTIAL', body: '$180 avg per-visit spend · 4+ hour dwell time · 40M annual footfall · 2-3x revenue vs comparable retail locations.' },
        { heading: 'LEASING TERMS', body: 'Flexible lease structures available. Revenue share models for emerging brands. Custom buildout packages for flagship concepts.' },
      ]
    },
    sponsor: {
      title: 'BRAND SPONSORSHIP PROPOSAL',
      color: [139, 92, 246],
      sections: [
        { heading: 'THE SPONSORSHIP PLATFORM', body: '5 world-record venues. 40M+ annual visitors. 120M monthly impressions across digital and physical touchpoints.' },
        { heading: 'PARTNERSHIP TIERS', body: 'Presenting Partner ($2M+): Naming rights, year-round LED billboard, VIP access.\nActivation Partner ($500K-$2M): Brand activation zone, digital screen network.\nEvent Sponsor ($100K-$500K): Single event naming rights, on-site activation.' },
        { heading: 'AUDIENCE PROFILE', body: '$95K avg household income · Gen-Z & Millennial core · 20M tri-state area residents · International tourist traffic.' },
        { heading: 'NEXT STEPS', body: 'Limited premium positions available for Q1. Schedule a partnership consultation to discuss custom activation concepts.' },
      ]
    },
    event: {
      title: 'EVENT PARTNERSHIP PROPOSAL',
      color: [16, 185, 129],
      sections: [
        { heading: 'THE EVENT PLATFORM', body: '5,000-seat Performing Arts Center. 300,000 sq ft Exposition Center. Indoor ski resort. Water park. All available for private events and corporate buyouts.' },
        { heading: 'EVENT CAPABILITIES', body: 'Concerts & award shows · Corporate conventions · Product launches · Trade shows · Private buyouts · Themed experiences.' },
        { heading: 'KEY STATS', body: '200+ events per year · 5M event visitors annually · 30,000 parking spaces · 20 min from NYC · Open 365 days.' },
        { heading: 'NEXT STEPS', body: 'Contact our events team for availability and custom packages. Turnkey production support available for all event types.' },
      ]
    }
  };

  const selected = content[audience];
  const [r, g, b] = selected.color;

  // Colored accent line
  doc.setFillColor(r, g, b);
  doc.rect(0, 40, pageW, 3, 'F');

  // Proposal type
  doc.setFontSize(14);
  doc.setTextColor(r, g, b);
  doc.setFont('helvetica', 'bold');
  doc.text(selected.title, 15, 58);

  // Divider
  doc.setDrawColor(40, 40, 60);
  doc.setLineWidth(0.5);
  doc.line(15, 63, pageW - 15, 63);

  // Sections
  let y = 75;
  selected.sections.forEach((section) => {
    // Section heading
    doc.setFontSize(10);
    doc.setTextColor(r, g, b);
    doc.setFont('helvetica', 'bold');
    doc.text(section.heading, 15, y);
    y += 7;

    // Section body
    doc.setFontSize(9);
    doc.setTextColor(200, 200, 210);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(section.body, pageW - 30);
    doc.text(lines, 15, y);
    y += lines.length * 5.5 + 12;

    // Section divider
    doc.setDrawColor(30, 30, 45);
    doc.line(15, y - 6, pageW - 15, y - 6);
  });

  // Footer
  doc.setFillColor(15, 15, 25);
  doc.rect(0, 272, pageW, 25, 'F');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 120);
  doc.text('1 American Dream Way, East Rutherford, NJ 07073', 15, 282);
  doc.text('leasing@americandream.com · +1 (833) 263-7326', 15, 288);
  doc.setTextColor(r, g, b);
  doc.text('americandream.com', pageW - 15, 285, { align: 'right' });

  // Save
  const filename = `AmericanDream_${selected.title.replace(/\s+/g, '_')}_${brandName || 'Proposal'}.pdf`;
  doc.save(filename);
};

export default function Contact({ currentAudience = 'all' }: { currentAudience?: AudienceType }) {
  const [brandName, setBrandName] = useState('');
  const [category, setCategory] = useState('');
  const [pitch, setPitch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);

  const handleBuild = async () => {
    if (!brandName.trim() || !category || loading) return;
    setLoading(true);
    setPitch('');
    const result = await generatePitch(brandName.trim(), category);
    setPitch(result);
    setLoading(false);
  };

  return (
    <section id="contact" className="min-h-screen py-24 flex items-center justify-center bg-zinc-950">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading */}
          <div className="text-center mb-16">
            <span className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black block mb-6">
              Partner With Us
            </span>
            <h2 className="text-5xl md:text-8xl mb-10 font-black tracking-tighter text-white leading-[0.85]">
              The Future<br />
              <span style={{
                background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Awaits.
              </span>
            </h2>
            <p className="text-white/50 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
              Whether you are looking to secure a flagship location, activate a sponsorship, or
              stage your next global event — American Dream is the ultimate platform for your brand.
            </p>

            <div className="flex flex-col md:flex-row gap-5 justify-center mb-10">
              <a
                href="mailto:leasing@americandream.com"
                className="px-16 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-blue-500 transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-900/30"
              >
                Leasing Inquiry
              </a>
              <button className="px-16 py-5 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white/5 transition-all duration-300">
                Event Booking
              </button>
              <button className="px-16 py-5 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white/5 transition-all duration-300">
                Sponsorship
              </button>
            </div>

            <motion.button
              onClick={() => generateProposal(currentAudience, brandName)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-16 py-5 font-black uppercase tracking-[0.2em] text-[11px] rounded-full transition-all duration-300 flex items-center gap-3 mx-auto mb-16"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#000',
                boxShadow: '0 8px 30px rgba(245,158,11,0.3)',
              }}
            >
              ✦ Generate Proposal PDF
            </motion.button>
          </div>

          {/* ── BUILD MY PITCH ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl overflow-hidden mb-16"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Panel header — clickable */}
            <div
              className="px-8 py-6 flex items-center justify-between cursor-pointer select-none"
              style={{
                background: 'rgba(37,99,235,0.1)',
                borderBottom: showBuilder ? '1px solid rgba(59,130,246,0.15)' : 'none',
              }}
              onClick={() => setShowBuilder(b => !b)}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}
                >
                  ✦
                </div>
                <div>
                  <p className="text-white font-black text-base tracking-tight">Build My Pitch</p>
                  <p className="text-blue-400 text-[10px] uppercase tracking-widest font-bold">
                    AI-Generated · Powered by Gemini
                  </p>
                </div>
              </div>
              <motion.span
                animate={{ rotate: showBuilder ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-white/30 text-lg"
              >
                ↓
              </motion.span>
            </div>

            {/* Collapsible body */}
            <AnimatePresence initial={false}>
              {showBuilder && (
                <motion.div
                  key="pitch-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="p-8">
                    <p className="text-white/45 text-sm mb-8 max-w-lg leading-relaxed">
                      Enter your brand name and category — Gemini will craft a personalized 3-paragraph pitch
                      explaining exactly why <span className="text-white/70 font-semibold">your brand</span> belongs at American Dream.
                    </p>

                    {/* Inputs */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="brand-name" className="text-white/50 text-[9px] uppercase tracking-widest font-black block mb-2">
                          Brand / Company Name
                        </label>
                        <input
                          id="brand-name"
                          value={brandName}
                          onChange={e => setBrandName(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleBuild()}
                          placeholder="e.g. Nike, Rolex, Nobu..."
                          aria-label="Brand or company name"
                          className="w-full px-5 py-4 rounded-2xl text-white text-sm placeholder-white/15 outline-none transition-all"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                        />
                      </div>
                      <div>
                        <label htmlFor="pitch-category" className="text-white/50 text-[9px] uppercase tracking-widest font-black block mb-2">
                          Category
                        </label>
                        <select
                          id="pitch-category"
                          value={category}
                          onChange={e => setCategory(e.target.value)}
                          aria-label="Select your business category"
                          className="w-full px-5 py-4 rounded-2xl text-white text-sm outline-none appearance-none cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
                        >
                          <option value="" style={{ background: '#0a0a0a' }}>Select a category...</option>
                          {PITCH_CATEGORIES.map(c => (
                            <option key={c} value={c} style={{ background: '#0a0a0a' }}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleBuild}
                      disabled={!brandName.trim() || !category || loading}
                      className="px-10 py-4 font-black uppercase tracking-[0.2em] text-xs rounded-full transition-all duration-300 disabled:opacity-25 hover:opacity-90"
                      style={{
                        background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
                        color: 'white',
                        boxShadow: '0 8px 30px rgba(37,99,235,0.35)',
                      }}
                    >
                      {loading ? '✦  Generating Pitch...' : '✦  Generate My Pitch'}
                    </button>

                    {/* Output */}
                    <AnimatePresence>
                      {(loading || pitch) && (
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45 }}
                          className="mt-8 p-7 rounded-2xl"
                          style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(59,130,246,0.18)' }}
                        >
                          {loading ? (
                            <div className="flex items-center gap-4">
                              <div className="flex gap-1.5">
                                {[0, 0.14, 0.28].map((delay, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-blue-400"
                                    animate={{ y: [0, -7, 0] }}
                                    transition={{ duration: 0.75, repeat: Infinity, delay }}
                                  />
                                ))}
                              </div>
                              <p className="text-blue-300/70 text-sm">Crafting your personalized pitch...</p>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-center gap-2 mb-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                <p className="text-blue-400 text-[10px] uppercase tracking-widest font-black">
                                  Custom Pitch — {brandName} · {category}
                                </p>
                              </div>
                              <div className="space-y-5">
                                {pitch
                                  .split('\n\n')
                                  .filter(p => p.trim())
                                  .map((para, i) => (
                                    <p key={i} className="text-white/70 text-sm leading-relaxed">
                                      {para}
                                    </p>
                                  ))}
                              </div>
                              <div className="mt-7 pt-5 flex flex-wrap gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <a
                                  href={`mailto:leasing@americandream.com?subject=Partnership Inquiry — ${brandName}&body=${encodeURIComponent(pitch)}`}
                                  className="px-6 py-2.5 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-blue-500 transition-colors"
                                >
                                  Send to Leasing Team →
                                </a>
                                <button
                                  onClick={() => { setPitch(''); setBrandName(''); setCategory(''); }}
                                  className="px-6 py-2.5 font-black uppercase tracking-widest text-[10px] rounded-full hover:text-white/80 transition-colors text-white/35"
                                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                                >
                                  Start Over
                                </button>
                              </div>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-left" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/25 mb-3">Location</div>
              <div className="text-sm text-white/60 leading-relaxed">
                1 American Dream Way<br />East Rutherford, NJ 07073
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/25 mb-3">Phone</div>
              <div className="text-sm text-white/60">+1 (833) 263-7326</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/25 mb-3">Email</div>
              <div className="text-sm text-blue-400">leasing@americandream.com</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/25 mb-3">Follow</div>
              <div className="text-sm text-white/60">@americandream</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
// import { motion, AnimatePresence } from 'motion/react';
// import { useState } from 'react';

// const PITCH_CATEGORIES = ['Luxury Retail', 'Tech Retail', 'F&B / Restaurant', 'Pop-up / Activation', 'Corporate Sponsor', 'Event Producer', 'Entertainment Brand'];

// async function generatePitch(brandName: string, category: string): Promise<string> {
//   const prompt = `You are a senior leasing & partnerships director at American Dream Mall, the Western Hemisphere's largest entertainment & retail destination (3M sq ft, 40M+ annual visitors, 8 miles from NYC).

// Write a compelling, personalized 3-paragraph sales pitch specifically for "${brandName}" (category: ${category}) explaining why they should partner with American Dream Mall. 

// Paragraph 1: Why American Dream is the perfect platform for this specific brand/category — reference the 40M+ visitors, NYC proximity, affluent tri-state demographic.
// Paragraph 2: Specific opportunity for this brand — mention relevant sections (The Avenue for luxury, tech corridor for tech brands, F&B district for restaurants, Expo Center/Arena for events, etc.), co-marketing potential, and foot traffic numbers.
// Paragraph 3: Call to action — urgency, exclusivity, next step.

// Keep it confident, specific, and premium. 3 paragraphs only. No bullet points.`;

//   try {
//     const response = await fetch('https://api.anthropic.com/v1/messages', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'anthropic-dangerous-direct-browser-access': 'true',
//       },
//       body: JSON.stringify({
//         model: 'claude-sonnet-4-20250514',
//         max_tokens: 1000,
//         messages: [{ role: 'user', content: prompt }],
//       }),
//     });
//     const data = await response.json();
//     return data?.content?.[0]?.text || getFallbackPitch(brandName, category);
//   } catch {
//     return getFallbackPitch(brandName, category);
//   }
// }

// function getFallbackPitch(brand: string, category: string): string {
//   return `${brand} stands at the intersection of culture and commerce — exactly where American Dream lives. With 40M+ annual visitors and a prime location just 8 miles from Midtown Manhattan, we deliver an audience no standalone location can match: affluent, high-intent, and deeply engaged. The tri-state area's 20 million residents and millions of international tourists make American Dream the most powerful platform for ${category.toLowerCase()} brands in the Northeast.

// For ${brand}, we envision a flagship presence that goes beyond traditional retail. Whether that's an immersive brand experience in our dedicated ${category.includes('Luxury') ? 'Avenue luxury corridor' : category.includes('Tech') ? 'tech innovation corridor' : category.includes('F&B') ? 'world-class dining district' : 'premium event space'}, a co-branded activation during one of our 200+ annual events, or a pop-up that reaches 40 million shoppers — we have the platform, the foot traffic, and the production capability to make it extraordinary. Dwell times average 4+ hours, and our visitors spend an average of $180 per visit.

// We have a limited number of prime locations available for Q1 opening, and we are actively prioritizing brands that align with our vision for the future of American Dream. ${brand} is exactly the kind of partner we want in this space. Let's schedule a private tour and walk you through the specific opportunity we have in mind — I believe you'll see why this is unlike anything else in retail today.`;
// }

// export default function Contact() {
//   const [brandName, setBrandName] = useState('');
//   const [category, setCategory] = useState('');
//   const [pitch, setPitch] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showBuilder, setShowBuilder] = useState(false);

//   const handleBuild = async () => {
//     if (!brandName.trim() || !category || loading) return;
//     setLoading(true);
//     setPitch('');
//     const result = await generatePitch(brandName.trim(), category);
//     setPitch(result);
//     setLoading(false);
//   };

//   return (
//     <section id="contact" className="min-h-screen py-24 flex items-center justify-center bg-zinc-950">
//       <div className="container mx-auto px-6 max-w-5xl">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="text-center mb-16">
//             <span className="text-blue-400 uppercase tracking-[0.4em] text-[10px] font-black block mb-6">
//               Partner With Us
//             </span>
//             <h2 className="text-5xl md:text-8xl mb-10 font-black tracking-tighter text-white leading-[0.85]">
//               The Future<br />
//               <span style={{
//                 background: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
//                 WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
//               }}>Awaits.</span>
//             </h2>
//             <p className="text-white/50 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
//               Whether you are looking to secure a flagship location, activate a sponsorship, or
//               stage your next global event — American Dream provides the ultimate platform for your brand.
//             </p>

//             <div className="flex flex-col md:flex-row gap-5 justify-center mb-16">
//               <a
//                 href="mailto:leasing@americandream.com"
//                 className="px-16 py-5 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-blue-500 transition-all duration-300 hover:scale-105 shadow-xl shadow-blue-900/30"
//               >
//                 Leasing Inquiry
//               </a>
//               <button className="px-16 py-5 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white/5 transition-all duration-300">
//                 Event Booking
//               </button>
//               <button className="px-16 py-5 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:bg-white/5 transition-all duration-300">
//                 Sponsorship
//               </button>
//             </div>
//           </div>

//           {/* ── BUILD MY PITCH ── */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="rounded-3xl overflow-hidden mb-16"
//             style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
//           >
//             {/* Header */}
//             <div
//               className="px-8 py-6 flex items-center justify-between cursor-pointer"
//               style={{ background: 'rgba(37,99,235,0.12)', borderBottom: '1px solid rgba(59,130,246,0.15)' }}
//               onClick={() => setShowBuilder(b => !b)}
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
//                   style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}>
//                   ✦
//                 </div>
//                 <div>
//                   <p className="text-white font-black text-base tracking-tight">Build My Pitch</p>
//                   <p className="text-blue-400 text-[10px] uppercase tracking-widest font-bold">AI-Generated · Powered by Claude</p>
//                 </div>
//               </div>
//               <motion.div
//                 animate={{ rotate: showBuilder ? 180 : 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="text-white/40 text-xl"
//               >
//                 ↓
//               </motion.div>
//             </div>

//             <AnimatePresence>
//               {showBuilder && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: 'auto', opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   transition={{ duration: 0.4 }}
//                   style={{ overflow: 'hidden' }}
//                 >
//                   <div className="p-8">
//                     <p className="text-white/50 text-sm mb-8 max-w-lg">
//                       Enter your brand name and category — our AI will generate a personalized pitch explaining exactly why <span className="text-white/80 font-bold">your brand</span> belongs at American Dream.
//                     </p>

//                     <div className="grid md:grid-cols-2 gap-4 mb-6">
//                       {/* Brand Name */}
//                       <div>
//                         <label className="text-white/30 text-[9px] uppercase tracking-widest font-black block mb-2">Brand / Company Name</label>
//                         <input
//                           value={brandName}
//                           onChange={e => setBrandName(e.target.value)}
//                           onKeyDown={e => e.key === 'Enter' && handleBuild()}
//                           placeholder="e.g. Nike, Rolex, Nobu..."
//                           className="w-full px-5 py-4 rounded-2xl text-white text-sm font-medium placeholder-white/20 outline-none transition-all"
//                           style={{
//                             background: 'rgba(255,255,255,0.06)',
//                             border: '1px solid rgba(255,255,255,0.1)',
//                           }}
//                         />
//                       </div>

//                       {/* Category */}
//                       <div>
//                         <label className="text-white/30 text-[9px] uppercase tracking-widest font-black block mb-2">Category</label>
//                         <select
//                           value={category}
//                           onChange={e => setCategory(e.target.value)}
//                           className="w-full px-5 py-4 rounded-2xl text-white text-sm font-medium outline-none transition-all appearance-none cursor-pointer"
//                           style={{
//                             background: 'rgba(255,255,255,0.06)',
//                             border: '1px solid rgba(255,255,255,0.1)',
//                           }}
//                         >
//                           <option value="" style={{ background: '#111' }}>Select a category...</option>
//                           {PITCH_CATEGORIES.map(c => (
//                             <option key={c} value={c} style={{ background: '#111' }}>{c}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <button
//                       onClick={handleBuild}
//                       disabled={!brandName.trim() || !category || loading}
//                       className="px-10 py-4 font-black uppercase tracking-[0.2em] text-xs rounded-full transition-all duration-300 disabled:opacity-30"
//                       style={{
//                         background: loading ? 'rgba(37,99,235,0.4)' : 'linear-gradient(135deg,#2563eb,#7c3aed)',
//                         color: 'white',
//                         boxShadow: '0 8px 30px rgba(37,99,235,0.3)',
//                       }}
//                     >
//                       {loading ? '✦ Generating Pitch...' : '✦ Generate My Pitch'}
//                     </button>

//                     {/* Output */}
//                     <AnimatePresence>
//                       {(loading || pitch) && (
//                         <motion.div
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0 }}
//                           transition={{ duration: 0.5 }}
//                           className="mt-8 p-7 rounded-2xl"
//                           style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(59,130,246,0.2)' }}
//                         >
//                           {loading ? (
//                             <div className="flex items-center gap-4">
//                               <div className="flex gap-1.5">
//                                 {[0, 0.15, 0.3].map((delay, i) => (
//                                   <motion.div key={i} className="w-2 h-2 rounded-full bg-blue-400"
//                                     animate={{ y: [0, -6, 0] }}
//                                     transition={{ duration: 0.7, repeat: Infinity, delay }}
//                                   />
//                                 ))}
//                               </div>
//                               <p className="text-blue-300 text-sm font-medium">Crafting your personalized pitch...</p>
//                             </div>
//                           ) : (
//                             <>
//                               <div className="flex items-center gap-2 mb-5">
//                                 <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
//                                 <p className="text-blue-400 text-[10px] uppercase tracking-widest font-black">
//                                   Custom Pitch — {brandName} · {category}
//                                 </p>
//                               </div>
//                               <div className="space-y-5">
//                                 {pitch.split('\n\n').filter(p => p.trim()).map((para, i) => (
//                                   <p key={i} className="text-white/75 text-sm leading-relaxed">{para}</p>
//                                 ))}
//                               </div>
//                               <div className="mt-6 pt-5 border-t border-white/8 flex gap-3">
//                                 <a
//                                   href="mailto:leasing@americandream.com"
//                                   className="px-6 py-2.5 bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-blue-500 transition-colors"
//                                 >
//                                   Send to Leasing Team
//                                 </a>
//                                 <button
//                                   onClick={() => { setPitch(''); setBrandName(''); setCategory(''); }}
//                                   className="px-6 py-2.5 border border-white/15 text-white/50 font-black uppercase tracking-widest text-[10px] rounded-full hover:text-white/80 transition-colors"
//                                 >
//                                   Start Over
//                                 </button>
//                               </div>
//                             </>
//                           )}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>

//           {/* Footer info */}
//           <div className="pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
//             <div>
//               <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Location</div>
//               <div className="text-sm text-white/70 leading-relaxed">
//                 1 American Dream Way<br />East Rutherford, NJ 07073
//               </div>
//             </div>
//             <div>
//               <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Phone</div>
//               <div className="text-sm text-white/70">+1 (833) 263-7326</div>
//             </div>
//             <div>
//               <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Email</div>
//               <div className="text-sm text-blue-400">leasing@americandream.com</div>
//             </div>
//             <div>
//               <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3">Follow</div>
//               <div className="text-sm text-white/70">@americandream</div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
