
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import DownloadSection from '../components/DownloadSection';
import PromotionsSection from '../components/PromotionsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <DownloadSection />
        <PromotionsSection />
        <TestimonialsSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
