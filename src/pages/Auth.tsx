
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import DriverRegistrationForm from '@/components/DriverRegistrationForm';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { uploadDriverPhoto, uploadDriverDocument } from '@/utils/fileUpload';

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<'passenger' | 'driver'>('passenger');
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Check if we should show login or signup based on URL or query params
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
      } else {
        await signUp(formData.email, formData.password, formData.fullName, userRole);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
    
    setLoading(false);
  };

  const uploadFilesWithUserId = async (driverData: any, userId: string) => {
    const uploadedUrls: any = {};
    
    // Upload driver photo
    if (driverData.driverPhoto) {
      const photoUrl = await uploadDriverPhoto(driverData.driverPhoto, userId, 'driver_photo');
      if (photoUrl) uploadedUrls.driverPhotoUrl = photoUrl;
    }

    // Upload driving license files
    if (driverData.drivingLicense && driverData.drivingLicense.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.drivingLicense.length; i++) {
        const url = await uploadDriverDocument(driverData.drivingLicense[i], userId, 'driving_license', i);
        if (url) urls.push(url);
      }
      uploadedUrls.drivingLicenseUrls = urls;
    }

    // Upload leadership license files
    if (driverData.leadershipLicense && driverData.leadershipLicense.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.leadershipLicense.length; i++) {
        const url = await uploadDriverDocument(driverData.leadershipLicense[i], userId, 'leadership_license', i);
        if (url) urls.push(url);
      }
      uploadedUrls.leadershipLicenseUrls = urls;
    }

    // Upload driver card files
    if (driverData.driverCard && driverData.driverCard.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.driverCard.length; i++) {
        const url = await uploadDriverDocument(driverData.driverCard[i], userId, 'driver_card', i);
        if (url) urls.push(url);
      }
      uploadedUrls.driverCardUrls = urls;
    }

    // Upload car front photo files
    if (driverData.carFrontPhoto && driverData.carFrontPhoto.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.carFrontPhoto.length; i++) {
        const url = await uploadDriverDocument(driverData.carFrontPhoto[i], userId, 'car_front', i);
        if (url) urls.push(url);
      }
      uploadedUrls.carFrontUrls = urls;
    }

    // Upload car back photo files
    if (driverData.carBackPhoto && driverData.carBackPhoto.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.carBackPhoto.length; i++) {
        const url = await uploadDriverDocument(driverData.carBackPhoto[i], userId, 'car_back', i);
        if (url) urls.push(url);
      }
      uploadedUrls.carBackUrls = urls;
    }

    // Upload criminal record files
    if (driverData.criminalRecord && driverData.criminalRecord.length > 0) {
      const urls = [];
      for (let i = 0; i < driverData.criminalRecord.length; i++) {
        const url = await uploadDriverDocument(driverData.criminalRecord[i], userId, 'criminal_record', i);
        if (url) urls.push(url);
      }
      uploadedUrls.criminalRecordUrls = urls;
    }

    return uploadedUrls;
  };

  const handleDriverRegistration = async (driverData: any) => {
    setLoading(true);
    try {
      console.log('Driver registration data:', driverData);
      
      // First create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: driverData.email,
        password: driverData.password,
        options: {
          data: {
            full_name: `${driverData.firstName} ${driverData.lastName}`,
            role: 'driver'
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Now upload files with the real user ID
        const uploadedUrls = await uploadFilesWithUserId(driverData, authData.user.id);
        
        // Store driver application in database
        const { error: dbError } = await supabase
          .from('driver_applications')
          .insert({
            user_id: authData.user.id,
            first_name: driverData.firstName,
            last_name: driverData.lastName,
            email: driverData.email,
            phone: driverData.phone,
            identity_type: driverData.identityType,
            identity_number: driverData.identityNumber,
            password_confirmation: driverData.passwordConfirmation,
            driver_photo_url: uploadedUrls.driverPhotoUrl,
            driving_license_url: uploadedUrls.drivingLicenseUrls?.[0],
            leadership_license_url: uploadedUrls.leadershipLicenseUrls?.[0],
            driver_card_url: uploadedUrls.driverCardUrls?.[0],
            car_front_photo_url: uploadedUrls.carFrontUrls?.[0],
            car_back_photo_url: uploadedUrls.carBackUrls?.[0],
            criminal_record_url: uploadedUrls.criminalRecordUrls?.[0],
            status: 'pending'
          });

        if (dbError) {
          console.error('Database error:', dbError);
          throw dbError;
        }

        toast({
          title: "Registration Successful",
          description: "Your driver application has been submitted. Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      console.error('Driver registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register driver",
        variant: "destructive",
      });
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">SmartLine</h1>
          </Link>
          <p className="text-gray-600">Your smart transportation solution</p>
        </div>

        {/* Auth Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Welcome Back' : 'Get Started'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to your account to continue' 
                : 'Create your SmartLine account today'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {isLogin ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="h-12"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg font-medium bg-primary-600 hover:bg-primary-700"
                  disabled={loading}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">I want to join as:</Label>
                  <RadioGroup 
                    value={userRole} 
                    onValueChange={(value) => setUserRole(value as 'passenger' | 'driver')}
                    className="flex space-x-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="passenger" id="passenger" />
                      <Label htmlFor="passenger">Passenger</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="driver" id="driver" />
                      <Label htmlFor="driver">Driver</Label>
                    </div>
                  </RadioGroup>
                </div>

                {userRole === 'passenger' ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="h-12"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-lg font-medium bg-primary-600 hover:bg-primary-700"
                      disabled={loading}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                ) : (
                  <DriverRegistrationForm 
                    onSubmit={handleDriverRegistration}
                    loading={loading}
                  />
                )}
              </div>
            )}

            {/* Switch between login/register */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 hover:text-primary-700 font-medium p-0 h-auto"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </Button>
            </div>

            {/* Back to home */}
            <div className="mt-4 text-center">
              <Link to="/">
                <Button variant="ghost" className="text-gray-500 hover:text-gray-700">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Additional info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
