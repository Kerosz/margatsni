import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import { useRef, useState } from 'react';
import { useFirebaseContext } from '../context/firebase';
import { useUserContext } from '../context/user';
import AddPost from './post/add-post';
import * as ROUTES from '../constants/routes';

export default function Header() {
  const { firebase } = useFirebaseContext();
  const { user } = useUserContext();

  const postButtonRef = useRef(null);
  const [postModalStatus, setPostModalStatus] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
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
                  className="mt-2 w-6/12"
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
                  className="mr-4"
                  ref={postButtonRef}
                  onClick={() => setPostModalStatus((prev) => !prev)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter')
                      setPostModalStatus((prev) => !prev);
                  }}
                >
                  <svg
                    className="w-8 text-black-light cursor-pointer"
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
                  postButtonRef={postButtonRef}
                  displayModal={postModalStatus}
                  setDisplayStatus={setPostModalStatus}
                />
                <Link
                  to={ROUTES.DASHBOARD}
                  title="Dashboard"
                  aria-label="Dashboard"
                  className="mr-4"
                >
                  <svg
                    className="w-8 text-black-light cursor-pointer"
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
                <button
                  type="button"
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="mr-6"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') firebase.auth().signOut();
                  }}
                >
                  <svg
                    className="w-8 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div
                  className="flex items-center cursor-pointer"
                  title={`${user.displayName}'s profile`}
                  aria-label={`${user.displayName}'s profile`}
                >
                  <Link to={`/p/${user.displayName}`}>
                    <Image
                      cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
                      publicId={user.photoURL}
                      alt={`${user.displayName} profile`}
                      width="32"
                      crop="scale"
                      className="rounded-full h-8 w-8 flex"
                    />
                  </Link>
                </div>
              </>
            ) : (
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
