import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(sendContactMessage({ name, email, message }));
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="pt-16 md:pt-0">
      <div className="min-h-screen bg-gradient-to-r from-teal-100 to-pink-100 flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md">
          <h1 className="text-2xl md:text-3xl font-extrabold text-teal-600 mb-4 md:mb-6 text-center">
            Contact Us
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message"
              rows="4"
              className="w-full py-3 px-4 border-2 border-teal-300 rounded-lg shadow-md bg-white placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow duration-300"
              required
            />
            <button
              type="submit"
              className="w-full py-3 text-lg font-bold bg-teal-600 text-white rounded-lg shadow-md transition-all duration-300 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
