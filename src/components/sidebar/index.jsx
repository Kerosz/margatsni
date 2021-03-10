import useFirestoreUser from '../../hooks/use-firestore-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const { user } = useFirestoreUser();
  const { username, fullName, userId, photoURL, following } = user;

  return (
    <div className="p-4">
      <User userData={{ username, fullName, photoURL }} />
      <Suggestions userId={userId} userFollowing={following} />
    </div>
  );
}
