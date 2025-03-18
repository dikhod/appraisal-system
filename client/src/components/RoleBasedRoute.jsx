import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ userRole, requiredRole, children }) => {
    return userRole === requiredRole ? children : <Navigate to="/not-found" />;
};

export default RoleBasedRoute;
