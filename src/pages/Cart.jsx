import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import emptyCart from "../assets/images/empty-folder.png";
import { FaTrashAlt } from "react-icons/fa";
import { removeFromCart, updateCartQuantity, hydrateCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
const Cart = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    
    // Load the user's cart from localStorage on component mount
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tempCart = JSON.parse(localStorage.getItem('tempCart')) || { products: [], totalQuantity: 0, totalPrice: 0 };

        if (currentUser) {
            // If user is logged in, find their cart in the users array
            const userCart = users.find(user => user.username === currentUser.username)?.cartDetails?.cart || {
                products: [],
                totalQuantity: 0,
                totalPrice: 0,
            };
            dispatch(hydrateCart(userCart));
        } else {
            // If no user is logged in, initialize cart state with tempCart
            dispatch(hydrateCart(tempCart));
        }
    }, [dispatch]);
    
    // Calculate the shipping date (1 week from today)
    const shippingDate = new Date();
    shippingDate.setDate(shippingDate.getDate() + 7);
    const formattedShippingDate = shippingDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
        
    // Handle cart operations like increment, decrement, and remove
    const handleIncrement = (product) => {
        dispatch(updateCartQuantity({ id: product.id, quantity: product.quantity + 1 }));
        saveCart(); // Save cart state
    };

    const handleDecrement = (product) => {
        if (product.quantity > 1) {
            dispatch(updateCartQuantity({ id: product.id, quantity: product.quantity - 1 }));
            saveCart(); // Save cart state
        }
    };

    const handleRemove = (product) => {
        dispatch(removeFromCart(product.id)); // Dispatch the action to remove from cart
    };

    // Save the cart based on user's login status
    const saveCart = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentCart = cart; // Current state of the cart

        if (currentUser) {
            // If user is logged in, update their cart in the users array
            const userIndex = users.findIndex(user => user.username === currentUser.username);
            if (userIndex !== -1) {
                users[userIndex].cartDetails = { cart: currentCart }; // Update user's cart details
                localStorage.setItem('users', JSON.stringify(users)); // Save updated users back to localStorage
            }
        } else {
            // If user is not logged in, save to tempCart
            localStorage.setItem('tempCart', JSON.stringify(currentCart));
        }
    };

    // Calculate shipping cost (5 dollars per item)
    const shippingCost = cart.totalQuantity * 5;

    return (
        <div className="bg-gray-700 font-bahnschrift py-12 min-h-screen px-4 md:px-16 lg:px-16">
            {cart.products.length > 0 ? (
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    {/* Product List */}
                    <div className="md:w-2/3 p-5 text-white" style={{ maxHeight: "540px", overflow: "auto" }}>
                        <div className="flex justify-between items-center pb-2 px-1 text-xs font-bold">
                            <p className="">GAMES</p>
                            <div className="flex space-x-10">
                                <p>PRICE</p>
                                <p>QUANTITY</p>
                                <p>SUB-TOTAL</p>
                                <p>REMOVE</p>
                            </div>
                        </div>
                        <div>
                            {cart.products.map((product) => (
                                <div key={product.id} className="flex items-center justify-between py-4 px-3 bg-gray-600 my-3 rounded-lg">
                                    <div className="md:flex items-center space-x-4 mr-2">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="hidden lg:block w-16 rounded object-contain" 
                                        />
                                        <div>
                                            <h3 className="text-sm font-semibold">{product.name}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-sm -mr-1.5 text-green-500">${product.price.toFixed(2)}</p>
                                        <div className="flex items-center justify-center border rounded mx-10">
                                            <button
                                                className="text-lg font-bold px-1.5 border-r bg-indigo-400 hover:bg-indigo-500 transition duration-300"
                                                onClick={() => handleDecrement(product)}
                                            >
                                                -
                                            </button>
                                            <p className="text-xs w-5 text-center">{product.quantity}</p>
                                            <button
                                                className="text-lg font-bold px-1 border-l bg-indigo-400 hover:bg-indigo-500 transition duration-300"
                                                onClick={() => handleIncrement(product)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="text-sm w-24 mr-3.5 text-green-500">${(product.quantity * product.price).toFixed(2)}</p>
                                        <button
                                            className="text-indigo-400 hover:text-indigo-500 transition duration-300 mr-1"
                                            onClick={() => handleRemove(product)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Summary Section */}
                    <div className="flex-1 h-full bg-gray-800 p-5 rounded-lg space-y-6 text-white">
                        <h3 className="text-lg font-semibold border-b pb-2">CART SUMMARY</h3>
                        <div className="space-y-2 px-1">
                            <div className="flex justify-between pb-2">
                                <span className="font-semibold">Total items:</span>
                                {cart.totalQuantity === 1 
                                    ? <span className="flex items-center gap-2">{cart.totalQuantity}</span>
                                    : <span className="flex items-center gap-2">{cart.totalQuantity}</span> 
                                }
                            </div>
                            <div className="flex justify-between pb-2">
                                <p className="font-semibold">Shipping Cost:</p>
                                <span>${shippingCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pb-2 pt-3 border-t">
                                <p className="font-semibold">Total Price:</p>
                                <span>${(cart.totalPrice + shippingCost).toFixed(2)}</span>
                            </div>
                            <div className="text-gray-100 pb-3">
                                <span className="font-semibold mr-2">Estimated Arrival:</span> {formattedShippingDate}
                            </div>
                        </div>
                        <Link to="/checkout">
                            <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition duration-300 rounded-sm">Proceed to Checkout</button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center pt-20">
                    <img src={emptyCart} alt="No Games Added" className="w-40 mb-4" />
                    <p className="text-gray-400 text-lg text-center">Games you have added will be displayed here</p>
                </div>
            )}
        </div>
    );
};

export default Cart;