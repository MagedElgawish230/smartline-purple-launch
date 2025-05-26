
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Car, Users, Star, Shield, Clock } from 'lucide-react';

const DownloadSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('download.title')}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('download.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Driver App Section */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('download.driver.title')}
              </h3>
              <p className={`text-gray-600 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('download.driver.description')}
              </p>
            </div>

            {/* Driver Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Star className="w-5 h-5 text-primary-600" />
                <span className={`text-gray-700 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('download.driver.benefit1')}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className={`text-gray-700 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('download.driver.benefit2')}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="w-5 h-5 text-primary-600" />
                <span className={`text-gray-700 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('download.driver.benefit3')}
                </span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex items-center justify-center bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className={`${isRTL ? 'ml-3' : 'mr-3'}`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">{t('download.ios')}</div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center justify-center bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className={`${isRTL ? 'ml-3' : 'mr-3'}`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">{t('download.android')}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Customer App Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('download.customer.title')}
              </h3>
              <p className={`text-gray-600 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('download.customer.description')}
              </p>
            </div>

            {/* Customer Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Star className="w-5 h-5 text-primary-600" />
                <span className={`text-gray-700 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('download.customer.benefit1')}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className={`text-gray-700 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('download.customer.benefit2')}
                </span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="w-5 h-5 text-primary-600" />
                <span className={`text-gray-700 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('download.customer.benefit3')}
                </span>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="flex items-center justify-center bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className={`${isRTL ? 'ml-3' : 'mr-3'}`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">{t('download.ios')}</div>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center justify-center bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className={`${isRTL ? 'ml-3' : 'mr-3'}`}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">{t('download.android')}</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
