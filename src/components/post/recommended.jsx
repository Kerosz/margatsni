/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getUserPhotosByUserId } from '../../services/firebase';
import Gallery from '../gallery';
import { useUserContext } from '../../context/user';

export default function Recommended({ userId, username, postId }) {
  const { user } = useUserContext();

  const [recommendedPostState, setRecommended] = useState(null);

  useEffect(() => {
    async function getRecommendations() {
      const posts = await getUserPhotosByUserId(userId, 6);

      if (posts) {
        const recommended = posts.filter((p) => p.photoId !== postId);

        setRecommended(recommended);
      }
    }

    getRecommendations();
  }, [postId]);

  if (!recommendedPostState) {
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
    <div className="border-t border-gray-primary pt-8 flex flex-col">
      <div className="text-gray-400 text-base font-semibold">
        More posts from{' '}
        <Link
          to={`/u/${username}`}
          className="text-black-light hover:underline"
        >
          {username}
        </Link>
      </div>
      {recommendedPostState.length > 0 ? (
        <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-6 sm:gap-4 mt-4 pb-12">
          <Gallery photos={recommendedPostState} loggedInUser={user} />
        </div>
      ) : (
        <div className="flex flex-col mt-12 items-center">
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
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-black-light mt-7 font-light text-3xl">
            No More Posts
          </p>
        </div>
      )}
    </div>
  );
}

Recommended.propTypes = {
  userId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
