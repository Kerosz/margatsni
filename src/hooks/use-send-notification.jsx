import { useCallback } from 'react';
import { createNotification, getUserDataByUserId } from '../services/firebase';

export default function useSendNotification(userDataId, sendMultiple = false) {
  const notify = useCallback(
    (notificationObject, notificationType) => {
      if (sendMultiple) {
        Promise.all(
          userDataId.map(async (userId) => {
            const user = await getUserDataByUserId(userId);

            return user;
          }),
        ).then((recieverData) => {
          recieverData.forEach((reciever) => {
            if (reciever.notification[notificationType] === 'off') return;

            const newNotificationObject = {
              ...notificationObject,
              recieverId: reciever.userId,
            };

            createNotification(newNotificationObject).then((result) => result);
          });
        });
      } else {
        getUserDataByUserId(userDataId).then((user) => {
          if (user.notification[notificationType] === 'off') return;

          createNotification(notificationObject).then((result) => result);
        });
      }
    },
    [userDataId],
  );

  return notify;
}
