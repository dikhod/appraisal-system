import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('role'); // Assume role is stored after login
    console.log("local storage ---->",localStorage.getItem('role'))

     // Logout Function
     const handleLogout = () => {
        localStorage.removeItem('token');  // Remove token
        localStorage.removeItem('role');   // Remove role
        navigate('/login');                // Redirect to login page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Dashboard</h2>

                <nav className="flex flex-col gap-4">
                    {console.log("userrole---->",userRole)}
                    {  userRole === 'Admin' && (
                        <Link
                            to="/dashboard/admin"
                            className="bg-blue-500 text-white py-3 rounded-lg text-center hover:bg-blue-600 transition duration-300"
                        >
                            Admin Dashboard
                        </Link>
                    )}

                   { userRole === 'Admin' && (
                    <Link
                            to="/dashboard/allappraisals"
                            className="bg-green-500 text-white py-3 rounded-lg text-center hover:bg-green-600 transition duration-300"
                        >
                            All Appraisals
                        </Link>
                   )}

                    {userRole === 'Manager' && (
                        <Link
                            to="/dashboard/manager"
                            className="bg-green-500 text-white py-3 rounded-lg text-center hover:bg-green-600 transition duration-300"
                        >
                            Manager Dashboard
                        </Link>
                    )}

                   {userRole !== 'Admin' && (
                    <Link
                        to="/dashboard/appraisal"
                        className="bg-purple-500 text-white py-3 rounded-lg text-center hover:bg-purple-600 transition duration-300"
                    >
                        Submit Appraisal
                    </Link>
                   )}
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white py-3 rounded-lg text-center hover:bg-red-600 transition duration-300 mt-4"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;
