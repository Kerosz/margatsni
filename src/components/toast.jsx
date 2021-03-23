import { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Toast({ isOpen, onClose, duration, children }) {
  useEffect(() => {
    const timeout = setTimeout(() => onClose(), duration);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  return isOpen && children ? (
    <div className="fixed bottom-0 left-0 w-full" role="alert">
      <div className="bg-black-light rounded-t p-2.5 px-5 text-white tracking-wide text-center">
        {children}
      </div>
    </div>
  ) : null;
}

Toast.defaultProps = {
  duration: 3000,
};

Toast.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  children: PropTypes.element.isRequired,
};
