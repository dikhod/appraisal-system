import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
          await api.post('/api/auth/register', { name, email, password, role });
            //  localStorage.setItem('role',role);
            alert('Registration successful!');
            navigate('/login');
           
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Failed to register. Please try again.');
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-700">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Register</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Role</label>
                        <select
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="Participant">Participant</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{' '}
                    <span
                        className="text-purple-500 cursor-pointer hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Login here
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
