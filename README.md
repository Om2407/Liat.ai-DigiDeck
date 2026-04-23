# 🏙️ American Dream Mall — Interactive Sales Deck

<div align="center">

### 🔴 [LIVE DEMO → liat-ai-project.vercel.app](https://liat-ai-project.vercel.app/)

*A fully interactive, browser-based sales deck for American Dream Mall — the Western Hemisphere's largest entertainment & retail destination.*

</div>

---

## 📌 Project Brief

Built for a high-stakes B2B sales scenario: replacing the fragmented manual process (YouTube videos + static PDFs + verbal narration) with a **single, self-contained web application** that a salesperson can screen-share live or send as a standalone link.

**Primary audience:** Prospective retail tenants, corporate sponsors, and event producers — decision-makers at brands, agencies, and production companies evaluating whether to invest in a presence at American Dream Mall.

**The goal:** Make them feel the scale, the energy, and the commercial opportunity within 10 seconds. Every section pushes toward a specific business action — signing a lease, committing to a sponsorship, or booking a venue.

---

## 🖥️ Screenshots

### Hero — All Visitors (Default)
![Hero All Visitors](https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1200&q=80&auto=format&fit=crop)
*Cinematic video background with Ken Burns fallback. Stats: 40M+ visitors, 3M sq ft, 450+ brands, 8mi from NYC*

### Hero — Retail Tenant Mode
![Hero Retail](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format&fit=crop)
*Headline switches to "YOUR FLAGSHIP HOME". Stats become leasing metrics: $180 avg spend, 4hrs+ dwell time*

### Hero — Event Producer Mode  
![Hero Events](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&auto=format&fit=crop)
*Headline: "BOOK THE ARENA". Stats: 5K seats, 300K sq ft Expo Hall, 200+ events/year*

---

## 🚀 Live URL & Lighthouse Scores

```
https://liat-ai-project.vercel.app/
```

