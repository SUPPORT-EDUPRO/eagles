import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase.js";
import useAuth from "../../hooks/useAuth";

const AdminLogin = () => {
  // Young Eagles tenant admins should login to their subdomain on EduSitePro
  // The subdomain ensures proper tenant context in the middleware
  const edusiteproUrl = import.meta.env.PROD 
    ? 'https://young-eagles.edusitepro.org.za'
    : (import.meta.env.VITE_EDUSITEPRO_URL || 'http://localhost:3002');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 text-gray-800 dark:text-white flex items-center justify-center px-4 safe-area-inset">
      <div className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
          Young Eagles Admin Access
        </h2>
        
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
            <strong>School administrators</strong> and <strong>principals</strong> should login through the EduSitePro Admin Portal to manage:
          </p>
          <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-300 space-y-2 ml-2">
            <li>Registration requests and approvals</li>
            <li>Website content and pages</li>
            <li>School information and settings</li>
            <li>Marketing campaigns</li>
          </ul>
        </div>

        <a
          href={`${edusiteproUrl}/dashboard`}
          className="block w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none text-center font-semibold transition-colors"
        >
          Go to EduSitePro Admin Portal →
        </a>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
            Login with your credentials: <strong>king@youngeagles.org.za</strong>
          </p>
        </div>

        <p className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
          For parent access, please download the EduDash Pro mobile app.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

