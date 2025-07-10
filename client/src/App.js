import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

const AdminRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;
