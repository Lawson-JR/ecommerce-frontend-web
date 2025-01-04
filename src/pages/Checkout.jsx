import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import emptyCart from "../assets/images/empty-folder.png";
import { useNavigate } from 'react-router-dom'; 
import { selectCartItems, selectTotalAmount, selectTotalQuantity } from '../redux/cartSlice';

const states = [
    {value:'', label:'Select State'},
    {value:'Abia', label:'Abia'},
    {value:'Adamawa', label:'Adamawa'},
    {value:'Akwa Ibom', label:'Akwa Ibom'},
    {value:'Anambara', label:'Anambara'},
    {value:'Bauchi', label:'Bauchi'},
    {value:'Bayelsa', label:'Bayelsa'},
    {value:'Benue', label:'Benue'},
    {value:'Borno', label:'Borno'},
    {value:'Cross River', label:'Cross River'},
    {value:'Delta', label:'Delta'},
    {value:'Ebonyi', label:'Ebonyi'},
    {value:'Edo', label:'Edo'},
    {value:'Ekiti', label:'Ekiti'},
    {value:'Enugu', label:'Enugu'},
    {value:'Gombe', label:'Gombe'},
    {value:'Imo', label:'Imo'},
    {value:'Jigawa', label:'Jigawa'},
    {value:'Kaduna', label:'Kaduna'},
    {value:'Kano', label:'Kano'},
    {value:'Katsina', label:'Katsina'},
    {value:'Kebbi', label:'Kebbi'},
    {value:'Kogi', label:'Kogi'},
    {value:'Kwara', label:'Kwara'},
    {value:'Lagos', label:'Lagos'},
    {value:'Nasarawa', label:'Nasarawa'},
    {value:'Niger', label:'Niger'},
    {value:'Ogun', label:'Ogun'},
    {value:'Ondo', label:'Ondo'},
    {value:'Osun', label:'Osun'},
    {value:'Oyo', label:'Oyo'},
    {value:'Platue', label:'Plateau'},
    {value:'Rivers', label:'Rivers'},
    {value:'Sokoto', label:'Sokoto'},
    {value:'Taraba', label:'Taraba'},
    {value:'Yobe', label:'Yobe'},
    {value:'Zamfara', label:'Zamfara'}
];

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectTotalAmount);
    const totalQuantity = useSelector(selectTotalQuantity);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const today = new Date().toISOString().split("T")[0];
    
    // Fetch the current user's email (from localStorage or Redux)
    const [userEmail, setUserEmail] = useState('');
    useEffect(() => {
        const currentUserEmail = localStorage.getItem("currentUserEmail"); // Assuming you store email here
        setUserEmail(currentUserEmail || '');
    }, []);

    const [formData, setFormData] = useState({
        email: userEmail,
        phone: '+234',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'Nigeria',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.state === '') {
            setError('Please select a state');
            return;
        }
        setError('');
        const cartDetails = { formData, cartItems, totalQuantity, totalAmount };
        navigate('/confirmation', { state: cartDetails });
    };    

    const handlePhoneChange = (e) => {
        const inputValue = e.target.value;
    
        // Remove all non-digit characters except for the + sign and space
        const cleanedValue = inputValue.replace(/[^\d+ ]/g, '');
    
        // Only allow starting input with +234
        if (cleanedValue.startsWith('+234')) {
            // Remove +234 and keep only digits
            const digits = cleanedValue.replace(/\D/g, '').slice(3); // Keep only digits after +234
            
            // Format the phone number
            let formattedNumber = '+234 ';
            
            // Add spaces as needed based on the digit length
            if (digits.length > 0) {
                formattedNumber += digits.slice(0, 3); // First 3 digits
            }
            if (digits.length > 3) {
                formattedNumber += ' ' + digits.slice(3, 7); // Next 4 digits
            }
            if (digits.length > 7) {
                formattedNumber += ' ' + digits.slice(7, 10); // Next 3 digits (up to 10 total)
            }
            
            // Update the state with the formatted phone number
            setFormData({ ...formData, phone: formattedNumber.trim() });
            } else {
                // If the user tries to remove the +234, keep it intact
            setFormData({ ...formData, phone: '+234 ' });
        }
    };            

    return (
        <div className="py-10 bg-gray-700 font-bahnschrift min-h-screen px-4 md:px-16 lg:px-16">
            {cartItems.length > 0 ? (
                <div className='flex justify-center'>
                    {/* Checkout Form Section - Left Side */}
                    <div className="bg-gray-800 p-5 rounded-lg text-white" style={{
                        "width": "75%"
                    }}>
                        <h3 className="text-lg font-semibold pb-2 border-b mb-4">Checkout Information</h3>

                        {/* Customer Information */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm mb-2">Email <span className="text-red-500">*</span></label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder='johndoe@something.com'
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-500 rounded focus:outline-none bg-gray-900 text-white"
                                    required
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input 
                                    type="tel" 
                                    name="phone"
                                    placeholder='e.g +234 567 8901 230'
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    className="w-full p-3 border border-gray-500 rounded focus:outline-none bg-gray-900 text-white"
                                    required
                                />
                            </div>

                            {/* Shipping Information */}
                            <h3 className="text-lg font-semibold pb-2 border-b mb-4">Shipping Information</h3>
                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2">First Name <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="firstName"
                                        placeholder='John'
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-500 rounded focus:outline-none bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">Last Name <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="lastName"
                                        placeholder='Doe'
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-500 rounded focus:outline-none bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm mb-2">Address <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    name="address"
                                    placeholder='e.g Main Street, 101'
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-500 rounded focus:outline-none bg-gray-900 text-white"
                                    required
                                />
                            </div>

                            <div className="mb-6 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm mb-2.5">
                                        State <span className="text-red-500">*</span> {/* Add asterisk for required field */}
                                    </label>
                                    <div className="relative">
                                        <select 
                                            name="state"
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                            className="w-full p-3.5 border border-gray-500 rounded bg-gray-900 text-white focus:outline-none"
                                            required
                                        >
                                            {states.map((state) => (
                                                <option key={state.value} value={state.value}>
                                                    {state.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm mb-2">City <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-500 rounded focus:outline-none bg-gray-900 text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm mb-2">Zip Code <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-500 rounded focus:outline-none bg-gray-900 text-white"
                                    required
                                />
                            </div>

                            {/* COD Payment Reminder */}
                            <h3 className="text-lg font-semibold pb-2 border-b mb-4">COD Payment Reminder</h3>
                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    name="agreeToTerms"
                                    id="agreeToTerms"
                                    className="h-4 w-4 border-gray-300 rounded focus:ring-indigo-500 text-indigo-600 mr-2"
                                    required
                                />
                                <label htmlFor="agreeToTerms" className="ml-2">
                                    Please note that we only accept Cash on Delivery (COD) as a payment method. By proceeding, you confirm that you agree to our Terms and Conditions.
                                </label>
                            </div>

                            {/* Error Message */}
                            {error && <div className="text-red-500">{error}</div>}
                            
                            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 mt-4">
                                Proceed to Confirmation
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-10">
                    <img src={emptyCart} alt="Empty Cart" className="w-48 h-48 mb-5" />
                    <h3 className="text-xl text-white">Your cart is empty!</h3>
                </div>
            )}
        </div>
    );
};

export default Checkout;