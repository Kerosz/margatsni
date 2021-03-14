import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Details from './details';
import PhotoCollection from './photo-collection';
import { getUserPhotosByUserId } from '../../services/firebase';

export default function UserProfile({ data }) {
  const [photos, setPhotos] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);

  useEffect(() => {
    async function getProfileData() {
      const userPhotos = await getUserPhotosByUserId(data.userId);

      setPhotos(userPhotos);
      setPhotoCount(userPhotos.length);
    }

    getProfileData();
  }, [data.userId]);

  return (
    <>
      <Details profileData={data} postCount={photoCount} />
      <div className="h-16 border-t border-gray-primary mt-12 pt-4">
        <PhotoCollection data={photos} />
      </div>
    </>
  );
}

UserProfile.propTypes = {
  data: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    followers: PropTypes.arrayOf(PropTypes.string).isRequired,
    following: PropTypes.arrayOf(PropTypes.string).isRequired,
    userInfo: PropTypes.shape({
      bio: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }).isRequired,
    photoURL: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
