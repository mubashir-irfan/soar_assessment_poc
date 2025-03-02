// src/components/EditProfile.tsx

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../types';
import { FaPencilAlt } from 'react-icons/fa';
import { FormInput, Button, TextButton } from '../components';
import { mockDataService } from '../services/mockData';

function EditProfile() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [stagedProfile, setStagedProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    mockDataService.getUserProfile().then((profile: UserProfile) => {
      setUserProfile(profile);
      setStagedProfile(profile);
    });
  }, []);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('handle save', stagedProfile, userProfile);
    if (stagedProfile) {
      setUserProfile(stagedProfile);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      setStagedProfile(userProfile);
      setIsEditing(false);
    }
  };

  if (!stagedProfile) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(() => { })} className="w-full">
      <div className="md:grid md:grid-cols-[20%_80%] items-start">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <div className="relative">
            <img
              src={stagedProfile.avatarURL || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="rounded-full w-24 h-24 object-cover"
            />
            {isEditing && (
              <label htmlFor="image-upload" className="absolute bottom-0 right-0 cursor-pointer">
                <div className="bg-black rounded-full p-2">
                  <FaPencilAlt className="text-white" />
                </div>
              </label>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.name')}
              value={stagedProfile.name}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, name: e.target.value })}
              error={errors.name?.message}
              id="name"
              aria-describedby="name-error"
              aria-invalid={!!errors.name}
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.userName')}
              value={stagedProfile.userName}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, userName: e.target.value })}
              error={errors.userName?.message}
              id="userName"
              aria-describedby="userName-error"
              aria-invalid={!!errors.userName}
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.email')}
              type="email"
              value={stagedProfile.email}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, email: e.target.value })}
              error={errors.email?.message}
              id="email"
              aria-describedby="email-error"
              aria-invalid={!!errors.email}
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.password')}
              type="password"
              value={stagedProfile.password}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, password: e.target.value })}
              error={errors.password?.message}
              id="password"
              aria-describedby="password-error"
              aria-invalid={!!errors.password}
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.dateOfBirth')}
              type="date"
              value={stagedProfile.dateOfBirth || ""}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, dateOfBirth: e.target.value })}
              id="dateOfBirth"
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.presentAddress')}
              value={stagedProfile.presentAddress || ""}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, presentAddress: e.target.value })}
              id="presentAddress"
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.permanentAddress')}
              value={stagedProfile.permanentAddress || ""}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, permanentAddress: e.target.value })}
              id="permanentAddress"
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.city')}
              value={stagedProfile.city || ""}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, city: e.target.value })}
              id="city"
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.postalCode')}
              value={stagedProfile.postalCode || ""}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, postalCode: e.target.value })}
              id="postalCode"
              readOnly={!isEditing}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <FormInput
              label={t('settings.editProfile.country')}
              value={stagedProfile.country || ""}
              onChange={(e) => isEditing && setStagedProfile({ ...stagedProfile, country: e.target.value })}
              id="country"
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 md:text-right ms-auto md:w-fit">
        {isEditing ? (
          <>
            <div className='flex flex-col-reverse lg:flex-row gap-2 md:gap-4 items-end'>
              <div className='mx-auto'><TextButton onClick={handleCancel}>{t('settings.editProfile.cancel')}</TextButton></div>
              <Button label={t('settings.editProfile.save')} onClick={handleSave} className='w-full'/>
            </div>
          </>
        ) : (
          <Button label="Edit" onClick={handleEdit} className='w-full' />
        )}
      </div>
    </form>
  );
}

export default EditProfile;