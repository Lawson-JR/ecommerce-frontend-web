import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profilePic from "../assets/images/user.png";
import { FaArrowAltCircleRight, FaPlus, FaTrashAlt } from "react-icons/fa";

const Profile = ({ setCurrentUser }) => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [favoriteGames, setFavoriteGames] = useState([]); 
    const [newGame, setNewGame] = useState(''); 
    const [editingUsername, setEditingUsername] = useState(false); 
    const [newUsername, setNewUsername] = useState(''); 
    const [editingPassword, setEditingPassword] = useState(false); 
    const [newPassword, setNewPassword] = useState(''); 

    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem('currentUser'));
        if (storedUserDetails) {
            setUserDetails(storedUserDetails); 
            setFavoriteGames(storedUserDetails.favoriteGames || []); 
            setNewUsername(storedUserDetails.username); 
        } else {
            alert('You must be logged in to view this page.');
            navigate('/'); 
        }
    }, [navigate]);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.removeItem('currentUser'); 
            localStorage.removeItem('currentUserEmail');
            setCurrentUser(null); 
            alert('You have been logged out.'); 
            navigate('/cart');
            setTimeout(() => {
                navigate('/'); 
                window.location.reload(); 
            }, 50);
        }
    };

    const handleDeleteAccount = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone."); 
        if (confirmDelete) {
            const currentUserEmail = userDetails.email; 
            const usersList = JSON.parse(localStorage.getItem('users')) || []; 

            const updatedUsersList = usersList.filter(user => user.email !== currentUserEmail);

            localStorage.setItem('users', JSON.stringify(updatedUsersList));

            localStorage.removeItem('currentUser'); 
            localStorage.removeItem('currentUserEmail');
            setCurrentUser(null); 
            alert('Your account has been deleted.'); 
            navigate('/cart');
            setTimeout(() => {
                navigate('/'); 
                window.location.reload(); 
            }, 50);
        }
    };

    const handleUpdateUsername = () => {
        if (newUsername.trim()) {
            const usersList = JSON.parse(localStorage.getItem('users')) || []; 
            const currentUserEmail = userDetails.email; 

            const isUsernameTaken = usersList.some(user => user.username === newUsername.trim() && user.email !== currentUserEmail);

            if (isUsernameTaken) {
                alert("This username is already taken. Please choose a different one.");
            } else {
                const updatedUsersList = usersList.map(user => {
                    if (user.email === currentUserEmail) {
                        return { ...user, username: newUsername.trim() }; 
                    }
                    return user;
                });

                localStorage.setItem('users', JSON.stringify(updatedUsersList));

                const updatedUserDetails = { ...userDetails, username: newUsername.trim() };
                localStorage.setItem('currentUser', JSON.stringify(updatedUserDetails));

                setUserDetails(updatedUserDetails); 
                setEditingUsername(false); 
                window.location.reload(); 
            }
        }
    };

    const handleUpdatePassword = () => {
        if (newPassword.trim()) {
            alert('Password updated successfully!'); 
            setEditingPassword(false); 
            window.location.reload()
        }
    };

    // Handle adding a new favorite game
    const handleAddFavoriteGame = () => {
        if (newGame.trim()) {
            const updatedFavoriteGames = [...favoriteGames, newGame.trim()]; 
            setFavoriteGames(updatedFavoriteGames); 

            const usersList = JSON.parse(localStorage.getItem('users')) || [];
            const updatedUserDetails = { ...userDetails, favoriteGames: updatedFavoriteGames };
            
            const updatedUsersList = usersList.map(user => {
                if (user.email === userDetails.email) {
                    return { ...user, favoriteGames: updatedFavoriteGames };
                }
                return user;
            });

            localStorage.setItem('users', JSON.stringify(updatedUsersList));
            setUserDetails(updatedUserDetails);
            localStorage.setItem('currentUser', JSON.stringify(updatedUserDetails));

            setNewGame(''); 
        }
    };

    // Handle removing a favorite game
    const handleRemoveFavoriteGame = (gameToRemove) => {
        const updatedFavoriteGames = favoriteGames.filter(game => game !== gameToRemove); 
        setFavoriteGames(updatedFavoriteGames); 

        const usersList = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUserDetails = { ...userDetails, favoriteGames: updatedFavoriteGames };
        
        const updatedUsersList = usersList.map(user => {
            if (user.email === userDetails.email) {
                return { ...user, favoriteGames: updatedFavoriteGames };
            }
            return user;
        });

        localStorage.setItem('users', JSON.stringify(updatedUsersList));
        setUserDetails(updatedUserDetails);
        localStorage.setItem('currentUser', JSON.stringify(updatedUserDetails));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-bahnschrift py-8 px-4 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                    {userDetails ? (
                        <div>
                            <div className="flex items-center mb-4">
                                <img 
                                    src={profilePic} 
                                    alt="Profile" 
                                    className="rounded-full border-2 border-indigo-400 mr-4 w-20"
                                />
                                <div>
                                    <p className="mb-2">Username: <span className="font-semibold">{userDetails.username}</span></p>
                                    <p className="mb-2">Email: <span className="font-semibold">{userDetails.email}</span></p>
                                </div>
                            </div>
                            <button 
                                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            <button 
                                className="ml-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </button>
                        </div>
                    ) : (
                        <p className="text-lg">loading...</p> 
                    )}
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                    <ul className="space-y-4">
                        {userDetails ? (
                            <li>
                                <p className="font-semibold">Opened the account</p>
                                <span className="text-gray-500 text-sm">
                                    Date: {new Date(userDetails.openedDate).toLocaleDateString()}
                                </span>
                            </li>
                        ) : (
                            <li className="border-b border-gray-700 pb-2">
                                <p className="font-semibold">Loading activity...</p>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-lg font-bold mb-4">Favorite Games</h2>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={newGame}
                                onChange={(e) => setNewGame(e.target.value)}
                                placeholder="Add a favorite game"
                                className="w-full border border-gray-600 bg-gray-800 text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500 mr-3"
                            />
                            <button
                                onClick={handleAddFavoriteGame}
                                className="bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition duration-300"
                            >
                                <FaPlus />
                            </button>
                        </div>
                        <ul>
                            {favoriteGames.length > 0 ? (
                                favoriteGames.map((game, index) => (
                                    <li key={index} className="flex justify-between items-center mb-2 bg-gray-700 px-3 py-2 rounded mb-3">
                                        <span>{game}</span>
                                        <button
                                            onClick={() => handleRemoveFavoriteGame(game)}
                                            className="text-red-500 hover:text-red-700 transition duration-300"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <p className="text-gray-500">No favorite games added yet.</p>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Order History</h2>
                    <Link to="/trackOrder">
                        <FaArrowAltCircleRight className="hover:text-indigo-500 transition 0.3s"/>
                    </Link>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-lg font-bold mb-4">Settings</h2>
                    <ul className="space-y-4">
                        <li className="flex justify-between">
                            <span className="text-md">Change Username</span>
                            {editingUsername ? (
                                <div className="flex items-center justify-between">
                                    <input
                                        type="text"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        className="bg-gray-700 text-gray-100 p-2 rounded mr-2"
                                    />
                                    <button onClick={handleUpdateUsername} className="text-white hover:bg-indigo-700 mr-3 transition duration-300 bg-indigo-600 p-2 rounded-lg">
                                        Save
                                    </button>
                                    <button onClick={() => setEditingUsername(false)} className="text-white hover:bg-red-700 transition duration-300 bg-red-600 p-2 rounded-lg">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => setEditingUsername(true)} className="text-indigo-400 hover:text-indigo-500 transition duration-300">
                                    Edit
                                </button>
                            )}
                        </li>
                        <li className="flex justify-between">
                            <span className="text-md">Change Password</span>
                            {editingPassword ? (
                                <div className="flex items-center justtify-between">
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="bg-gray-700 text-gray-100 p-2 rounded mr-2"
                                    />
                                    <button onClick={handleUpdatePassword} className="text-white hover:bg-indigo-700 mr-3 transition duration-300 bg-indigo-600 p-2 rounded-lg">
                                        Save
                                    </button>
                                    <button onClick={() => setEditingPassword(false)} className="text-white hover:bg-red-700 transition duration-300 bg-red-600 p-2 rounded-lg">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button onClick={() => setEditingPassword(true)} className="text-indigo-400 hover:text-indigo-500 transition duration-300">
                                    Edit
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;