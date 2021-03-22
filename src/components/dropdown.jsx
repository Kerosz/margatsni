/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import PropTypes from 'prop-types';

export default function Dropdown({ isOpen, onClose, children, button, maxW }) {
  return (
    <div
      className="relative text-left flex"
      tabIndex={-1}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          onClose();
        }
      }}
    >
      {button}

      <div
        className={`origin-top-right ${
          isOpen ? 'absolute' : 'hidden'
        } right-0 top-9 w-screen max-h-96 rounded-md shadow border border-gray-100 bg-white divide-y divide-gray-100 focus:outline-none overflow-y-auto overflow-x-hidden`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
        style={{ maxWidth: maxW }}
      >
        {children}
      </div>
    </div>
  );
}

Dropdown.defaultProps = {
  maxW: `224px`,
};

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  button: PropTypes.element.isRequired,
  maxW: PropTypes.string,
};
