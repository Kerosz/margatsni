import { useEffect, useState } from 'react';
import { useUserContext } from '../context/user';
import {
  getUserDataByUserId,
  getFollowingUserPhotosByUserId,
} from '../services/firebase';

export default function useUserPhotos() {
  const { user } = useUserContext();

  const [userPhotos, setUserPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
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
          // if photos are not null check if the photo object in state is the same with the new photo object, if it's the same return early else add the new photo obj to state
          followedUserPhotos.forEach((photo, idx) => {
            if (photo.photoId === userPhotos[idx].photoId) return;

            setUserPhotos((oldPhotos) => [...oldPhotos, photo]);
          });
        } else {
          // if photos are null set the state with the returned photos
          setUserPhotos(followedUserPhotos);
        }
      } else {
        // if we do not follow other users set state with the initial empty array

        setUserPhotos(followedUserPhotos);
      }
    }

    if (user?.uid) {
      getTimelinePhotos();
    }
  }, []);

  return { photos: userPhotos };
}
