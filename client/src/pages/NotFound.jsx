import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-400 to-red-600 text-white">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>
            
            <Link 
                to="/" 
                className="bg-white text-red-500 px-4 py-2 rounded-lg hover:bg-red-100 transition duration-300"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
