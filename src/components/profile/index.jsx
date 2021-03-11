/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Details from './details';
import PhotoCollection from './photo-collection';
import { getUserPhotosByUserId } from '../../services/firebase';

export default function UserProfile({ data }) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getProfileData() {
      const userPhotos = await getUserPhotosByUserId(data.userId);

      // Performance check to avoid re-renders
      if (photos) {
        userPhotos.forEach((photo, idx) => {
          if (photo.photoId === photos[idx].photoId) return;

          setPhotos((oldPhotos) => [...oldPhotos, photo]);
        });
      } else {
        setPhotos(userPhotos);
      }
    }

    getProfileData();
  }, []);

  return (
    <>
      <div>{data.userId} user profile</div>
      <Details />
      <PhotoCollection data={photos} />
    </>
  );
}

UserProfile.propTypes = {
  data: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    fullName: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

// UserProfile.whyDidYouRender = true;
