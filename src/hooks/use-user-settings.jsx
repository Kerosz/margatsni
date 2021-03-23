import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../context/firebase';
import { useUserContext } from '../context/user';

export default function useUserSettings() {
  const { user } = useUserContext();
  const { firebase } = useFirebaseContext();

  const [settingsDataState, setSettingsData] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .where('userId', '==', user.uid)
      .limit(1)
      .onSnapshot((snapshot) => {
        const data = [];

        snapshot.docs.forEach((doc) =>
          data.push({
            docId: doc.id,
            ...doc.data(),
          }),
        );

        if (data.length > 0) {
          setSettingsData(data[0]);
        }
      });

    return () => unsubscribe();
  }, [user]);

  return { settings: settingsDataState };
}
