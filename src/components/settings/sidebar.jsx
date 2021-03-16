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
        className={`pl-8 py-4 text-black-light border-l-2 border-transparent ${
          getCurrentPath('edit') && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          !getCurrentPath('edit') && hoverClass
        }`}
      >
        Edit Profile
      </Link>
      <Link
        to={ROUTES.CHANGE_PASSWORD}
        aria-label="Change password page"
        className={`pl-8 py-4 text-black-light border-l-2 border-transparent ${
          getCurrentPath('change') && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          !getCurrentPath('change') && hoverClass
        }`}
      >
        Change Password
      </Link>
      <Link
        to={ROUTES.PRIVACY_AND_SECURITY}
        aria-label="Privacy and security page"
        className={`pl-8 py-4 text-black-light border-l-2 border-transparent ${
          getCurrentPath('privacy-and-security') && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          !getCurrentPath('privacy-and-security') && hoverClass
        }`}
      >
        Privacy and Security
      </Link>
    </div>
  );
}

Sidebar.propTypes = {
  activePanel: PropTypes.string.isRequired,
};
