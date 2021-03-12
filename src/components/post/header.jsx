import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

export default function Header({ user }) {
  return (
    <div className="flex border-b h-4 p-4 py-8 border-gray-200">
      <Link
        to={`/p/${user.username}`}
        className="flex items-center hover:underline"
      >
        <Image
          cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
          publicId={user.photoURL}
          alt={`${user.username} profile`}
          width="32"
          crop="scale"
          className="rounded-full h-8 w-8 flex mr-3"
        />
        <p className="font-semibold">{user.username}</p>
      </Link>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    photoURL: PropTypes.string.isRequired,
  }).isRequired,
};
