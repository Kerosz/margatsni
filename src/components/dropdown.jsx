import PropTypes from 'prop-types';

export default function Dropdown({ isOpen, children, button }) {
  return (
    <div className="relative inline-block text-left">
      <div>{button}</div>

      <div
        className={`origin-top-right ${
          isOpen ? 'absolute' : 'hidden'
        } right-0 mt-3.5 w-56 rounded-md shadow border border-gray-100 bg-white divide-y divide-gray-100 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {children}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  button: PropTypes.element.isRequired,
};
