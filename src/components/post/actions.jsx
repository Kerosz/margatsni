import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useFirestoreUser from '../../hooks/use-firestore-user';
import {
  updatePostLikesField,
  updatePostSavedField,
  updateUserSavedPostsField,
} from '../../services/firebase';
// import useUpdateEffect from '../../hooks/use-update-effect';

export default function Actions({
  postDocId,
  postId,
  totalLikes,
  likedPost,
  savedPost,
  handleCommentFocus,
  link,
}) {
  const { user } = useFirestoreUser();

  const [toggleLikedAction, setToggleLikedAction] = useState(likedPost);
  const [toggleSavedAction, setToggleSavedAction] = useState(savedPost);
  const [postLikesCount, setPostLikesCount] = useState(totalLikes);

  async function handleToggleLikedAction() {
    setToggleLikedAction((prevLikedState) => !prevLikedState);

    await updatePostLikesField(postDocId, user.userId, toggleLikedAction);

    setPostLikesCount((prevLikesCount) =>
      toggleLikedAction ? prevLikesCount - 1 : prevLikesCount + 1,
    );
  }

  async function handleToggleSavedAction() {
    setToggleSavedAction((prevSavedState) => !prevSavedState);

    updatePostSavedField(postDocId, user.userId, toggleSavedAction);
    updateUserSavedPostsField(user.docId, postId, toggleSavedAction);
  }

  if (!user.userId) {
    return <Skeleton count={1} height={35} />;
  }

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex justify-between w-full">
          <div className="flex">
            <button
              type="button"
              aria-label="Like the post"
              onClick={handleToggleLikedAction}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleLikedAction();
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                tabIndex={0}
                className={`w-9 mr-4 select-none cursor-pointer ${
                  toggleLikedAction
                    ? 'fill-red text-red-primary'
                    : 'text-black-light'
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            {link ? (
              <Link to={`/p/${postId}`}>
                <svg
                  className="w-9 text-black-light select-none cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  tabIndex={0}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Link>
            ) : (
              <button
                type="button"
                aria-label="Add a comment"
                onClick={handleCommentFocus}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleCommentFocus();
                  }
                }}
              >
                <svg
                  className="w-9 text-black-light select-none cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  tabIndex={0}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            )}
          </div>
          <button
            type="button"
            aria-label="Add post to saved"
            onClick={handleToggleSavedAction}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleToggleSavedAction();
              }
            }}
          >
            <svg
              className={`w-9 text-black-light select-none cursor-pointer ${
                toggleSavedAction
                  ? 'fill-black text-black-light'
                  : 'text-black-light'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
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

Actions.defaultProps = {
  handleCommentFocus: null,
  link: false,
};

Actions.propTypes = {
  postDocId: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPost: PropTypes.bool.isRequired,
  savedPost: PropTypes.bool.isRequired,
  handleCommentFocus: PropTypes.func,
  link: PropTypes.bool,
};
