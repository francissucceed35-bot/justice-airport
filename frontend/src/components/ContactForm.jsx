import React, { useState } from 'react';

const ContactForm = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('Thank you for your message! We will get back to you shortly.');
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="name" id="name" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" id="email" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows="4" required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"></textarea>
            </div>
            <div>
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Send Message
                </button>
            </div>
            {status && <p className="text-center text-green-600">{status}</p>}
        </form>
    );
};

export default ContactForm;
