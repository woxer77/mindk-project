const PropTypes = require('prop-types');

module.exports = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      PostID: PropTypes.number.isRequired,
      Text: PropTypes.string.isRequired,
      CreationDate: PropTypes.string.isRequired,
      CreationTime: PropTypes.string.isRequired,
      LikesNumber: PropTypes.number.isRequired,
      CommentsNumber: PropTypes.number.isRequired,
      Availability: PropTypes.string.isRequired,
      CreatorID: PropTypes.number.isRequired,
    }),
  ),
};
