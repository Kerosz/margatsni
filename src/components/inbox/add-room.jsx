import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import Modal from '../modal';
import {
  doesUserExist,
  createRoom,
  getUserIdsByUsername,
  getUserDataByUserId,
  createNotification,
  getUserDataByUsername,
} from '../../services/firebase';

export default function AddRoom({
  isOpen,
  onClose,
  senderId,
  senderUsername,
  senderPhotoURL,
}) {
  const [recieverState, setReciever] = useState([]);
  const [inputValueState, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const isValid = recieverState.length >= 1 && recieverState.length <= 10;

  function handleModalClose() {
    setReciever([]);
    setInputValue('');
    setErrorMessage('');
    onClose();
  }

  async function handleRecieverInsertion() {
    setErrorMessage(null);

    if (recieverState.length >= 3) {
      setErrorMessage('A maximum of 3 participats is allowed');
      setInputValue('');

      return;
    }

    if (inputValueState === senderUsername) {
      setErrorMessage('You cannot send a message to yourself!');
      setInputValue('');

      return;
    }

    if (inputValueState.length >= 3) {
      const isUsernameValid = await doesUserExist(inputValueState);

      if (isUsernameValid) {
        const { followers } = await getUserDataByUsername(inputValueState);
        const isFollowing = followers.includes(senderId);

        if (isFollowing) {
          setReciever((prevRecieverState) => [
            ...prevRecieverState,
            inputValueState,
          ]);
        } else {
          setErrorMessage(
            'You cannot send a message to a user you are not following!',
          );
        }
      } else {
        setErrorMessage('Username does not exist!');
      }
    } else {
      setErrorMessage('Username must be at leat 3 characters long.');
    }
    setInputValue('');
  }

  async function handleOpenNewRoom() {
    if (isValid) {
      const userDataIds = await getUserIdsByUsername(recieverState);

      const roomId = uuid();

      await createRoom({
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        messages: [],
        roomParticipants: [senderId, ...userDataIds],
        roomId,
      });

      handleModalClose();

      Promise.all(
        userDataIds.map(async (userId) => {
          const user = await getUserDataByUserId(userId);

          return user;
        }),
      ).then((recieverData) => {
        recieverData.forEach((reciever) => {
          if (reciever.notification.chatAdd === 'off') return;

          const notificationObject = {
            recieverId: reciever.userId,
            senderPhotoURL,
            senderUsername,
            notificationType: 'MESSAGE_NOTIFICATION',
            message: 'added you to a chat.',
            targetLink: `/direct/inbox/${roomId}`,
          };

          createNotification(notificationObject).then((result) => result);
        });
      });
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title="New Message"
      maxW="md"
      className="rounded-xl"
    >
      {errorMessage && (
        <p className="mb-1 mt-2 text-xs text-center text-red-primary">
          {errorMessage}
        </p>
      )}
      <div className="flex items-center px-4 border-b border-gray-primary py-2">
        <span className="text-lg mr-6 font-semibold">To:</span>
        <input
          type="text"
          name="reciever"
          className="w-full focus:ring-gray-500 p-2 px-3 border border-transparent focus:border-gray-base"
          placeholder="Search"
          value={inputValueState}
          onChange={({ target }) => setInputValue(target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleRecieverInsertion();
          }}
        />
        <button
          type="submit"
          onClick={handleOpenNewRoom}
          className={`ml-5 font-semibold p-1 text-blue-medium ${
            !isValid && 'opacity-25 cursor-default'
          }`}
          disabled={!isValid}
        >
          Send
        </button>
      </div>
      <div className="flex flex-col px-4 mt-4 mb-1">
        <p className="mb-3 font-semibold text-lg">Users added</p>
        <ul className="flex flex-wrap">
          {recieverState.length === 0 && (
            <li className="w-full flex flex-col items-center my-2.5">
              <svg
                className="w-11 text-black-light border border-black-light rounded-full p-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-black-light mt-2 font-semibold text-sm">
                No Users Added
              </span>
            </li>
          )}
          {recieverState &&
            recieverState.map((reciever, idx) => (
              <li
                className="p-0.5 px-3 mr-3 mb-4 bg-blue-100 text-blue-500 rounded-md text-lg border border-blue-200"
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
              >
                {reciever}
              </li>
            ))}
        </ul>
      </div>
    </Modal>
  );
}

AddRoom.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  senderId: PropTypes.string.isRequired,
  senderUsername: PropTypes.string.isRequired,
  senderPhotoURL: PropTypes.string.isRequired,
};
