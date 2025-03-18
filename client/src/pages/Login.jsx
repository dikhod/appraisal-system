import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { email, password });
            // alert('Login successful!');
            // navigate('/dashboard'); // Redirect to dashboard
            const {token , role} = response.data;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role',role)
                if (role === 'Admin') navigate('/dashboard');
                else if (role === 'Manager') navigate('/dashboard');
                else navigate('/dashboard');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
            console.error('Login Error:', error);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-violet-800">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                {/* Register Navigation Link */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    Don't have an account?{' '}
                    <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => navigate('/register')}
                    >
                        Register here
                    </span>
                </p>
            </div>
        

        </div>
    );
};

export default Login;
