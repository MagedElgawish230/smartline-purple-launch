
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
    
    // Go Anywhere Section
    'go.title': 'Go anywhere with SmartLine',
    'go.pickup': 'Pickup location',
    'go.dropoff': 'Dropoff location',
    'go.today': 'Today',
    'go.now': 'Now',
    'go.see_prices': 'See prices',
    'go.login_activity': 'Log in to see your recent activity',
    'go.image.alt': 'Go anywhere illustration',
    
    // Recent Activity Section
    'recent.title': 'Log in to see your recent activity',
    'recent.description': 'View past trips, tailored suggestions, support resources, and more.',
    'recent.login': 'Log in to your account',
    'recent.signup.text': "Don't have a SmartLine account?",
    'recent.signup.link': 'Sign up',
    'recent.image.alt': 'Recent activity illustration',
    
    // Drive and Earn Section
    'drive.title': 'Drive when you want, make what you need',
    'drive.description': 'Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through SmartLine.',
    'drive.cta': 'Get started',
    'drive.signin.text': 'Already have an account?',
    'drive.signin.link': 'Sign in',
    'drive.image.alt': 'Drive and earn illustration',
    
    // Apps Section
    'apps.title': "It's easier in the apps",
    'apps.smartline.title': 'Download the SmartLine app',
    'apps.driver.title': 'Download the Driver app',
    'apps.scan': 'Scan to download',
    
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
    'download.title': 'Download SmartLine',
    'download.subtitle': 'Get the app and start your journey',
    'download.description': 'Available on all platforms. Download now and get your first ride free!',
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
    
    // Authentication
    'auth.welcome.back': 'Welcome Back',
    'auth.get.started': 'Get Started',
    'auth.signin.description': 'Sign in to your account to continue',
    'auth.signup.description': 'Create your SmartLine account today',
    'auth.fullname': 'Full Name',
    'auth.fullname.placeholder': 'Enter your full name',
    'auth.email': 'Email',
    'auth.email.placeholder': 'Enter your email',
    'auth.password': 'Password',
    'auth.password.placeholder': 'Enter your password',
    'auth.signin.button': 'Sign In',
    'auth.signup.button': 'Create Account',
    'auth.signing.in': 'Signing In...',
    'auth.creating.account': 'Creating Account...',
    'auth.no.account': "Don't have an account?",
    'auth.have.account': 'Already have an account?',
    'auth.signup.here': 'Sign up here',
    'auth.signin.here': 'Sign in here',
    'auth.back.home': '← Back to Home',
    'auth.terms': 'By continuing, you agree to our Terms of Service and Privacy Policy',
    'auth.tagline': 'Your smart transportation solution',
    
    // Feedback Section
    'feedback.title': 'Share Your Feedback',
    'feedback.subtitle': 'Help us improve SmartLine by sharing your experience and rating our service',
    'feedback.rate.experience': 'Rate Your Experience',
    'feedback.rating.poor': 'Poor',
    'feedback.rating.fair': 'Fair',
    'feedback.rating.good': 'Good',
    'feedback.rating.very.good': 'Very Good',
    'feedback.rating.excellent': 'Excellent',
    'feedback.your.feedback': 'Your Feedback',
    'feedback.placeholder': 'Tell us about your experience with SmartLine...',
    'feedback.submit': 'Submit Feedback',
    'feedback.thank.you': 'Thank You!',
    'feedback.thanks.message': 'Thank you for your feedback! We appreciate your input.',
    'feedback.helps.message': 'Your feedback helps us provide better service to all our users',
    
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
    
    // Go Anywhere Section
    'go.title': 'اذهب إلى أي مكان مع سمارت لاين',
    'go.pickup': 'نقطة الانطلاق',
    'go.dropoff': 'نقطة الوصول',
    'go.today': 'اليوم',
    'go.now': 'الآن',
    'go.see_prices': 'عرض الأسعار',
    'go.login_activity': 'تسجيل الدخول لعرض نشاطك الأخير',
    'go.image.alt': 'اذهب إلى أي مكان',
    
    // Recent Activity Section
    'recent.title': 'سجل الدخول لعرض نشاطك الأخير',
    'recent.description': 'اعرض الرحلات السابقة والاقتراحات المخصصة وموارد الدعم والمزيد.',
    'recent.login': 'تسجيل الدخول إلى حسابك',
    'recent.signup.text': 'ليس لديك حساب سمارت لاين؟',
    'recent.signup.link': 'إنشاء حساب',
    'recent.image.alt': 'النشاط الأخير',
    
    // Drive and Earn Section
    'drive.title': 'اقد متى تريد، اكسب ما تحتاج',
    'drive.description': 'اكسب المال وفقاً لجدولك الزمني مع التوصيل أو الركوب - أو كليهما. يمكنك استخدام سيارتك الخاصة أو اختيار استئجار واحدة من خلال سمارت لاين.',
    'drive.cta': 'ابدأ الآن',
    'drive.signin.text': 'لديك حساب بالفعل؟',
    'drive.signin.link': 'تسجيل الدخول',
    'drive.image.alt': 'اقد واكسب',
    
    // Apps Section
    'apps.title': 'الأمر أسهل في التطبيقات',
    'apps.smartline.title': 'تحميل تطبيق سمارت لاين',
    'apps.driver.title': 'تحميل تطبيق السائق',
    'apps.scan': 'امسح للتحميل',
    
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
    'download.title': 'تحميل سمارت لاين',
    'download.subtitle': 'احصل على التطبيق وابدأ رحلتك',
    'download.description': 'متوفر على جميع المنصات. حمل الآن واحصل على رحلتك الأولى مجاناً!',
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
    
    // Authentication
    'auth.welcome.back': 'مرحباً بك مرة أخرى',
    'auth.get.started': 'ابدأ الآن',
    'auth.signin.description': 'سجل الدخول إلى حسابك للمتابعة',
    'auth.signup.description': 'أنشئ حساب سمارت لاين اليوم',
    'auth.fullname': 'الاسم الكامل',
    'auth.fullname.placeholder': 'أدخل اسمك الكامل',
    'auth.email': 'البريد الإلكتروني',
    'auth.email.placeholder': 'أدخل بريدك الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.password.placeholder': 'أدخل كلمة المرور',
    'auth.signin.button': 'تسجيل الدخول',
    'auth.signup.button': 'إنشاء حساب',
    'auth.signing.in': 'جارٍ تسجيل الدخول...',
    'auth.creating.account': 'جارٍ إنشاء الحساب...',
    'auth.no.account': 'ليس لديك حساب؟',
    'auth.have.account': 'لديك حساب بالفعل؟',
    'auth.signup.here': 'إنشاء حساب هنا',
    'auth.signin.here': 'تسجيل الدخول هنا',
    'auth.back.home': '← العودة إلى الرئيسية',
    'auth.terms': 'بالمتابعة، أنت توافق على شروط الخدمة وسياسة الخصوصية',
    'auth.tagline': 'حلك الذكي للنقل',
    
    // Feedback Section
    'feedback.title': 'شاركنا رأيك',
    'feedback.subtitle': 'ساعدنا في تحسين سمارت لاين من خلال مشاركة تجربتك وتقييم خدمتنا',
    'feedback.rate.experience': 'قيّم تجربتك',
    'feedback.rating.poor': 'ضعيف',
    'feedback.rating.fair': 'مقبول',
    'feedback.rating.good': 'جيد',
    'feedback.rating.very.good': 'جيد جداً',
    'feedback.rating.excellent': 'ممتاز',
    'feedback.your.feedback': 'رأيك',
    'feedback.placeholder': 'أخبرنا عن تجربتك مع سمارت لاين...',
    'feedback.submit': 'إرسال التقييم',
    'feedback.thank.you': 'شكراً لك!',
    'feedback.thanks.message': 'شكراً لك على تقييمك! نحن نقدر مشاركتك.',
    'feedback.helps.message': 'تقييمك يساعدنا في تقديم خدمة أفضل لجميع مستخدمينا',
    
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
