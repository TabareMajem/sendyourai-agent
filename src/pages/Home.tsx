import React from 'react';
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { UseCases } from '../components/landing/UseCases';
import { Integrations } from '../components/landing/Integrations';
import { Footer } from '../components/layout/Footer';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <UseCases />
      <Integrations />
      <Footer />
    </div>
  );
}