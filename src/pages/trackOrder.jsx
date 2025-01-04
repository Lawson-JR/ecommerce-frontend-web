import React, { useEffect, useState } from "react";

const TrackOrder = () => {
    const [ordersWithCountdown, setOrdersWithCountdown] = useState([]);

    useEffect(() => {
        const fetchOrders = () => {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));

            if (currentUser) {
                // Fetch orders for logged-in users
                const usersList = JSON.parse(localStorage.getItem("users")) || [];
                const user = usersList.find(user => user.email === currentUser.email);
                const orders = user?.orders || [];
                return orders;
            } else {
                // Fetch orders for non-logged-in users
                const guestOrders = JSON.parse(localStorage.getItem("tempOrder")) || [];
                return guestOrders;
            }
        };

        const calculateCountdown = (orders) => {
            return orders.map(order => {
                const deliveryDate = new Date(order.deliveryDate);
                const now = new Date();
                const timeLeft = deliveryDate - now;

                let countdown = "";
                if (timeLeft > 0) {
                    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
                    countdown = `${days}d ${hours}h ${minutes}m`;
                } else {
                    countdown = "Delivered";
                }

                return { ...order, countdown };
            });
        };

        const orders = fetchOrders();
        const updatedOrders = calculateCountdown(orders);
        setOrdersWithCountdown(updatedOrders);
    }, []);

    return (
        <div className="font-bahnschrift min-h-screen bg-gray-800 text-gray-300 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ordersWithCountdown.length > 0 ? (
                    ordersWithCountdown.map((order, index) => (
                        <div
                            key={index}
                            className="bg-gray-700 p-4 rounded-lg shadow-lg relative"
                        >
                            <h2 className="text-lg font-bold text-green-400">
                                Order #{index + 1}
                            </h2>
                            <p className="text-sm text-gray-400">
                                Date: {new Date(order.date).toLocaleDateString()}
                            </p>
                            <span className="absolute top-2 right-2 text-xs font-semibold text-gray-300 bg-blue-600 px-2 py-1 rounded-full">
                                {order.countdown}
                            </span>
                            <hr className="my-3 border-gray-600" />
                            <div>
                                <h3 className="text-md font-semibold text-gray-300">
                                    Items:
                                </h3>
                                <ul className="list-disc list-inside">
                                    {order.cartItems.map((item, idx) => (
                                        <li key={idx} className="text-gray-400">
                                            {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm">
                                    <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
                                </p>
                                <p className="text-sm">
                                    <strong>Shipping Cost:</strong> ${order.shippingCost.toFixed(2)}
                                </p>
                                <p className="text-sm">
                                    <strong>Grand Total:</strong> ${order.grandTotal.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center col-span-full text-red-400">
                        No orders found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;