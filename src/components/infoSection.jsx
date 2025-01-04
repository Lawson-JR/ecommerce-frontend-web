import React from "react";
import { FaShippingFast, FaTags } from "react-icons/fa";
import { FaAnchorLock, FaHeadset, FaMoneyBill1Wave } from "react-icons/fa6";

const InfoSection = () => {
    const infoItems = [
        {
            icon: <FaShippingFast className="text-3xl text-indigo-600" />,
            title: "Affordable Shipping",
            description: "Convenient doorstep delivery of your favourite games for just $5"
        },
        {
            icon: <FaHeadset className="text-3xl text-indigo-600" />,
            title: "Support 24 / 7",
            description: "Got any problems? Feel free to contact us"
        },
        {
            icon: <FaMoneyBill1Wave className="text-3xl text-indigo-600" />,
            title: "Full Refund",
            description: "Get back 100% of what you spent on any unsatisfied game purchases"
        },
        {
            icon: <FaAnchorLock className="text-3xl text-indigo-600" />,
            title: "Secure Payment",
            description: "All transaction details are safe with us"
        },
        {
            icon: <FaTags className="text-3xl text-indigo-600" />,
            title: "20% Discount",
            description: "Enjoy occasional discounts on the best games"
        }
    ]
    return (
        <div className="font-bahnschrift pb-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {infoItems.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 border-gray-600">
                        {item.icon}
                        <h3 className="mt-4 text-xl font-semibold text-white-300">{item.title}</h3>
                        <p className="mt-2 text-gray-600">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InfoSection