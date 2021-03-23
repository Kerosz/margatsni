import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../context/firebase';
import { useUserContext } from '../context/user';

export default function useUserNotifications() {
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
        const data = [];

        snapshot.docs.forEach((doc) =>
          data.push({
            docId: doc.id,
            ...doc.data(),
          }),
        );

        setNotification(data);
      });

    return () => unsubscribe();
  }, [user]);

  return { notifications: notificationState };
}
