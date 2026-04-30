import { useState } from 'react';
import DeckEngine from './components/DeckEngine';
import SlideWrapper from './components/SlideWrapper';
import { AudienceProvider } from './context/AudienceContext';

import Hero from './components/sections/Hero';
import TheScale from './components/sections/TheScale';
import RetailLeasing from './components/sections/RetailLeasing';
import EntertainmentDeck from './components/sections/EntertainmentDeck';
import EventsDeck from './components/sections/EventsDeck';
import Sponsorship from './components/sections/Sponsorship';
import DiningLifestyle from './components/sections/DiningLifestyle';
import Contact from './components/sections/Contact';
import AIConcierge from './components/AIConcierge';

export default function App() {
  const slides = [
    <SlideWrapper bg="bg-zinc-950" key="hero" showNextHint nextLabel="The Scale">
      <Hero />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="scale" showNextHint nextLabel="Retail Leasing">
      <TheScale />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="retail" showNextHint nextLabel="Entertainment">
      <RetailLeasing />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="entertain" showNextHint nextLabel="Events">
      <EntertainmentDeck />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="events" showNextHint nextLabel="Sponsorship">
      <EventsDeck />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="sponsorship" showNextHint nextLabel="Dining & Lifestyle">
      <Sponsorship />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="dining" showNextHint nextLabel="Partner With Us">
      <DiningLifestyle />
    </SlideWrapper>,
    <SlideWrapper bg="bg-zinc-950" key="contact" showNextHint={false}>
      <Contact />
    </SlideWrapper>,
  ];

  return (
    <AudienceProvider>
      <DeckEngine slides={slides} />
      <AIConcierge />
    </AudienceProvider>
  );
}