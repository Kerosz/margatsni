import { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Modal from '../modal';
import { deletePostByDocId } from '../../services/firebase';

function DeletePost({ isOpen, onClose, postDocId, username }) {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDialogState, setConfirmDialog] = useState('');

  const isValid = confirmDialogState === username;

  async function handlePostDeletion(event) {
    event.preventDefault();

    if (isValid) {
      setIsSubmitting(true);
      await deletePostByDocId(postDocId);
      setIsSubmitting(false);

      history.replace(`/u/${username}`);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxW="md">
      <form
        action="POST"
        className="flex flex-col items-center sm:px-8 px-3 py-4"
        onSubmit={handlePostDeletion}
      >
        <svg
          className="w-16 text-black-light border-2 border-black-light rounded-full p-3 mt-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>

        <p className="mt-5 text-gray-base">
          This action will <strong>permanently</strong> delete your post and all
          the data associated with it, the action cannot be undone.
        </p>

        <p className="mt-6 text-gray-base self-start">
          Please type your username to confirm: <strong>{username}</strong>
        </p>

        <input
          type="text"
          name="confirmDialog"
          className="rounded border focus:ring-gray-600 border-gray-primary px-2.5 py-1.5 text-lg focus:border-gray-400 bg-gray-50 mt-3 w-full focus:outline-none"
          value={confirmDialogState}
          onChange={({ target }) => setConfirmDialog(target.value)}
        />
        <button
          type="submit"
          aria-label="Confirm deletion of account"
          className={`font-bold text-sm text-white rounded h-8 bg-red-primary px-3 mt-4 w-full ${
            (!isValid || isSubmitting) && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isValid || isSubmitting}
          onClick={handlePostDeletion}
        >
          {isSubmitting ? 'Deleting...' : 'Delete my post'}
        </button>
      </form>
    </Modal>
  );
}

DeletePost.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  postDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default DeletePost;
