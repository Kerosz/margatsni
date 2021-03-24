import { Link } from 'react-router-dom';
import Dropdown from './dropdown';
import CloudinaryImage from './cloudinary-image';
import useDisclosure from '../hooks/use-disclosure';
import useUserNotifications from '../hooks/use-user-notifications';
import { deleteNotification } from '../services/firebase';

export default function Notification() {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const { notifications } = useUserNotifications();

  async function handleRemoveNotification(notificationDocId) {
    await deleteNotification(notificationDocId);

    if (notifications.length === 0) {
      onClose();
    }
  }

  async function handleClearAllNotifiactions() {
    await Promise.all(
      notifications.map(async (notification) => {
        await handleRemoveNotification(notification.docId);
      }),
    );
  }

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      button={
        <button
          type="button"
          id="notification-menu"
          className="sm:mr-4 mr-2 -ml-1 relative"
          aria-expanded={!!isOpen}
          aria-haspopup="true"
          onClick={onToggle}
          onKeyDown={(event) => {
            if (event.key === 'Enter') onToggle();
          }}
        >
          <svg
            className="w-7 text-black-light cursor-pointer active:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {notifications?.length > 0 && (
            <div
              className="w-3 h-3 rounded-full bg-red-primary absolute bottom-0 left-0.5"
              role="none"
            />
          )}
        </button>
      }
      maxW="430px"
    >
      {notifications?.length > 0 ? (
        <>
          <button
            type="button"
            title="Clear all notifications"
            aria-label="Clear all notifications"
            className="mr-4 sticky top-0 bg-white w-full p-3"
            onClick={handleClearAllNotifiactions}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleClearAllNotifiactions();
            }}
          >
            Clear all notifications
          </button>
          <ul className="py-2">
            {notifications.map((notification) => (
              <li
                key={notification.notificationId}
                className="w-full py-3 px-3 hover:bg-gray-50 flex"
                title={`${notification.username} ${notification.text}`}
              >
                <Link
                  to={notification.target}
                  className="flex items-center w-full space-x-1 text-sm"
                  onClick={() => handleRemoveNotification(notification.docId)}
                >
                  <CloudinaryImage
                    src={notification.photoURL}
                    alt={`${notification.username} profile`}
                    size="50"
                    type="profile"
                    className="rounded-full h-9 w-9 mr-2"
                  />
                  <span className="font-semibold">{notification.username}</span>
                  <span>{notification.text}</span>
                </Link>
                <button
                  type="button"
                  aria-label="Remove notification"
                  onClick={() => handleRemoveNotification(notification.docId)}
                >
                  <svg
                    className="w-8 text-black-light cursor-pointer active:text-gray-500 p-0.5 px-1 rounded-full hover:text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex flex-col items-center my-5">
          <svg
            className="w-12 text-black-light border border-black-light rounded-full p-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <p className="text-black-light mt-3 text-xl">No Notifications</p>
        </div>
      )}
    </Dropdown>
  );
}
