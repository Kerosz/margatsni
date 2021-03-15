import { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import {
  getUserDataByUserId,
  getFollowingUserPhotosByUserId,
} from '../services/firebase';

export default function useUserPhotos() {
  const { user } = useUserContext();

  const [serverError, setServerError] = useState(null);
  const [userPhotos, setUserPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      try {
        const { following } = await getUserDataByUserId(user.uid);

        let followedUserPhotos = [];
        if (following.length > 0) {
          // if we follow other users get those photos and set state with the returned photos

          followedUserPhotos = await getFollowingUserPhotosByUserId(
            user.uid,
            following,
          );

          // Sorts the user photos by date returning the newest first.
          followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);

          if (userPhotos) {
            followedUserPhotos.forEach((photo, idx) => {
              if (photo.photoId === userPhotos[idx].photoId) return;

              setUserPhotos((oldPhotos) => [...oldPhotos, photo]);
            });
          } else {
            setUserPhotos(followedUserPhotos);
          }
        } else {
          // if we do not follow other users set state with the initial empty array

          setUserPhotos(followedUserPhotos);
        }
      } catch (error) {
        setServerError(error.message);
      }
    }

    if (user?.uid) {
      getTimelinePhotos();
    }
  }, [user.uid]);

  return { photos: userPhotos, error: serverError };
}
