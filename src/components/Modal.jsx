import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
    // Close the modal when the user presses the 'Escape' key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        // Close the modal if the user clicks on the overlay
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="font-bahnschrift fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300"
            onClick={handleOverlayClick}
        >
            <div className=" transition-transform duration-300 transform">
                {children}
            </div>
        </div>
    );
};

export default Modal;