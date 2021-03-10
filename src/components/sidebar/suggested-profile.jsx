/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import {
  updateUserFollowingField,
  updateUserFollowersField,
} from '../../services/firebase';

export default function SuggestedProfile({ suggestedUser, currentUserId }) {
  const [isUserFollowed, setIsUserFollowed] = useState(false);

  async function handleFollowUserAction() {
    setIsUserFollowed(true);

    await updateUserFollowingField(suggestedUser.userId, currentUserId, false);
    await updateUserFollowersField(suggestedUser.docId, currentUserId, false);
  }

  if (isUserFollowed) return null;

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center justify-between">
        <Link to={`/p/${suggestedUser.username}`}>
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={suggestedUser.photoURL}
            alt={`${suggestedUser.username} profile`}
            width="32"
            crop="scale"
            className="rounded-full h-8 w-8 flex mr-3.5"
          />
        </Link>
        <Link to={`/p/${suggestedUser.username}`}>
          <p className="font-bold text-sm">{suggestedUser.username}</p>
        </Link>
      </div>

      <button
        type="button"
        aria-label={`Follow ${suggestedUser.username} profile`}
        className="text-sm font-bold text-blue-medium py-1 px-2"
        onClick={handleFollowUserAction}
        onKeyDown={(event) => {
          if (event.key === 'Enter') handleFollowUserAction();
        }}
      >
        Follow
      </button>
    </div>
  );
}

SuggestedProfile.propTypes = {
  currentUserId: PropTypes.string.isRequired,
  suggestedUser: PropTypes.shape({
    username: PropTypes.string,
    docId: PropTypes.string,
    userId: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
};
