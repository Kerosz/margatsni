import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { useUserContext } from '../../context/user';
import { addPostComments } from '../../services/firebase';

export default function AddComment({
  setPostComments,
  commentInputRef,
  postDocId,
}) {
  const { user } = useUserContext();

  const [newCommentValue, setNewCommentValue] = useState('');

  async function handleSubmitComment(event) {
    event.preventDefault();

    if (newCommentValue.length >= 1) {
      const newComment = {
        commentId: uuid(),
        userId: user.uid,
        comment: newCommentValue,
        username: user.displayName,
        photoURL: user.photoURL,
        dateCreated: Date.now(),
      };

      setPostComments((prevComments) => [newComment, ...prevComments]);
      setNewCommentValue('');

      await addPostComments(postDocId, newComment);
    }
  }

  return (
    <div className="border-t border-gray-200 mt-2">
      <form
        className="flex justify-between pl-0 px-5"
        method="POST"
        onSubmit={handleSubmitComment}
      >
        <input
          type="text"
          aria-label="Add a new comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4 mb-0.5"
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
  );
}

AddComment.defaultProps = {
  commentInputRef: null,
};

AddComment.propTypes = {
  setPostComments: PropTypes.func.isRequired,
  commentInputRef: PropTypes.objectOf(PropTypes.any),
  postDocId: PropTypes.string.isRequired,
};
