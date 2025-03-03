import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components';
import ThemeSwitcher from '../components/ThemeSwitcher';

function Preferences() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center gap-4 p-4 mx-auto">
      <div className="flex flex-col gap-2 border-b py-2">
        <p className="text-text-secondary text-sm">{t('settings.preferences.language')}</p>
        <LanguageSwitcher />
      </div>
    </div>
  );
}

export default Preferences;
