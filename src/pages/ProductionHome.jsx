import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { 
  FaGraduationCap, 
  FaUsers, 
  FaShieldAlt, 
  FaHeart,
  FaBook,
  FaPalette,
  FaFlask,
  FaMusic,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRocket
} from 'react-icons/fa';

const ProductionHome = () => {
  const edusiteproUrl = import.meta.env.VITE_EDUSITEPRO_URL || 'http://localhost:3002';
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [startsInTime, setStartsInTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [liveSpots, setLiveSpots] = useState(null);

  // Countdown timer for registration END (Dec 31, 2025)
  useEffect(() => {
    const targetDate = new Date('2025-12-31T23:59:59');
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Countdown timer for registration START (today at noon)
  useEffect(() => {
    const getTodayNoon = () => {
      const today = new Date();
      today.setHours(12, 0, 0, 0);
      return today;
    };

    const targetDate = getTodayNoon();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setStartsInTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setStartsInTime({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch live spots count from database
  useEffect(() => {
    const fetchLiveSpots = async () => {
      try {
        const supabase = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );

        // Query marketing_campaigns for WELCOME2026 campaign
        const { data, error } = await supabase
          .from('marketing_campaigns')
          .select('current_redemptions, max_redemptions')
          .eq('coupon_code', 'WELCOME2026')
          .eq('active', true)
          .single();

        if (!error && data) {
          const remaining = data.max_redemptions - data.current_redemptions;
          setLiveSpots(remaining > 0 ? remaining : 0);
        } else if (error) {
          console.warn('Error fetching live spots (using fallback):', error.message);
          setLiveSpots(50); // Fallback to 50 if error
        }
      } catch (error) {
        console.warn('Error fetching live spots (using fallback):', error);
        setLiveSpots(50); // Fallback to 50 if error
      }
    };

    fetchLiveSpots();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchLiveSpots, 30000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: FaUsers, number: '200+', label: 'Happy Families', color: 'text-pink-500' },
    { icon: FaStar, number: '15+', label: 'Years Experience', color: 'text-yellow-500' },
    { icon: FaGraduationCap, number: '10+', label: 'Expert Teachers', color: 'text-green-500' },
    { icon: FaHeart, number: '98%', label: 'Parent Satisfaction', color: 'text-red-500' }
  ];

  const features = [
    {
      icon: FaGraduationCap,
      title: 'Society 5.0 Learning',
      description: 'Integrating AI, IoT, and digital tools for future-ready education',
      color: 'text-blue-600'
    },
    {
      icon: FaUsers,
      title: 'Expert Caregivers',
      description: 'Certified educators with years of experience in child development',
      color: 'text-green-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Safe Environment',
      description: 'Secure, clean, and nurturing spaces designed for children',
      color: 'text-purple-600'
    },
    {
      icon: FaHeart,
      title: 'Loving Care',
      description: 'Personalized attention and emotional support for every child',
      color: 'text-red-600'
    }
  ];

  const programs = [
    {
      icon: FaBook,
      title: 'Early Learning',
      ageRange: 'Ages 6 months - 2 years',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: FaPalette,
      title: 'Creative Arts',
      ageRange: 'Ages 2 - 4 years',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FaFlask,
      title: 'STEM Discovery',
      ageRange: 'Ages 3 - 5 years',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: FaMusic,
      title: 'Music & Movement',
      ageRange: 'All age groups',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    }
  ];

  const testimonials = [
    {
      name: 'Phindile Lethlake',
      role: 'Parent',
      avatar: 'P',
      text: 'Young Eagles has transformed my child\'s learning experience. The dedicated teachers and innovative programs create such a nurturing environment.',
      rating: 5
    },
    {
      name: 'Minah Mawasha',
      role: 'Parent',
      avatar: 'M',
      text: 'The caring staff at Young Eagles go above and beyond for our children. The STEM programs and creative activities have helped my son develop confidence.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden min-h-[600px] flex items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: "linear-gradient(to bottom right, rgba(59, 130, 246, 0.85), rgba(37, 99, 235, 0.8), rgba(29, 78, 216, 0.85)), url('/screenshots/bg-image.avif')"}}>
        {/* Animated background circles - positioned like in the image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top center white circle */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white/30 rounded-full"></div>
          
          {/* Top left area circles */}
          <div className="absolute top-32 left-[15%] w-32 h-32 bg-blue-400/30 rounded-full"></div>
          <div className="absolute top-48 left-[8%] w-24 h-24 bg-blue-300/20 rounded-full"></div>
          
          {/* Top right area circles */}
          <div className="absolute top-24 right-[12%] w-40 h-40 bg-blue-400/25 rounded-full"></div>
          <div className="absolute top-40 right-[20%] w-28 h-28 bg-blue-300/20 rounded-full"></div>
          
          {/* Bottom left circles */}
          <div className="absolute bottom-32 left-[10%] w-36 h-36 bg-blue-400/30 rounded-full"></div>
          <div className="absolute bottom-16 left-[20%] w-24 h-24 bg-blue-300/25 rounded-full"></div>
          
          {/* Bottom right circles - prominent large circles */}
          <div className="absolute bottom-40 right-[5%] w-48 h-48 bg-blue-400/35 rounded-full"></div>
          <div className="absolute bottom-24 right-[15%] w-32 h-32 bg-blue-300/25 rounded-full"></div>
          <div className="absolute bottom-8 right-[25%] w-28 h-28 bg-blue-400/20 rounded-full"></div>
          
          {/* Additional scattered circles for depth */}
          <div className="absolute top-[60%] left-[35%] w-20 h-20 bg-blue-300/15 rounded-full"></div>
          <div className="absolute top-[45%] right-[35%] w-24 h-24 bg-blue-400/20 rounded-full"></div>
          <div className="absolute top-[35%] left-[5%] w-20 h-20 bg-blue-300/20 rounded-full"></div>
          <div className="absolute bottom-[60%] right-[8%] w-32 h-32 bg-blue-400/25 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to Young Eagles Day Care
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 opacity-95 leading-relaxed max-w-4xl mx-auto">
              Where learning meets love. We nurture little minds with big dreams through play, care, and creativity with cutting-edge Society 5.0 integration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.a
                href={`${edusiteproUrl}/registration/young-eagles`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
              >
                Register for 2026 <span>→</span>
              </motion.a>
              <motion.button
                onClick={() => window.location.href = '/programs'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all"
              >
                View Programs
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold shadow-lg"
            >
              <span>🎉</span>
              <span>2026 Enrollment Now Open - Limited Spaces!</span>
            </motion.div>
          </motion.div>
        </div>

        {/* White Wave Separator - double curve matching template */}
        <div className="absolute bottom-0 left-0 w-full" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[100px] block">
            <path d="M0,100 C240,10 480,5 720,30 C960,55 1140,70 1440,75 L1440,100 L0,100 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Early Bird Special Banner */}
      <section className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white py-6 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center gap-4">
            {/* Title and Description */}
            <div className="flex items-center gap-3 text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity 
                }}
                className="text-3xl md:text-4xl"
              >
                🔥
              </motion.div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">Early Bird Special: 50% OFF Registration!</h3>
                <p className="text-xs sm:text-sm opacity-90">Limited to first 50 families only</p>
              </div>
            </div>

            {/* Spots Left Counter */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">🎯 Spots Left:</span>
                <span className="text-2xl font-black">{liveSpots !== null ? liveSpots : '...'}</span>
                <span className="text-sm">/ 50</span>
              </div>
            </div>

            {/* Timers - Responsive Layout */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
              {/* ENDS IN Timer - Show only this on mobile */}
              <div className="flex flex-col items-center gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-xs sm:text-sm font-semibold">Ends in:</span>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  <div className="bg-white text-orange-600 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center min-w-[50px] sm:min-w-[60px]">
                    <div className="text-xl sm:text-2xl font-black leading-none">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="text-[8px] sm:text-[10px] font-bold uppercase mt-0.5 sm:mt-1">DAYS</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center min-w-[50px] sm:min-w-[60px]">
                    <div className="text-xl sm:text-2xl font-black leading-none">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-[8px] sm:text-[10px] font-bold uppercase mt-0.5 sm:mt-1">HRS</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center min-w-[50px] sm:min-w-[60px]">
                    <div className="text-xl sm:text-2xl font-black leading-none">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-[8px] sm:text-[10px] font-bold uppercase mt-0.5 sm:mt-1">MINS</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-center min-w-[50px] sm:min-w-[60px]">
                    <div className="text-xl sm:text-2xl font-black leading-none">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-[8px] sm:text-[10px] font-bold uppercase mt-0.5 sm:mt-1">SECS</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full sm:w-auto">
              <motion.a
                href={`${edusiteproUrl}/registration/young-eagles`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-opacity-90 transition-all shadow-lg"
              >
                <span>Register Now!</span>
                <span className="text-lg sm:text-xl">🚀</span>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Trusted by Families Everywhere</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <Icon className={`text-5xl ${stat.color} mx-auto mb-4`} />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Young Eagles?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine traditional nurturing care with innovative Society 5.0 technology to prepare your child for the future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <Icon className={`text-5xl ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Programs</h2>
            <p className="text-xl text-gray-600">
              Age-appropriate curricula designed to nurture every stage of development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${program.bgColor} p-6 rounded-xl hover:shadow-lg transition-all`}
                >
                  <Icon className={`text-4xl ${program.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                  <p className="text-gray-600">{program.ageRange}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <motion.a
              href="/programs"
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              View All Programs 🚀
            </motion.a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Parents Say</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Give Your Child the Best Start?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of families who trust Young Eagles for their child's educational journey
          </p>
          <motion.a
            href={`${edusiteproUrl}/registration/young-eagles`}
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Enroll Your Child Today
          </motion.a>
        </div>
      </section>

      {/* EduDash Pro App Marketing Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: App Info */}
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-semibold">📱 FREE PARENT APP</span>
              </div>
              
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Stay Connected with<br />
                <span className="text-yellow-300">EduDash Pro</span>
              </h2>
              
              <p className="text-xl mb-8 opacity-95">
                Download the official Young Eagles parent app and stay connected with your child's learning journey 24/7. Get real-time updates, track progress, and communicate with teachers instantly.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Real-Time Progress Tracking</h4>
                    <p className="opacity-90">Monitor your child's development, homework, and daily activities</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💬</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Direct Teacher Communication</h4>
                    <p className="opacity-90">Chat with teachers, get instant notifications, and never miss important updates</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">AI-Powered Homework Help</h4>
                    <p className="opacity-90">Get instant help with homework using our Dash AI assistant</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📸</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Photo & Video Sharing</h4>
                    <p className="opacity-90">See your child's daily moments, activities, and achievements</p>
                  </div>
                </div>
              </div>

              {/* Access App Button */}
              <div className="space-y-4">
                {/* Web App - Available Now */}
                <a
                  href="https://edudashpro.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white text-purple-600 hover:bg-gray-100 px-8 py-5 rounded-2xl transition-all transform hover:scale-105 shadow-2xl group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-bold text-purple-700 mb-1">✨ AVAILABLE NOW</div>
                    <div className="font-black text-2xl text-gray-900 mb-1">Access EduDash Pro</div>
                    <div className="text-sm text-gray-600">Works on all devices • Android, iOS, Desktop</div>
                  </div>
                  <svg className="w-6 h-6 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>

                {/* Native App Buttons - Coming Soon */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-white px-4 py-4 text-sm shadow-lg">
                    <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <span className="font-semibold text-gray-900">Google Play</span>
                    <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-bold">SOON</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-white px-4 py-4 text-sm shadow-lg">
                    <svg className="h-6 w-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5M13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                    </svg>
                    <span className="font-semibold text-gray-900">App Store</span>
                    <span className="text-xs bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full font-bold">SOON</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-sm font-semibold mb-2">📱 Mobile App Installation:</p>
                <p className="text-sm opacity-90">
                  After enrolling, you'll receive instructions to install the EduDash Pro app on your phone. Works just like a native app!
                </p>
              </div>

              <p className="mt-4 text-sm opacity-90">
                💜 Join 1,000+ parents already using EduDash Pro • Free forever • No ads
              </p>
            </div>

            {/* Right: App Screenshot */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative mx-auto max-w-[280px] sm:max-w-xs lg:max-w-sm">
                {/* Phone Frame with actual screenshot */}
                <div className="relative bg-gray-900 rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl transform rotate-3 lg:rotate-6 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="/screenshots/edudash-parent-dashboard.png" 
                    alt="EduDash Pro Parent Dashboard"
                    className="w-full rounded-[2rem] sm:rounded-[2.5rem] shadow-xl"
                    onError={(e) => {
                      // Fallback if image doesn't exist - show the mockup
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'block';
                    }}
                  />
                  
                  {/* Fallback mockup (hidden by default) */}
                  <div className="hidden bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 flex justify-between items-center text-white text-xs">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <span>📶</span>
                        <span>📱</span>
                        <span>🔋</span>
                      </div>
                    </div>
                    
                    {/* App Content */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
                        <div>
                          <h3 className="font-bold text-gray-900">Welcome back!</h3>
                          <p className="text-sm text-gray-600">Parent Dashboard</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-semibold text-gray-700">Quick Actions</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex gap-2 items-center text-sm text-gray-600">
                            <span className="text-green-500">●</span> Messages
                          </div>
                          <div className="flex gap-2 items-center text-sm text-gray-600">
                            <span className="text-blue-500">●</span> Calendar
                          </div>
                          <div className="flex gap-2 items-center text-sm text-gray-600">
                            <span className="text-purple-500">●</span> Progress
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  PWA App
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-purple-600 px-4 py-2 rounded-full font-bold shadow-lg">
                  AI Powered
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-10"
              style={{
                width: `${150 + i * 40}px`,
                height: `${150 + i * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaRocket className="text-5xl" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Advanced Learning Technology</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We integrate cutting-edge educational technology to provide comprehensive learning experiences. Track progress, communicate with teachers, and access digital resources seamlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="text-center">
              <FaGraduationCap className="text-5xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Smart Learning</h3>
              <p className="opacity-90">AI-powered personalized education paths</p>
            </div>
            <div className="text-center">
              <FaUsers className="text-5xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Parent Portal</h3>
              <p className="opacity-90">Real-time updates and communication</p>
            </div>
            <div className="text-center">
              <FaShieldAlt className="text-5xl mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Secure Platform</h3>
              <p className="opacity-90">Enterprise-grade security and privacy</p>
            </div>
          </div>

          <div className="text-center">
            <motion.a
              href={`${edusiteproUrl}/registration/young-eagles`}
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
            >
              🚀 Get Started Today
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductionHome;
