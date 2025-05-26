
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
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              <span className="text-purple-400">SmartLine</span>
            </h1>
            <p className={`text-2xl font-semibold text-white mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              {t('hero.title')}
            </p>
            <p className={`text-xl text-gray-200 mb-12 max-w-2xl ${isRTL ? 'font-cairo lg:text-right' : 'font-inter lg:text-left'}`}>
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {t('hero.drive.cta')}
              </button>
              <button className="bg-white hover:bg-gray-100 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                {t('hero.ride.cta')}
              </button>
            </div>
          </div>

          {/* Right Content - iPad Mockup */}
          <div className="relative lg:block hidden">
            <div className="relative">
              {/* iPad Frame */}
              <div className="relative w-96 h-128 mx-auto">
                <div className="absolute inset-0 bg-black rounded-3xl shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
                  <div className="absolute inset-2 bg-gray-900 rounded-2xl overflow-hidden">
                    {/* Screen Content */}
                    <div className="h-full bg-gradient-to-br from-purple-600 to-purple-800 flex flex-col items-center justify-center p-8">
                      <div className="w-full max-w-sm">
                        {/* App Icon */}
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <span className="text-2xl font-bold text-purple-600">SL</span>
                        </div>
                        
                        {/* App Interface */}
                        <div className="bg-white rounded-2xl p-6 shadow-xl">
                          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Book Your Ride</h3>
                          <div className="space-y-3">
                            <div className="bg-gray-100 rounded-lg p-3">
                              <div className="text-sm text-gray-600">From</div>
                              <div className="font-semibold">Current Location</div>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3">
                              <div className="text-sm text-gray-600">To</div>
                              <div className="font-semibold">Where to?</div>
                            </div>
                            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold">
                              Find Rides
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-400 rounded-full animate-bounce opacity-80"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
