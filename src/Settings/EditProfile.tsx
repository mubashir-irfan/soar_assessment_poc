import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../types';
import { FaPencilAlt } from 'react-icons/fa';
import { FormInput, Button } from '../components';
import { mockDataService } from '../services/mockData';
import { required, validEmail } from '../utils';

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

  if (!stagedProfile) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="w-full no-scrollbar">
      <div className="md:grid md:grid-cols-[20%_80%] items-start">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <div className="relative">
            <img src={stagedProfile.avatarURL || 'https://via.placeholder.com/100'} alt="Profile" className="rounded-full w-24 h-24 object-cover" />
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
                rules={{ required: t(`settings.editProfile.${field}Required`) }}
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
          <div className='ms-auto w-full md:w-fit flex flex-col-reverse md:flex-row gap-2'>
            <button type="button" onClick={handleCancel} className="ml-2">Cancel</button>
            <Button label={t('settings.editProfile.save')} type='submit' />
          </div>
        ) : (
          <Button label="Edit" className='w-full md:w-fit' onClick={handleEdit} />
        )}
      </div>
    </form>
  );
}

export default EditProfile;
