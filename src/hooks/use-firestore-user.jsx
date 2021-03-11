import { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import { getUserDataByUserId } from '../services/firebase';

export default function useFirestoreUser() {
  const [currentUser, setCurrentUser] = useState({});
  const { user } = useUserContext();

  useEffect(() => {
    async function getUserData() {
      const response = await getUserDataByUserId(user.uid);

      // check to see if the state object is egual with the new object and return early else set state with returned object
      if (currentUser.userId === response.userId) return;
      setCurrentUser(response);
    }

    if (user?.uid) {
      getUserData();
    }
  }, []);

  return { user: currentUser };
}
