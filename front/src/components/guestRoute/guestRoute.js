import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authContext from '../../contexts/authContext';

const GuestRoute = function () {
  const { authenticated } = useContext(authContext);

  if (authenticated) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default GuestRoute;
