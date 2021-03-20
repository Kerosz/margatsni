import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { formatDistanceToNow } from 'date-fns';

export default function Room({ roomData }) {
  const { participants } = roomData;
  const { pathname } = useLocation();

  let sortedMessages;
  if (roomData.messages.length > 0) {
    [sortedMessages] = roomData.messages.sort(
      (a, b) => b.dateCreated - a.dateCreated,
    );
  }

  return (
    <div
      className={`grid grid-cols-5 gap-1 px-6 py-2 my-1.5 items-center ${
        pathname.includes(roomData.roomId) && 'bg-gray-100'
      } hover:bg-gray-50 active:bg-gray-100`}
    >
      <div className="flex items-center justify-between col-span-1">
        {sortedMessages ? (
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={sortedMessages.photoURL}
            alt={`${sortedMessages.username} profile`}
            width="56"
            crop="scale"
            className="rounded-full h-14 w-14 max-w-min"
          />
        ) : (
          <Image
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={participants[0].photoURL}
            alt={`${participants[0].username} profile`}
            width="56"
            crop="scale"
            className="rounded-full h-14 w-14 max-w-min"
          />
        )}
      </div>
      <div className="col-span-4 ml-3">
        <p className="flex items-center space-x-2 text-black-light">
          {sortedMessages ? (
            <span>{sortedMessages.username}</span>
          ) : (
            <span>{participants[0].username}</span>
          )}
          {sortedMessages && (
            <>
              <span className="text-gray-base">·</span>
              <span className="text-xs text-gray-400 mt-0.5">
                {formatDistanceToNow(sortedMessages.dateCreated, {
                  includeSeconds: true,
                })}{' '}
                ago
              </span>
            </>
          )}
        </p>
        {sortedMessages && (
          <p className="text-gray-base truncate">{sortedMessages.text}</p>
        )}
      </div>
    </div>
  );
}

Room.propTypes = {
  roomData: PropTypes.shape({
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
};
