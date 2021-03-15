import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Details from './details';
import PhotoCollection from './photo-collection';
import { getUserPhotosByUserId } from '../../services/firebase';
import useFirestoreUser from '../../hooks/use-firestore-user';

export default function UserProfile({ data }) {
  const { user } = useFirestoreUser();

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

  if (!user.userId) {
    return (
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center">
          <Skeleton circle height={160} width={160} className="mr-3" />
        </div>
        <Skeleton height={180} width={400} className="col-span-2" />
      </div>
    );
  }

  return (
    <>
      <Details profileData={data} postCount={photoCount} userData={user} />
      <div className="h-16 border-t border-gray-primary mt-12 pt-4">
        {data.privateProfile && !user.following.includes(data.userId) ? (
          <div className="flex flex-col items-center">
            <p className="text-black-light font-semibold mt-7">
              This Account is Private
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-14 text-black-light border border-black-light rounded-full p-2 mt-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-gray-base text-sm mt-3">
              Follow to see their photos and videos.
            </p>
          </div>
        ) : (
          <PhotoCollection data={photos} />
        )}
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
    allowSuggestions: PropTypes.bool.isRequired,
    privateProfile: PropTypes.bool.isRequired,
  }).isRequired,
};
