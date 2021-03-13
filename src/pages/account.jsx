import Header from '../components/header';
import Settings from '../components/settings';
import useFirestoreUser from '../hooks/use-firestore-user';

export default function Account() {
  const { user } = useFirestoreUser();

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-2.5">
        <Settings user={user} />
      </div>
    </div>
  );
}
