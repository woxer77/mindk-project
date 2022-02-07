import React from 'react';

import './style.css';
import {
  Box,
} from '@mui/material';
import ArticleProps from '../../PropTypes/articleProps';

export function ShowArticleByFormat({
  id, text, creator, creationDate,
}) {
  return (
    <Box sx={{ width: '50%' }} className="articleContainer">
      <p className="title">{`Article with ID by a given format = ${id}`}</p>
      <p className="text">{text}</p>
      <p className="creator">{creator}</p>
      <p className="creationDate">{creationDate}</p>
    </Box>
  );
}

ShowArticleByFormat.propTypes = ArticleProps;

ShowArticleByFormat.defaultProps = {
  creator: 'unknown',
};
