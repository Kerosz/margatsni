import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Image } from 'cloudinary-react';
import { getSavedPosts } from '../../services/firebase';

export default function SavedCollection({ userSavedPosts }) {
  const [savedPhotos, setSavedPhotos] = useState(null);

  useEffect(() => {
    async function getUserSavedPosts() {
      const savedUserPhotos = await getSavedPosts(userSavedPosts);

      setSavedPhotos(savedUserPhotos);
    }

    if (userSavedPosts.length > 0) {
      getUserSavedPosts();
    }
  }, [userSavedPosts]);

  if (userSavedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-gray-base text-xs self-start">
          Only you can see what you've saved
        </p>
        <div className="mt-10 text-center w-full flex flex-col items-center">
          <svg
            className="w-16 text-black-light border-2 border-black-light rounded-full p-3 mt-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <p className="text-3xl text-black-light mt-5 font-light">Save</p>
          <p className="text-black-light text-sm md:max-w-sm mt-3">
            Save photos and videos that you want to see again. No one is
            notified, and only you can see what you've saved.
          </p>
        </div>
      </div>
    );
  }

  if (!savedPhotos) {
    return (
      <div className="grid grid-cols-3 gap-8 mt-4 pb-12">
        {Array(12)
          .fill(0)
          .map((_, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={idx} count={1} width={320} height={400} />
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8 mt-4 pb-12">
      {savedPhotos.map((photo) => (
        <div key={photo.docId} className="relative group">
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={photo.imageSrc}
            alt={photo.caption}
            width="330"
            crop="scale"
          />

          <div className="absolute bottom-0 left-0 z-10 w-full justify-center items-center h-full bg-black-faded group-hover:flex cursor-default hidden">
            <p className="flex items-center text-white font-bold mr-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              {photo.likes.length}
            </p>

            <p className="flex items-center text-white font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clipRule="evenodd"
                />
              </svg>
              {photo.comments.length}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

SavedCollection.propTypes = {
  userSavedPosts: PropTypes.arrayOf(PropTypes.string).isRequired,
};
