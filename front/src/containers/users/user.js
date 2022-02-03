import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUser } from './api/crud';
import { ShowUser } from '../../components/users/showUser';

const UserContainer = () => {
  const params = useParams();
  const { id } = params;

  if (Number.isInteger(Number(id))) {
    const {
      status, error, data,
    } = useQuery(`users/${id}`, () => getUser(id));
    const user = data?.data || [];

    return (
      <>
        {status === 'loading' ? (
          <div>Loading your page...</div>
        ) : status === 'error' ? (
          error.message
        ) : (
          <ShowUser users={user} />
        )}
      </>
    );
  }
  return <div>Error 404</div>;
};

export default UserContainer;
