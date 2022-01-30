import React from 'react';

import './style.css';
import postsProps from '../../PropTypes/postsProps';

export function ShowAllPosts({
  posts,
}) {
  return (
    <div className="postsContainer">
      {posts?.map(({
        postId, text, creationDate, creationTime,
      }) => (
        <div className="postBlock" id={`postBlock-${postId}`} key={`postBlock-${postId}`}>
          <div className="number">
            Post №
            {' '}
            {postId}
          </div>
          <div className="text">
            {text}
          </div>
          <div className="infoRow">
            <p className="creationDate">
              {creationDate}
            </p>
            <p className="creationTime">
              {creationTime}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

ShowAllPosts.propTypes = postsProps;
