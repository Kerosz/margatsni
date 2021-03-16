import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header';
import Sidebar from '../../components/settings/sidebar';
import EditProfile from '../../components/settings/edit-profile';
import useFirestoreUser from '../../hooks/use-firestore-user';

export default function EditProfilePage() {
  const { user } = useFirestoreUser();
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `Edit Profile - Instagram`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-2.5">
        <div className="bg-white border border-gray-primary grid grid-cols-4 gap-0 rounded">
          <div className="border-r border-gray-primary">
            <Sidebar activePanel={pathname} />
          </div>
          <div className="col-span-3">
            <EditProfile data={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
