import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from '@formspree/react';
import { FaPaperPlane } from 'react-icons/fa';

function ContactForm() {
    const [state, handleSubmit] = useForm("mdkonkdl");
    const [email, setEmail] = useState("");

    useEffect(() => {
        // Parse the currentUser object from localStorage
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            try {
                const parsedUser = JSON.parse(currentUser);
                if (parsedUser.email) {
                    setEmail(parsedUser.email); // Set the email state to the user's email
                }
            } catch (error) {
                console.error("Error parsing currentUser from localStorage:", error);
            }
        }
    }, []);

    if (state.succeeded) {
        return <p>Thanks for reaching out!</p>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <input
                id="email"
                type="email"
                name="email"
                value={email} // Use the state value for email
                onChange={(e) => setEmail(e.target.value)} // Allow the user to modify the email if needed
                placeholder="Your email"
                className="w-full p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
                required
            />
            <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
            />
            <textarea
                id="message"
                name="message"
                cols={40}
                rows={4}
                placeholder="Comment here..."
                className="w-full p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring focus:ring-indigo-500"
                required
            />
            <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
            />
            <button
                type="submit"
                disabled={state.submitting}
                className="flex items-center justify-center w-full bg-indigo-400 text-gray-900 font-semibold py-2 rounded-lg hover:bg-indigo-500 transition duration-300"
            >
                Leave a message <FaPaperPlane className="ml-2" />
            </button>
        </form>
    );
}

// Export ContactForm as default
export default ContactForm;