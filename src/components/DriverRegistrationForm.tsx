
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uploadDriverPhoto, uploadDriverDocument } from '@/utils/fileUpload';
import { useToast } from '@/hooks/use-toast';

interface DriverRegistrationFormProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const DriverRegistrationForm = ({ onSubmit, loading = false }: DriverRegistrationFormProps) => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    identityType: '',
    identityNumber: '',
    password: '',
    passwordConfirmation: '',
    driverPhoto: null as File | null,
    drivingLicense: [] as File[],
    leadershipLicense: [] as File[],
    driverCard: [] as File[],
    carFrontPhoto: [] as File[],
    carBackPhoto: [] as File[],
    criminalRecord: [] as File[],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const files = Array.from(e.target.files || []);
    
    if (fieldName === 'driverPhoto') {
      setFormData({
        ...formData,
        [fieldName]: files[0] || null,
      });
    } else {
      setFormData({
        ...formData,
        [fieldName]: files,
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      identityType: value,
    });
  };

  const uploadFiles = async (userId: string) => {
    const uploadedUrls: any = {};
    
    // Upload driver photo
    if (formData.driverPhoto) {
      const photoUrl = await uploadDriverPhoto(formData.driverPhoto, userId, 'driver_photo');
      if (photoUrl) uploadedUrls.driverPhotoUrl = photoUrl;
    }

    // Upload driving license files
    if (formData.drivingLicense.length > 0) {
      const urls = [];
      for (let i = 0; i < formData.drivingLicense.length; i++) {
        const url = await uploadDriverDocument(formData.drivingLicense[i], userId, 'driving_license', i);
        if (url) urls.push(url);
      }
      uploadedUrls.drivingLicenseUrls = urls;
    }

    // Upload leadership license files
    if (formData.leadershipLicense.length > 0) {
      const urls = [];
      for (let i = 0; i < formData.leadershipLicense.length; i++) {
        const url = await uploadDriverDocument(formData.leadershipLicense[i], userId, 'leadership_license', i);
        if (url) urls.push(url);
      }
      uploadedUrls.leadershipLicenseUrls = urls;
    }

    // Upload driver card files
    if (formData.driverCard.length > 0) {
      const urls = [];
      for (let i = 0; i < formData.driverCard.length; i++) {
        const url = await uploadDriverDocument(formData.driverCard[i], userId, 'driver_card', i);
        if (url) urls.push(url);
      }
      uploadedUrls.driverCardUrls = urls;
    }

    // Upload car front photo files
    if (formData.carFrontPhoto.length > 0) {
      const urls = [];
      for (let i = 0; i < formData.carFrontPhoto.length; i++) {
        const url = await uploadDriverDocument(formData.carFrontPhoto[i], userId, 'car_front', i);
        if (url) urls.push(url);
      }
      uploadedUrls.carFrontUrls = urls;
    }

    // Upload car back photo files
    if (formData.carBackPhoto.length > 0) {
      const urls = [];
      for (let i = 0; i < formData.carBackPhoto.length; i++) {
        const url = await uploadDriverDocument(formData.carBackPhoto[i], userId, 'car_back', i);
        if (url) urls.push(url);
      }
      uploadedUrls.carBackUrls = urls;
    }

    // Upload criminal record files
    if (formData.criminalRecord.length > 0) {
      const urls = [];
      for (let i = 0; i < formData.criminalRecord.length; i++) {
        const url = await uploadDriverDocument(formData.criminalRecord[i], userId, 'criminal_record', i);
        if (url) urls.push(url);
      }
      uploadedUrls.criminalRecordUrls = urls;
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.passwordConfirmation) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Generate a temporary user ID for file organization
    const tempUserId = Date.now().toString();
    
    try {
      // Upload files first
      const uploadedUrls = await uploadFiles(tempUserId);
      
      // Combine form data with uploaded file URLs
      const submissionData = {
        ...formData,
        ...uploadedUrls,
        tempUserId,
      };
      
      await onSubmit(submissionData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit driver registration",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const FileUploadField = ({ 
    label, 
    fieldName, 
    required = false,
    multiple = false 
  }: { 
    label: string; 
    fieldName: string; 
    required?: boolean;
    multiple?: boolean;
  }) => {
    const fieldValue = formData[fieldName as keyof typeof formData];
    const hasFiles = multiple 
      ? Array.isArray(fieldValue) && fieldValue.length > 0
      : fieldValue !== null;
    
    const getDisplayText = () => {
      if (!hasFiles) return t('driver.chooseFile');
      
      if (multiple && Array.isArray(fieldValue)) {
        return fieldValue.length === 1 
          ? fieldValue[0].name 
          : `${fieldValue.length} files selected`;
      }
      
      return (fieldValue as File)?.name || t('driver.chooseFile');
    };

    return (
      <div className="space-y-2">
        <Label htmlFor={fieldName} className={isRTL ? 'font-cairo' : 'font-inter'}>
          {label} {required && '*'}
        </Label>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Input
            id={fieldName}
            type="file"
            onChange={(e) => handleFileChange(e, fieldName)}
            accept="image/*,.pdf"
            multiple={multiple}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById(fieldName)?.click()}
            className={`flex-1 justify-start ${isRTL ? 'font-cairo' : 'font-inter'}`}
          >
            {getDisplayText()}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={`text-center text-xl ${isRTL ? 'font-cairo' : 'font-inter'}`}>
          {t('driver.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.firstName')} *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.lastName')} *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.email')} *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.phone')} *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.idType')} *
              </Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder={t('driver.selectIdType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national_id">{t('driver.nationalId')}</SelectItem>
                  <SelectItem value="passport">{t('driver.passport')}</SelectItem>
                  <SelectItem value="driver_license">{t('driver.driverLicense')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="identityNumber" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.idNumber')} *
              </Label>
              <Input
                id="identityNumber"
                name="identityNumber"
                type="text"
                value={formData.identityNumber}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.password')} *
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordConfirmation" className={isRTL ? 'font-cairo' : 'font-inter'}>
                {t('driver.confirmPassword')} *
              </Label>
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                value={formData.passwordConfirmation}
                onChange={handleInputChange}
                required
                className={`h-10 ${isRTL ? 'font-cairo text-right' : 'font-inter'}`}
              />
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <h3 className={`text-base font-semibold ${isRTL ? 'font-cairo' : 'font-inter'}`}>
              Required Documents
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FileUploadField 
                label={t('driver.driverPhoto')} 
                fieldName="driverPhoto" 
                required 
              />
              <FileUploadField 
                label={t('driver.drivingLicense')} 
                fieldName="drivingLicense" 
                required 
                multiple
              />
              <FileUploadField 
                label={t('driver.leadershipLicense')} 
                fieldName="leadershipLicense" 
                required 
                multiple
              />
              <FileUploadField 
                label={t('driver.driverCard')} 
                fieldName="driverCard" 
                required 
                multiple
              />
              <FileUploadField 
                label={t('driver.carFront')} 
                fieldName="carFrontPhoto" 
                required 
                multiple
              />
              <FileUploadField 
                label={t('driver.carBack')} 
                fieldName="carBackPhoto" 
                required 
                multiple
              />
            </div>
            
            <FileUploadField 
              label={t('driver.criminalRecord')} 
              fieldName="criminalRecord" 
              multiple
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-10 text-base font-medium bg-primary-600 hover:bg-primary-700"
            disabled={loading || uploading}
          >
            {uploading ? 'Uploading files...' : loading ? 'Submitting...' : t('driver.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DriverRegistrationForm;
