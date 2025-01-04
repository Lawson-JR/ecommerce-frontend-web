import React from "react";

const About = () => {
    return (
        <div className="font-bahnschrift bg-gray-800 min-h-screen flex flex-col items-center justify-center p-6">
            <div className="bg-gray-900 text-gray-100 rounded-lg p-8 shadow-lg w-full max-w-2xl relative overflow-hidden">
                <h2 className="text-3xl font-bold mb-3 text-center">About Me</h2>
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 w-24 rounded-full mb-4 mx-auto" />

                <p className="mb-4 text-lg">
                    Hello! I'm Lawson Ishikaku, a passionate developer with a keen interest in creating dynamic and responsive front-end web applications. With a strong background in both front-end technologies, I strive to build seamless user experiences.
                </p>

                <h3 className="text-2xl font-semibold mb-4">My Mission</h3>
                <p className="mb-4 text-lg">
                    My mission is to leverage technology to solve real-world problems and enhance the way we interact with the digital world. I believe in continuous learning and improvement.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Skills</h3>
                <ul className="list-disc list-inside mb-4 text-lg">
                    <li>HTML & CSS</li>
                    <li>JavaScript</li>
                    <li>Version Control (Git & GitHub)</li>
                    <li>Tailwind CSS</li>
                    <li>React.js & Redux</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">Projects</h3>
                <p className="mb-4 text-lg">
                    I have worked on several projects that showcase my skills in web development. My upcoming portfolio will include applications that range from e-commerce platforms to interactive dashboards. Feel free to explore my <a href="https://github.com/Lawson-JR" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:underline">Github</a> for more details.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-lg">
                    I'm always open to collaborating on exciting projects or discussing tech. Don't hesitate to reach out!
                </p>

                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 w-24 rounded-full mt-4 mx-auto" />
                
                <p className="mt-4 text-center">
                    Thank you for visiting my page!
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-700 transform rotate-3 -z-10" />
            </div>
        </div>
    );
};

export default About;