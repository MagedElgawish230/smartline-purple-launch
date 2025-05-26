
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Your Smart Ride Solution',
    'hero.subtitle': 'Experience the future of transportation with SmartLine',
    'hero.description': 'Safe, reliable, and affordable rides at your fingertips. Book your ride in seconds and travel with confidence.',
    'hero.cta': 'Get Started',
    'hero.download': 'Download App',
    'hero.drive.title': 'Drive with SmartLine',
    'hero.drive.description': 'Earn money on your schedule. Join thousands of drivers making extra income.',
    'hero.drive.cta': 'Start Driving',
    'hero.ride.title': 'Ride with SmartLine',
    'hero.ride.description': 'Get where you need to go quickly and safely with just a few taps.',
    'hero.ride.cta': 'Get a Ride',
    
    // About Section
    'about.title': 'About SmartLine',
    'about.subtitle': 'We are committed to providing safe, reliable, and affordable transportation solutions for everyone.',
    'about.safety.title': 'Safety First',
    'about.safety.description': 'Your safety is our top priority. All drivers are background-checked and vehicles are regularly inspected.',
    'about.speed.title': 'Fast & Reliable',
    'about.speed.description': 'Get a ride in minutes with our advanced matching algorithm and extensive driver network.',
    'about.affordable.title': 'Affordable Prices',
    'about.affordable.description': 'Transparent pricing with no hidden fees. Pay what you see upfront.',
    
    // Download Section
    'download.title': 'Download SmartLine Apps',
    'download.subtitle': 'Get the app that suits your needs',
    'download.driver.title': 'SmartLine Driver',
    'download.driver.description': 'Start earning money by driving with SmartLine. Flexible hours, competitive rates.',
    'download.driver.benefit1': 'Earn up to $25/hour',
    'download.driver.benefit2': 'Insurance coverage included',
    'download.driver.benefit3': 'Flexible working hours',
    'download.customer.title': 'SmartLine Rider',
    'download.customer.description': 'Get reliable rides whenever you need them. Safe, fast, and affordable.',
    'download.customer.benefit1': 'Quick and easy booking',
    'download.customer.benefit2': 'Real-time tracking',
    'download.customer.benefit3': 'Multiple payment options',
    'download.ios': 'Download on the App Store',
    'download.android': 'Get it on Google Play',
    
    // Promotions Section
    'promo.title': 'Special Offers',
    'promo.subtitle': 'Exclusive deals for SmartLine users',
    'promo.first.title': 'First Ride Free',
    'promo.first.description': 'New users get their first ride completely free. Use code: WELCOME',
    'promo.weekend.title': '20% Off Weekends',
    'promo.weekend.description': 'Enjoy 20% discount on all weekend rides. Valid Friday to Sunday.',
    'promo.premium.title': 'Premium Member Benefits',
    'promo.premium.description': 'Join Premium and get priority booking, luxury cars, and exclusive discounts.',
    
    // Referral Section
    'referral.title': 'Invite Friends & Earn Points',
    'referral.subtitle': 'Share SmartLine with friends and earn rewards for every successful referral',
    'referral.earn.title': 'Earn 250 Points',
    'referral.earn.description': 'Get 250 points for every friend who signs up and takes their first ride using your code.',
    'referral.invite.title': 'Easy Sharing',
    'referral.invite.description': 'Share your unique referral code with friends through social media, email, or text.',
    'referral.rewards.title': 'Redeem Rewards',
    'referral.rewards.description': 'Use your points for free rides, discounts, or premium features in the app.',
    'referral.points.title': 'Points Per Referral',
    'referral.points.description': 'Each successful invitation earns you 250 points that you can redeem for rewards.',
    'referral.code.label': 'Your Referral Code:',
    'referral.enter.title': 'Have a Referral Code?',
    'referral.enter.description': 'Enter a friend\'s referral code to get bonus points on your first ride.',
    'referral.enter.placeholder': 'Enter referral code',
    'referral.enter.submit': 'Apply Code',
    
    // Testimonials Section
    'testimonials.title': 'What Our Users Say',
    'testimonials.subtitle': 'Real experiences from real people',
    'testimonials.user1.name': 'Sarah Johnson',
    'testimonials.user1.role': 'Business Professional',
    'testimonials.user1.text': 'SmartLine has transformed my daily commute. Always on time, professional drivers, and great prices!',
    'testimonials.user2.name': 'Ahmed Al-Rashid',
    'testimonials.user2.role': 'University Student',
    'testimonials.user2.text': 'The app is so easy to use and the student discounts are amazing. Highly recommended!',
    'testimonials.user3.name': 'Maria Garcia',
    'testimonials.user3.role': 'Healthcare Worker',
    'testimonials.user3.text': 'Safe, reliable rides even during late hours. SmartLine gives me peace of mind.',
    
    // Contact Section
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have questions? We\'re here to help you 24/7.',
    'contact.info.title': 'Contact Information',
    'contact.phone.title': 'Phone',
    'contact.phone.number': '+1 (555) 123-4567',
    'contact.email.title': 'Email',
    'contact.email.address': 'support@smartline.com',
    'contact.address.title': 'Address',
    'contact.address.location': '123 Innovation Drive, Tech City, TC 12345',
    'contact.form.title': 'Send us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.name.placeholder': 'Enter your full name',
    'contact.form.email': 'Email Address',
    'contact.form.email.placeholder': 'Enter your email address',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'How can we help you?',
    'contact.form.submit': 'Send Message',
    
    // Footer
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.press': 'Press',
    'footer.support': 'Support',
    'footer.help': 'Help Center',
    'footer.safety': 'Safety',
    'footer.contact': 'Contact Us',
    'footer.legal': 'Legal',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookies': 'Cookie Policy',
    'footer.follow': 'Follow Us',
    'footer.rights': '© 2024 SmartLine. All rights reserved.',
    'footer.tagline': 'Your Smart Ride Solution'
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عن الشركة',
    'nav.contact': 'اتصل بنا',
    
    // Hero Section
    'hero.title': 'حلك الذكي للتنقل',
    'hero.subtitle': 'اختبر مستقبل المواصلات مع سمارت لاين',
    'hero.description': 'رحلات آمنة وموثوقة وبأسعار معقولة في متناول يدك. احجز رحلتك في ثوانٍ وسافر بثقة.',
    'hero.cta': 'ابدأ الآن',
    'hero.download': 'تحميل التطبيق',
    'hero.drive.title': 'قد مع سمارت لاين',
    'hero.drive.description': 'اكسب المال وفقاً لجدولك الزمني. انضم إلى آلاف السائقين الذين يحققون دخلاً إضافياً.',
    'hero.drive.cta': 'ابدأ القيادة',
    'hero.ride.title': 'اركب مع سمارت لاين',
    'hero.ride.description': 'اذهب إلى حيث تريد بسرعة وأمان ببضع نقرات فقط.',
    'hero.ride.cta': 'احجز رحلة',
    
    // About Section
    'about.title': 'عن سمارت لاين',
    'about.subtitle': 'نحن ملتزمون بتوفير حلول نقل آمنة وموثوقة وبأسعار معقولة للجميع.',
    'about.safety.title': 'الأمان أولاً',
    'about.safety.description': 'سلامتك أولويتنا القصوى. جميع السائقين يخضعون لفحص خلفية والمركبات تُفحص بانتظام.',
    'about.speed.title': 'سريع وموثوق',
    'about.speed.description': 'احصل على رحلة في دقائق مع خوارزمية المطابقة المتقدمة وشبكة السائقين الواسعة.',
    'about.affordable.title': 'أسعار معقولة',
    'about.affordable.description': 'تسعير شفاف بدون رسوم خفية. ادفع ما تراه مقدماً.',
    
    // Download Section
    'download.title': 'تحميل تطبيقات سمارت لاين',
    'download.subtitle': 'احصل على التطبيق الذي يناسب احتياجاتك',
    'download.driver.title': 'سمارت لاين للسائقين',
    'download.driver.description': 'ابدأ في كسب المال من خلال القيادة مع سمارت لاين. ساعات مرنة، أسعار تنافسية.',
    'download.driver.benefit1': 'اكسب حتى 25 دولار/ساعة',
    'download.driver.benefit2': 'تغطية تأمينية شاملة',
    'download.driver.benefit3': 'ساعات عمل مرنة',
    'download.customer.title': 'سمارت لاين للركاب',
    'download.customer.description': 'احصل على رحلات موثوقة كلما احتجت إليها. آمنة وسريعة وبأسعار معقولة.',
    'download.customer.benefit1': 'حجز سريع وسهل',
    'download.customer.benefit2': 'تتبع في الوقت الفعلي',
    'download.customer.benefit3': 'خيارات دفع متعددة',
    'download.ios': 'التحميل من App Store',
    'download.android': 'التحميل من Google Play',
    
    // Promotions Section
    'promo.title': 'عروض خاصة',
    'promo.subtitle': 'صفقات حصرية لمستخدمي سمارت لاين',
    'promo.first.title': 'الرحلة الأولى مجاناً',
    'promo.first.description': 'المستخدمون الجدد يحصلون على رحلتهم الأولى مجاناً. استخدم الكود: WELCOME',
    'promo.weekend.title': 'خصم 20% في عطلة نهاية الأسبوع',
    'promo.weekend.description': 'استمتع بخصم 20% على جميع رحلات عطلة نهاية الأسبوع. صالح من الجمعة إلى الأحد.',
    'promo.premium.title': 'مزايا العضوية المميزة',
    'promo.premium.description': 'انضم للعضوية المميزة واحصل على أولوية الحجز وسيارات فاخرة وخصومات حصرية.',
    
    // Referral Section
    'referral.title': 'ادع الأصدقاء واكسب النقاط',
    'referral.subtitle': 'شارك سمارت لاين مع الأصدقاء واحصل على مكافآت مقابل كل إحالة ناجحة',
    'referral.earn.title': 'اكسب 250 نقطة',
    'referral.earn.description': 'احصل على 250 نقطة مقابل كل صديق يسجل ويأخذ رحلته الأولى باستخدام كودك.',
    'referral.invite.title': 'مشاركة سهلة',
    'referral.invite.description': 'شارك كود الإحالة الفريد الخاص بك مع الأصدقاء عبر وسائل التواصل الاجتماعي أو البريد الإلكتروني أو الرسائل النصية.',
    'referral.rewards.title': 'استبدل المكافآت',
    'referral.rewards.description': 'استخدم نقاطك للحصول على رحلات مجانية أو خصومات أو ميزات مميزة في التطبيق.',
    'referral.points.title': 'نقاط لكل إحالة',
    'referral.points.description': 'كل دعوة ناجحة تكسبك 250 نقطة يمكنك استبدالها بمكافآت.',
    'referral.code.label': 'كود الإحالة الخاص بك:',
    'referral.enter.title': 'لديك كود إحالة؟',
    'referral.enter.description': 'أدخل كود إحالة صديق للحصول على نقاط إضافية في رحلتك الأولى.',
    'referral.enter.placeholder': 'أدخل كود الإحالة',
    'referral.enter.submit': 'تطبيق الكود',
    
    // Testimonials Section
    'testimonials.title': 'ماذا يقول مستخدمونا',
    'testimonials.subtitle': 'تجارب حقيقية من أشخاص حقيقيين',
    'testimonials.user1.name': 'سارة جونسون',
    'testimonials.user1.role': 'مهنية أعمال',
    'testimonials.user1.text': 'سمارت لاين غيّر تنقلي اليومي. دائماً في الوقت المحدد، سائقون محترفون، وأسعار رائعة!',
    'testimonials.user2.name': 'أحمد الراشد',
    'testimonials.user2.role': 'طالب جامعي',
    'testimonials.user2.text': 'التطبيق سهل الاستخدام وخصومات الطلاب مذهلة. أنصح به بشدة!',
    'testimonials.user3.name': 'ماريا غارسيا',
    'testimonials.user3.role': 'عاملة صحية',
    'testimonials.user3.text': 'رحلات آمنة وموثوقة حتى في ساعات متأخرة. سمارت لاين يمنحني راحة البال.',
    
    // Contact Section
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'لديك أسئلة؟ نحن هنا لمساعدتك على مدار الساعة.',
    'contact.info.title': 'معلومات الاتصال',
    'contact.phone.title': 'الهاتف',
    'contact.phone.number': '+1 (555) 123-4567',
    'contact.email.title': 'البريد الإلكتروني',
    'contact.email.address': 'support@smartline.com',
    'contact.address.title': 'العنوان',
    'contact.address.location': '123 طريق الابتكار، مدينة التقنية، TC 12345',
    'contact.form.title': 'أرسل لنا رسالة',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.name.placeholder': 'أدخل اسمك الكامل',
    'contact.form.email': 'عنوان البريد الإلكتروني',
    'contact.form.email.placeholder': 'أدخل عنوان بريدك الإلكتروني',
    'contact.form.message': 'الرسالة',
    'contact.form.message.placeholder': 'كيف يمكننا مساعدتك؟',
    'contact.form.submit': 'إرسال الرسالة',
    
    // Footer
    'footer.company': 'الشركة',
    'footer.about': 'عن الشركة',
    'footer.careers': 'الوظائف',
    'footer.press': 'الصحافة',
    'footer.support': 'الدعم',
    'footer.help': 'مركز المساعدة',
    'footer.safety': 'الأمان',
    'footer.contact': 'اتصل بنا',
    'footer.legal': 'قانوني',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.cookies': 'سياسة ملفات تعريف الارتباط',
    'footer.follow': 'تابعنا',
    'footer.rights': '© 2024 سمارت لاين. جميع الحقوق محفوظة.',
    'footer.tagline': 'حلك الذكي للتنقل'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
