import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChild, FaUser, FaEnvelope, FaPhone, FaCalendar, FaBaby, FaCheckCircle, FaSpinner, FaTimes } from 'react-icons/fa';
import DatabaseService from '../services/DatabaseService';
import { toast } from 'sonner';

const Register2026Modal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Guardian fields
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianAddress: '',
    // Student fields
    studentFirstName: '',
    studentLastName: '',
    studentDOB: '',
    studentGender: '',
    // Preferences
    preferredClass: '',
    preferredStartDate: '',
    referralSource: '',
    earlyBird: true,
    specialRequests: ''
  });

  const programs = [
    { id: 'baby-explorers', name: '👶 Baby Explorers (6 months - 2 years)', ages: '0-2' },
    { id: 'toddler-time', name: '🧸 Toddler Time (2-3 years)', ages: '2-3' },
    { id: 'mini-coders', name: '🤖 Mini Coders & Robo Buddies (3-5 years)', ages: '3-5' },
    { id: 'creative-cubs', name: '🎨 Creative Arts & Expression (2-5 years)', ages: '2-5' },
    { id: 'little-scientists', name: '🔬 STEM Discovery (3-5 years)', ages: '3-5' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await DatabaseService.register2026(formData);
      
      if (result.success !== false) {
        toast.success('Registration successful! We\'ll contact you soon.', {
          description: 'Welcome to Young Eagles 2026 intake!'
        });
        setCurrentStep(4); // Success step
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed', {
        description: error.message || 'Please try again later'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setFormData({
      guardianName: '',
      guardianEmail: '',
      guardianPhone: '',
      guardianAddress: '',
      studentFirstName: '',
      studentLastName: '',
      studentDOB: '',
      studentGender: '',
      preferredClass: '',
      preferredStartDate: '',
      referralSource: '',
      earlyBird: true,
      specialRequests: ''
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Register for 2026 Intake</h2>
                <p className="opacity-90">Secure your child's spot at Young Eagles</p>
              </div>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white text-2xl"
              >
                <FaTimes />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center ${step < 4 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      currentStep >= step
                        ? 'bg-white text-purple-600'
                        : 'bg-white/30 text-white/70'
                    }`}
                  >
                    {step === 4 && currentStep >= 4 ? <FaCheckCircle /> : step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${
                        currentStep > step ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Step 1: Parent Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FaUser className="text-purple-600" />
                      Parent Information
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Guardian Name *</label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Guardian Email *</label>
                      <input
                        type="email"
                        name="guardianEmail"
                        value={formData.guardianEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Guardian Phone *</label>
                      <input
                        type="tel"
                        name="guardianPhone"
                        value={formData.guardianPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="081 234 5678"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Guardian Address *</label>
                      <textarea
                        name="guardianAddress"
                        value={formData.guardianAddress}
                        onChange={handleInputChange}
                        required
                        rows={2}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your full home address"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Child Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FaChild className="text-purple-600" />
                      Student Information
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <input
                          type="text"
                          name="studentFirstName"
                          value={formData.studentFirstName}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="studentLastName"
                          value={formData.studentLastName}
                          onChange={handleInputChange}
                          required
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        name="studentDOB"
                        value={formData.studentDOB}
                        onChange={handleInputChange}
                        required
                        max="2025-12-31"
                        min="2019-01-01"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Gender</label>
                      <select
                        name="studentGender"
                        value={formData.studentGender}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Prefer not to say</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Program Selection */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FaBaby className="text-purple-600" />
                      Program Selection
                    </h3>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Class *</label>
                      <div className="space-y-2">
                        {programs.map((program) => (
                          <label
                            key={program.id}
                            className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="preferredClass"
                              value={program.id}
                              checked={formData.preferredClass === program.id}
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <span className="font-medium">{program.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Start Date</label>
                      <input
                        type="date"
                        name="preferredStartDate"
                        value={formData.preferredStartDate}
                        onChange={handleInputChange}
                        min="2026-01-01"
                        max="2026-12-31"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">How did you hear about us?</label>
                      <select
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="">Select an option</option>
                        <option value="facebook">Facebook</option>
                        <option value="google">Google Search</option>
                        <option value="friend">Friend/Family Referral</option>
                        <option value="instagram">Instagram</option>
                        <option value="flyer">Flyer/Poster</option>
                        <option value="website">Website</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requests / Additional Notes</label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Any special requirements, allergies, or questions..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheckCircle className="text-3xl text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-600 mb-2">Registration Successful!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for registering for our 2026 intake. We'll contact you soon with more details.
                    </p>
                    <button
                      onClick={handleClose}
                      className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`px-6 py-3 rounded-lg border transition-colors ${
                      currentStep === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </button>
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Complete Registration'
                      )}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Register2026Modal;
