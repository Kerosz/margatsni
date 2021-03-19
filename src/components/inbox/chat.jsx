import { useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import useInboxRoom from '../../hooks/use-inbox-room';
import SendMessage from './send-message';
import useUpdateEffect from '../../hooks/use-update-effect';

export default function Chat({ user }) {
  const { chatId } = useParams();
  const { rooms: chatRoom } = useInboxRoom(
    'roomId',
    '==',
    chatId,
    false,
    'chat',
    chatId,
  );

  const scrollRef = useRef();
  const inputRef = useRef();

  useUpdateEffect(() => {
    if (inputRef.current && scrollRef.current) {
      scrollRef.current.scrollIntoView();
      inputRef.current.focus();
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
      style={{ height: 'calc(100vh - 150px)' }}
    >
      <header className="p-4 px-6 flex items-center border-b border-t border-gray-primary h-16 md:border-t-0">
        <Link
          to={`/u/${chatRoom.participants[0].username}`}
          className="flex items-center hover:underline ml-7"
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
      </header>

      <ul
        className="space-y-4 px-6 overflow-y-auto overflow-x-hidden py-3 flex flex-col flex-grow"
        style={{ flex: 23 }}
      >
        {chatRoom.messages.map((message) => (
          <li
            key={message.messageId}
            className={`flex ${
              user.displayName === message.username &&
              'self-end flex-row-reverse'
            }`}
          >
            <Link to={`/u/${message.username}`}>
              <Image
                cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                publicId={message.photoURL}
                alt={`${message.username} profile`}
                width="32"
                crop="scale"
                className="rounded-full h-6 w-6"
              />
            </Link>
            <p
              className={`text-black-light  p-2.5 px-5 border border-gray-200 rounded-3xl mx-3 cursor-default ${
                user.displayName === message.username && 'bg-gray-100'
              }`}
              style={{ maxWidth: '280px' }}
            >
              {message.text}
            </p>
          </li>
        ))}
        <div ref={scrollRef} />
      </ul>

      <SendMessage
        roomDocId={chatRoom.docId}
        userData={user}
        scrollRef={scrollRef}
        inputRef={inputRef}
      />
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
