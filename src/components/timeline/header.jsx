import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CloudinaryImage from '../cloudinary-image';

export default function Header({ user }) {
  return (
    <div className="flex border-b h-4 p-4 py-8 border-gray-200">
      <Link
        to={`/u/${user.username}`}
        className="flex items-center hover:underline"
      >
        <CloudinaryImage
          src={user.photoURL}
          alt={`${user.username} profile`}
          size="32"
          type="profile"
          crop="scale"
          className="rounded-full h-8 w-8 flex mr-3"
        />
        <p className="font-semibold">{user.username}</p>
        {user.verifiedUser && (
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
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
    verifiedUser: PropTypes.bool.isRequired,
  }).isRequired,
};
