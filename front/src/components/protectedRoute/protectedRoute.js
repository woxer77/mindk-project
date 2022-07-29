import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import authContext from '../../contexts/authContext';

const ProtectedRoute = function () {
  const { authenticated } = useContext(authContext);

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
