import useFirestoreUser from '../../hooks/use-firestore-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const { user } = useFirestoreUser();
  const { username, fullName, userId, photoURL, following } = user;

  return (
    <aside className="p-4 pt-0" aria-label="Profile information">
      <User userData={{ username, fullName, photoURL }} />
      <Suggestions userId={userId} userFollowing={following} />
    </aside>
  );
}
