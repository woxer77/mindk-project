import React from 'react';

import './style.css';
import ArticleProps from '../../PropTypes/articleProps';

export function ShowArticleByNumber({
  id, text, creator, creationDate,
}) {
  return (
    <div className="articleContainer">
      <p className="title">{`Article with ID by number = ${id}`}</p>
      <p className="text">{text}</p>
      <p className="creator">{creator}</p>
      <p className="creationDate">{creationDate}</p>
    </div>
  );
}

ShowArticleByNumber.propTypes = ArticleProps;

ShowArticleByNumber.defaultProps = {
  creator: 'unknown',
};
