
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Car, Users } from 'lucide-react';

const Hero = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-300 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary-400 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-200 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center animate-fade-in mb-16">
          <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            <span className="text-primary-600">SmartLine</span>
          </h1>
          <p className={`text-2xl font-semibold text-gray-700 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('hero.title')}
          </p>
          <p className={`text-xl text-gray-600 mb-12 max-w-3xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('hero.description')}
          </p>
        </div>

        {/* Two App Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Drive with SmartLine */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('hero.drive.title')}
              </h3>
              <p className={`text-gray-600 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('hero.drive.description')}
              </p>
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                {t('hero.drive.cta')}
              </button>
            </div>
          </div>

          {/* Ride with SmartLine */}
          <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('hero.ride.title')}
              </h3>
              <p className={`text-gray-600 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('hero.ride.description')}
              </p>
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                {t('hero.ride.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
