
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageToggle from './LanguageToggle';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 bg-primary-600 backdrop-blur-lg border-b border-primary-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-white">SmartLine</h1>
              </Link>
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
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-white hover:text-primary-200">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" onClick={signOut} className="text-white hover:text-primary-200">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth?mode=login">
                  <Button variant="ghost" className="text-white hover:text-primary-200">
                    Login
                  </Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button className="bg-white text-primary-600 hover:bg-gray-100">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
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
              
              {user ? (
                <>
                  <Link 
                    to="/dashboard"
                    className="text-white hover:text-primary-200 font-medium transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-white hover:text-primary-200 font-medium transition-colors px-2 py-1 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth?mode=login"
                    className="text-white hover:text-primary-200 font-medium transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="text-white hover:text-primary-200 font-medium transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
