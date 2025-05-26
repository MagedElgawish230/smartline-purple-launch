
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Gift, Users, Star, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ReferralSection = () => {
  const { t, isRTL } = useLanguage();
  const [promoCode, setPromoCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SMARTLINE250');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('referral.title')}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isRTL ? 'font-cairo' : 'font-inter'}`}>
            {t('referral.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Referral Benefits */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('referral.earn.title')}
                  </h3>
                  <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('referral.earn.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('referral.invite.title')}
                  </h3>
                  <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('referral.invite.description')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold text-gray-900 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('referral.rewards.title')}
                  </h3>
                  <p className={`text-gray-600 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                    {t('referral.rewards.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Actions */}
          <div className="space-y-8">
            {/* Points Display */}
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">250</span>
              </div>
              <h3 className={`text-2xl font-bold text-gray-900 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('referral.points.title')}
              </h3>
              <p className={`text-gray-600 mb-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('referral.points.description')}
              </p>
              
              {/* Share Code */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className={`text-sm text-gray-600 mb-2 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                  {t('referral.code.label')}
                </p>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <code className="bg-white px-4 py-2 rounded-lg font-mono text-lg font-bold text-primary-600 flex-1">
                    SMARTLINE250
                  </code>
                  <Button
                    onClick={handleCopyCode}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1 rtl:space-x-reverse"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Enter Code */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className={`text-xl font-bold text-gray-900 mb-4 text-center ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('referral.enter.title')}
              </h3>
              <p className={`text-gray-600 mb-6 text-center ${isRTL ? 'font-cairo' : 'font-inter'}`}>
                {t('referral.enter.description')}
              </p>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder={t('referral.enter.placeholder')}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 text-center font-mono text-lg"
                />
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold text-lg">
                  {t('referral.enter.submit')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralSection;
