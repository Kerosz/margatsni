import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { formatRelative } from 'date-fns';

function Messages({ chatRoom, scrollRef, username }) {
  return (
    <ul
      className="space-y-4 px-3 sm:px-6 overflow-y-auto overflow-x-hidden py-3 flex flex-col flex-grow"
      style={{ flex: 23 }}
    >
      {chatRoom.messages.map((message) =>
        message.username === 'SYSTEM' ? (
          <li
            key={message.messageId}
            className="text-gray-500 pl-1 italic py-1 pt-2 flex flex-col border-b border-t border-gray-200"
          >
            <time className="text-xs">
              {formatRelative(message.dateCreated, Date.now())}
            </time>
            <span>{message.text}</span>
          </li>
        ) : (
          <li
            key={message.messageId}
            className={`flex ${
              username === message.username && 'self-end flex-row-reverse'
            }`}
          >
            <Link to={`/u/${message.username}`}>
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                publicId={message.photoURL}
                alt={`${message.username} profile`}
                width="24"
                crop="scale"
                className="rounded-full h-6 w-6 max-w-min"
              />
            </Link>
            <p
              className={`text-black-light flex flex-col p-2 px-5 border border-gray-200 rounded-3xl mx-3 cursor-default ${
                username === message.username && 'bg-gray-100'
              }`}
              style={{ maxWidth: '280px' }}
            >
              <span className="text-xs text-gray-base mb-0.5 italic">
                <Link to={`/u/${message.username}`} className="hover:underline">
                  {message.username}
                </Link>{' '}
                said
              </span>
              <span>{message.text}</span>
            </p>
          </li>
        ),
      )}
      <div ref={scrollRef} />
    </ul>
  );
}

Messages.propTypes = {
  chatRoom: PropTypes.shape({
    roomId: PropTypes.string.isRequired,
    roomParticipants: PropTypes.arrayOf(PropTypes.string).isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        dateCreated: PropTypes.number,
        messageId: PropTypes.string,
        photoURL: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
      }),
    ),
    dateCreated: PropTypes.number.isRequired,
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string,
        userInfo: PropTypes.shape({
          bio: PropTypes.string.isRequired,
          fullName: PropTypes.string.isRequired,
          phoneNumber: PropTypes.string.isRequired,
          website: PropTypes.string.isRequired,
        }),
        photoURL: PropTypes.string,
        verifiedUser: PropTypes.bool,
      }),
    ),
  }).isRequired,
  scrollRef: PropTypes.objectOf(PropTypes.any).isRequired,
  username: PropTypes.string.isRequired,
};

export default Messages;
