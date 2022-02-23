import React from 'react';
import { AddPost } from '../../components/posts/addPost';

const AddPostContainer = () => {
  const currentDate = () => {
    const dateObj = new Date();
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${year}-${month}-${day}`;
  };
  const currentTime = () => new Date().toLocaleTimeString();

  return (
    <AddPost currentDate={currentDate} currentTime={currentTime} />
  );
};

export default AddPostContainer;
