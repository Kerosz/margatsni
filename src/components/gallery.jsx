import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import CloudinaryImage from './cloudinary-image';
import useDisclosure from '../hooks/use-disclosure';
import LoginPopup from './login-popup';

export default function Gallery({ photos, withSvg, loggedInUser }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isUser = !!loggedInUser;

  if (!photos) {
    return (
      <>
        {Array(12)
          .fill(0)
          .map((_, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={idx} count={1} width={320} height={400} />
          ))}
      </>
    );
  }

  return (
    <>
      {photos.map((photo) => (
        <li
          key={photo.docId}
          className="relative group flex items-center bg-gray-100 mb-3.5 sm:mb-0"
        >
          <CloudinaryImage
            src={photo.imageSrc}
            alt={photo.caption}
            width="620"
            type="post"
            className="object-fill"
            style={{ height: '400px' }}
          />
          {withSvg && (
            <svg
              className="w-6 text-gray-background absolute group-hover:hidden top-2 right-2 opacity-80"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          )}

          {isUser ? (
            <Link to={`/p/${photo.photoId}`}>
              <div className="absolute bottom-0 left-0 z-10 w-full justify-center items-center h-full bg-black-faded group-hover:flex hidden cursor-pointer">
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
            </Link>
          ) : (
            <button
              type="button"
              aria-label="Go to post page"
              onClick={onOpen}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onOpen();
              }}
            >
              <div className="absolute bottom-0 left-0 z-10 w-full justify-center items-center h-full bg-black-faded group-hover:flex hidden cursor-pointer">
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
            </button>
          )}
        </li>
      ))}

      <LoginPopup isOpen={isOpen} onClose={onClose} />
    </>
  );
}

Gallery.defaultProps = {
  photos: null,
  withSvg: false,
  loggedInUser: false,
};

Gallery.propTypes = {
  loggedInUser: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  photos: PropTypes.arrayOf(PropTypes.object),
  withSvg: PropTypes.bool,
};
