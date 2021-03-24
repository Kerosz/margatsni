import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Header from '../../components/header';
import Sidebar from '../../components/settings/sidebar';
import PrivacyAndSecurity from '../../components/settings/privacy-and-security';
import useUserSettings from '../../hooks/use-user-settings';

export default function PrivacyAndSecurityPage() {
  const { settings } = useUserSettings();
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `Privacy And Security - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-2.5 mb-6">
        <div className="bg-white border border-gray-primary grid grid-cols-4 gap-0 rounded">
          <div className="border-r border-gray-primary">
            <Sidebar activePanel={pathname} />
          </div>
          <div className="col-span-3 py-8 px-16">
            {settings ? (
              <PrivacyAndSecurity
                privateStatus={settings.privateProfile}
                suggestedStatus={settings.allowSuggestions}
                userDocId={settings.docId}
                userEmail={settings.emailAddress}
              />
            ) : (
              <Skeleton count={1} height={350} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
