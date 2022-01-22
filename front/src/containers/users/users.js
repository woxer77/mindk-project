import React from 'react';
import { useQuery } from 'react-query';
import { getUsers } from './api/crud';
import { ShowAllUsers } from '../../components/users/showAllUsers';

const UsersContainer = () => {
  const { isFetching, data } = useQuery('users', () => getUsers());
  const users = data?.data || [];

  return (
    <>
      {isFetching && <div>Loading your page...</div>}
      <ShowAllUsers users={users} />
    </>
  );
};

export default UsersContainer;
