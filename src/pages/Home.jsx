import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Categories, mockData } from "../assets/mockData";
import intro from "../assets/images/intro.jpg";
import InfoSection from "../components/infoSection";
import ProductCard from "../components/productCard";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice"; 
import { addToCart } from "../redux/cartSlice";

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.product.products);
    const [username, setUsername] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        dispatch(setProducts(mockData));

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.username) {
            setUsername(currentUser.username);
        }
    }, [dispatch]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setIsFadingOut(false);
    };

    const closeModal = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            setSelectedProduct(null);
        }, 300);
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(addToCart(product));
        alert(`${product.name} has been added to the cart!`);
        setTimeout(closeModal, 300); // Delay modal close
    };

    const handleCategoryClick = (category) => {
        const formattedCategory = category === "Role Playing Games (R.P.G)" ? "R.P.G" : category === "All" ? "All" : category.replace(" ", "%20");
        navigate(`/hive/${formattedCategory}`);
    };

    return (
        <div className="font-bahnschrift px-4 md:px-16 lg:px-16 bg-gray-900 text-gray-100">
            {username && (
                <div>
                    <h1
                        className="text-3xl font-extrabold bg-gradient-to-r from-indigo-700 to-gray-700 text-transparent bg-clip-text shadow-md animate-fade-in text-center pt-5 pb-3 w-1/2 m-auto"
                    >
                        👋 Welcome, {username}!
                    </h1>
                </div>
            )}


            <div className="container mx-auto py-6 flex flex-col md:flex-row space-x-2">
                {/* Sidebar for game categories */}
                <div className="w-full md:w-3/12">
                    <div className="bg-indigo-600 text-white text-sm font-bold px-2 py-2.5" style={{
                        borderTopRightRadius: "3px",
                        borderTopLeftRadius: "3px"
                    }}>
                        DISCOVER GAMES BY GENRE
                    </div>
                    <ul className="space-y-4 bg-gray-800 py-2" style={{
                        borderBottomRightRadius: "3px",
                        borderBottomLeftRadius: "3px"
                    }}>
                        {Categories.map((category, index) => (
                            <li
                                key={index}
                                className="hover:bg-indigo-600 py-2 px-4 transition duration-300 cursor-pointer"
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main content section */}
                <div className="relative w-full md:w-9/12">
                    <img 
                        src={intro} 
                        alt="Intro to ArKade" 
                        className="h-4/5 w-full shadow-lg object-cover rounded" 
                    />
                    
                    {/* Overlay */}
                    <div className="h-4/5 absolute inset-0 bg-black bg-opacity-70 rounded"></div>
                </div>
            </div>

            {/* Info Section */}
            <InfoSection />

            {/* Top Games Section */}
            <div className="mt-8 pb-10">
                <h2 className="text-2xl font-bold mb-5 text-center">Top 8 Games</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.slice(0, 8).map((product, index) => (
                        <ProductCard 
                            key={product.id || index} 
                            product={product} 
                            onProductClick={handleProductClick}
                        />
                    ))}
                </div>
            </div>

            {/* Stunning Horizontal Line and Button Section */}
            <div className="relative flex items-center justify-center mt-5 pb-8">
                <hr className="absolute top-2/3 w-full border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-75" style={{
                    height: '1px',
                    background: 'linear-gradient(to right, rgba(37, 99, 235, 1), rgba(139, 92, 246, 1), rgba(236, 72, 153, 1))',
                    top: '30%',
                    transform: 'translateY(-50%)',
                }} />
                <Link to="/hive">
                    <button className="relative z-10 bg-gradient-to-r text-sm from-indigo-700 to-purple-700 text-white px-3.5 py-2.5 font-bold border shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer hover:bg-gradient-to-l hover:from-indigo-700 hover:to-purple-700">
                        CHECK OUT THE HIVE
                    </button>
                </Link>
            </div>

            {/* Modal for displaying product details */}
            {selectedProduct && (
                <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`} onClick={closeModal}>
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-semibold text-gray-100 mb-4">{selectedProduct.name}</h2>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="object-cover rounded-lg mb-4"
                        />
                        <p className="text-green-500 mb-2">${selectedProduct.price}</p>
                        <p className="text-gray-400 mb-2">{selectedProduct.genre}</p>
                        <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span 
                                className="flex items-center bg-indigo-500 cursor-pointer px-3 py-2 rounded-lg group hover:bg-indigo-700 transition duration-300"
                                onClick={(e) => handleAddToCart(e, selectedProduct)}
                            >
                                <FaPlus className="mr-2" />
                                <button className='text-xs outline-0'>Add to cart</button>
                            </span>
                            <button 
                                className="bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded-lg text-gray-100 text-xs transition"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;