| Metric | Score | Status |
|--------|-------|--------|
| ⚡ Performance | **88** | 🟡 |
| ♿ Accessibility | **72** | 🟡 |
| ✅ Best Practices | **100** | 🟢 |
| 🔍 SEO | **90** | 🟢 |

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React 19 + TypeScript | Type-safe, component-driven |
| Build Tool | Vite 6 | Fast HMR, manual code splitting |
| Styling | Tailwind CSS v4 | Utility-first, zero runtime |
| Animation | Framer Motion + Motion | Cinematic transitions |
| 3D | Three.js + React Three Fiber | MallTour 3D walkthrough |
| AI | Google Gemini 2.0 Flash | 3 distinct live AI features |
| Deployment | Vercel | CDN edge, auto-deploy from GitHub |

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- Google Gemini API key — free at [aistudio.google.com](https://aistudio.google.com)

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/american-dream-digideck
cd american-dream-digideck

# Install dependencies
npm install
```

### Environment Variables

Create `.env` in root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### Run

```bash
npm run dev      # → http://localhost:5173
npm run build    # Production build
npm run preview  # Preview production locally
```

---

## 🤖 AI Integration — 3 Distinct Features

### 1. ✦ Build My Pitch *(Contact Section)*
User types their **brand name + category** → Gemini generates a personalized 3-paragraph sales pitch explaining exactly why that specific brand belongs at American Dream.

**Example:**
```
Input:  Brand = "Nike"  |  Category = "Tech Retail"
Output: 3-paragraph pitch referencing Nike's target demo alignment 
        with American Dream's 40M visitors, tech corridor placement,
        event co-marketing upside, and a clear urgency CTA
```

The "Send to Leasing Team" button pre-fills a `mailto:` with the generated pitch text — zero friction from AI output to actual outreach.

**7 categories:** Luxury Retail · Tech Retail · F&B/Restaurant · Pop-up/Activation · Corporate Sponsor · Event Producer · Entertainment Brand

### 2. 💬 AI Concierge *(Floating Widget — Bottom Right)*
Always-on conversational assistant trained on American Dream's full property details — leasing, events, venues, parking, hours, sponsorship tiers. Powered by Gemini with a custom system prompt scoped to property knowledge.

### 3. 📊 Overview AI Insights *(Overview Section)*
On-demand AI-generated strategic commentary — evaluates the demographic data shown and explains the commercial opportunity in the language of the viewer's specific interest.

---

## 🗂️ Deck Architecture — 16 Slides

| # | Section | Target Audience | Business Objective |
|---|---------|----------------|-------------------|
| 01 | **Hero** | All | Cinematic impact — 10 sec buy-in |
| 02 | **The Scale** | All | Demographic data + visitor stats |
| 03 | **Brands** | Tenant | Luxury brand portfolio + social proof |
| 04 | **Parks** | All | Nickelodeon Universe + Big Snow Ski |
| 05 | **Water Park** | All | DreamWorks — largest indoor in US |
| 06 | **Mall Tour** | All | 3D cinematic property walkthrough |
| 07 | **Retail** | Tenant | The Avenue — curated luxury brand grid |
| 08 | **ROI Calculator** | Tenant | Interactive revenue modelling tool |
| 09 | **Leasing Paths** | Tenant | Segmented: Luxury / Mid-tier / F&B / Pop-up |
| 10 | **Tech Hub** | Tenant | Innovation + entertainment corridor |
| 11 | **Brand Activations** | Sponsor | Samsung, Nike, BTS, WWE case studies |
| 12 | **Events** | Event Producer | 5K-seat Arena + 300K sq ft Expo Center |
| 13 | **Sponsorship** | Sponsor | 3 partnership tiers + audience data |
| 14 | **Dining** | All | F&B district — 100+ restaurants |
| 15 | **Social Proof** | Sponsor | 8.4M followers, 120M monthly impressions |
| 16 | **Partner With Us** | All | Build My Pitch AI + leasing inquiry |

---

## 🎨 Key Design Decisions

### Audience Switcher
The deck serves three very different buyer types. Instead of building three decks, a single switcher at top-right transforms the hero in real-time per audience. Every switch animates: tag line → headline → subheading → stats → CTA buttons → color accent. Built with React `AnimatePresence mode="wait"`.

Color system:
- 🟠 **Retail Tenant** — amber
- 🟣 **Brand Sponsor** — purple  
- 🟢 **Event Producer** — green

### Video-First Hero
PDF required: *"Video is the primary storytelling medium, not decoration. Autoplay, scroll-triggered, and background video where appropriate."*

Implementation: Autoplay MP4 (Pexels CC0) as full-bleed background. Graceful Ken Burns image fallback if video fails. Right panel mini-player with animated LIVE badge.

### Dark Luxury UI
Inspired by Apple, Tesla, Hermès, Saint Laurent. `zinc-950` base (not pure black — avoids harshness). Every color accent is audience-reactive. Gradient text headlines. Cinematic overlays on all media.

### Segmented Leasing Paths
PDF requirement: *"Leasing Paths: segmented by category (luxury, retail, F&B, pop-up) with tailored pitches."*

Interactive tab system — each tab shows: space size, price/sq ft, zone name, target audience profile, 4 included perks, example tenant brands, and a zone-specific pitch paragraph.

### Non-Linear Navigation
Sidebar (all 16 slides) + sticky dark header + slide-level arrows. Any prospect can jump directly to the section relevant to them. Works as screen-share or standalone link — no narration required.

### Code Splitting
Vite `manualChunks` isolates Three.js (~1MB) from the main bundle. Main JS: **184KB** (gzipped: 48KB). This keeps initial paint fast while deferring the heavy 3D scene.

---

## 🧠 AI Tools Used During Development

| Tool | How Used |
|------|---------|
| **Google Gemini 2.0 Flash** | All 3 live AI features in the deployed deck |
| **Claude (Anthropic)** | Architecture, component logic, TypeScript debugging |
| **DALL-E 3 / Midjourney** | Custom property renders and activation mockups |
| **Cursor** | Accelerated boilerplate and utility code |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            # Video hero + audience switcher
│   │   ├── Overview.tsx        # Demographics + AI insights
│   │   ├── Retail.tsx          # Brand grid + LeasingPaths component
│   │   ├── ROICalculator.tsx   # Interactive revenue model
│   │   ├── Events.tsx          # Arena + Expo Center booking
│   │   ├── Sponsorship.tsx     # 3 partnership tiers
│   │   ├── Contact.tsx         # Build My Pitch AI feature
│   │   ├── SocialSection.tsx   # 8.4M follower proof + platform stats
│   │   ├── MarvelSection.tsx   # Brand activation case studies
│   │   └── ...7 more sections
│   ├── DeckEngine.tsx          # 16-slide navigation engine
│   ├── AIConcierge.tsx         # Floating Gemini chat widget
│   └── Header.tsx              # Audience-reactive dark sticky nav
├── context/
│   └── AudienceContext.tsx     # Global audience state (React Context)
└── App.tsx                     # Slide array + layout
```

---

## 🔮 What I'd Improve With More Time

**Performance**
- Lazy-load Three.js MallTour on interaction (biggest Lighthouse bottleneck — 1MB chunk loads upfront)
- Replace Pexels stock video with official American Dream press kit footage
- Fix Accessibility score from 72 → 90+ with ARIA labels and keyboard nav

**Features**
- Live venue availability calendar (Calendly API or custom)
- Deck engagement analytics — which sections get most time, which CTAs get clicked, per audience type
- PDF/email export of "Build My Pitch" output
- A/B testing framework for CTA copy per audience

**Content**
- Real American Dream photography from the property media kit
- Live event footage from past WWE, concert, and fashion week activations
- Dynamic leasing availability feed from property management system

---

<div align="center">

**Built with React 19 · Vite · Tailwind CSS · Framer Motion · Three.js · Google Gemini**

[🔴 View Live →](https://liat-ai-project.vercel.app/)

</div>