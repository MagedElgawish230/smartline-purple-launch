
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import BookRideModal from './BookRideModal';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const RecentActivitySection = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`${isRTL ? 'font-cairo text-right' : 'font-inter'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {user ? `Welcome back, ${user.email}!` : t('recent.title')}
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {user ? 'Ready to book your next ride?' : t('recent.description')}
            </p>

            <div className="space-y-4">
              {user ? (
                <div className="flex gap-4">
                  <BookRideModal>
                    <Button className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-lg">
                      Book a Ride
                    </Button>
                  </BookRideModal>
                  <Link to="/dashboard">
                    <Button variant="outline" className="px-8 py-4 rounded-lg font-medium text-lg">
                      View Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <AuthModal>
                    <Button className="bg-primary-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-lg">
                      {t('recent.login')}
                    </Button>
                  </AuthModal>
                  
                  <p className="text-gray-600">
                    {t('recent.signup.text')} 
                    <AuthModal>
                      <span className="underline cursor-pointer hover:text-gray-900 ml-1">
                        {t('recent.signup.link')}
                      </span>
                    </AuthModal>
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <div className="relative">
              <img
                src="/lovable-uploads/017993f4-959f-4c9c-8b3a-ef124d31bbf5.png"
                alt={t('recent.image.alt')}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentActivitySection;
