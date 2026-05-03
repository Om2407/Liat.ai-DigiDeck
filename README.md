<div align="center">

# 🏙️ AMERICAN DREAM MALL
## Interactive B2B Sales Deck

<br/>

[![Live Demo](https://img.shields.io/badge/🔴_LIVE_DEMO-Visit_Now-blue?style=for-the-badge)](https://american-dream-mall-om.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Source_Code-black?style=for-the-badge&logo=github)](https://github.com/Om2407/Liat.ai-digi-deck)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-94%2F100-green?style=for-the-badge&logo=lighthouse)]()

<br/>

> *"A self-contained web application that replaces fragmented sales tools — YouTube videos, static PDFs, and verbal narration — with a single cinematic, interactive experience that makes prospects say: I need to be here."*

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

## 🔴 Live URL & Performance

```text
https://american-dream-mall-om.vercel.app/
```

| Metric | Desktop | Mobile |
|--------|---------|--------|
| ⚡ Performance | **94** 🟢 | **80** 🟠 |
| ♿ Accessibility | **81** 🟢 | **81** 🟢 |
| ✅ Best Practices | **96** 🟢 | **96** 🟢 |
| 🔍 SEO | **90** 🟢 | **90** 🟢 |

---

## 🖥️ Deck Sections — 8 Slides

### 01 · Welcome — Cinematic Intro
> *Full-screen video background at 2× speed. Audience switcher transforms headline, stats, and CTAs in real-time for Tenant / Sponsor / Event Producer.*

### 02 · The Scale — Visitor Demographics
> *Data-driven overview: 40M+ visitors, 3M sq ft, $180 avg spend, 4hr+ dwell time. Designed to establish commercial credibility immediately.*

### 03 · Retail — The Avenue
> *Curated luxury brand grid. Zone breakdown: The Avenue (flagship), The Plaza (mid-tier), The Market (F&B), The Lab (pop-up/activation).*

### 04 · Entertainment — Global Attractions
> *North America's largest indoor theme park. Big Snow — the only indoor ski slope in the Western Hemisphere. The ultimate destination drivers.*

### 05 · Events — Arena + Expo Center
> *5,000-seat arena + 300,000 sq ft Exposition Center. Booking flow, capacity specs, past event highlights, and direct CTA.*

### 06 · Sponsorship — 3 Partnership Tiers
> *Presenting, Associate, and Activation partner tiers. Audience data, impression guarantees, and activation examples per tier.*

### 07 · Lifestyle — F&B District
> *100+ restaurants across every category. Food as a lifestyle draw — not an afterthought. Positions F&B as a destination in itself.*

### 08 · Partner — Build My Pitch AI
> *Final CTA slide for leasing, sponsorship, and event bookings. Type brand name + select category → Gemini AI generates a personalized pitch.*

---

## 🎭 Audience Switcher

At the core of the deck is the global **Audience Switcher** which enables real-time adaptation of the presentation context based on who is viewing it:

1. **All Visitors (🌐):** A holistic overview highlighting all features equally.
2. **Retail Tenant (🏪):** Customizes data and pitches to focus heavily on foot traffic, dwell times, co-tenancy, and leasing opportunities.
3. **Brand Sponsor (🎯):** Emphasizes brand visibility, high household income demographics, massive social reach, and activation footprints.
4. **Event Producer (🎤):** Highlights venue capabilities, logistics, capacities, and previous successful large-scale events.

This contextual switch dynamically updates the hero content, button styling, highlighted statistics, and instructs the Gemini AI to frame its responses through the lens of the selected audience.

---

## 🛠️ Tech Stack

| Layer | Technology | Decision |
|-------|-----------|----------|
| Framework | **React 19 + TypeScript** | Type-safe, component-driven architecture |
| Build | **Vite 6** | Fast HMR, manual chunk splitting |
| Styling | **Tailwind CSS v4** | Utility-first, zero runtime overhead |
| Animation | **Framer Motion 12** | Cinematic page transitions + micro-interactions |
| AI | **Google Gemini 2.0 Flash** | 3 distinct live AI features |
| Deployment | **Vercel** | CDN edge, auto-deploy on push |

---

## ⚙️ Setup

```bash
# 1. Clone
git clone https://github.com/Om2407/Liat.ai-digi-deck
cd Liat.ai-digi-deck

# 2. Install
npm install

# 3. Environment
cp .env.example .env
# Add your Gemini API key → https://aistudio.google.com
```

**.env**
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

```bash
# 4. Run
npm run dev       # → http://localhost:5173
npm run build     # Production build
npm run preview   # Preview production build
```

---

## 🤖 AI Integration — 3 Live Features

### 1. ✦ Build My Pitch *(Slide 08 — Partner)*
User inputs **brand name + category** → Gemini generates a personalized 3-paragraph sales pitch explaining exactly why that brand belongs at American Dream.

### 2. 💬 AI Concierge *(Floating Widget — always visible)*
Always-on conversational assistant trained on American Dream's full property details — leasing, events, venues, sponsorship tiers, parking, hours.

### 3. 📊 Ask AI About This *(Audience-Aware Context)*
On every slide, prospects can click the "Ask AI About This" button. The system passes the specific slide's context AND the currently selected audience role to Gemini, generating a tailored 2-sentence pitch emphasizing exactly what matters most to that user type.

---

<div align="center">

**Built with React 19 · Vite · Tailwind CSS · Framer Motion · Google Gemini**

<br/>

[![Live Demo](https://img.shields.io/badge/🔴_View_Live-Visit_Now-blue?style=for-the-badge)](https://american-dream-mall-om.vercel.app/)

</div>