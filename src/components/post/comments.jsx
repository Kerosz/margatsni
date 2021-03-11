/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useUserContext } from '../../context/user';
import { addPostComments } from '../../services/firebase';

export default function Comments({
  docId,
  postComments,
  datePosted,
  commentInputRef,
  defaultCommentDisplayCount,
}) {
  const { user } = useUserContext();

  const [comments, setComments] = useState(postComments);
  const [newCommentValue, setNewCommentValue] = useState('');

  const [displayCommentCount, setDisplayCommentCount] = useState(
    defaultCommentDisplayCount,
  );
  const [showExtraComments, setShowExtraComments] = useState(false);

  function handleSubmitComment(event) {
    event.preventDefault();

    if (newCommentValue.length >= 1) {
      const newComment = {
        id: uuid(),
        author: user.uid,
        comment: newCommentValue,
        displayName: user.displayName,
        dateCreated: Date.now(),
      };

      setComments((prevComments) => [newComment, ...prevComments]);
      setNewCommentValue('');

      addPostComments(docId, newComment);
    }
  }

  function handleShowExtraComments() {
    setDisplayCommentCount((prevDisplayCount) => {
      if (prevDisplayCount === defaultCommentDisplayCount) {
        setShowExtraComments(true);
        return comments.length;
      }

      setShowExtraComments(false);
      return defaultCommentDisplayCount;
    });
  }

  return (
    <>
      <div className="p-4 pt-1 pb-4 mt-1">
        {comments.length > defaultCommentDisplayCount && (
          <button
            type="button"
            aria-label={
              showExtraComments
                ? 'Show the extra comments'
                : 'Hide the extra comments'
            }
            className="text-sm text-gray-base mb-1 cursor-pointer"
            onClick={handleShowExtraComments}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleShowExtraComments();
            }}
          >
            {showExtraComments
              ? `Hide extra ${comments.length - defaultCommentDisplayCount} ${
                  comments.length - defaultCommentDisplayCount === 1
                    ? 'comment'
                    : 'comments'
                }`
              : `View all ${comments.length} comments`}
          </button>
        )}
        {comments.slice(0, displayCommentCount).map((comment, idx) => (
          <p key={`${idx}_${comment.displayName}`} className="mb-1">
            <Link to={`/p/${comment.displayName}`} className="hover:underline">
              <span className="mr-1.5 font-semibold">
                {comment.displayName}
              </span>
            </Link>
            <span>{comment.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-3">
          {formatDistance(datePosted, new Date())} ago
        </p>
      </div>

      <div className="border-t border-gray-primary">
        <form
          className="flex justify-between pl-0 px-5"
          method="POST"
          onSubmit={handleSubmitComment}
        >
          <input
            type="text"
            aria-label="Add a new comment"
            autoComplete="off"
            className="text-sm text-gray-base w-full mr-3 py-5 px-4"
            name="add-comment"
            placeholder="Add a comment..."
            value={newCommentValue}
            onChange={({ target }) => setNewCommentValue(target.value)}
            ref={commentInputRef}
          />
          <button
            type="submit"
            className={`text-sm font-bold text-blue-medium ${
              newCommentValue.length < 1 && 'opacity-25 cursor-default'
            }`}
            disabled={newCommentValue.length < 1}
            onClick={handleSubmitComment}
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
}

Comments.defaultProps = {
  defaultCommentDisplayCount: 3,
};

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  postComments: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  datePosted: PropTypes.number.isRequired,
  commentInputRef: PropTypes.objectOf(PropTypes.any).isRequired,
  defaultCommentDisplayCount: PropTypes.number,
};
