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

  const isSuggestedUserFollower = suggestedUser.following.includes(
    currentUserId,
  );

  if (isUserFollowed) return null;

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center justify-between">
        <Link to={`/p/${suggestedUser.username}`}>
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={suggestedUser.photoURL}
            alt={`${suggestedUser.username} profile`}
            width="40"
            crop="scale"
            className="rounded-full h-10 w-10 flex mr-3.5"
          />
        </Link>
        <div>
          <Link to={`/p/${suggestedUser.username}`} className="hover:underline">
            <p className="font-semibold text-sm mb-0.5">
              {suggestedUser.username}
            </p>
          </Link>
          <p className="text-xs text-gray-500">
            {isSuggestedUserFollower ? 'Follows you' : 'Suggested for you'}
          </p>
        </div>
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
    following: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
