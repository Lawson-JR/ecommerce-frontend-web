import React from "react";

const Policy = () => {
    return (
        <div className="font-bahnschrift bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-gray-800 text-gray-100 rounded-lg p-8 shadow-lg w-full max-w-2xl relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-3 text-center">Privacy Policy</h2>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 w-24 rounded-full mb-4 mx-auto" />

                <p className="mb-4">
                    Welcome to ArKade! Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information.
                </p>

                <p className="mb-4">
                    <strong>Data Collection:</strong> All user data, including saved preferences and shopping cart information, is stored locally in your browser's local storage. This data is not shared with any third-party services or stored on external servers. However, local storage may be susceptible to risks, and we recommend taking precautions to safeguard your data.
                </p>

                <p className="mb-4">
                    <strong>Email and Password Security:</strong> We highly recommend using unique email addresses and passwords when engaging with ArKade. If possible, create new credentials specifically for this platform. Avoid using emails or passwords that are linked to sensitive or important accounts.
                </p>

                <p className="mb-4">
                    <strong>Cookies and Tracking:</strong> ArKade does not utilize cookies or tracking services. Your interactions with the site are private and restricted to your browser session.
                </p>

                <p className="mb-4">
                    <strong>Security Recommendations:</strong> While we take measures to ensure the safety of your information, we cannot guarantee 100% security. Please be cautious when sharing personal information online and regularly update your passwords.
                </p>

                <p className="mb-4">
                    For any concerns or questions regarding your privacy, please contact us via the contact section on our website.
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-700 transform rotate-3 -z-10" />
            </div>
        </div>
    );
};

export default Policy;