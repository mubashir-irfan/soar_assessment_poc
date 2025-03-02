import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaPencilAlt } from 'react-icons/fa';
import { Button, FormInput, TextButton } from '../components';
import { EditProfileSkeleton } from '../components/skeletons';
import { mockDataService } from '../services/mockData';
import { UserProfile } from '../types';

function EditProfile() {
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stagedProfile, setStagedProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UserProfile>();

  useEffect(() => {
    mockDataService.getUserProfile().then((profile: UserProfile) => {
      setUserProfile(profile);
      setStagedProfile(profile);
      reset(profile);
    });
  }, [reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && stagedProfile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStagedProfile({ ...stagedProfile, avatarURL: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    console.log('onCancel', userProfile)
    if (userProfile) {
      setStagedProfile(userProfile);
      reset(userProfile)
      setIsEditing(false);
    }
  };

  const onValidSubmit = (data: UserProfile) => {
    setUserProfile(data);
    setIsEditing(false);
  };

  if (!stagedProfile) return <EditProfileSkeleton/>

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="w-full">
      <div className="md:grid lg:grid-cols-[20%_80%] items-start">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <div className="relative">
            <img src={stagedProfile.avatarURL || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
            {isEditing && (
              <label htmlFor="image-upload" className="absolute bottom-0 right-0 cursor-pointer">
                <div className="bg-black rounded-full p-2">
                  <FaPencilAlt className="text-white" />
                </div>
              </label>
            )}
            <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          {["name", "userName", "email", "password"].map((field) => (
            <div key={field} className="mb-4 md:mb-0">
              <Controller
                name={field as keyof UserProfile}
                control={control}
                rules={{ required: t(`settings.editProfile.fieldIsRequired`,{name: field}),
                validate: (val: string | number | undefined) => {
                  switch (field) {
                    case 'email':
                      if (val && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val.toString())) {
                        return t('common.invalidEmail');
                      }
                      break;
                    case 'password':
                      if (val) {
                        const password = val.toString();
                        const minLength = 8;
                        const hasUppercase = /[A-Z]/.test(password);
                        const hasLowercase = /[a-z]/.test(password);
                        const hasNumber = /[0-9]/.test(password);
                        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
              
                        if (password.length < minLength) {
                          return t('settings.editProfile.passwordMinLength', { length: minLength });
                        }
                        if (!hasUppercase) {
                          return t('settings.editProfile.passwordUppercase');
                        }
                        if (!hasLowercase) {
                          return t('settings.editProfile.passwordLowercase');
                        }
                        if (!hasNumber) {
                          return t('settings.editProfile.passwordNumber');
                        }
                        if (!hasSymbol) {
                          return t('settings.editProfile.passwordSymbol');
                        }
                      }
                      break;
                    default:
                      break; // No specific validation for other fields
                  }
                  return true; // Validation passed
                },
              }}
                render={({ field: controllerField }) => (
                  <FormInput
                    label={t(`settings.editProfile.${field}`)}
                    id={field}
                    type={field === "password" ? "password" : "text"}
                    error={errors[field as keyof UserProfile]?.message}
                    readOnly={!isEditing}
                    
                    {...controllerField}
                  />
                )}
              />
            </div>
          ))}
          {["dateOfBirth", "presentAddress", "permanentAddress", "city", "postalCode", "country"].map((field) => (
            <div key={field} className="mb-4 md:mb-0">
              <Controller
                name={field as keyof UserProfile}
                control={control}
                render={({ field: controllerField }) => (
                  <FormInput
                    label={t(`settings.editProfile.${field}`)}
                    id={field}
                    readOnly={!isEditing}
                    {...controllerField}
                  />
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 md:text-right">
        {isEditing ? (
          <div className='ms-auto w-full md:w-fit flex flex-col-reverse md:flex-row gap-2 md:gap-4 items-end items-center'>
            <TextButton onClick={handleCancel}>Cancel</TextButton>
            <Button label={t('settings.editProfile.save')} type='submit' className='w-full md:w-fit' />
          </div>
        ) : (
          <Button label="Edit" className='w-full md:w-fit' onClick={handleEdit} />
        )}
      </div>
    </form>
  );
}

export default EditProfile;
