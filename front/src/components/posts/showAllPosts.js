import React from 'react';
import { Box, Container } from '@mui/material';
import postsProps from '../../PropTypes/postsProps';
import './posts.css';

export default function ShowAllPosts({
  posts,
}) {
  return (
    <Container maxWidth="sm">
      {posts?.map(({
        postId, text, creationDate, creationTime,
      }) => (
        <Box
          sx={{
            width: 550,
            height: 200,
            margin: '20px',
            borderRadius: '10px',
            backgroundColor: '#eef1eb',
          }}
          className="postBlock"
          id={`postBlock-${postId}`}
          key={`postBlock-${postId}`}
        >
          <div className="number">
            Post №
            {' '}
            {postId}
          </div>
          <Box className="text">
            {text}
          </Box>
          <div className="infoRow">
            <p className="creationDate">
              {creationDate}
            </p>
            <p className="creationTime">
              {creationTime}
            </p>
          </div>
        </Box>
      ))}
    </Container>
  );
}

ShowAllPosts.propTypes = postsProps;
