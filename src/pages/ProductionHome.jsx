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
  const [maxSpots, setMaxSpots] = useState(null);
  const [campaignLoading, setCampaignLoading] = useState(true);
  const [campaignEndDate, setCampaignEndDate] = useState(null);
  const [isCampaignExpired, setIsCampaignExpired] = useState(false);
  const [isCampaignSoldOut, setIsCampaignSoldOut] = useState(false);
  const [isCampaignActive, setIsCampaignActive] = useState(false);
  const [campaignLastUpdated, setCampaignLastUpdated] = useState(null);
  const [selectedParentGoal, setSelectedParentGoal] = useState('school_readiness');
  const [heroBackgroundIndex, setHeroBackgroundIndex] = useState(0);
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0 });
  const [selectedTrustSignal, setSelectedTrustSignal] = useState('safety');

  const heroBackgrounds = [
    '/screenshots/bg-image.avif',
    '/campus/campus-1.jpeg'
  ];

  const trustSignals = [
    {
      id: 'safety',
      label: 'Safety First',
      title: 'Secure campus with supervised routines',
      message: 'Controlled access points, visible corridors, and active staff supervision keep children safe throughout the day.'
    },
    {
      id: 'learning',
      label: 'Future Skills',
      title: 'Society 5.0 learning for early minds',
      message: 'Play-based literacy, creativity, and guided technology exposure build confidence for the next stage of school.'
    },
    {
      id: 'communication',
      label: 'Parent Visibility',
      title: 'Real-time updates through EduDash Pro',
      message: 'Families stay informed with progress snapshots, communication tools, and daily learning visibility.'
    }
  ];

  // Countdown timer for campaign end
  useEffect(() => {
    if (!campaignEndDate || !isCampaignActive) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return undefined;
    }

    const targetDate = new Date(campaignEndDate);
    
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
  }, [campaignEndDate, isCampaignActive]);

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

  // Rotate hero backgrounds so we keep both the original and real-campus image
  useEffect(() => {
    const rotationTimer = setInterval(() => {
      setHeroBackgroundIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 7000);

    return () => clearInterval(rotationTimer);
  }, [heroBackgrounds.length]);

  const handleHeroMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setHeroParallax({
      x: normalizedX * 8,
      y: normalizedY * 6
    });
  };

  const handleHeroMouseLeave = () => {
    setHeroParallax({ x: 0, y: 0 });
  };

  // Fetch campaign state and live spots from database
  useEffect(() => {
    const fetchCampaignStatus = async () => {
      setCampaignLoading(true);
      try {
        const supabase = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );

        // Query latest active campaign for known registration promo codes
        const { data, error } = await supabase
          .from('marketing_campaigns')
          .select('current_redemptions, max_redemptions, active, start_date, end_date, coupon_code, promo_code')
          .or('coupon_code.eq.WELCOME2026,promo_code.eq.WELCOME2026,coupon_code.eq.2026(FEB),promo_code.eq.2026(FEB)')
          .eq('active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          const now = Date.now();
          const startTs = data.start_date ? new Date(data.start_date).getTime() : null;
          const endTs = data.end_date ? new Date(data.end_date).getTime() : null;
          const hasMax = data.max_redemptions != null;
          const remaining = hasMax
            ? Math.max(0, (data.max_redemptions ?? 0) - (data.current_redemptions ?? 0))
            : null;
          const soldOut = hasMax && remaining === 0;
          const expired = endTs ? endTs < now : false;
          const notStarted = startTs ? startTs > now : false;
          const activeNow = Boolean(data.active) && !expired && !soldOut && !notStarted;

          setLiveSpots(remaining);
          setMaxSpots(data.max_redemptions ?? null);
          setCampaignEndDate(data.end_date ?? null);
          setIsCampaignExpired(expired);
          setIsCampaignSoldOut(soldOut);
          setIsCampaignActive(activeNow);
        } else if (error) {
          console.warn('Error fetching campaign status:', error.message);
          setLiveSpots(null);
          setMaxSpots(null);
          setCampaignEndDate(null);
          setIsCampaignExpired(false);
          setIsCampaignSoldOut(false);
          setIsCampaignActive(false);
        } else {
          // No campaign configured
          setLiveSpots(null);
          setMaxSpots(null);
          setCampaignEndDate(null);
          setIsCampaignExpired(false);
          setIsCampaignSoldOut(false);
          setIsCampaignActive(false);
        }
      } catch (error) {
        console.warn('Error fetching campaign status:', error);
        setLiveSpots(null);
        setMaxSpots(null);
        setCampaignEndDate(null);
        setIsCampaignExpired(false);
        setIsCampaignSoldOut(false);
        setIsCampaignActive(false);
      } finally {
        setCampaignLoading(false);
        setCampaignLastUpdated(new Date());
      }
    };

    fetchCampaignStatus();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchCampaignStatus, 30000);
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

  const parentGoals = [
    {
      id: 'school_readiness',
      label: 'School readiness',
      title: 'Build confidence for Grade R and beyond',
      message: 'Our structured play and pre-literacy support helps children arrive confident, independent, and excited to learn.'
    },
    {
      id: 'safe_care',
      label: 'Safe, loving care',
      title: 'A safe environment with trusted caregivers',
      message: 'Daily routines, attentive staff, and clear parent communication create peace of mind while your child thrives.'
    },
    {
      id: 'future_skills',
      label: 'Future skills',
      title: 'Early exposure to Society 5.0 learning',
      message: 'Creative technology and guided discovery build the curiosity, collaboration, and problem-solving skills children need next.'
    }
  ];

  const campaignState = isCampaignActive
    ? 'active'
    : isCampaignSoldOut
      ? 'sold_out'
      : isCampaignExpired
        ? 'expired'
        : 'inactive';

  const promoBannerClass = campaignState === 'active'
    ? 'from-orange-500 via-red-500 to-pink-600'
    : 'from-slate-700 via-slate-800 to-slate-900';

  const promoTitle = campaignState === 'active'
    ? 'Early Bird Special: 50% OFF Registration!'
    : campaignState === 'sold_out'
      ? 'Early Bird Campaign Sold Out'
      : campaignState === 'expired'
        ? 'Early Bird Campaign Ended'
        : 'Enrollment Update';

  const promoSubtitle = campaignState === 'active'
    ? 'Limited to first 50 families only'
    : 'Registration is still open. Contact admissions for the latest fee options.';

  const activeGoal = parentGoals.find((goal) => goal.id === selectedParentGoal) || parentGoals[0];
  const spotsProgress = maxSpots && liveSpots !== null
    ? Math.max(0, Math.min(100, Math.round((liveSpots / maxSpots) * 100)))
    : null;
  const lastUpdatedText = campaignLastUpdated
    ? campaignLastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;
  const activeTrustSignal = trustSignals.find((signal) => signal.id === selectedTrustSignal) || trustSignals[0];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section
        className="relative text-white py-16 md:py-24 overflow-hidden min-h-[560px] md:min-h-[600px] flex items-center bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `linear-gradient(to bottom right, rgba(59, 130, 246, 0.8), rgba(37, 99, 235, 0.75), rgba(29, 78, 216, 0.8)), url('${heroBackgrounds[heroBackgroundIndex]}')` }}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
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
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ x: heroParallax.x * -0.35, y: heroParallax.y * -0.35 }}
          transition={{ type: 'spring', stiffness: 60, damping: 14 }}
        >
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0, x: heroParallax.x * 0.25, scale: 1.0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-100 backdrop-blur-sm">
              <span>Admissions</span>
              <span className="h-1 w-1 rounded-full bg-white/70" />
              <span>{campaignState === 'active' ? 'Promo live now' : 'Open for 2026 intake'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-5 leading-tight">
              Welcome to <span className="text-blue-100">Young Eagles Day Care</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-5 md:mb-6 opacity-95 leading-relaxed max-w-4xl mx-auto">
              Where learning meets love. We help little minds grow through play, care, and creativity powered by next-generation Society 5.0 learning.
            </p>

            <div className="mb-8 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full border border-white/35 bg-white/15 px-3 py-1.5 font-medium text-white/95 backdrop-blur-sm">Ages 6 months - 6 years</span>
              <span className="rounded-full border border-white/35 bg-white/15 px-3 py-1.5 font-medium text-white/95 backdrop-blur-sm">Trusted by 200+ families</span>
              <span className="rounded-full border border-white/35 bg-white/15 px-3 py-1.5 font-medium text-white/95 backdrop-blur-sm">Safe, caring campus</span>
            </div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur-sm">
              <span>Hero scenes</span>
              {heroBackgrounds.map((_, index) => (
                <span
                  key={`hero-dot-${index}`}
                  className={`h-2 w-2 rounded-full transition ${heroBackgroundIndex === index ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6 md:mb-8">
              <motion.a
                href={`${edusiteproUrl}/registration/young-eagles`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-700 px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
              >
                Start Registration <span>→</span>
              </motion.a>
              <motion.button
                onClick={() => window.location.href = '/programs'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-semibold text-base md:text-lg border-2 border-white hover:bg-white hover:text-blue-700 transition-all"
              >
                View Programs
              </motion.button>
              <a
                href="/contact"
                className="inline-flex items-center rounded-xl border border-white/50 bg-white/10 px-6 md:px-8 py-3.5 md:py-4 text-base md:text-lg font-semibold text-white hover:bg-white/20 transition-all"
              >
                Book a Visit
              </a>
            </div>

          </motion.div>
        </div>

        {/* White Wave Separator - double curve matching template */}
        <div className="absolute bottom-0 left-0 w-full" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[100px] block">
            <path d="M0,100 C240,10 480,5 720,30 C960,55 1140,70 1440,75 L1440,100 L0,100 Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Parent intent section moved out of hero to reduce clutter */}
      <section className="py-8 md:py-10 bg-gradient-to-b from-slate-100 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-full max-w-5xl rounded-2xl border border-blue-100 bg-white p-5 shadow-xl"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">
              What matters most to your family?
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {parentGoals.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedParentGoal(goal.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedParentGoal === goal.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {goal.label}
                </button>
              ))}
            </div>
            <div className="rounded-xl bg-slate-50 p-4 text-left text-slate-800">
              <p className="text-base font-bold">{activeGoal.title}</p>
              <p className="mt-1 text-sm text-slate-600">{activeGoal.message}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <a
                  href={`${edusiteproUrl}/registration/young-eagles`}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                >
                  Start Registration
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Book a Visit
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive trust strip */}
      <section className="py-7 md:py-8 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">Trust signals for parents</p>
              <a href="/contact" className="text-sm font-semibold text-blue-100 hover:text-white transition">Talk to admissions →</a>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {trustSignals.map((signal) => (
                <button
                  key={signal.id}
                  type="button"
                  onClick={() => setSelectedTrustSignal(signal.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedTrustSignal === signal.id
                      ? 'bg-white text-slate-900'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {signal.label}
                </button>
              ))}
            </div>
            <div className="rounded-xl border border-white/20 bg-slate-950/35 p-4">
              <p className="text-base font-bold">{activeTrustSignal.title}</p>
              <p className="mt-1 text-sm text-blue-100/95">{activeTrustSignal.message}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Status Banner */}
      <section className={`relative bg-gradient-to-r ${promoBannerClass} text-white py-6 overflow-hidden`}>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center gap-4">
            {/* Title and Description */}
            <div className="flex items-center gap-3 text-center">
              <motion.div
                animate={campaignState === 'active' ? { scale: [1, 1.2, 1] } : { scale: [1, 1, 1] }}
                transition={{ 
                  duration: 2,
                  repeat: campaignState === 'active' ? Infinity : 0
                }}
                className="text-3xl md:text-4xl"
              >
                {campaignState === 'active' ? '🔥' : '📢'}
              </motion.div>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">{promoTitle}</h3>
                <p className="text-xs sm:text-sm opacity-90">{promoSubtitle}</p>
              </div>
            </div>

            {/* Spots Left Counter */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">
                  {campaignState === 'active' ? '🎯 Spots Left:' : '📌 Campaign Status:'}
                </span>
                {campaignState === 'active' ? (
                  <>
                    <span className="text-2xl font-black">
                      {campaignLoading ? '...' : (liveSpots !== null ? liveSpots : '--')}
                    </span>
                    <span className="text-sm">/ {maxSpots ?? 50}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold">
                    {campaignState === 'sold_out' ? 'Sold Out' : campaignState === 'expired' ? 'Expired' : 'Not Running'}
                  </span>
                )}
              </div>
              {lastUpdatedText ? (
                <p className="mt-1 text-center text-xs text-white/80">Last updated: {lastUpdatedText}</p>
              ) : null}
            </div>

            {campaignState === 'active' && spotsProgress !== null ? (
              <div className="w-full max-w-sm">
                <div className="mb-1 flex justify-between text-xs text-white/90">
                  <span>Availability remaining</span>
                  <span>{spotsProgress}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/25">
                  <div
                    className="h-2 rounded-full bg-yellow-300 transition-all"
                    style={{ width: `${spotsProgress}%` }}
                  />
                </div>
              </div>
            ) : null}

            {/* Timers - Responsive Layout */}
            {campaignState === 'active' && (
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
            )}

            {/* CTA Button */}
            <div className="w-full sm:w-auto">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                {campaignState === 'active' ? (
                  <motion.a
                    href={`${edusiteproUrl}/registration/young-eagles`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    <span>Claim 50% Promo</span>
                    <span className="text-lg sm:text-xl">🚀</span>
                  </motion.a>
                ) : (
                  <motion.a
                    href={`${edusiteproUrl}/registration/young-eagles`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-800 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    <span>Continue Registration</span>
                    <span className="text-lg sm:text-xl">→</span>
                  </motion.a>
                )}
                <a
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white hover:bg-white/20 transition-all"
                >
                  {campaignState === 'active' ? 'Book a Tour First' : 'Join Waitlist / Contact'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-blue-50/60">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">Trusted by Families Everywhere</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm"
                >
                  <Icon className={`text-4xl md:text-5xl ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <div className="mx-auto h-px w-[92%] bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      {/* Why Choose Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Young Eagles?</h2>
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
                  whileHover={{ y: -8 }}
                  transition={{ delay: index * 0.1 }}
                  className="group text-center p-6 rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-all"
                >
                  <Icon className={`text-5xl ${feature.color} mx-auto mb-4 transition-transform group-hover:scale-110`} />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Campus - real preschool photos for trust and branding */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-blue-50/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Campus</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bright, safe spaces where children learn and play every day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl overflow-hidden shadow-lg transition-all"
            >
              <img
                src="/campus/campus-4.jpeg"
                alt="Group activity in the hall at Young Eagles"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg text-gray-900">Learning Together</h3>
                <p className="text-gray-600 text-sm">Structured activities and caring supervision in our multipurpose hall.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-lg transition-all"
            >
              <img
                src="/campus/campus-6.jpeg"
                alt="Outdoor patio and events at Young Eagles"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg text-gray-900">Events & Celebrations</h3>
                <p className="text-gray-600 text-sm">Child-sized tables and a welcoming space for special moments.</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl overflow-hidden shadow-lg transition-all"
            >
              <img
                src="/campus/campus-5.jpeg"
                alt="Our learners in uniform at Young Eagles"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-4 bg-white">
                <h3 className="font-bold text-lg text-gray-900">A Day at Young Eagles</h3>
                <p className="text-gray-600 text-sm">Our learners in a bright, connected campus environment.</p>
              </div>
            </motion.div>
          </div>
          <div className="text-center mt-8">
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 transition"
            >
              View full gallery
            </a>
          </div>
        </div>
      </section>
      <div className="mx-auto h-px w-[92%] bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />

      {/* Programs Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Programs</h2>
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
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${program.bgColor} p-6 rounded-xl border border-white/70 hover:shadow-lg transition-all`}
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
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">What Parents Say</h2>

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
      <section className="py-12 md:py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Give Your Child the Best Start?</h2>
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
      <section className="py-14 md:py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: App Info */}
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-semibold">📱 FREE PARENT APP</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 md:mb-6 leading-tight">
                Stay Connected with<br />
                <span className="text-yellow-300">EduDash Pro</span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 opacity-95">
                Download the official Young Eagles parent app to track progress, communicate with teachers, and stay updated in real time.
              </p>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
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
              </div>

              {/* Simplified CTA hierarchy */}
              <div className="space-y-3">
                <a
                  href="https://edudashpro.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white text-purple-600 hover:bg-gray-100 px-5 md:px-8 py-4 md:py-5 rounded-2xl transition-all transform hover:scale-[1.02] shadow-2xl group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-sm font-bold text-purple-700 mb-1">✨ AVAILABLE NOW</div>
                    <div className="font-black text-xl md:text-2xl text-gray-900 mb-1">Access EduDash Pro</div>
                    <div className="text-xs md:text-sm text-gray-600">Works on mobile and desktop</div>
                  </div>
                  <svg className="w-6 h-6 text-purple-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20 transition"
                  >
                    Need help installing?
                  </a>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Google Play & App Store coming soon</span>
                </div>
              </div>

              <p className="mt-3 text-xs sm:text-sm opacity-90">
                💜 Join 1,000+ parents already using EduDash Pro • Free plan available • Ad-supported on free tier
              </p>
            </div>

            {/* Right: App Screenshot */}
            <div className="relative flex justify-center lg:justify-start order-first lg:order-none">
              <div className="relative mx-auto max-w-[220px] sm:max-w-xs lg:max-w-sm">
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
                <div className="hidden sm:block absolute -top-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  PWA App
                </div>
                <div className="hidden sm:block absolute -bottom-4 -right-4 bg-white text-purple-600 px-4 py-2 rounded-full font-bold shadow-lg">
                  AI Powered
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Innovation Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Learning Technology</h2>
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
