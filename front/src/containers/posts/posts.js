import React from 'react';
import { useQuery } from 'react-query';
import { getPosts } from './api/crud';
import { ShowAllPosts } from '../../components/posts/showAllPosts';

const PostsContainer = () => {
  const { status, error, data } = useQuery('posts', () => getPosts());
  const posts = data?.data;

  return (
    <>
      {status === 'loading' ? (
        <div>Loading your page...</div>
      ) : status === 'error' ? (
        error.message
      ) : (
        <ShowAllPosts posts={posts} />
      )}
    </>
  );
};

export default PostsContainer;
