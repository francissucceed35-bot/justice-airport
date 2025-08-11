import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Our Story</h2>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900">About Justice Airport</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Pioneering the future of seamless travel and logistics.
          </p>
        </div>
        <div className="mt-12 prose prose-lg text-gray-600 mx-auto">
          <p>
            Founded on the principles of efficiency, security, and customer-first service, Justice Airport is more than just a transit hub. We are a full-service logistics and travel partner dedicated to simplifying the complexities of modern transportation.
          </p>
          <p>
            Our mission is to leverage state-of-the-art technology to provide a frictionless experience for both passengers and cargo. From our easy-to-use online booking forms to our real-time tracking and live support, every aspect of our service is designed with you in mind.
          </p>
          <p>
            Whether you're flying across the globe or shipping critical cargo, you can trust Justice Airport to deliver with precision and care. We are committed to setting a new standard in the industry, one successful journey at a time.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
