import React from 'react';

import './style.css';
import {
  Box,
} from '@mui/material';
import ArticleProps from '../../PropTypes/articleProps';

export default function ShowArticleByNumber({
  id, text, creator, creationDate,
}) {
  return (
    <Box className="articleContainer">
      <p className="title">{`Article with ID by number = ${id}`}</p>
      <p>{text}</p>
      <p>{creator}</p>
      <p>{creationDate}</p>
    </Box>
  );
}

ShowArticleByNumber.propTypes = ArticleProps;
ShowArticleByNumber.defaultProps = {
  creator: 'unknown',
};
