
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-300 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary-400 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-200 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center animate-fade-in">
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            <span className="text-primary-400">SmartLine</span>
          </h1>
          <p className={`text-2xl font-semibold text-white mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('hero.title')}
          </p>
          <p className={`text-xl text-gray-200 mb-12 max-w-3xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('hero.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {t('hero.drive.cta')}
            </button>
            <button className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              {t('hero.ride.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
