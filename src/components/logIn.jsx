import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Ensure the path is correct
import SignUp from './SignUp'; // Adjusted import casing for consistency

const LogIn = ({ setUserName, setIsModalOpen }) => {
    const navigate = useNavigate();
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [loginError, setLoginError] = useState('');

    const handleSignUpClick = () => {
        setLoginError(''); // Clear login error when switching to Sign Up
        setIsLoginForm(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setLoginError(''); // Reset error message when closing modal
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        const identifier = e.target.identifier.value.trim().toLowerCase(); // Trim and convert to lowercase
        const password = e.target.password.value;

        // Retrieve user details
        let userDetails = JSON.parse(localStorage.getItem('users')) || [];

        // Sanitize stored data for consistency
        userDetails = userDetails.map(user => ({
            ...user,
            email: user.email.trim().toLowerCase(),
            username: user.username.trim().toLowerCase(),
        }));

        const currentUser = userDetails.find(user => 
            (user.email.toLowerCase() === identifier.toLowerCase() || user.username === identifier)
        );

        if (!currentUser) {
            setLoginError('No account found with that email or username.');
            return;
        }

        if (currentUser.password !== password) {
            setLoginError('Incorrect password. Please try again.');
            return;
        }

        // Update userName and store current user
        setUserName(currentUser.username);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Navigate to profile and close modal
        closeModal();
        navigate('/profile');
        window.location.reload()
    };

    const handleSwitchToLogin = () => {
        setIsLoginForm(true);
        setLoginError(''); // Clear any errors when switching back to the login form
    };

    return (
        <div>
            <Modal isOpen={true} onClose={closeModal}>
                {isLoginForm ? (
                    <div className='bg-gray-800 w-96 p-6 rounded-lg'>
                        <h2 className='text-3xl font-bold mb-6 text-center text-indigo-500'>Welcome Back!</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className='mb-4'>
                                <label className='block text-gray-300 mb-2' htmlFor="identifier">Email / Username</label>
                                <input 
                                    type="text" 
                                    name="identifier" 
                                    id="identifier" 
                                    className='w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                                    placeholder="Enter your email or username" 
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-300 mb-2' htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className='w-full px-4 py-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' 
                                    placeholder="Enter your password" 
                                    required
                                />
                            </div>
                            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                            <button 
                                type="submit" 
                                className='w-full mt-4 bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600'
                            >
                                Log In
                            </button>
                        </form>
                        <p className='mt-4 text-center text-gray-300'>Don't have an account? 
                            <button 
                                onClick={handleSignUpClick} 
                                className='text-indigo-500 hover:underline ml-1'
                            >
                                Sign Up
                            </button>
                        </p>
                    </div>
                ) : (
                    <SignUp onSwitchToLogin={handleSwitchToLogin} closeModal={closeModal} setUserName={setUserName} />
                )}
            </Modal>
        </div>
    );
};

export default LogIn;