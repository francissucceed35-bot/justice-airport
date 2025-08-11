import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm.jsx';

const ContactPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Have a question or need support? Fill out the form below and we'll get back to you.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-xl">
          <ContactForm />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
