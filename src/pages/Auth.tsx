
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get('mode');
    if (mode === 'login') {
      setIsLogin(true);
    } else if (mode === 'signup') {
      setIsLogin(false);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        navigate('/');
      } else {
        await signUp(formData.email, formData.password, formData.fullName);
        navigate('/');
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
    
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md">
        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <LanguageToggle />
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">SmartLine</h1>
          </Link>
          <p className="text-gray-600">{t('auth.tagline')}</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? t('auth.welcome.back') : t('auth.get.started')}
            </CardTitle>
            <CardDescription>
              {isLogin ? t('auth.signin.description') : t('auth.signup.description')}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('auth.fullname')}</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder={t('auth.fullname.placeholder')}
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('auth.email.placeholder')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                  dir="ltr"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t('auth.password.placeholder')}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-12"
                  dir="ltr"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-medium bg-primary-600 hover:bg-primary-700"
                disabled={loading}
              >
                {loading 
                  ? (isLogin ? t('auth.signing.in') : t('auth.creating.account'))
                  : (isLogin ? t('auth.signin.button') : t('auth.signup.button'))
                }
              </Button>
            </form>

            {/* Switch between login/register */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? t('auth.no.account') : t('auth.have.account')}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 hover:text-primary-700 font-medium p-0 h-auto"
              >
                {isLogin ? t('auth.signup.here') : t('auth.signin.here')}
              </Button>
            </div>

            {/* Back to home */}
            <div className="mt-4 text-center">
              <Link to="/">
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                  {t('auth.back.home')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>{t('auth.terms')}</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
