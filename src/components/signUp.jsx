import React, { useState } from 'react';

const SignUp = ({ onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                newErrors.email = 'Invalid email format';
            }
        }
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords must match';
        if (!formData.agreeToTerms)
            newErrors.agreeToTerms = 'You must agree to the terms';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Create new user object with openedDate
        const newUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            openedDate: new Date().toISOString() // Set openedDate to current date
        };

        // Retrieve existing users from local storage or initialize an empty array
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if username or email already exists
        const newErrors = {};
        const usernameExists = existingUsers.some(user => user.username === newUser.username);
        const emailExists = existingUsers.some(user => user.email === newUser.email);
        
        if (usernameExists) {
            newErrors.username = 'This username is already taken';
        }
        
        if (emailExists) {
            newErrors.email = 'This email is already registered';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Add new user to the existing users array
        existingUsers.push(newUser);

        // Save updated user details back to local storage
        localStorage.setItem('users', JSON.stringify(existingUsers));

        // Set the submitted state to true
        setIsSubmitted(true);

        // Reset form after submission
        setFormData({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false
        });
        setErrors({});
    };

    return (
        <div className="font-bahnschrift bg-gray-800 p-6 rounded-lg shadow-xl w-96 mx-auto" style={{ width: '400px' }}>
            {isSubmitted ? (
                <p className="text-green-500 text-center">
                    Signup successful! You can now 
                    <button onClick={onSwitchToLogin} className="text-indigo-400 hover:underline ml-1">
                        Log In
                    </button>
                </p>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center text-indigo-400">Create Account</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username */}
                        <div className="relative pb-2">
                            <label className="block text-gray-300 mb-1" htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 bg-gray-700 text-gray-100 outline-0 border ${
                                    errors.username ? 'border-red-500' : 'border-gray-600'
                                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 shadow-sm`}
                                placeholder="Username"
                                required
                            />
                            {errors.username && <span className="block text-red-500 text-sm absolute -bottom-3">{errors.username}</span>}
                        </div>

                        {/* Email */}
                        <div className="relative pb-2">
                            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 bg-gray-700 text-gray-100 outline-0 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-600'
                                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 shadow-sm`}
                                placeholder="Email"
                                required
                            />
                            {errors.email && <span className="block text-red-500 text-sm absolute -bottom-3">{errors.email}</span>}
                        </div>

                        {/* Password */}
                        <div className="relative pb-2">
                            <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 bg-gray-700 text-gray-100 outline-0 border ${
                                    errors.password ? 'border-red-500' : 'border-gray-600'
                                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 shadow-sm`}
                                placeholder="Password"
                                required
                            />
                            {errors.password && <span className="block text-red-500 text-sm absolute -bottom-3">{errors.password}</span>}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative pb-2">
                            <label className="block text-gray-300 mb-1" htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 bg-gray-700 text-gray-100 outline-0 border ${
                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                                } rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300 shadow-sm`}
                                placeholder="Confirm Password"
                                required
                            />
                            {errors.confirmPassword && <span className="block text-red-500 text-sm absolute -bottom-3">{errors.confirmPassword}</span>}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                id="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="h-4 w-4 border-gray-300 rounded focus:ring-indigo-500 text-indigo-600"
                                required
                            />
                            <label htmlFor="agreeToTerms" className="ml-2 text-gray-300">I agree to the<a href="/terms" target='_blank' className='text-indigo-500 hover:underline ml-1'>terms and conditions</a></label>
                            {errors.agreeToTerms && <span className="block text-red-500 text-sm">{errors.agreeToTerms}</span>}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className='w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300'
                        >
                            Sign Up
                        </button>

                        <p className='mt-4 text-center text-gray-300'>Already have an account? 
                            <button 
                                onClick={onSwitchToLogin} 
                                className='text-indigo-500 hover:underline ml-1'
                            >
                                Log In
                            </button>
                        </p>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignUp;