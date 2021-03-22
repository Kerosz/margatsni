import { useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import Room from './room';
import AddRoom from './add-room';
import useDisclosure from '../../hooks/use-disclosure';
import useInboxRoom from '../../hooks/use-inbox-room';
import useUpdateEffect from '../../hooks/use-update-effect';

export default function Inbox({ user }) {
  const { url } = useRouteMatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { rooms } = useInboxRoom(
    'roomParticipants',
    'array-contains',
    user.uid,
    false,
    'rooms',
  );

  const scrollRef = useRef();

  useUpdateEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [rooms]);

  return (
    <div
      className="col-span-4 lg:col-span-3 flex flex-col border-r border-gray-primary"
      style={{ height: 'calc(100vh - 145px)' }}
    >
      <header className="p-4 px-5 flex items-center border-b border-gray-primary h-16">
        <Link
          to={`/u/${user.displayName}`}
          className="flex-grow text-center font-semibold text-lg text-black-light hover:underline mx-2"
        >
          {user.displayName}
        </Link>
        <button
          type="button"
          aria-label="Create a room"
          title="Create a room"
          onClick={onOpen}
        >
          <svg
            className="w-8 select-none cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>

        <AddRoom
          isOpen={isOpen}
          onClose={onClose}
          senderId={user.uid}
          senderUsername={user.displayName}
          senderPhotoURL={user.photoURL}
        />
      </header>

      <div className="overflow-y-auto">
        <div ref={scrollRef} />
        {rooms ? (
          rooms.map((entry) => (
            <Link to={`${url}/${entry.roomId}`} key={entry.roomId}>
              <Room roomData={entry} />
            </Link>
          ))
        ) : (
          <Skeleton count={3} height={60} className="mb-1" />
        )}
      </div>
    </div>
  );
}

Inbox.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
};
