/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { useFirebaseContext } from '../context/firebase';
import { useUserContext } from '../context/user';
import AddPost from './post/add-post';
import * as ROUTES from '../constants/routes';
import Dropdown from './dropdown';
import useDisclosure from '../hooks/use-disclosure';
import Notification from './notification';

export default function Header() {
  const { firebase } = useFirebaseContext();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const [postModalStatus, setPostModalStatus] = useState(false);

  return (
    <header
      className="bg-white border-b border-gray-primary mb-7 sticky top-0 z-20"
      style={{ height: '59px' }}
    >
      <div className="container px-2.5 mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link
                to={ROUTES.DASHBOARD}
                aria-label="Instagram branding"
                title="Instagram branding"
              >
                <img
                  src="/images/logo.png"
                  alt="Instagram branding"
                  className="mt-2 w-28"
                />
              </Link>
            </h1>
          </div>
          <nav
            aria-label="Main"
            className="text-gray-700 text-center align-items items-center flex"
          >
            {user ? (
              <>
                <button
                  type="button"
                  title="Add Post"
                  aria-label="Add Post"
                  className="mr-3.5"
                  onClick={() => setPostModalStatus((prev) => !prev)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter')
                      setPostModalStatus((prev) => !prev);
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
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
                <AddPost
                  userData={user}
                  displayModal={postModalStatus}
                  setDisplayStatus={setPostModalStatus}
                />
                <Link
                  to={ROUTES.DASHBOARD}
                  title="Dashboard"
                  aria-label="Dashboard"
                  className="mr-3.5"
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <Link
                  to={ROUTES.INBOX}
                  title="Inbox"
                  aria-label="Inbox"
                  className="mr-3.5"
                >
                  <svg
                    className="w-7 text-black-light cursor-pointer active:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    transform="rotate(58 5 0)"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </Link>

                <Link
                  to={ROUTES.EXPLORE}
                  title="Explore"
                  aria-label="Explore page"
                  className="mr-3.5"
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
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    />
                  </svg>
                </Link>

                <Notification />

                <Dropdown
                  isOpen={isOpen}
                  onClose={onClose}
                  button={
                    <button
                      type="button"
                      className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-600"
                      id="options-menu"
                      aria-expanded={!!isOpen}
                      aria-haspopup="true"
                      onClick={onToggle}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') onToggle();
                      }}
                    >
                      <Image
                        cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                        publicId={user.photoURL}
                        alt={`${user.displayName} profile`}
                        width="28"
                        crop="scale"
                        className="rounded-full h-7 w-7"
                      />
                    </button>
                  }
                >
                  <div className="py-0.5" role="none">
                    <div
                      className="flex flex-col px-3 py-2 text-sm cursor-default"
                      title={user.email}
                      aria-label="User email address"
                    >
                      <span>Signed in as</span>
                      <span className="font-semibold truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <div className="py-0.5" role="none">
                    <Link
                      to={`/u/${user.displayName}`}
                      title="User profile"
                      aria-label="User profile"
                      className="flex px-3 py-2 text-sm text-black-light hover:bg-gray-50 hover:text-gray-900"
                      role="menuitem"
                    >
                      <svg
                        className="w-5 mr-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Profile</span>
                    </Link>
                    <Link
                      to={ROUTES.ACCOUNT}
                      title="Account settings"
                      aria-label="Account settings"
                      className="flex px-3 py-2 text-sm text-black-light hover:bg-gray-50 hover:text-gray-900"
                      role="menuitem"
                    >
                      <svg
                        className="w-5 mr-2.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        />
                      </svg>
                      <span>Settings</span>
                    </Link>
                  </div>
                  <div className="py-0.5" role="none">
                    <button
                      type="button"
                      title="Sign Out"
                      aria-label="Sign Out"
                      className="flex px-3 py-2 text-sm text-black-light hover:bg-gray-50 hover:text-gray-900 w-full"
                      role="menuitem"
                      onClick={() => firebase.auth().signOut()}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') firebase.auth().signOut();
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                </Dropdown>

                {/* <div
                  className="flex items-center cursor-pointer"
                  title={`${user.displayName}'s profile`}
                  aria-label={`${user.displayName}'s profile`}
                >
                  <Link to={`/u/${user.displayName}`}>
                    <Image
                      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                      publicId={user.photoURL}
                      alt={`${user.displayName} profile`}
                      width="28"
                      crop="scale"
                      className="rounded-full h-7 w-7"
                    />
                  </Link>
                </div> */}
              </>
            ) : pathname.includes('reset') ? null : (
              <>
                <Link to={ROUTES.LOGIN} aria-label="Login">
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm text-white rounded w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGNUP} className="ml-2" aria-label="Sign Up">
                  <button
                    type="button"
                    className="font-bold text-sm text-blue-medium rounded w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
