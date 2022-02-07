import React from 'react';

import './style.css';
import {
  Box,
} from '@mui/material';
import ArticleProps from '../../PropTypes/articleProps';

export function ShowArticleByUpLetters({
  id, text, creator, creationDate,
}) {
  return (
    <Box sx={{ width: '50%' }} className="articleContainer">
      <p className="title">{`Article with ID by upper letters = ${id}`}</p>
      <p className="text">{text}</p>
      <p className="creator">{creator}</p>
      <p className="creationDate">{creationDate}</p>
    </Box>
  );
}

ShowArticleByUpLetters.propTypes = ArticleProps;

ShowArticleByUpLetters.defaultProps = {
  creator: 'unknown',
};
