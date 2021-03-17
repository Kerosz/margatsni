import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AddComment from '../post/add-comment';

export default function Comments({
  docId,
  postComments,
  datePosted,
  defaultCommentDisplayCount,
  showAddPost,
}) {
  const [comments, setComments] = useState(postComments);

  const [displayCommentCount, setDisplayCommentCount] = useState(
    defaultCommentDisplayCount,
  );
  const [showExtraComments, setShowExtraComments] = useState(false);

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
        {comments.slice(0, displayCommentCount).map((entry) => (
          <p key={entry.commentId} className="mb-1">
            <Link to={`/u/${entry.username}`} className="hover:underline">
              <span className="mr-1.5 font-semibold">{entry.username}</span>
            </Link>
            <span>{entry.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-3">
          {formatDistance(datePosted, new Date())} ago
        </p>
      </div>

      {showAddPost && (
        <AddComment postDocId={docId} setPostComments={setComments} />
      )}
    </>
  );
}

Comments.defaultProps = {
  defaultCommentDisplayCount: 3,
  showAddPost: true,
};

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  postComments: PropTypes.arrayOf(
    PropTypes.shape({
      commentId: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      dateCreated: PropTypes.number.isRequired,
    }),
  ).isRequired,
  datePosted: PropTypes.number.isRequired,
  showAddPost: PropTypes.bool,
  defaultCommentDisplayCount: PropTypes.number,
};
