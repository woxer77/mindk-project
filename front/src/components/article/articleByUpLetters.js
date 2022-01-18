import React from 'react';

import './style.css';
import ArticleProps from '../../PropTypes/articleProps';

export function ShowArticleByUpLetters({
  id, text, creator, creationDate,
}) {
  return (
    <div className="articleContainer">
      <p className="title">{`Article with ID by upper letters = ${id}`}</p>
      <p className="text">{text}</p>
      <p className="creator">{creator}</p>
      <p className="creationDate">{creationDate}</p>
    </div>
  );
}

ShowArticleByUpLetters.propTypes = ArticleProps;

ShowArticleByUpLetters.defaultProps = {
  creator: 'unknown',
};
