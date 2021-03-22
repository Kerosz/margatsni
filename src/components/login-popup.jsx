import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from './modal';
import { LOGIN, SIGNUP } from '../constants/routes';

export default function LoginPopup({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log In" maxW="md">
      <div className="flex flex-col items-center py-6 px-3 border-b border-gray-primary">
        <Link to="/" className="flex justify-center w-full">
          <img
            className="w-6/12 mb-4"
            src="/images/logo.png"
            alt="Instagram branding"
          />
        </Link>
        <svg
          className="w-16 text-black-light border-2 border-black-light rounded-full p-3 mt-2.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="-1 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
          />
        </svg>
      </div>
      <div className="sm:px-10 px-6 text-center py-4">
        <p className="text-sm text-gray-base text-center">
          You must have an account to be able to <strong>like</strong>,{' '}
          <strong>comment</strong> or <strong>save</strong> a post
        </p>

        <Link
          to={LOGIN}
          aria-label="Login"
          className="bg-blue-medium text-white rounded px-4 py-1.5 block mt-6 font-semibold"
        >
          Log into your account
        </Link>

        <div className="border-b border-gray-primary w-full flex justify-center mt-5">
          <p className="transform translate-y-2 uppercase bg-white max-w-max px-5 text-xs text-gray-400 font-semibold select-none">
            or
          </p>
        </div>

        <Link
          to={SIGNUP}
          className="text-center text-black-light font-semibold mt-6 px-4 py-1.5 block"
        >
          Create New Account
        </Link>
      </div>
    </Modal>
  );
}

LoginPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
