import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if a "token" exists in localStorage (Simulating JWT auth)
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, kick them back to Login immediately
    return <Navigate to="/login" replace />;
  }

  // If token exists, let them see the page
  return children;
};

export default ProtectedRoute;