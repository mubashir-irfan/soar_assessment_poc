import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components';
import ThemeSwitcher from '../components/ThemeSwitcher';

function Preferences() {
  const { t } = useTranslation();

  return (
    <div className='flex flex-col items-center md:flex-row gap-4 p-4 md:justify-between'>
      <div className='flex flex-col gap-2 border-b py-2'>
        <p className='text-text-secondary'>{t('settings.preferences.language')}</p>
        <LanguageSwitcher />
      </div>
      <div className='flex flex-col gap-2 py-2'>
        <p className='text-text-secondary'>{t('settings.preferences.theme')}</p>
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default Preferences;
