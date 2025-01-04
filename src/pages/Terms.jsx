import React from "react";

const Terms = () => {
    return (
        <div className="font-bahnschrift bg-gray-800 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-gray-900 text-gray-100 rounded-lg p-8 shadow-lg w-full max-w-2xl relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-3 text-center">Terms and Conditions</h2>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 w-24 rounded-full mb-4 mx-auto" />

                <p className="mb-4">
                    Welcome to our eCommerce platform. By accessing or using our website, you agree to be bound by the following terms and conditions. Please read them carefully.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">1. General Use</h3>
                <p className="mb-4">
                    Our website is intended for lawful use to browse and purchase products. You agree to provide accurate and up-to-date information during the registration or checkout process. Any misuse of our platform, including fraudulent activities, will result in the suspension of your account and potential legal action.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">2. Payment Policy</h3>
                <p className="mb-4">
                    All payments for purchases on our platform are made through the Cash on Delivery (COD) method. Customers are required to pay the delivery personnel upon receiving their orders. Please ensure that you have the correct amount available at the time of delivery, as change may not always be provided.
                </p>
                <p className="mb-4">
                    Refusal to accept or pay for an order at the time of delivery may result in restrictions on future orders or suspension of your account.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">3. Account Security</h3>
                <p className="mb-4">
                    We prioritize your account security, but we cannot guarantee 100% protection against unauthorized access. For added security, we strongly advise using unique emails and passwords that you have not used on other platforms. If possible, create new credentials specifically for our site.
                </p>
                <p className="mb-4">
                    Avoid sharing your account details with anyone. In case of suspicious activity, contact our support team immediately. You are responsible for maintaining the confidentiality of your login information.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">4. Delivery Policy</h3>
                <p className="mb-4">
                    We strive to ensure timely delivery of your orders. However, delivery times may vary based on location and other factors. You will be notified of the expected delivery date at the time of order confirmation.
                </p>
                <p className="mb-4">
                    In case of issues with delivery, please contact our support team for assistance.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">5. Privacy Policy</h3>
                <p className="mb-4">
                    Your privacy is important to us. We collect and store your personal data solely for the purpose of processing orders and improving our services. For more information, please refer to our <a href="/policy" className="text-indigo-400 underline">Privacy Policy</a>.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h3>
                <p className="mb-4">
                    Our platform and services are provided "as is" without any warranties, express or implied. We are not liable for any damages resulting from the use of our platform, including unauthorized account access, delayed deliveries, or product defects.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">7. Modifications to Terms</h3>
                <p className="mb-4">
                    We reserve the right to update these terms and conditions at any time without prior notice. Changes will be effective immediately upon posting on this page. Continued use of our platform constitutes acceptance of the updated terms.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">8. Contact Information</h3>
                <p className="mb-4">
                    If you have any questions or concerns about these terms, please contact us at <a href="mailto:lawson5n2010@gmail.com" className="text-indigo-400 underline">arKade@gmail.com</a>.
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-700 transform rotate-3 -z-10" />
            </div>
        </div>
    );
};

export default Terms;