import React from 'react';

import './style.css';
import {
  Box,
} from '@mui/material';
import ArticleProps from '../../PropTypes/articleProps';

export default function ShowArticleByFormat({
  id, text, creator, creationDate,
}) {
  return (
    <Box className="articleContainer">
      <p className="title">{`Article with ID by a given format = ${id}`}</p>
      <p>{text}</p>
      <p>{creator}</p>
      <p>{creationDate}</p>
    </Box>
  );
}

ShowArticleByFormat.propTypes = ArticleProps;
ShowArticleByFormat.defaultProps = {
  creator: 'unknown',
};
