import PropTypes from 'prop-types';
import { useState } from 'react';
import { updatePostLikesField } from '../../services/firebase';
import { useUserContext } from '../../context/user';

export default function Actions({
  docId,
  totalLikes,
  likedPost,
  handleCommentFocus,
}) {
  const { user } = useUserContext();

  const [toggleLikedAction, setToggleLikedAction] = useState(likedPost);
  const [postLikesCount, setPostLikesCount] = useState(totalLikes);

  async function handleToggleLikedAction() {
    setToggleLikedAction((prevLikedState) => !prevLikedState);

    await updatePostLikesField(docId, user.uid, toggleLikedAction);

    setPostLikesCount((prevLikesCount) =>
      toggleLikedAction ? prevLikesCount - 1 : prevLikesCount + 1,
    );
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={handleToggleLikedAction}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleToggleLikedAction();
              }
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggleLikedAction
                ? 'fill-red text-red-primary'
                : 'text-black-light'
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg
            onClick={handleCommentFocus}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleCommentFocus();
              }
            }}
            className="w-8 text-black-light select-none cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-semibold">
          {postLikesCount === 1
            ? `${postLikesCount} like`
            : `${postLikesCount} likes`}
        </p>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPost: PropTypes.bool.isRequired,
  handleCommentFocus: PropTypes.func.isRequired,
};
