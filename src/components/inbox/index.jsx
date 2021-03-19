import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link, useRouteMatch } from 'react-router-dom';
import Header from './header';
import Room from './room';
import useInboxRoom from '../../hooks/use-inbox-room';

export default function Inbox({ user }) {
  const { url } = useRouteMatch();

  const { rooms } = useInboxRoom(
    'roomParticipants',
    'array-contains',
    user.uid,
    false,
    'rooms',
  );

  return (
    <div
      className="col-span-4 lg:col-span-3 flex flex-col border-r border-gray-primary"
      style={{ height: 'calc(100vh - 100px)' }}
    >
      <Header user={user} />
      <div className="overflow-y-auto h-full">
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
