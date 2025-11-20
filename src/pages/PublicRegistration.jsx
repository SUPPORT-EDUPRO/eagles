import React from 'react';
import Register2026Modal from '../components/Register2026Modal';
import { useNavigate } from 'react-router-dom';

const PublicRegistration = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Register2026Modal isOpen={true} onClose={handleClose} />
    </div>
  );
};

export default PublicRegistration;
