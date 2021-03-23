import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import CloudinaryImage from '../cloudinary-image';
import useSendNotification from '../../hooks/use-send-notification';
import {
  deleteRoomByDocId,
  deleteUserIdFromRoomParticipants,
  addMessageByDocId,
} from '../../services/firebase';
import { INBOX } from '../../constants/routes';

export default function Details({
  roomOwner,
  roomDocId,
  userId,
  userPhotoURL,
  username,
  roomMembers,
}) {
  const history = useHistory();

  const userDataIds = roomMembers
    .filter((m) => m.userId !== userId)
    .map((m) => m.userId);

  const notify = useSendNotification(userDataIds, true);

  async function handleRoomDelete() {
    if (roomOwner) {
      await deleteRoomByDocId(roomDocId);

      history.replace(INBOX);

      notify(
        {
          senderPhotoURL: userPhotoURL,
          senderUsername: username,
          notificationType: 'MESSAGE_NOTIFICATION',
          message: 'deleted your chat room.',
          targetLink: `/u/${username}`,
        },
        'chatDelete',
      );
    }
  }

  async function handleRoomLeave() {
    if (!roomOwner) {
      await deleteUserIdFromRoomParticipants(roomDocId, userId);

      history.replace(INBOX);

      const messageObject = {
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
        userId: '',
        photoURL:
          'https://res.cloudinary.com/kerosz/image/upload/v1615369912/instagram/avatars/default-avatar_wfrmaq.jpg',
        username: 'SYSTEM',
        text: `${username} left the chat. It's a sad day!`,
        messageId: uuid(),
      };

      await addMessageByDocId(roomDocId, messageObject);

      notify(
        {
          senderPhotoURL: userPhotoURL,
          senderUsername: username,
          notificationType: 'MESSAGE_NOTIFICATION',
          message: 'left the chat room.',
          targetLink: `/u/${username}`,
        },
        'chatLeave',
      );
    }
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 210px)' }}>
      <div className="border-b border-gray-primary p-4 px-3 sm:px-6">
        {roomOwner ? (
          <button
            type="button"
            aria-label="Delete post"
            className="text-red-700 p-0.5"
            title="Delete room"
            onClick={handleRoomDelete}
          >
            Delete chat
          </button>
        ) : (
          <button
            type="button"
            aria-label="Delete post"
            className="p-0.5 text-red-700"
            title="Leave room"
            onClick={handleRoomLeave}
          >
            Leave chat
          </button>
        )}
      </div>
      <div className="font-semibold pt-6 px-3 sm:px-6">Members</div>
      <ul className="overflow-y-auto overflow-x-hidden py-3 flex flex-col space-y-1 flex-1">
        {roomMembers.map((member) => (
          <li key={member.userId} className="hover:bg-gray-50 px-6 py-2">
            <Link
              to={`/u/${member.username}`}
              className="flex justify-between items-center"
            >
              <div className="flex space-x-4 items-center">
                <CloudinaryImage
                  src={member.photoURL}
                  alt={`${member.username} profile`}
                  size="90"
                  type="profile"
                  className="rounded-full h-14 w-14 flex"
                />

                <div className="flex flex-col items-start">
                  <div className="flex">
                    <p className="font-semibold text-base">{member.username}</p>
                    {member.verifiedUser && (
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
                  </div>
                  <p className="text-sm text-gray-500">
                    {member.userInfo.fullName}
                  </p>
                </div>
              </div>

              <span className="text-sm text-gray-400 italic">
                {roomMembers[0].userId === member.userId ? 'Admin' : 'Member'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

Details.propTypes = {
  roomOwner: PropTypes.bool.isRequired,
  roomDocId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  userPhotoURL: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  roomMembers: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userInfo: PropTypes.shape({
        fullName: PropTypes.string,
      }).isRequired,
      verifiedUser: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
