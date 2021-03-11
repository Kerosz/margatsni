import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUserDataByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/header';
import UserProfile from '../components/profile';

export default function Profile() {
  const history = useHistory();
  const { username } = useParams();

  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const userData = await getUserDataByUsername(username);

      if (userData) {
        setUser(userData);
        setUserExists(true);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUser();
  }, [username, history]);

  useEffect(() => {
    if (user) {
      document.title = `${user.fullName} - Instagram profile`;
    }
  }, [user]);

  if (!userExists) {
    return <div>Loading</div>;
  }

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg">
        <UserProfile data={user} />
      </div>
    </div>
  );
}

// Profile.whyDidYouRender = true;
