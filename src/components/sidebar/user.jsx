import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

export default function User({ userData }) {
  if (!userData.username || !userData.fullName || !userData.photoURL) {
    return <Skeleton count={1} height={61} />;
  }

  return (
    <div className="grid grid-cols-4 gap-4 mb-7 items-center">
      <div className="flex items-center justify-between col-span-1">
        <Link to={`/p/${userData.username}`}>
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={userData.photoURL}
            alt={`${userData.username} profile`}
            width="64"
            crop="scale"
            className="rounded-full h-16 w-16 flex mr-3"
          />
        </Link>
      </div>
      <div className="col-span-3">
        <Link to={`/p/${userData.username}`} className="hover:underline">
          <p className="font-semibold text-base">{userData.username}</p>
        </Link>
        <p className="text-sm text-gray-500">{userData.fullName}</p>
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
    fullName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};
