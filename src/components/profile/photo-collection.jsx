/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

export default function PhotoCollection({ data }) {
  return <div>photo collection</div>;
}

PhotoCollection.defaultProps = {
  data: null,
};

PhotoCollection.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
