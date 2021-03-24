import { Link } from 'react-router-dom';
import CloudinaryImage from './cloudinary-image';
import { useUserContext } from '../context/user';
import * as ROUTES from '../constants/routes';
import SearchBar from './search-bar';

export default function BottomNavigation() {
  const { user } = useUserContext();

  return user ? (
    <nav
      className="bg-white border-t border-gray-primary fixed w-full bottom-0 left-0 z-20 sm:hidden flex items-center justify-between px-3"
      style={{ height: '50px' }}
    >
      <div className="flex">
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
      </div>

      <SearchBar isBottom />

      <Link
        to={`/u/${user.displayName}`}
        title="Profile"
        aria-label="Profile page"
        className="ml-3.5 min-w-max"
      >
        <CloudinaryImage
          src={user.photoURL}
          alt={`${user.displayName} profile`}
          size="80"
          type="profile"
          className="rounded-full h-7 w-7"
        />
      </Link>
    </nav>
  ) : null;
}
