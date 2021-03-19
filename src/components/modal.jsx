import PropTypes from 'prop-types';

export default function Modal({ children, onClose, isOpen, title, maxW }) {
  return (
    <div
      className={`${
        isOpen ? 'absolute' : 'hidden'
      } flex justify-center items-center inset-0`}
    >
      <div
        aria-hidden
        className="fixed z-30 inset-0 bg-black-faded"
        onClick={onClose}
      />
      <div
        className={`absolute z-40 bg-white max-w-${maxW} w-full flex flex-col border border-gray-primary shadow-lg`}
        role="dialog"
        aria-modal="true"
        aria-label="Add post modal"
      >
        <div className="p-2.5 px-3.5 border-b border-gray-primary w-full flex items-center">
          <button type="button" aria-label="Close modal" onClick={onClose}>
            <svg
              className="w-7 text-black-light cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {title && (
            <span className="flex-grow text-center font-semibold text-lg">
              {title}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  title: null,
  maxW: `lg`,
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  maxW: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
};
