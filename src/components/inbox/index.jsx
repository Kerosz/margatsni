import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link, useRouteMatch } from 'react-router-dom';
import { useRef } from 'react';
import Header from './header';
import Room from './room';
import useInboxRoom from '../../hooks/use-inbox-room';
import useUpdateEffect from '../../hooks/use-update-effect';

export default function Inbox({ user }) {
  const { url } = useRouteMatch();

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
      style={{ height: 'calc(100vh - 150px)' }}
    >
      <Header user={user} />
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
