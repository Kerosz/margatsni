/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useFirebaseContext } from '../context/firebase';
import { getUserDataByUserId } from '../services/firebase';

/**
 * Function that gets data from `inbox` collection with it's associated user data and listens for changes.
 *
 * @param {string} docField Document field to be filtered by
 * @param {string} queryOperator The comparison operator for the query
 * @param {string} userId The user ID to be queried by
 * @param {boolean} includeSender Value to specify if the sender profile will be returned along with the reciever profiles. Defaults to `false`
 * @param {"rooms"|"chat"} queryType The type of query you are performing
 *
 * @returns {Array | null} An array of data or `null`
 */
export default function useInboxRoom(
  docField,
  queryOperator,
  userId,
  includeSender = false,
  queryType = 'rooms',
) {
  const { firebase } = useFirebaseContext();
  const [roomState, setRoom] = useState(null);
  const [roomWithUserState, setRoomWithUser] = useState(null);

  const collectionRef = firebase.firestore().collection('inbox');

  useEffect(() => {
    function getInboxData() {
      return collectionRef
        .where(docField, queryOperator, userId)
        .orderBy('dateUpdated', 'desc')
        .onSnapshot((snapshot) => {
          const data = [];

          snapshot.docs.forEach((doc) =>
            data.push({
              docId: doc.id,
              ...doc.data(),
            }),
          );

          setRoom(data);
        });
    }
    if (queryType === 'rooms') {
      const unsubscribe = getInboxData();

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    function getChatRoomData() {
      return collectionRef
        .where(docField, queryOperator, userId)
        .limit(1)
        .onSnapshot((snapshot) => {
          const data = [];

          snapshot.docs.forEach((doc) =>
            data.push({
              docId: doc.id,
              ...doc.data(),
            }),
          );

          setRoom(data);
        });
    }

    if (queryType === 'chat') {
      const unsubscribe = getChatRoomData();

      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    async function getRoomDataWithUser() {
      const roomsWithUserData = await Promise.all(
        roomState.map(async (room) => {
          let participants;

          if (includeSender) {
            participants = await Promise.all(
              room.roomParticipants.map(async (participantId) => {
                const userData = await getUserDataByUserId(participantId);

                return userData;
              }),
            );
          } else {
            participants = await Promise.all(
              room.roomParticipants.slice(1).map(async (participantId) => {
                const userData = await getUserDataByUserId(participantId);

                return userData;
              }),
            );
          }

          return { ...room, participants };
        }),
      );

      if (roomsWithUserData && queryType === 'rooms') {
        setRoomWithUser(roomsWithUserData);
      }

      if (roomsWithUserData && queryType === 'chat') {
        setRoomWithUser(roomsWithUserData[0]);
      }
    }

    if (roomState) {
      getRoomDataWithUser();
    }
  }, [roomState]);

  return { rooms: roomWithUserState };
}
