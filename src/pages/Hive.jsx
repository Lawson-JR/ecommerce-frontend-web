import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import ProductCard from "../components/productCard";
import { FaClipboardList, FaPlus} from "react-icons/fa";
import { addToCart } from "../redux/cartSlice"; 

const Hive = () => {
    const { category } = useParams(); 
    const navigate = useNavigate();
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isFadingIn, setIsFadingIn] = useState(false);

    useEffect(() => {
        if (products && products.length > 0) {
            if (!category || category === "All") {
                setFilteredProducts(products); 
            } else {
                const filtered = products.filter(product => product.genre.includes(category));
                setFilteredProducts(filtered);
            }
        } else {
            setFilteredProducts([]); 
        }
    }, [category, products]);

    const handleProductClick = (product) => {
        setSelectedProduct(product); 
        setIsFadingOut(false); 
        setIsFadingIn(true); 
    };

    const closeModal = () => {
        setIsFadingOut(true); 
        setIsFadingIn(false); 
        setTimeout(() => {
            setSelectedProduct(null); 
            setIsFadingOut(false); 
        }, 300); 
    };

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch(addToCart(product)); 
        alert(`${product.name} added to cart successfully!`);
        closeModal();
    };

    return (
        <div className="font-bahnschrift md:px-16 lg:px-16 bg-gray-900 text-gray-100">
            <div className="py-8">
            <div className="relative mb-14 -mt-3">
                <Link to="/trackOrder">
                    <FaClipboardList
                        className="text-gray-300 cursor-pointer absolute top-1 right-32 text-2xl hover:text-gray-400 transition 0.3s" 
                    />
                </Link>
                <select
                    className="absolute top-0 right-0 bg-gray-700 text-white p-2 text-sm rounded-lg border outline-0"
                    value={category || "All"}
                    onChange={(e) => {
                        const selectedCategory = e.target.value;
                        navigate(selectedCategory === "All" ? "/hive" : `/hive/${selectedCategory}`);
                    }}
                >
                    <option className="text-sm" value="All">All</option>
                    <option className="text-sm" value="Action">Action</option>
                    <option className="text-sm" value="Adventure">Adventure</option>
                    <option className="text-sm" value="R.P.G">R.P.G</option>
                    <option className="text-sm" value="Sports">Sports</option>
                    <option className="text-sm" value="Simulation">Simulation</option>
                    <option className="text-sm" value="Strategy">Strategy</option>
                    <option className="text-sm" value="Horror">Horror</option>
                    <option className="text-sm" value="Survival">Survival</option>
                </select>
            </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onProductClick={handleProductClick}
                            />
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-400 py-1">Error fetching data, please return to the home page</div>
                    )}
                </div>
            </div>

            {selectedProduct && (
                <div 
                    className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ${isFadingIn ? 'opacity-100' : ''} ${isFadingOut ? 'opacity-0' : ''}`}
                    onClick={closeModal}
                >
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-semibold text-gray-100 mb-4">{selectedProduct.name}</h2>
                        <img src={selectedProduct.image} alt={selectedProduct.name} className="object-cover rounded-lg mb-4" />
                        <p className="text-green-500 mb-2">${selectedProduct.price}</p>
                        <p className="text-gray-400 mb-2">{selectedProduct.genre}</p>
                        <p className="text-gray-300 mb-4">{selectedProduct.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span
                                onClick={(e) => handleAddToCart(e, selectedProduct)} 
                                className="flex items-center bg-indigo-500 cursor-pointer px-3 py-2 rounded-lg group hover:bg-indigo-700 transition duration-300"
                            >
                                <FaPlus className="mr-2" />
                                <button className="text-xs outline-0">Add to cart</button>
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

export default Hive;