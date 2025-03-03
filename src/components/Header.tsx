import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuBellDot } from 'react-icons/lu';
import { mockDataService } from '../services/mockData';
import { UserProfile } from '../types';

type HeaderProps = {
  title: string;
  setIsMenuOpen: (isOpen: boolean) => void;
};

const Header = ({ title, setIsMenuOpen }: HeaderProps) => {
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    mockDataService.getUserProfile().then(setUserProfile);
  }, []);

  return (
    <header className="h-[6.8125rem] md:h-[6.25rem] lg:border-b lg:border-border-light dark:border-border-dark border-solid">
      <div className="px-4 py-2 flex items-center justify-between lg:justify-start ">
        <div className="lg:hidden">
          <AiOutlineMenu
            size={24}
            className="text-soar cursor-pointer"
            onClick={() => setIsMenuOpen(true)}
          />
        </div>
        <h1 className="font-[600] sm:text-[1.25rem] md:text-[1.75rem] text-soar lg:ml-4 lg:text-left text-center flex-grow">
          {title}
        </h1>

        {userProfile ? (
          <div className="flex gap-4 items-center">
            <div
              className={`hidden md:flex gap-2 justify-center items-center px-4 py-3 bg-background-secondary text-text-secondary rounded-[2.5rem]
               focus:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-soar focus-visible:ring-offset-1
               focus-visible:ring-offset-background-white`}
            >
              <HiMagnifyingGlass size={25} />
              <input
                className="bg-transparent placeholder-text-tertiary focus:outline-none"
                placeholder={t('navbar.searchForSomething')}
              />
            </div>

            <div className="hidden w-[3.125rem] h-[3.125rem] rounded-full bg-background-secondary text-text-secondary md:flex justify-center items-center cursor-pointer">
              <IoSettingsOutline size={25} />
            </div>
            <div className="hidden w-[3.125rem] h-[3.125rem] rounded-full bg-background-secondary text-soar-blue md:flex justify-center items-center cursor-pointer">
              <LuBellDot size={25} />
            </div>
            <img
              src={
                userProfile.avatarURL ||
                'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              }
              alt="Profile"
              className="rounded-full w-9 h-9 sm:w-12 sm:h-12 md:w-[3.75rem] md:h-[3.75rem] object-cover"
            />
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        className={`sm:hidden max-w-[90%] mx-auto mb-2 flex gap-2 justify-center items-center px-4 py-3 bg-background-secondary text-text-secondary rounded-[2.5rem]
        focus:outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-soar focus-visible:ring-offset-1
        focus-visible:ring-offset-background-white`}
      >
        <HiMagnifyingGlass size={25} />
        <input
          className="bg-transparent placeholder-text-tertiary focus:outline-none"
          placeholder={t('navbar.searchForSomething')}
        />
      </div>
    </header>
  );
};

export default Header;
