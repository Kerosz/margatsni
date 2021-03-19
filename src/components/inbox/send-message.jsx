import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { addMessageByDocId } from '../../services/firebase';
import { useUserContext } from '../../context/user';

export default function SendMessage({ roomDocId }) {
  const { user } = useUserContext();
  const [messageValue, setMessageValue] = useState('');

  const isValid = messageValue.length >= 1;

  async function handleSendingMessage(event) {
    event.preventDefault();

    if (isValid) {
      const messageObject = {
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        userId: user.uid,
        photoURL: user.photoURL,
        username: user.displayName,
        text: messageValue,
        messageId: uuid(),
      };

      await addMessageByDocId(roomDocId, messageObject);

      setMessageValue('');
    }
  }

  return (
    <form
      action="POST"
      className="flex items-center relative"
      onSubmit={handleSendingMessage}
    >
      <input
        type="text"
        name="addMessage"
        value={messageValue}
        onChange={({ target }) => setMessageValue(target.value)}
        className="rounded-3xl border border-gray-primary px-5 py-2.5 pr-16 text-lg focus:border-gray-400 bg-gray-50 mt-3 w-full focus:outline-none"
      />

      <button
        type="submit"
        aria-label="Send message"
        disabled={!isValid}
        className={`absolute right-0 mt-3 p-4 rounded-3xl text-blue-medium ${
          !isValid && 'opacity-50 cursor-not-allowed'
        }`}
        onClick={handleSendingMessage}
      >
        Send
      </button>
    </form>
  );
}

SendMessage.propTypes = {
  roomDocId: PropTypes.string.isRequired,
};
