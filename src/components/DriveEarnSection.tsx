
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const DriveEarnSection = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={`${isRTL ? 'lg:order-2' : ''}`}>
            <div className="relative">
              <img
                src="/lovable-uploads/dd732ec3-9677-420a-9509-a7d64d517b98.png"
                alt="Drive and earn illustration"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`${isRTL ? 'lg:order-1 font-cairo text-right' : 'font-inter'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Drive when you want, make what you need
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through SmartLine.
            </p>

            <div className="space-y-4">
              <button className="bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-lg">
                Get started
              </button>
              
              <p className="text-gray-600">
                Already have an account? <span className="underline cursor-pointer hover:text-gray-900">Sign in</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DriveEarnSection;
