import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import CloudinaryImage from '../cloudinary-image';

export default function User({ userData }) {
  if (!userData.username || !userData.userInfo.fullName || !userData.photoURL) {
    return <Skeleton count={1} height={80} />;
  }

  return (
    <div className="grid grid-cols-4 gap-4 mb-7 items-center pt-3">
      <div className="flex items-center justify-between col-span-1">
        <Link to={`/u/${userData.username}`}>
          <CloudinaryImage
            src={userData.photoURL}
            alt={`${userData.username} profile`}
            size="65"
            type="profile"
            className="rounded-full h-16 w-16 flex min-w-max"
          />
        </Link>
      </div>
      <div className="col-span-3">
        <Link
          to={`/u/${userData.username}`}
          className="hover:underline flex items-center"
        >
          <p className="font-semibold text-base">{userData.username}</p>
          {userData.verifiedUser && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 ml-0.5 mt-1 opacity-90 text-blue-medium"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </Link>
        <p className="text-sm text-gray-500">{userData.userInfo.fullName}</p>
      </div>
    </div>
  );
}

User.defaultProps = {
  userData: null,
};

User.propTypes = {
  userData: PropTypes.exact({
    username: PropTypes.string,
    userInfo: PropTypes.shape({
      bio: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
    }),
    photoURL: PropTypes.string,
    verifiedUser: PropTypes.bool,
  }),
};
