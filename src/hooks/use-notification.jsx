import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../context/firebase';
import { useUserContext } from '../context/user';

export default function useNotification() {
  const { user } = useUserContext();
  const { firebase } = useFirebaseContext();

  const [notificationState, setNotification] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('notifications')
      .where('userId', '==', user.uid)
      .orderBy('dateCreated', 'desc')
      .limit(20)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          docId: doc.id,
          ...doc.data(),
        }));

        setNotification(data);
      });

    return () => unsubscribe();
  }, [user.uid]);

  return { notifications: notificationState };
}
