import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaVideo } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { Link } from "react-router-dom";
import ContactForm from './contactForm';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-100 font-bahnschrift py-8">
            <div className="container mx-auto px-4 md:px-16 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Brand Section */}
                <div>
                    <h3 className="text-2xl font-bold text-indigo-400">ArKade</h3>
                    <p className="text-gray-400 mt-4 font-cursive italic">
                        "Your ultimate destination for the best PS5 games. Browse, shop, and level up your gaming experience!"
                    </p>
                </div>

                {/* Quick Navigation Links */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-100 mb-2">Quick Navigation</h4>
                    <ul className="space-y-2.5">
                        <li>
                            <Link to="/" className="hover:text-indigo-400 transition duration-300 flex items-center gap-2 w-20">
                                <FaLink className="w-5 h-4" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/hive" className="hover:text-indigo-400 transition duration-300 flex items-center gap-2 w-20">
                                <FaLink className="w-5 h-4" />
                                Hive
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-indigo-400 transition duration-300 flex items-center gap-2 w-20">
                                <FaLink className="w-5 h-4" />
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-indigo-400 transition duration-300 flex items-center gap-2 w-20">
                                <FaLink className="w-5 h-4" />
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social Links & Contact Form */}
                <div>
                    <h4 className="text-lg font-semibold text-gray-100 mb-4">Wanna stay connected?</h4>
                    <div className="flex space-x-4 mb-4">
                        <a href="https://twitter.com/@LIshikaku26185" target="_blank" className="hover:text-indigo-400 transition duration-300">
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://github.com/Lawson-JR" target="_blank" className="hover:text-indigo-400 transition duration-300">
                            <FaGithub size={24} />
                        </a>
                        <a href="https://docs.google.com/presentation/d/17qyPVCzxtGsOxNg1qufGMfSXL5yHhzErH7Kl1eAXhQU/edit?usp=sharing" target="_blank" className="hover:text-indigo-400 transition duration-300">
                            <FaVideo size={24} />
                        </a>
                        <a href="/" target="_blank" className="hover:text-indigo-400 transition duration-300">
                            <FaLinkedin size={24} />
                        </a>
                    </div>

                    {/* Replace the static form with ContactForm */}
                    <ContactForm /> 
                </div>
            </div>
            <div className="mt-8 text-center text-gray-500 text-sm">
                © 2024 ArKade. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;