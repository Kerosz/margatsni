import PropTypes from 'prop-types';

export default function Modal({
  children,
  onClose,
  isOpen,
  title,
  showHeader,
  maxW,
  className,
  ...rest
}) {
  return (
    <div
      className={`${
        isOpen ? 'fixed' : 'hidden'
      } flex justify-center items-center inset-0 z-40`}
    >
      <div
        aria-hidden
        className="fixed z-30 inset-0 bg-black-faded"
        onClick={onClose}
      />
      <div
        className={`absolute z-40 bg-white max-w-${maxW} w-full flex flex-col border border-gray-primary shadow-lg ${className}`}
        role="dialog"
        aria-modal="true"
        {...rest}
      >
        <div
          className={`${
            showHeader ? 'flex' : 'hidden'
          } p-2.5 px-3.5 border-b border-gray-primary w-full items-center`}
        >
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="z-10"
          >
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
            <span className="flex-grow text-center font-semibold text-lg transform -translate-x-4">
              {title}
            </span>
          )}
        </div>
        {children}
        {!showHeader && (
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="text-sm text-black-light text-center py-2.5 w-full px-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

Modal.defaultProps = {
  title: null,
  showHeader: true,
  maxW: `lg`,
  className: null,
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  showHeader: PropTypes.bool,
  className: PropTypes.string,
  maxW: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']),
};
