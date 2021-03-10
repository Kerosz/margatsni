import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';

export default function User({ userData }) {
  if (!userData.username || !userData.fullName || !userData.photoURL) {
    return <Skeleton count={1} height={61} />;
  }

  return (
    <Link
      to={`/p/${userData.username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <Image
          cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
          publicId={userData.photoURL}
          alt={`${userData.username} profile`}
          width="64"
          crop="scale"
          className="rounded-full h-16 w-16 flex mr-3"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{userData.username}</p>
        <p className="text-sm">{userData.fullName}</p>
      </div>
    </Link>
  );
}

User.defaultProps = {
  userData: null,
};

User.propTypes = {
  userData: PropTypes.shape({
    username: PropTypes.string,
    fullName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

// User.whyDidYouRender = true;
