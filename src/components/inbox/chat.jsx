import Skeleton from 'react-loading-skeleton';
import { useParams, Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import useInboxRoom from '../../hooks/use-inbox-room';
import SendMessage from './send-message';

export default function Chat() {
  const { chatId } = useParams();
  const { rooms: chatRoom } = useInboxRoom(
    'roomId',
    '==',
    chatId,
    false,
    'chat',
    chatId,
  );

  if (!chatRoom) {
    return <Skeleton count={1} height={60} />;
  }

  return (
    <div className="col-span-5" style={{ height: 'calc(100vh - 100px)' }}>
      <header className="p-4 px-6 flex items-center border-b border-gray-primary h-16">
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
      <div
        className="px-5 flex flex-col"
        style={{ height: 'calc(100% - 80px)' }}
      >
        <div className="flex-grow">
          {chatRoom.messages.map((message) => (
            <li key={message.messageId}>{message.text}</li>
          ))}
        </div>
        <SendMessage roomDocId={chatRoom.docId} />
      </div>
    </div>
  );
}

// Chat.whyDidYouRender = true;
