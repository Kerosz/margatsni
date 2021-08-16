import { useState } from 'react';
import PropTypes from 'prop-types';
import Gallery from '../gallery';
import AddPost from '../post/add-post';
import { useUserContext } from '../../context/user';

export default function PhotoCollection({
  photos,
  profileUsername,
  loggedInUsername,
}) {
  const { user } = useUserContext();
  const [postModalStatus, setPostModalStatus] = useState(false);

  if (photos?.length === 0 && profileUsername === loggedInUsername) {
    return (
      <>
        <div className="md:grid md:grid-cols-5 md:gap-0 flex flex-col-reverse mx-auto text-center">
          <img src="/images/no-post.jpg" alt="img" className="col-span-2" />

          <div className="h-32 flex flex-col justify-center items-center col-span-3 min-h-full bg-white">
            <p className="font-semibold md:text-lg">
              Start capturing and sharing your moments.
            </p>
            <p className="mt-0.5 md:text-base text-sm">
              Add a post and start your journey
            </p>
            <button
              type="button"
              title="Add Post"
              aria-label="Add Post"
              className="sm:mt-4 mt-2.5"
              onClick={() => setPostModalStatus((prev) => !prev)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') setPostModalStatus((prev) => !prev);
              }}
            >
              <svg
                className="w-14 text-black-light cursor-pointer active:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </button>
          </div>
        </div>
        <AddPost
          userData={user}
          displayModal={postModalStatus}
          setDisplayStatus={setPostModalStatus}
        />
      </>
    );
  }

  if (photos?.length === 0) {
    return (
      <div className="flex flex-col items-center mt-8">
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
          No Posts Yet
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 md:gap-6 sm:gap-4 mt-4 pb-12">
      <Gallery photos={photos} loggedInUser={loggedInUsername} />
    </ul>
  );
}

PhotoCollection.defaultProps = {
  photos: null,
  loggedInUsername: null,
};

PhotoCollection.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
  profileUsername: PropTypes.string.isRequired,
  loggedInUsername: PropTypes.string,
};
