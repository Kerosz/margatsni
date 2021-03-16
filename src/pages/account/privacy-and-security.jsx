import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header';
import Sidebar from '../../components/settings/sidebar';
import PrivacyAndSecurity from '../../components/settings/privacy-and-security';
import useFirestoreUser from '../../hooks/use-firestore-user';

export default function PrivacyAndSecurityPage() {
  const { user } = useFirestoreUser();
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `Privacy And Security - Instagram`;
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
            <PrivacyAndSecurity
              privateStatus={user.privateProfile}
              suggestedStatus={user.allowSuggestions}
              userDocId={user.docId}
              userEmail={user.emailAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
