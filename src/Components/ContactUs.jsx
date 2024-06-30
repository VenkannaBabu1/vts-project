import React from 'react';
import { IoMdPaperPlane } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import Footer from "./Footer";

const ContactUs = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-lg mt-8">
                <div className='header mb-8'>
                    <h1 className="text-4xl font-bold text-center">Contact Us</h1>
                    <p className="text-center text-gray-600 mt-2">
                        Let’s talk about your business ideas, and our expert team will help you create the software of
                        <br /> your dreams. You can expect to hear from us within 5 business hours.
                    </p>
                </div>
                <div className="form mb-8">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Your Name</label>
                    <input id="name" type="text" className="w-full bg-gray-200 rounded-md py-3 px-4 mb-4 focus:outline-none focus:bg-white focus:border-blue-500" />

                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input id="email" type="email" className="w-full bg-gray-200 rounded-md py-3 px-4 mb-4 focus:outline-none focus:bg-white focus:border-blue-500" />

                    <label htmlFor="mobile" className="block text-gray-700 font-semibold mb-2">Mobile Number</label>
                    <input id="mobile" type="tel" className="w-full bg-gray-200 rounded-md py-3 px-4 mb-4 focus:outline-none focus:bg-white focus:border-blue-500" />

                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea id="message" rows={5} className="w-full bg-gray-200 rounded-md py-3 px-4 mb-6 focus:outline-none focus:bg-white focus:border-blue-500"></textarea>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                </div>

                <div className="mt-8 flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 mb-8 lg:mb-0 lg:mr-4">
                        <iframe
                            title="Google Maps"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8858245188458!2d80.25002957381037!3d12.979153814715204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d39671d2531%3A0x2a20013b077cee21!2sVTS%20ENTERPRISES%20INDIA%20PRIVATE%20LIMITED!5e0!3m2!1sen!2sin!4v1719279760701!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="bg-gray-200 p-6 rounded-lg mb-4">
                            <h2 className="text-xl font-semibold mb-2">Our Location</h2>
                            <p className="text-gray-700">
                                First Floor, SRP Stratford, Rajiv Gandhi Salai, PTK Nagar, OMR Road, Thiruvanmiyur,
                                Chennai, Tamil Nadu 600041
                            </p>
                        </div>
                        <div className="bg-gray-200 p-6 rounded-lg flex items-center">
                            <MdOutlineMail className="text-2xl text-gray-600 mr-2" />
                            <a href="mailto:talent@vtsenterprisesindia.com" className="text-blue-500 hover:underline">
                                talent@vtsenterprisesindia.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full mt-8'>
                <Footer />
            </div>
        </div>
    );
};

export default ContactUs;
