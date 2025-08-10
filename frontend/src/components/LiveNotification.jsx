import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({});

  // Larger, more diverse list of international activities for simulation
  const activities = [
    { name: 'John S.', location: 'New York, USA', action: 'booked a flight to London' },
    { name: 'Maria G.', location: 'Lisbon, Portugal', action: 'requested shipping for a package' },
    { name: 'Ahmed K.', location: 'Istanbul, Turkey', action: 'booked a flight to Berlin' },
    { name: 'Fatima Z.', location: 'Kabul, Afghanistan', action: 'requested a 30kg shipment' },
    { name: 'Liam B.', location: 'Dublin, Ireland', action: 'booked a first class ticket' },
    { name: 'Sophie L.', location: 'Paris, France', action: 'shipped documents to Toronto' },
    { name: 'Ivan P.', location: 'Moscow, Russia', action: 'booked a flight to Dubai' },
    { name: 'Yuki T.', location: 'Tokyo, Japan', action: 'requested a 15kg shipment' },
    { name: 'Chen W.', location: 'Shanghai, China', action: 'booked a business class ticket' },
    { name: 'Isabella R.', location: 'Rome, Italy', action: 'shipped art supplies to Madrid' },
    { name: 'Lucas H.', location: 'Berlin, Germany', action: 'booked a flight to New York' },
    { name: 'Emma J.', location: 'Sydney, Australia', action: 'requested a 50kg shipment' },
    { name: 'Mohammed A.', location: 'Cairo, Egypt', action: 'booked a flight to Jeddah' },
    { name: 'Olivia M.', location: 'Toronto, Canada', action: 'shipped a laptop to Vancouver' },
    { name: 'Daniel K.', location: 'Seoul, South Korea', action: 'booked a flight to Los Angeles' },
    { name: 'Ava C.', location: 'London, UK', action: 'requested urgent document shipping' },
  ];

  useEffect(() => {
    const showRandomNotification = () => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setNotification(randomActivity);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Notification stays for 5 seconds
    };
    
    const initialTimeout = setTimeout(showRandomNotification, 7000); // First one after 7s
    const interval = setInterval(showRandomNotification, 12000); // New one every 12s

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-5 left-5 bg-gray-900 text-white p-4 rounded-lg shadow-2xl z-50 max-w-sm"
        >
          <p className="text-sm font-medium">{notification.name} from {notification.location}</p>
          <p className="text-xs text-gray-400">{notification.action}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LiveNotification;
