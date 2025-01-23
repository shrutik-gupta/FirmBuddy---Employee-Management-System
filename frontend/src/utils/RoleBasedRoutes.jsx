import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBasedRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // First check if user exists
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Then check role
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

export default RoleBasedRoutes;