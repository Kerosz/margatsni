/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

export default function Sidebar({ setActivePanel, activePanel }) {
  const activeClass = 'border-black-light border-l-2 font-semibold';

  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        name="edit-profile"
        className={`pl-8 py-4 text-black-light ${
          activePanel === 'edit-profile' && activeClass
        } w-full text-left outline-none focus-within:outline-none`}
        onClick={({ target }) => setActivePanel(target.name)}
      >
        Edit Profile
      </button>
      <button
        type="button"
        name="change-password"
        className={`pl-8 py-4 text-black-light ${
          activePanel === 'change-password' && activeClass
        } w-full text-left outline-none focus-within:outline-none`}
        onClick={({ target }) => setActivePanel(target.name)}
      >
        Change Password
      </button>
      <button
        type="button"
        name="security"
        className={`pl-8 py-4 text-black-light ${
          activePanel === 'security' && activeClass
        } w-full text-left outline-none focus-within:outline-none`}
        onClick={({ target }) => setActivePanel(target.name)}
      >
        Privacy and Security
      </button>
    </div>
  );
}

Sidebar.propTypes = {
  setActivePanel: PropTypes.func.isRequired,
  activePanel: PropTypes.string.isRequired,
};
