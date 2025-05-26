
import React from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import DownloadSection from '../components/DownloadSection';
import PromotionsSection from '../components/PromotionsSection';
import ReferralSection from '../components/ReferralSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        <AboutSection />
        <DownloadSection />
        <PromotionsSection />
        <ReferralSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
