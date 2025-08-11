import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-8 min-h-screen"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/admin/flights" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-blue-600">View Flight Bookings</h2>
          <p className="mt-2 text-gray-600">See all submitted flight booking requests from users.</p>
        </Link>
        <Link to="/admin/shipping" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-blue-600">View Shipping Requests</h2>
          <p className="mt-2 text-gray-600">See all submitted cargo and package shipment requests.</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default AdminDashboardPage;
