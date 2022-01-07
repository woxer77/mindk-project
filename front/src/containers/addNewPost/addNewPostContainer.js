import React from 'react';

import { AddNewPostComponent } from '../../components/addNewPost/addNewPostComponent';

export function AddNewPostContainer({
  senderName, senderSurname, reactLogo, avatar, postText,
}) {
  const senderFullName = `${senderName} ${senderSurname}`;

  return (
    <AddNewPostComponent
      senderFullName={senderFullName}
      reactLogo={reactLogo}
      avatar={avatar}
      postText={postText}
    />
  );
}
