import React from "react";

const Contact = () => {
    return (
        <div className="font-bahnschrift bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800 text-gray-100 rounded-lg p-8 shadow-lg w-full max-w-2xl relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-3 text-center">Get in Touch</h2>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 w-24 rounded-full mb-4 mx-auto" />

                <p className="mb-4 text-lg">
                    Hello! I'm Lawson Ishikaku, and I'm here to assist you. Feel free to reach out to me for any inquiries or support.
                </p>
                <p className="mb-2">
                    <strong>Email:</strong> <a href="mailto:lawson5n2010@gmail.com" target="_blank" className="text-indigo-300 hover:underline">lawson5n2010@gmail.com</a>
                </p>
                <p className="mb-2">
                    <strong>GitHub:</strong> <a href="https://github.com/Lawson-JR" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline">Lawson-JR</a>
                </p>
                
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 w-24 rounded-full mt-4 mx-auto" />
                
                <p className="mt-4 text-center">
                    I look forward to hearing from you!
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-700 transform rotate-3 -z-10" />
            </div>
        </div>
    );
};

export default Contact;