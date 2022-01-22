import React from 'react';
import { useQuery } from 'react-query';
import { getPosts } from './api/crud';
import { ShowAllPosts } from '../../components/posts/showAllPosts';

const PostsContainer = () => {
  const { isFetching, data } = useQuery('posts', () => getPosts());
  const posts = data?.data;

  return (
    <>
      {isFetching && <div>Loading...</div>}
      <ShowAllPosts posts={posts} />
    </>
  );
};

export default PostsContainer;
