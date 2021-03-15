import PropTypes from 'prop-types';

export default function Sidebar({ setActivePanel, activePanel }) {
  const activeClass = 'border-black-light font-semibold';
  const hoverClass = 'hover:bg-gray-50 hover:border-gray-300';

  return (
    <div className="flex flex-col items-start">
      <button
        type="button"
        name="edit-profile"
        className={`pl-8 py-4 text-black-light border-l-2 border-transparent ${
          activePanel === 'edit-profile' && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          activePanel !== 'edit-profile' && hoverClass
        }`}
        onClick={({ target }) => setActivePanel(target.name)}
      >
        Edit Profile
      </button>
      <button
        type="button"
        name="change-password"
        className={`pl-8 py-4 text-black-light border-l-2 border-transparent ${
          activePanel === 'change-password' && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          activePanel !== 'change-password' && hoverClass
        }`}
        onClick={({ target }) => setActivePanel(target.name)}
      >
        Change Password
      </button>
      <button
        type="button"
        name="security"
        className={`pl-8 py-4 text-black-light border-l-2 border-transparent ${
          activePanel === 'security' && activeClass
        } w-full text-left outline-none focus-within:outline-none ${
          activePanel !== 'security' && hoverClass
        }`}
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
