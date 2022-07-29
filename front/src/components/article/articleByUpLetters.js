import React from 'react';

import './style.css';
import {
  Box,
} from '@mui/material';
import ArticleProps from '../../PropTypes/articleProps';

export default function ShowArticleByUpLetters({
  id, text, creator, creationDate,
}) {
  return (
    <Box className="articleContainer">
      <p className="title">{`Article with ID by upper letters = ${id}`}</p>
      <p>{text}</p>
      <p>{creator}</p>
      <p>{creationDate}</p>
    </Box>
  );
}

ShowArticleByUpLetters.propTypes = ArticleProps;
ShowArticleByUpLetters.defaultProps = {
  creator: 'unknown',
};
