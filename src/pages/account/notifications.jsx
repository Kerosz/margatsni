import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Header from '../../components/header';
import Sidebar from '../../components/settings/sidebar';
import Notifications from '../../components/settings/notifications';
import useUserSettings from '../../hooks/use-user-settings';
import BottomNavigation from '../../components/bottom-navigation';

export default function NotificationsPage() {
  const { pathname } = useLocation();
  const { settings } = useUserSettings();

  useEffect(() => {
    document.title = `Notifications - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-2.5 sm:mb-6 mb-16">
        <div className="bg-white border border-gray-primary grid grid-cols-4 gap-0 rounded">
          <div className="border-r border-gray-primary">
            <Sidebar activePanel={pathname} />
          </div>
          <div className="col-span-3 sm:px-14 py-6 px-4">
            {settings ? (
              <Notifications
                notificationData={settings.notification}
                userDocId={settings.docId}
              />
            ) : (
              <Skeleton count={6} height={155} className="mb-5" />
            )}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
