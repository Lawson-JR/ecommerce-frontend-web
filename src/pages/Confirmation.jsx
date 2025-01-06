import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "@formspree/react";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const Confirmation = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { formData, cartItems = [], totalQuantity = 0, totalAmount = 0 } = location.state || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [state, handleSubmit] = useForm("mdkonkdl"); // Replace with your Formspree project ID
    const [email, setEmail] = useState("");

    const shippingCost = totalQuantity * 5;
    const grandTotal = totalAmount + shippingCost;

    useEffect(() => {
        // Fetch user email from localStorage
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            try {
                const parsedUser = JSON.parse(currentUser);
                if (parsedUser.email) {
                    setEmail(parsedUser.email);
                }
            } catch (error) {
                console.error("Error parsing currentUser from localStorage:", error);
            }
        }
    }, []);

    const saveOrder = (orderDetails) => {
        const orderDate = new Date();
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(orderDate.getDate() + 7);

        const enrichedOrderDetails = {
            ...orderDetails,
            date: orderDate.toISOString(),
            deliveryDate: deliveryDate.toISOString(),
        };

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (currentUser) {
            const usersList = JSON.parse(localStorage.getItem("users")) || [];
            const userIndex = usersList.findIndex(user => user.email === currentUser.email);

            if (userIndex !== -1) {
                const userOrders = usersList[userIndex].orders || [];
                usersList[userIndex].orders = [...userOrders, enrichedOrderDetails];
                localStorage.setItem("users", JSON.stringify(usersList));
            }
        } else {
            const tempOrders = JSON.parse(localStorage.getItem("tempOrder")) || [];
            localStorage.setItem("tempOrder", JSON.stringify([...tempOrders, enrichedOrderDetails]));
        }
    };

    const handleOrder = () => {
        const orderDetails = {
            cartItems,
            totalQuantity,
            totalAmount,
            shippingCost,
            grandTotal,
        };

        saveOrder(orderDetails);

        // Prepare email details
        const emailMessage = `
            Order Confirmation
            -------------------
            Name: ${formData?.firstName} ${formData?.lastName}
            Email: ${email}
            Total Quantity: ${totalQuantity}
            Grand Total: $${grandTotal.toFixed(2)}

            Shipping Address:
            ${formData?.address}, ${formData?.city}, ${formData?.state}, ${formData?.zip}
        `;

        handleSubmit({
            email,
            message: emailMessage,
        });

        setIsModalOpen(true);
        dispatch(clearCart());
    };

    if (state.succeeded) {
        console.log("Email sent successfully!");
    }

    return (
        <div className="font-bahnschrift min-h-screen flex items-center justify-center bg-gray-700 p-8">
            <div className="bg-gray-800 text-gray-300 p-8 rounded-lg shadow-2xl max-w-4xl w-full">
                {cartItems.length === 0 ? (
                    <div className="text-center text-lg text-red-500 py-8">
                        No details found
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                            <h2 className="text-3xl font-bold text-blue-400">Order Confirmation</h2>
                            <button
                                onClick={handleOrder}
                                className="px-4 py-2.5 bg-green-600 text-gray-300 rounded-lg hover:bg-green-700 transition duration-300"
                            >
                                Place Order
                            </button>
                        </div>

                        {/* Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                            {/* Customer Information */}
                            <div>
                                <h4 className="font-semibold mb-3 text-lg text-gray-300">Your Information</h4>
                                <div className="border border-gray-600 p-4 rounded-md">
                                    <p><strong>Name:</strong> {formData?.firstName} {formData?.lastName}</p>
                                    <p><strong>Email:</strong> {formData?.email}</p>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h4 className="font-semibold mb-3 text-lg text-gray-300">Shipping Address</h4>
                                <div className="border border-gray-600 p-4 rounded-md">
                                    <p>
                                        <strong>Address:</strong> {formData?.address}, {formData?.city}
                                    </p>
                                    <p>
                                        <strong>State:</strong> {formData?.state}, <strong>Zip Code:</strong> {formData?.zip}
                                    </p>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div>
                                <h4 className="font-semibold mb-3 text-lg text-gray-300">Billing Address</h4>
                                <div className="border border-gray-600 p-4 rounded-md">
                                    <p><strong>Address:</strong> {formData?.address}</p>
                                    <p><strong>Phone:</strong> {formData?.phone}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold mb-3 text-lg text-gray-300">COD Payment Reminder</h4>
                                <div className="border border-gray-600 p-4 rounded-md">
                                    <p>You agreed to Cash on Delivery and our Terms. Please ensure payment is ready upon delivery. Thank you!</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Section */}
                        <div className="mb-8">
                            <table className="min-w-full bg-gray-800 rounded-md border border-gray-700">
                                <thead>
                                    <tr className="text-gray-400">
                                        <th className="py-2 text-left px-4 border-b border-gray-700">Product</th>
                                        <th className="py-2 border-b border-gray-700">Quantity</th>
                                        <th className="py-2 border-b border-gray-700">Price</th>
                                        <th className="py-2 border-b border-gray-700">Shipping Cost</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300">
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3 border-gray-700">{item.name}</td>
                                            <td className="px-4 py-3 text-center border-gray-700">{item.quantity}</td>
                                            <td className="px-4 py-3 text-center border-gray-700 text-green-500">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </td>
                                            <td className="px-4 py-3 pr-6 text-center border-gray-700 text-green-500">$5</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
            {/* Success Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Order Successful!</h2>
                        <p className="text-gray-400 mb-4">Your order has been successfully placed! We appreciate your business and can’t wait for you to enjoy your purchase!</p>
                        <div className="flex justify-between mt-5">
                            <button
                                onClick={() => (window.location.href = "/hive")}
                                className="px-4 py-2.5 bg-blue-600 text-gray-300 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={() => (window.location.href = "/trackOrder")}
                                className="px-4 py-2.5 bg-red-600 text-gray-300 rounded-lg hover:bg-red-700 transition ease-in-out duration-300"
                            >
                                Track Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Confirmation;