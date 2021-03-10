import { useState, useEffect } from 'react';
import { useFirebaseContext } from '../context/firebase';

export default function useAuthListener() {
  const localStorateUser = JSON.parse(
    localStorage.getItem('authUser'),
  );
  const [user, setUser] = useState(localStorateUser);
  const { firebase } = useFirebaseContext();

  useEffect(() => {
    const listener = firebase
      .auth()
      .onAuthStateChanged((authUser) => {
        if (authUser) {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          setUser(authUser);
        } else {
          localStorage.removeItem('authUser');
          setUser(null);
        }
      });

    return () => listener();
  }, [firebase]);

  return { user };
}
