import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getUser } from './api/crud';
import { ShowUser } from '../../components/users/showUser';

const UserContainer = () => {
  const params = useParams();
  const { id } = params;

  if (Number.isInteger(Number(id))) {
    const { isFetching, data } = useQuery(`users/${id}`, () => getUser(id));
    const user = data?.data || [];
    console.log(user);

    return (
      <>
        {isFetching && <div>Loading your page...</div>}
        <ShowUser users={user} />
      </>
    );
  }
  return <div>Error 404</div>;
};

export default UserContainer;
