import useFirestoreUser from '../../hooks/use-firestore-user';
import User from './user';
import Suggestions from './suggestions';

export default function Sidebar() {
  const { user } = useFirestoreUser();
  const {
    username,
    userInfo,
    userId,
    photoURL,
    following,
    verifiedUser,
  } = user;

  return (
    <aside
      className="hidden lg:block p-4 pt-0 sticky top-24 h-fit"
      aria-label="Profile information"
    >
      <User userData={{ username, userInfo, photoURL, verifiedUser }} />
      <Suggestions
        userData={{ username, userId, photoURL }}
        userFollowing={following}
      />
    </aside>
  );
}
