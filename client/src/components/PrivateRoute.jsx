import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    console.log("token",localStorage.getItem('token'))
    const isAuthenticated = !!localStorage.getItem('token');
    console.log("Auth--->",isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
