import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUserAlt, FaUserSlash, FaSignOutAlt } from "react-icons/fa"; // Import the required icons
import { useDispatch, useSelector } from "react-redux";
import Modal from './Modal'; // Import the modal component
import LogIn from './logIn'; // Import the LogIn component
import { setSearchTerm } from "../redux/productSlice";

const Navbar = () => {
    const location = useLocation(); // Get the current URL path
    const products = useSelector((state) => state.cart.products);
    const [userName, setUserName] = useState(null); // Define state for userName
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [search, setSearch] = useState();
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Array of paths to check
    const hivePaths = [
        "/hive",
        "/hive/Adventure",
        "/hive/Role Playing Games (R.P.G)",
        "/hive/Sports",
        "/hive/Simulation",
        "/hive/Strategy",
        "/hive/Horror",
        "/hive/Survival",
        "/Action"
    ];

    // Check if the current path matches any of the hive paths
    const isHivePath = hivePaths.includes(location.pathname);

    useEffect(() => {
        // Check if user is logged in when the component mounts
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            setUserName(currentUser.username); // Set username if logged in
        }
    }, []);

    // Function to open the login modal
    const handleLoginClick = () => {
        setIsModalOpen(true); // Open modal when login button is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    // Function to handle logout with confirmation
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?"); // Ask for confirmation
        if (confirmLogout) {
            localStorage.removeItem('currentUser'); // Remove current user details
            localStorage.removeItem('sessionStart'); // Optionally remove session start time
            setUserName(null); // Reset username state
            alert('You have been logged out.'); // Alert user
            navigate('/cart'); // Navigate to cart
    
            // Set a timeout to navigate to home page after a short delay
            setTimeout(() => {
                navigate('/'); // Navigate to home page
            }, 50);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(search));
        setSearch('');
        inputRef.current.blur();
        navigate("/filter-data");
    };    

    return (
        <nav className="bg-gray-900 font-bahnschrift">
            <div className="container mx-auto px-4 md:px-16 lg:px-16 py-4 flex items-center">
                <Link to="/" className="text-indigo-400 text-xl font-bold hover:text-indigo-500 transition duration-300">
                    ArKade
                </Link>

                {/* Search Form */}
                <div className="relative flex-1 mx-4">
                    <form onSubmit={handleSearch}>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search Product..."
                            value={search} // Bind the state
                            className="w-full border border-gray-600 bg-gray-800 text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit">
                            <FaSearch className="absolute top-3 right-3 text-gray-400 hover:text-indigo-400 transition duration-300" />
                        </button>
                    </form>
                </div>

                {/* Cart Section */}
                <div className="flex items-center space-x-4 text-gray-100">
                    <Link to="/cart" className="relative hover:text-indigo-400 transition duration-300">
                        <FaShoppingCart className="text-xl" />
                        {products.length > 0 && (
                            <span className="absolute -top-1 text-xs w-4 left-3 bg-indigo-500 rounded-full flex justify-center items-center text-white">
                                {products.length}
                            </span>
                        )}
                    </Link>

                    {/* Conditional Rendering for Login/Register and User Profile */}
                    {userName ? (
                        // Display username as a link to their profile and logout icon
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/profile"
                                className="text-gray-100 hover:text-indigo-400 transition duration-300 hidden sm:block"
                            >
                                {userName}
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="text-gray-100 hover:text-indigo-400 transition duration-300 flex items-center"
                                aria-label="Logout"
                            >
                                <FaSignOutAlt className="text-xl" />
                            </button>
                        </div>
                    ) : (
                        // Display login button for non-authenticated users
                        <button 
                            onClick={handleLoginClick} 
                            className="text-gray-100 hover:text-indigo-400 transition duration-300 hidden sm:block"
                        >
                            LogIn | Register
                        </button>
                    )}

                    {/* Display icons on small screens */}
                    <div className="flex sm:hidden items-center space-x-4">
                        {userName ? (
                            // Show username as an icon on small screens
                            <Link 
                                to="/profile"
                                className="text-gray-100 hover:text-indigo-400 transition duration-300 flex items-center"
                            >
                                <FaUserAlt className="text-xl" />
                            </Link>
                        ) : (
                            <button 
                                onClick={handleLoginClick} 
                                className="text-gray-100 hover:text-indigo-400 transition duration-300 flex items-center"
                            >
                                <FaUserSlash className="text-xl" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center justify-center space-x-10 py-4 text-sm font-bold bg-gray-800">
                <Link
                    to="/"
                    className={`transition duration-300 ${location.pathname === "/" ? "text-indigo-400 hover:text-indigo-500 transition duration-300" : "text-gray-100 hover:text-indigo-400"}`}
                >
                    Home
                </Link>

                <Link
                    to="/hive"
                    className={`transition duration-300 ${isHivePath ? "text-indigo-400 hover:text-indigo-500 transition duration-300" : "text-gray-100 hover:text-indigo-400"}`}
                >
                    Hive
                </Link>

                <Link
                    to="/contact"
                    className={`transition duration-300 ${location.pathname === "/contact" ? "text-indigo-400 hover:text-indigo-500 transition duration-300" : "text-gray-100 hover:text-indigo-400"}`}
                >
                    Contact
                </Link>

                <Link
                    to="/about"
                    className={`transition duration-300 ${location.pathname === "/about" ? "text-indigo-400 hover:text-indigo-500 transition duration-300" : "text-gray-100 hover:text-indigo-400"}`}
                >
                    About Me
                </Link>
            </div>

            {/* Modal for Login */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <LogIn setUserName={setUserName} setIsModalOpen={setIsModalOpen} /> {/* Pass setUserName here */}
            </Modal>
        </nav>
    );
};

export default Navbar;