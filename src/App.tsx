// import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import DeckEngine from './components/DeckEngine';
import SlideWrapper from './components/SlideWrapper';
import { AudienceProvider } from './context/AudienceContext';

import Hero from './components/sections/Hero';
import Overview from './components/sections/Overview';
import BrandLogoStrip from './components/BrandLogoStrip';
import ParksSection from './components/sections/ParksSection';
import WaterParkSection from './components/sections/WaterParkSection';
import MallTourSection from './components/sections/MallTourSection';
import Retail, { LeasingPaths } from './components/sections/Retail';
import ROICalculator from './components/sections/ROICalculator';
import Entertainment from './components/sections/Entertainment';
import MarvelSection from './components/sections/MarvelSection';
import Events from './components/sections/Events';
import Sponsorship from './components/sections/Sponsorship';
import DiningSection from './components/sections/DiningSection';
import SocialSection from './components/sections/SocialSection';
import Contact from './components/sections/Contact';
import WaterParkSimulation from './components/WaterParkSimulation';
import BrandView from './components/BrandView';
import AIConcierge from './components/AIConcierge';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);

  const slides = [
    <SlideWrapper bg="bg-zinc-950" key="hero" showNextHint nextLabel="Explore the Scale">
      <Hero />
    </SlideWrapper>,
    <SlideWrapper bg="bg-white" key="overview" showNextHint nextLabel="Our Brands">
      <Overview />
    </SlideWrapper>,
    <SlideWrapper bg="bg-white" key="brands" showNextHint nextLabel="Parks">
      <BrandLogoStrip />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-50" key="parks" showNextHint nextLabel="Water Park">
      <ParksSection />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="waterpark" showNextHint nextLabel="Mall Tour">
      <WaterParkSection />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="malltour" showNextHint nextLabel="Retail">
      <MallTourSection />
    </SlideWrapper>,
    <SlideWrapper bg="bg-white" key="retail" showNextHint nextLabel="ROI Calculator">
      <Retail onNavigateBrand={setSelectedBrand} />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="roi" showNextHint nextLabel="Leasing Paths">
      <ROICalculator />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="leasing" showNextHint nextLabel="Tech Hub">
      <LeasingPaths />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="entertainment" showNextHint nextLabel="Activations">
      <Entertainment onStartSim={() => setIsSimOpen(true)} />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="marvel" showNextHint nextLabel="Events">
      <MarvelSection />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="events" showNextHint nextLabel="Sponsorship">
      <Events />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="sponsorship" showNextHint nextLabel="Dining">
      <Sponsorship />
    </SlideWrapper>,
    <SlideWrapper bg="bg-white" key="dining" showNextHint nextLabel="Social">
      <DiningSection />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="social" showNextHint nextLabel="Partner With Us">
      <SocialSection />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="contact" showNextHint={false}>
      <Contact />
    </SlideWrapper>,
  ];

  return (
    <AudienceProvider>
      <DeckEngine slides={slides} />
      <AnimatePresence>
        {isSimOpen && <WaterParkSimulation onOpenChange={setIsSimOpen} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedBrand && <BrandView brand={selectedBrand} onBack={() => setSelectedBrand(null)} />}
      </AnimatePresence>
      <AIConcierge />
    </AudienceProvider>
  );
}