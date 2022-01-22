import React from 'react';

import './style.css';
import postsProps from '../../PropTypes/postsProps';

export function ShowAllPosts({
  posts,
}) {
  return (
    <div className="postsContainer">
      {posts?.map(({
        PostID, Text, CreationDate, CreationTime,
      }) => (
        <div className="postBlock" id={`postBlock-${PostID}`} key={`postBlock-${PostID}`}>
          <div className="number">
            Post №
            {' '}
            {PostID}
          </div>
          <div className="text">
            {Text}
          </div>
          <div className="infoRow">
            <p className="creationDate">
              {CreationDate}
            </p>
            <p className="creationTime">
              {CreationTime}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

ShowAllPosts.propTypes = postsProps;
