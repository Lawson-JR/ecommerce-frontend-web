import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Hive from "./pages/Hive";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout";
import Confirmation from './pages/Confirmation';
import Profile from './pages/Profile';
import LogIn from './components/logIn';
import FilterData from './pages/filterData';
import TrackOrder from "./pages/trackOrder.jsx"
import Terms from "./pages/terms.jsx"
import Policy from "./pages/Policy.jsx"

function App() {
    const [currentUser, setCurrentUser] = useState(null); 
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 
    const [cart, setCart] = useState({ products: [], totalQuantity: 0, totalPrice: 0 });
    const sessionTimeoutRef = useRef(null); // Reference for session timeout

    const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

    useEffect(() => {
        const usersData = JSON.parse(localStorage.getItem('users')) || [];
        const loggedInUserEmail = localStorage.getItem('currentUserEmail');
        const sessionExpiry = localStorage.getItem('sessionExpiry');

        if (loggedInUserEmail && sessionExpiry && new Date().getTime() < sessionExpiry) {
            const user = usersData.find(user => user.email === loggedInUserEmail);
            if (user) {
                setCurrentUser(user);
                const userCart = user.cartDetails?.cart || { products: [], totalQuantity: 0, totalPrice: 0 };
                setCart(userCart);
                resetSessionTimeout(); // Reset session timer
            }
        } else {
            logoutUser(); // Session expired, log out the user
        }
    }, []);

    const resetSessionTimeout = () => {
        if (!currentUser) return; // Ensure we only set the timeout if a user is logged in
    
        if (sessionTimeoutRef.current) {
            clearTimeout(sessionTimeoutRef.current); // Clear any previous timeout
        }
    
        // Set a new timeout for session expiration
        sessionTimeoutRef.current = setTimeout(() => {
            logoutUser(); // Log out the user after 30 minutes of inactivity
            Navigate("/profile")
        }, SESSION_TIMEOUT);
    
        // Save session expiry time to localStorage
        const expiryTime = new Date().getTime() + SESSION_TIMEOUT;
        localStorage.setItem('sessionExpiry', expiryTime);
    };
    
    const logoutUser = () => {
        if (!currentUser) return; // If no user is logged in, don't proceed
        
        // Clear user-related data
        setCurrentUser(null);
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('sessionExpiry');
    };

    const handleUserActivity = () => {
        if (currentUser) {
            resetSessionTimeout(); // Reset the session timer on any user activity
        }
    };

    // Event listeners for user activity
    useEffect(() => {
        window.addEventListener('mousemove', handleUserActivity);
        window.addEventListener('keydown', handleUserActivity);

        return () => {
            window.removeEventListener('mousemove', handleUserActivity);
            window.removeEventListener('keydown', handleUserActivity);
        };
    }, [currentUser]);

    const updateCartQuantity = (id, quantity) => {
        setCart(prevCart => {
            const updatedProducts = prevCart.products.map(product => {
                if (product.id === id) {
                    return { ...product, quantity: quantity };
                }
                return product;
            }).filter(product => product.quantity > 0);

            const totalQuantity = updatedProducts.reduce((total, product) => total + product.quantity, 0);
            const totalPrice = updatedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
            return { products: updatedProducts, totalQuantity, totalPrice };
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => {
            const updatedProducts = prevCart.products.filter(product => product.id !== id);
            const totalQuantity = updatedProducts.reduce((total, product) => total + product.quantity, 0);
            const totalPrice = updatedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
            return { products: updatedProducts, totalQuantity, totalPrice };
        });
    };

    return (
        <BrowserRouter>
            <AppContent 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                isLoginModalOpen={isLoginModalOpen} 
                setIsLoginModalOpen={setIsLoginModalOpen} 
                cart={cart} 
                removeFromCart={removeFromCart} 
                updateCartQuantity={updateCartQuantity} 
            />
        </BrowserRouter>
    );
}

const AppContent = ({ currentUser, setCurrentUser, isLoginModalOpen, setIsLoginModalOpen, cart, removeFromCart, updateCartQuantity }) => {
    return (
        <div>
            <Navbar 
                currentUser={currentUser} 
                setCurrentUser={setCurrentUser} 
                setIsLoginModalOpen={setIsLoginModalOpen} 
            />
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hive/:category?" element={<Hive />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={
                    <Cart 
                        cart={cart} 
                        removeFromCart={removeFromCart} 
                        updateCartQuantity={updateCartQuantity} 
                    />
                } />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/profile" element={<Profile setCurrentUser={setCurrentUser} />} />
                <Route path="/filter-data" element={<FilterData />} />
                <Route path="/trackOrder" element={<TrackOrder />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/policy" element={<Policy />} />
            </Routes>

            {isLoginModalOpen && (
                <LogIn 
                    setCurrentUser={setCurrentUser} 
                    setIsModalOpen={setIsLoginModalOpen} 
                />
            )}
            
            <Footer />
        </div>
    );
}

export default App;