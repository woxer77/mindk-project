import React from 'react';

import './style.css';
import ArticleProps from '../../PropTypes/articleProps';

export function ShowArticleByFormat({
  id, text, creator, creationDate,
}) {
  return (
    <div className="articleContainer">
      <p className="title">{`Article with ID by a given format = ${id}`}</p>
      <p className="text">{text}</p>
      <p className="creator">{creator}</p>
      <p className="creationDate">{creationDate}</p>
    </div>
  );
}

ShowArticleByFormat.propTypes = ArticleProps;

ShowArticleByFormat.defaultProps = {
  creator: 'unknown',
};