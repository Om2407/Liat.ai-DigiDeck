<div align="center">

# 🏙️ AMERICAN DREAM MALL
## Interactive B2B Sales Deck · DigiDeck v9

<br/>

[![Live Demo](https://img.shields.io/badge/🔴_LIVE_DEMO-Visit_Now-blue?style=for-the-badge)](https://american-dream-mall-om.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Source_Code-black?style=for-the-badge&logo=github)](https://github.com/Om2407/Liat.AI-DigiDeck)
[![Performance](https://img.shields.io/badge/Lighthouse_Performance-96%2F100-brightgreen?style=for-the-badge)]()
[![Best Practices](https://img.shields.io/badge/Best_Practices-100%2F100-brightgreen?style=for-the-badge)]()
[![SEO](https://img.shields.io/badge/SEO-90%2F100-brightgreen?style=for-the-badge)]()

<br/>

> *"Win with God as your witness."*

<br/>

> *"A self-contained web application that replaces fragmented sales tools — YouTube videos, static PDFs, and verbal narration — with a single cinematic, agentic experience that makes prospects say: I need to be here."*

</div>

---

## 🎯 The Brief

The world's largest shopping malls are no longer just places to shop. They are massive, mixed-use destinations combining retail, dining, entertainment, hospitality, and live events — attracting tens of millions of visitors per year.

**The problem:** The sales process is fragmented. A rep pulls up YouTube, flips through a PDF, opens a spreadsheet, and verbally narrates. It's manual, inconsistent, and doesn't convey the scale or energy of the property.

**This tool replaces all of that.**

| Audience | Business Goal |
|----------|--------------|
| 🏪 Retail Tenants | Drive leasing deals — luxury, mid-tier, flagship, pop-up |
| 🎯 Brand Sponsors | Drive sponsorship & brand partnership commitments |
| 🎤 Event Producers | Drive event bookings — concerts, activations, launches |

---

## 🔴 Live Demo

```
https://american-dream-mall-om.vercel.app/
```

> Best experienced on desktop Chrome/Edge in fullscreen.
> Use arrow keys or the bottom navigation to move between slides.

| Metric | Desktop |
|--------|---------|
| ⚡ Performance | **96 / 100** 🟢 |
| ♿ Accessibility | **86 / 100** 🟢 |
| ✅ Best Practices | **100 / 100** 🟢 |
| 🔍 SEO | **90 / 100** 🟢 |

---

## 🎬 Director's Cut — Audience Selector

Before the deck loads, a cinematic **"Who's in the Room?"** screen asks the presenter to select their audience. The entire 9-slide deck instantly adapts — headlines, stats, CTAs, AI context, and copy — for whoever is in the room.

```
🌐 All Visitors     →  Full overview experience
🏪 Retail Tenant    →  Leasing & revenue focus  [MOST REQUESTED]
🎯 Brand Sponsor    →  Activation & reach focus
🎪 Event Producer   →  Venues & capacity focus
```

Switch audience at any time during the presentation — all 9 slides update simultaneously.

---

## 🖥️ 9 Slides — Full Breakdown

### 01 · Hero — Cinematic Welcome
Fullscreen video background, Ken Burns parallax, text scramble animation, 3D Globe with particle field (Three.js), magnetic buttons, film grain overlay, count-up stats, and audience-aware headline system.

### 02 · The Scale — Data Platform
Dark MapLibre GL interactive map centered on East Rutherford, NJ. Animated route from NYC. Live visitor counter. GeoJSON data layers. Key stats: 40M+ visitors · 3M sq ft · 8 miles from NYC · $180 avg spend.

### 03 · Retail Leasing — The Avenue
Partner brand wall (Hermès, Gucci, Apple, 450+ brands). Zone breakdown: The Avenue (luxury flagship) · The Plaza (mid-tier) · The Market (F&B) · The Lab (pop-up/activation). Audience-aware leasing copy.

### 04 · Entertainment — World Records
3D rotating carousel wheel (rAF + CSS 3D transforms). 5 attraction cards: Nickelodeon Universe · DreamWorks Water Park · Big SNOW · Performing Arts Center · Marvel Experience. YouTube modal on click. Cursor trail. Ambient video background.

### 05 · Events — The Stage
Three.js stadium crowd simulation — 2,400 instanced sphere particles in real stadium bowl geometry. Stadium wave animation. Venue cards: 5,000-seat Performing Arts Center + 300K sq ft Exposition Center.

### 06 · Sponsorship — Own the Room
Three luxury partnership tier cards. Gold shimmer animation on Presenting Partner ($2M+). Vertical Three.js particle stream. Tiers: Presenting · Activation · Event Sponsor.

### 07 · ROI Calculator — See Your Return
Fully interactive financial calculator. Live sliders: Space Size · Zone · Monthly Budget · Brand Tier. Real-time projected metrics: Monthly Visitors · Estimated Revenue · ROI % · Payback Period. Animated 12-month bar chart.

### 08 · Dining & Lifestyle — Stay Longer
Auto-scrolling Unsplash food imagery (CSS infinite scroll, pauses on hover). Playfair Display editorial serif typography. Key stats: +90 min avg visit · $180 avg spend · 100+ dining concepts.

### 09 · Partner With Us — Contact & AI
Gemini AI pitch generator. PDF Proposal Generator (audience-aware, downloadable via jsPDF). Contact CTAs.

---

## 🤖 Agentic AI Copilot — The Star Feature

This is not a generic chatbot. It's a **spatially-aware agentic interface** that understands the presentation context in real time.

### 1. Gaze Tracking
A global `useGazeContext` hook reads `data-ai-context` attributes from elements under the user's cursor across all slides:

```tsx
<div data-ai-context="ROI Calculator: Space=2500sqft, Zone=Luxury, Budget=$50000/mo, projected ROI=340%">
```

### 2. Proactive Contextual Greeting
When the AI panel opens, it instantly greets based on exactly what's on screen:

> *"I see you're running numbers on the $500K activation tier — want me to show you the projected ROI for that investment?"*

### 3. JSON Tool Calling — Agentic Navigation
Gemini responds in structured JSON with an optional `ui_action`:

```json
{
  "message": "Let me show you the full sponsorship breakdown.",
  "ui_action": { "type": "navigate", "slide_index": 5 }
}
```

The UI parses this and **physically navigates the deck** in response to natural language.

### 4. AI Pitch Generator
Brand name + category → Gemini generates a personalized 3-paragraph sales pitch with "Send to Leasing Team" mailto CTA.

### 5. PDF Proposal Generator
Audience-aware PDF generated client-side via `jsPDF`. Dark themed, color-coded by audience. Downloadable from the Contact slide.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | **React 19 + TypeScript** | Type-safe, component-driven |
| Build | **Vite 6** | Fast HMR, manual chunk splitting |
| Styling | **Tailwind CSS v4** | Utility-first, zero runtime overhead |
| Animation | **Framer Motion 12** (`motion/react`) | Cinematic transitions + micro-interactions |
| 3D / WebGL | **Three.js r184 + R3F + Drei** | Stadium particles, particle streams |
| Mapping | **MapLibre GL** | Interactive dark map, route animation |
| AI | **Google Gemini 2.0 Flash** | Agentic copilot, pitch generator |
| PDF | **jsPDF** | Client-side proposal generation |
| Deployment | **Vercel** | CDN edge, auto-deploy on push |

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── ui/                    # Atomic design — shared micro-interactions
│   │   ├── FilmGrain.tsx      # SVG feTurbulence grain (IntersectionObserver optimized)
│   │   ├── CountUp.tsx        # Unified animated counter
│   │   ├── MagneticButton.tsx # Spring-based magnetic hover effect
│   │   └── FluidCursor.tsx    # Global custom cursor (mixBlendMode: difference)
│   ├── sections/              # Full-screen slide components (9 slides)
│   ├── DeckEngine.tsx         # Slide navigation + AnimatePresence transitions
│   └── AIConcierge.tsx        # Agentic AI copilot
├── hooks/
│   └── useGazeContext.ts      # DOM gaze tracking hook
└── context/
    └── AudienceContext.tsx    # Global audience switcher
```

---

## ⚙️ Setup

```bash
# 1. Clone
git clone https://github.com/Om2407/Liat.AI-DigiDeck
cd Liat.AI-DigiDeck

# 2. Install
npm install

# 3. Environment — create .env file
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_MAPTILER_API_KEY=your_maptiler_api_key_here

# 4. Run
npm run dev       # → http://localhost:3000
npm run build     # Production build
```

> AI features require a Gemini API key from [aistudio.google.com](https://aistudio.google.com). All slides work without it — a fallback pitch is served if the key is missing.

---

## 📦 Changelog — v9 (May 2026)

- ✅ Director's Cut audience selector screen
- ✅ Spatially-aware Agentic AI Copilot (gaze tracking + JSON tool calling)
- ✅ ROI Calculator with live financial projections
- ✅ PDF Proposal Generator (jsPDF, audience-aware)
- ✅ Three.js stadium crowd — 2,400 instanced particles + wave animation
- ✅ Dark MapLibre GL map (CartoDB dark matter tiles)
- ✅ Global fluid cursor (mixBlendMode: difference)
- ✅ Atomic component refactor (src/components/ui/)
- ✅ React.lazy() code splitting — Lighthouse Performance 44 → 96
- ✅ IntersectionObserver on all rAF loops — zero GPU waste on hidden slides
- ✅ Mobile responsive layouts

---

<div align="center">

*"Win with God as your witness."*

<br/>

**Built by Om Gupta**

📧 guptaom203@gmail.com &nbsp;·&nbsp; 📱 +91-9131939394 &nbsp;·&nbsp; 🔗 [GitHub @Om2407](https://github.com/Om2407)

<br/>

*Built as a take-home assignment for LIAT.AI — Senior Frontend Engineer & AI-Powered Interactive Design role.*

<br/>

[![Live Demo](https://img.shields.io/badge/🔴_View_Live-Visit_Now-blue?style=for-the-badge)](https://american-dream-mall-om.vercel.app/)

</div>
