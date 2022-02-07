import React from 'react';
import { AddPost } from '../../components/posts/addPost';

const AddPostContainer = () => {
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  return (
    <AddPost currentDate={currentDate} currentTime={currentTime} />
  );
};

export default AddPostContainer;
