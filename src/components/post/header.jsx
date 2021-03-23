import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeletePost from './delete-post';
import CloudinaryImage from '../cloudinary-image';
import useDisclosure from '../../hooks/use-disclosure';
import useSendNotification from '../../hooks/use-send-notification';
import {
  updateUserFollowersField,
  updateUserFollowingField,
} from '../../services/firebase';
import { useUserContext } from '../../context/user';

export default function Header({ postUser, postDocId }) {
  const { user } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const notify = useSendNotification(postUser.userId);

  const defaultFollowState = user
    ? postUser.followers.includes(user.uid)
    : null;

  const [isFollowingState, setIsFollowing] = useState(defaultFollowState);

  async function handleToggleFollowUser() {
    setIsFollowing((prevFollowingState) => !prevFollowingState);

    await updateUserFollowersField(postUser.docId, user.uid, isFollowingState);
    await updateUserFollowingField(postUser.userId, user.uid, isFollowingState);

    if (!isFollowingState) {
      notify(
        {
          recieverId: postUser.userId,
          senderPhotoURL: user.photoURL,
          senderUsername: user.displayName,
          notificationType: 'FOLLOW_NOTIFICATION',
          message: 'started following you.',
          targetLink: `/u/${user.displayName}`,
        },
        'follow',
      );
    }
  }

  return (
    <header className="p-5 border-b border-red-100 flex justify-between items-center">
      <div className="space-x-2 flex items-center">
        <Link
          to={`/u/${postUser.username}`}
          className="flex items-center hover:underline"
        >
          <CloudinaryImage
            src={postUser.photoURL}
            alt={`${postUser.username} profile`}
            size="32"
            type="profile"
            crop="scale"
            className="rounded-full h-8 w-8 flex mr-4"
          />
          <p className="font-semibold text-black-light">{postUser.username}</p>
          {postUser.verifiedUser && (
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
        {user && postUser.userId !== user.uid && (
          <>
            <span>•</span>
            <button
              type="button"
              aria-label="Follow user"
              className={`text-sm font-semibold mt-0.5 ${
                isFollowingState ? 'text-black-light' : 'text-blue-medium'
              }`}
              onClick={handleToggleFollowUser}
            >
              {isFollowingState ? 'Following' : 'Follow'}
            </button>
          </>
        )}
      </div>
      {user && postUser.userId === user.uid && (
        <button
          type="button"
          aria-label="Delete post"
          className="text-red-700 text-sm font-semibold p-0.5"
          title="Delete"
          onClick={onOpen}
        >
          Delete
        </button>
      )}

      {user && (
        <DeletePost
          isOpen={isOpen}
          onClose={onClose}
          username={user.displayName}
          postDocId={postDocId}
        />
      )}
    </header>
  );
}

Header.propTypes = {
  postUser: PropTypes.shape({
    userId: PropTypes.string,
    username: PropTypes.string,
    photoURL: PropTypes.string,
    verifiedUser: PropTypes.bool,
    docId: PropTypes.string,
    followers: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  postDocId: PropTypes.string.isRequired,
};
