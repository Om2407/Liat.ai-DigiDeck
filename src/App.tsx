import { useState } from 'react';
import DeckEngine from './components/DeckEngine';
import SlideWrapper from './components/SlideWrapper';
import { AudienceProvider, useAudience } from './context/AudienceContext';
import FluidCursor from './components/ui/FluidCursor';

import Hero from './components/sections/Hero';
import TheScale from './components/sections/TheScale';
import RetailLeasing from './components/sections/RetailLeasing';
import EntertainmentDeck from './components/sections/EntertainmentDeck';
import EventsDeck from './components/sections/EventsDeck';
import Sponsorship from './components/sections/Sponsorship';
import DiningLifestyle from './components/sections/DiningLifestyle';
import ROICalculator from './components/sections/ROICalculator';
import Contact from './components/sections/Contact';
import AIConcierge from './components/AIConcierge';

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
    <>
      <DeckEngine slides={slides} />
      <AIConcierge />
    </>
  );
}

export default function App() {
  return (
    <AudienceProvider>
      <FluidCursor />
      <AppSlides />
    </AudienceProvider>
  );
}