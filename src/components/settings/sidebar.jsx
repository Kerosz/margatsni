import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function Sidebar({ activePanel }) {
  const activeClass = 'border-black-light font-semibold';
  const hoverClass = 'hover:bg-gray-50 hover:border-gray-300';

  function getCurrentPath(path) {
    return activePanel.includes(path);
  }

  return (
    <div className="flex flex-col items-start">
      <Link
        to={ROUTES.EDIT_PROFILE}
        aria-label="Edit profile page"
        className={`flex items-center sm:pl-8 pl-4 py-4 text-black-light border-l-2 border-transparent ${
          getCurrentPath('edit') && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          !getCurrentPath('edit') && hoverClass
        }`}
      >
        <svg
          className="w-7 sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span className="hidden sm:block">Edit Profile</span>
      </Link>

      <Link
        to={ROUTES.CHANGE_PASSWORD}
        aria-label="Change password page"
        className={`flex items-center sm:pl-8 pl-4 py-4 text-black-light border-l-2 border-transparent ${
          getCurrentPath('change') && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          !getCurrentPath('change') && hoverClass
        }`}
      >
        <svg
          className="w-7 sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
        <span className="hidden sm:block">Change Password</span>
      </Link>

      <Link
        to={ROUTES.NOTIFICATIONS}
        aria-label="Notifications page"
        className={`flex items-center sm:pl-8 pl-4 py-4 text-black-light border-l-2 border-transparent ${
          getCurrentPath('notifications') && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          !getCurrentPath('notifications') && hoverClass
        }`}
      >
        <svg
          className="w-7 sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
        <span className="hidden sm:block">Notifications</span>
      </Link>

      <Link
        to={ROUTES.PRIVACY_AND_SECURITY}
        aria-label="Privacy and security page"
        className={`flex items-center sm:pl-8 pl-4 py-4 text-black-light border-l-2 border-transparent ${
          getCurrentPath('privacy-and-security') && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          !getCurrentPath('privacy-and-security') && hoverClass
        }`}
      >
        <svg
          className="w-7 sm:hidden"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span className="hidden sm:block">Privacy and Security</span>
      </Link>
    </div>
  );
}

Sidebar.propTypes = {
  activePanel: PropTypes.string.isRequired,
};
