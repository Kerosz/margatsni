import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header';
import Sidebar from '../../components/settings/sidebar';
import EditProfile from '../../components/settings/edit-profile';
import useFirestoreUser from '../../hooks/use-firestore-user';
import BottomNavigation from '../../components/bottom-navigation';

export default function EditProfilePage() {
  const { user } = useFirestoreUser();
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `Edit Profile - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-2.5 sm:mb-6 mb-16">
        <div className="bg-white border border-gray-primary grid sm:grid-cols-4 grid-cols-5 gap-0 rounded">
          <div className="border-r border-gray-primary">
            <Sidebar activePanel={pathname} />
          </div>
          <div className="sm:col-span-3 col-span-4">
            <EditProfile data={user} />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
