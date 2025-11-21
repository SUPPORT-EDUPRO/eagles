import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa';

function MyRegisterButton({ className = "", variant = "primary" }) {
  const variants = {
    primary: "bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700",
    secondary: "bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50",
    outline: "border-2 border-white text-white hover:bg-white hover:text-purple-600"
  };

  const handleRegisterClick = () => {
    // Route to EduSitePro centralized registration
    const edusiteproUrl = import.meta.env.VITE_EDUSITEPRO_URL || 'http://localhost:3002';
    window.location.href = `${edusiteproUrl}/registration/young-eagles`;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleRegisterClick}
      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl ${variants[variant]} ${className}`}
    >
      <FaCalendarAlt />
      Register for 2026
    </motion.button>
  );
}

export default MyRegisterButton;
