import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../components/header';
import Sidebar from '../../../components/settings/sidebar';
import ChangePassword from '../../../components/settings/change-password';
import useFirestoreUser from '../../../hooks/use-firestore-user';
import BottomNavigation from '../../../components/bottom-navigation';

export default function ChangePasswordPage() {
  const { user } = useFirestoreUser();
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `Change Password - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-2.5 sm:mb-6 mb-16">
        <div className="bg-white border border-gray-primary grid grid-cols-4 gap-0 rounded">
          <div className="border-r border-gray-primary">
            <Sidebar activePanel={pathname} />
          </div>
          <div className="col-span-3">
            <ChangePassword username={user.username} photo={user.photoURL} />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
