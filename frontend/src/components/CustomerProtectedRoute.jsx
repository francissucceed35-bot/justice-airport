import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const CustomerProtectedRoute = () => {
  const token = localStorage.getItem('customerToken');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default CustomerProtectedRoute;
