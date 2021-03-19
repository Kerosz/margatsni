import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useModal from '../../hooks/use-modal';
import AddRoom from './add-room';

export default function Header({ user }) {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <div className="p-4 px-5 flex items-center border-b border-gray-primary h-16">
      <Link
        to={`/u/${user.displayName}`}
        className="flex-grow text-center font-semibold text-lg text-black-light hover:underline mx-2"
      >
        {user.displayName}
      </Link>
      <button
        type="button"
        aria-label="Create a room"
        title="Create a room"
        onClick={onOpen}
      >
        <svg
          className="w-8 select-none cursor-pointer"
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
      </button>

      <AddRoom isOpen={isOpen} onClose={onClose} userId={user.uid} />
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
};
