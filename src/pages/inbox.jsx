import { useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import Header from '../components/header';
import Inbox from '../components/inbox';
import Chat from '../components/inbox/chat';
import AddRoom from '../components/inbox/add-room';
import ProtectedRoute from '../helpers/protected-route';
import useDisclosure from '../hooks/use-disclosure';
import { INBOX } from '../constants/routes';
import { useUserContext } from '../context/user';
import BottomNavigation from '../components/bottom-navigation';

export default function InboxPage() {
  const { path } = useRouteMatch();
  const { pathname } = useLocation();
  const { user } = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    document.title = `Inbox • Direct`;
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="container mx-auto max-w-screen-lg px-3">
        <div className="bg-white border border-gray-primary rounded md:grid lg:grid-cols-8 grid-cols-9 mb-14 flex flex-col w-full">
          <Inbox user={user} />

          {pathname === INBOX ? (
            <div
              className="flex items-center justify-center col-span-5 flex-col"
              style={{ height: 'calc(100vh - 150px)' }}
            >
              <svg
                className="w-28 text-gray-900 border-gray-900 rounded-full p-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 2 24 24"
                stroke="currentColor"
                style={{ borderWidth: 3 }}
                transform="rotate(58 5 0)"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              <div className="text-2xl font-light mt-3">Your Messages</div>
              <p className="font-semibold text-black-light mt-1 text-center px-3">
                Send private photos and messages to a friend or group.
              </p>
              <button
                type="button"
                aria-label="Send new message"
                onClick={onOpen}
                className="bg-blue-medium font-semibold text-sm text-white rounded px-3 py-2 mt-6"
              >
                Send message
              </button>

              <AddRoom
                isOpen={isOpen}
                onClose={onClose}
                senderId={user.uid}
                senderUsername={user.displayName}
                senderPhotoURL={user.photoURL}
              />
            </div>
          ) : (
            <ProtectedRoute user={user} path={`${path}/:chatId`} exact>
              <Chat user={user} />
            </ProtectedRoute>
          )}
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}
