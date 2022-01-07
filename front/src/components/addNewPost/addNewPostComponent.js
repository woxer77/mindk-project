import React from 'react';

import reactLogo from '../../react_logo.png';
import avatar from '../../no_avatar.png';

export function AddNewPostComponent({ senderFullName, postText }) {
  return (
    <div className="App-post">
      <div className="App-post-name">
        <img src={avatar} alt="avatar" />
        <p>
          {senderFullName}
        </p>
      </div>
      <p className="App-post-text">
        {postText}
      </p>
      <img src={reactLogo} className="App-post-image" alt="react_logo" />
    </div>
  );
}
