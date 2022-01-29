const PropTypes = require('prop-types');

module.exports = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      UserID: PropTypes.number.isRequired,
      FirstName: PropTypes.string.isRequired,
      SecondName: PropTypes.string.isRequired,
      MiddleName: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Phone: PropTypes.string.isRequired,
      Avatar: PropTypes.string,
    }),
  ),
};
