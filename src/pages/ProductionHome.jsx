import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  // Countdown timer for registration START (tomorrow at midnight)
  useEffect(() => {
    const getTomorrowMidnight = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return tomorrow;
    };

    const targetDate = getTomorrowMidnight();

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
      <section className="relative bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 text-white py-24 overflow-hidden min-h-[600px] flex items-center">
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
                href="/public-registration"
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
      <section className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white py-5 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Left: Title and Description */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity 
                }}
                className="text-4xl"
              >
                🔥
              </motion.div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight">Early Bird Special: 50% OFF Registration!</h3>
                <p className="text-sm opacity-90">Limited to first 50 families only</p>
              </div>
            </div>

            {/* Center: Timers - Starts In first, then Ends In */}
            <div className="flex items-center gap-6">
              {/* STARTS IN Timer */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm font-semibold">Starts in:</span>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white text-orange-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black leading-none">{String(startsInTime.days).padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase mt-1">Days</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black leading-none">{String(startsInTime.hours).padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase mt-1">Hours</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black leading-none">{String(startsInTime.minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase mt-1">Mins</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black leading-none">{String(startsInTime.seconds).padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase mt-1">Secs</div>
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="h-16 w-px bg-white/30"></div>

              {/* ENDS IN Timer */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-white/90">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm font-semibold">Ends in:</span>
                </div>
                <div className="flex gap-2">
                  <div className="bg-white text-orange-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black leading-none">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase mt-1">Days</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black leading-none">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase mt-1">Hours</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black leading-none">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase mt-1">Mins</div>
                  </div>
                  <div className="text-2xl font-bold self-center">:</div>
                  <div className="bg-white text-orange-600 rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-2xl font-black leading-none">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-[10px] font-bold uppercase mt-1">Secs</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: CTA Button */}
            <div>
              <motion.a
                href="/public-registration"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-full font-bold text-base hover:bg-opacity-90 transition-all shadow-lg whitespace-nowrap"
              >
                <span>Register Now!</span>
                <span className="text-xl">🚀</span>
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
            href="/public-registration"
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Enroll Your Child Today
          </motion.a>
        </div>
      </section>

      {/* EduDash Pro Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white relative overflow-hidden">
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
            <h2 className="text-4xl font-bold mb-4">Powered by EduDash Pro</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Experience cutting-edge educational technology with our comprehensive learning management platform. Track progress, communicate with teachers, and access digital learning resources - all in one place.
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://edudashpro.org.za"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all inline-block"
            >
              🚀 Visit EduDash Pro
            </motion.a>
            <motion.a
              href="/install-pwa"
              whileHover={{ scale: 1.05 }}
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-bold hover:shadow-xl transition-all inline-block"
            >
              📱 Install PWA App
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Young Eagles</h3>
              <p className="text-gray-400 mb-4">Education Platform</p>
              <p className="text-gray-400">
                Where learning meets love. We nurture little minds with big dreams through play, care, and creativity with cutting-edge Society 5.0 integration.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="/programs" className="text-gray-400 hover:text-white transition-colors">Programs</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FaPhone className="text-blue-400" />
                  <span className="text-gray-400">081 523 6000</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-400" />
                  <span className="text-gray-400">info@youngeagles.org.za</span>
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-blue-400 mt-1" />
                  <span className="text-gray-400">
                    7118 Section U Shabangu Street<br />
                    Mamelodi Pretoria 0122
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Young Eagles Education Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/27815236000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all z-50"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
};

export default ProductionHome;
