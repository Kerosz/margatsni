import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUserDataByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';
import BottomNavigation from '../components/bottom-navigation';

export default function Profile() {
  const history = useHistory();
  const { username } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const userData = await getUserDataByUsername(username);

      if (userData) {
        setUser(userData);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUser();
  }, [username, history]);

  useEffect(() => {
    if (user) {
      document.title = `${user.userInfo.fullName} (@${user.username}) - Instagram profile`;
    }
  }, [user]);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-3">
        <UserProfile profile={user} />
      </div>
      <BottomNavigation />
    </div>
  );
}
