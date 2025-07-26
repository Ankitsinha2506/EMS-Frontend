import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { Login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert('Login button clicked');
        // Handle login logic here
        try {
            const response = await axios.post(
                'http://localhost:5000/api/login',
                {
                    email,
                    password
                }
            )
            if (response.status === 200) {
                Login(response.data.user);
                localStorage.setItem('token', response.data.token);
                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard');
                } else
                    navigate('/employee-dashboard');
            } else {
                setError('Invalid email or password');
                alert('Invalid email or password');
            }

        } catch (error) {
            console.error(error);

        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-600">
            <h2 className="font-sevillana text-4xl text-white mb-8 drop-shadow-lg">
                Employee Management System
            </h2>
            <div className="shadow-lg rounded-lg p-8 w-full max-w-sm bg-white">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-700">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="***********"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-5 flex items-center justify-between">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox accent-teal-600" />
                            <span className="ml-2 text-gray-700 text-sm">Remember me</span>
                        </label>
                        <a href="#" className="text-teal-600 text-sm hover:underline">
                            Forgot Password?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 transition-colors text-white py-2 rounded font-semibold shadow"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;