/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import Messages from './messages';
import Details from './details';
import SendMessage from './send-message';
import useInboxRoom from '../../hooks/use-inbox-room';
import useUpdateEffect from '../../hooks/use-update-effect';

export default function Chat({ user }) {
  const { chatId } = useParams();
  const { rooms: chatRoom } = useInboxRoom(
    'roomId',
    '==',
    chatId,
    true,
    'chat',
  );

  const [openTab, setOpenTab] = useState(1);

  const scrollRef = useRef();
  const inputRef = useRef();
  const isRoomOwner = chatRoom?.roomParticipants[0] === user.uid;

  function toggleDetailsPage() {
    setOpenTab((prevOpenTab) => (prevOpenTab === 1 ? 2 : 1));
  }

  useUpdateEffect(() => {
    if (inputRef.current && scrollRef.current) {
      scrollRef.current.scrollIntoView();
      inputRef.current.focus();
    }

    if (openTab !== 1) {
      setOpenTab(1);
    }
  }, [chatRoom]);

  if (!chatRoom) {
    return (
      <div className="col-span-5">
        <Skeleton count={1} height={60} />
      </div>
    );
  }

  return (
    <div
      className="col-span-5 flex flex-col"
      style={{ height: 'calc(100vh - 145px)' }}
    >
      <header className="p-4 px-3 sm:px-6 border-b border-t border-gray-primary h-16 md:border-t-0 flex justify-between items-center">
        {openTab === 1 && (
          <div className="flex items-center">
            <Link
              to={`/u/${chatRoom.participants[0].username}`}
              className="flex items-center hover:underline ml-4 sm:ml-7"
            >
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                publicId={chatRoom.participants[0].photoURL}
                alt={`${chatRoom.participants[0].username} profile`}
                width="32"
                crop="scale"
                className="rounded-full h-8 w-8 flex mr-4"
              />
              <p className="font-semibold text-black-light text-lg">
                {chatRoom.participants[0].username}
              </p>
            </Link>
            <span className="italic ml-2 mt-0.5 text-sm">started the chat</span>
          </div>
        )}

        {openTab === 2 && (
          <div className="flex flex-grow justify-center">
            <span className="font-semibold text-center">Details</span>
          </div>
        )}

        <button
          type="button"
          aria-label="Chat details"
          onClick={toggleDetailsPage}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              toggleDetailsPage();
            }
          }}
        >
          <svg
            className={`w-8 ${openTab === 2 && 'fill-black text-white'}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </header>

      {openTab === 1 && (
        <>
          <Messages
            chatRoom={chatRoom}
            username={user.displayName}
            scrollRef={scrollRef}
          />

          <SendMessage
            roomDocId={chatRoom.docId}
            roomMembers={chatRoom.participants}
            userData={user}
            scrollRef={scrollRef}
            inputRef={inputRef}
          />
        </>
      )}

      {openTab === 2 && (
        <Details
          roomOwner={isRoomOwner}
          roomDocId={chatRoom.docId}
          roomMembers={chatRoom.participants}
          userId={user.uid}
          userPhotoURL={user.photoURL}
          username={user.displayName}
        />
      )}
    </div>
  );
}

Chat.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
};
