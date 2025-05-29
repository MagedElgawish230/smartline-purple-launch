
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary-600 backdrop-blur-lg border-b border-primary-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3 rtl:space-x-reverse">
              <img 
                src="/lovable-uploads/793d3d62-f061-454e-a58f-87b865274de8.png" 
                alt="SmartLine Logo" 
                className="h-8 w-8"
              />
              <h1 className="text-2xl font-bold text-white">SmartLine</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <a href="#home" className="text-white hover:text-primary-200 font-medium transition-colors">
              {t('nav.home')}
            </a>
            <a href="#about" className="text-white hover:text-primary-200 font-medium transition-colors">
              {t('nav.about')}
            </a>
            <a href="#contact" className="text-white hover:text-primary-200 font-medium transition-colors">
              {t('nav.contact')}
            </a>
            <LanguageToggle />
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-primary-200 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-700">
            <nav className="flex flex-col space-y-4">
              <a
                href="#home"
                className="text-white hover:text-primary-200 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </a>
              <a
                href="#about"
                className="text-white hover:text-primary-200 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </a>
              <a
                href="#contact"
                className="text-white hover:text-primary-200 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contact')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
