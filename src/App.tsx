import { useState, lazy, Suspense } from 'react';
import DeckEngine from './components/DeckEngine';
import SlideWrapper from './components/SlideWrapper';
import { AudienceProvider, useAudience } from './context/AudienceContext';
import type { Audience } from './context/AudienceContext';
import FluidCursor from './components/ui/FluidCursor';
import DirectorsCut from './components/DirectorsCut';

import Hero from './components/sections/Hero';

const TheScale = lazy(() => import('./components/sections/TheScale'));
const RetailLeasing = lazy(() => import('./components/sections/RetailLeasing'));
const EntertainmentDeck = lazy(() => import('./components/sections/EntertainmentDeck'));
const EventsDeck = lazy(() => import('./components/sections/EventsDeck'));
const Sponsorship = lazy(() => import('./components/sections/Sponsorship'));
const DiningLifestyle = lazy(() => import('./components/sections/DiningLifestyle'));
const ROICalculator = lazy(() => import('./components/sections/ROICalculator'));
const Contact = lazy(() => import('./components/sections/Contact'));
const AIConcierge = lazy(() => import('./components/AIConcierge'));

function AppSlides() {
  const { audience } = useAudience();

  const slides = [
    <SlideWrapper bg="bg-zinc-950" key="hero" showNextHint nextLabel="The Scale">
      <Hero />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="scale" showNextHint nextLabel="Retail Leasing">
      <TheScale currentAudience={audience} />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="retail" showNextHint nextLabel="Entertainment">
      <RetailLeasing currentAudience={audience} />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="entertain" showNextHint nextLabel="Events">
      <EntertainmentDeck currentAudience={audience} />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="events" showNextHint nextLabel="Sponsorship">
      <EventsDeck currentAudience={audience} />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="sponsorship" showNextHint nextLabel="ROI Calculator">
      <Sponsorship currentAudience={audience} />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="roi" showNextHint nextLabel="Dining & Lifestyle">
      <ROICalculator currentAudience={audience} />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="dining" showNextHint nextLabel="Partner With Us">
      <DiningLifestyle />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="contact" showNextHint={false}>
      <Contact currentAudience={audience} />
    </SlideWrapper>,
  ];

  return (
    <Suspense fallback={<div className="w-full h-screen bg-zinc-950" />}>
      <DeckEngine slides={slides} />
      <AIConcierge />
    </Suspense>
  );
}

export default function App() {
  const [showDirectorsCut, setShowDirectorsCut] = useState(true);
  const [selectedAudience, setSelectedAudience] = useState<Audience>('all');

  return (
    <>
      <FluidCursor />
      {showDirectorsCut ? (
        <DirectorsCut 
          onSelect={(audience) => {
            setSelectedAudience(audience);
            setShowDirectorsCut(false);
          }} 
        />
      ) : (
        <AudienceProvider initialAudience={selectedAudience}>
          <AppSlides />
        </AudienceProvider>
      )}
    </>
  );
}