const PropTypes = require('prop-types');

module.exports = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  creator: PropTypes.string,
  creationDate: PropTypes.string.isRequired,
};
