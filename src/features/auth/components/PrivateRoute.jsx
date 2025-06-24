// src/components/Auth/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoute = () => {
  const token = useSelector((state) => state.auth.token);

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
