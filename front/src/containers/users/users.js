import React from 'react';
import { useQuery } from 'react-query';
import { getUsers } from './api/crud';
import ShowAllUsers from '../../components/users/showAllUsers';

export default function UsersContainer() {
  const { status, error, data } = useQuery('users', () => getUsers());
  const users = data?.data || [];

  return (
    <>
      {status === 'loading' ? (
        <div>Loading your page...</div>
      ) : status === 'error' ? (
        error.message
      ) : (
        <ShowAllUsers users={users} />
      )}
    </>
  );
}
