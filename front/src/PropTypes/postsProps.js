const PropTypes = require('prop-types');

module.exports = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      creationDate: PropTypes.string.isRequired,
      creationTime: PropTypes.string.isRequired,
      likesNumber: PropTypes.number.isRequired,
      commentsNumber: PropTypes.number.isRequired,
      availability: PropTypes.string.isRequired,
      creatorId: PropTypes.number.isRequired,
    }),
  ),
};
