import React, { useState, useEffect } from 'react';
import { FaClock, FaFire } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  'https://bppuzibjlxgfwrujzfsz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwcHV6aWJqbHhnZndydWp6ZnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0OTY2MzMsImV4cCI6MjA1MzA3MjYzM30.8F8c7RQojhiNEUHNQp4Z_bL58aSZOxdVwmgvbMIEPDA'
);

const EarlyBirdPromo = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [spotsLeft, setSpotsLeft] = useState(50);
  const [maxSpots, setMaxSpots] = useState(50);
  const [discountPercentage, setDiscountPercentage] = useState(50);
  const [timeUntilEnd, setTimeUntilEnd] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [registrationOpen, setRegistrationOpen] = useState(true); // Registration is now open

  // Fetch promo campaign data from Supabase
  useEffect(() => {
    const fetchPromoData = async () => {
      try {
        const { data, error } = await supabase
          .from('marketing_campaigns')
          .select('current_redemptions, max_redemptions, discount_percentage, end_date')
          .eq('coupon_code', 'WELCOME2026')
          .eq('active', true)
          .single();

        if (!error && data) {
          const remaining = data.max_redemptions - data.current_redemptions;
          setSpotsLeft(remaining > 0 ? remaining : 0);
          setMaxSpots(data.max_redemptions);
          setDiscountPercentage(data.discount_percentage || 50);
        }
      } catch (err) {
        console.error('Error fetching promo data:', err);
      }
    };

    fetchPromoData();
    
    // Poll every 30 seconds for real-time updates
    const interval = setInterval(fetchPromoData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Countdown to START (tomorrow at 00:00) - DISABLED since registration is open
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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setRegistrationOpen(true); // Registration opens when countdown ends
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

  // Countdown to END (Jan 30, 2026 - WELCOME2026 expiry)
  useEffect(() => {
    const endDate = new Date('2026-01-30T23:59:59');

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeUntilEnd({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeUntilEnd({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white relative overflow-hidden shadow-xl">
      {/* Main Content */}
      <div className="py-4 px-3 sm:px-4">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-bounce"
                style={{
                  left: `${(i * 7) % 100}%`,
                  top: `${(i * 13) % 100}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                {i % 3 === 0 ? '🎓' : i % 3 === 1 ? '⭐' : '🚀'}
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6">
            {/* Promo Text */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity 
                }}
                className="text-4xl sm:text-5xl drop-shadow-lg"
              >
                🔥
              </motion.div>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg text-center sm:text-left">
                  {discountPercentage}% OFF Registration - Only {spotsLeft} Spots Left!
                </h2>
                <div className="text-center sm:text-left">
                  <p className="text-lg sm:text-xl font-bold text-yellow-300 drop-shadow-md">
                    <span className="line-through text-white/70">R300</span> → <span className="text-green-300">R150</span>
                  </p>
                </div>
                {spotsLeft > 0 && spotsLeft <= 10 && (
                  <span className="ml-2 sm:ml-3 text-yellow-100 font-bold animate-pulse bg-red-500/50 px-2 py-1 rounded text-xs sm:text-sm">⚡ ALMOST GONE!</span>
                )}
                {spotsLeft === 0 && (
                  <span className="ml-2 sm:ml-3 text-white font-black bg-gray-900 px-3 py-1 rounded text-xs sm:text-sm">❌ SOLD OUT!</span>
                )}
              </div>
            </div>

            {/* Countdown Timers */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center w-full">
              {/* Spots Counter */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-white/90">
                  <FaFire className="text-base sm:text-lg animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Spots Remaining
                  </span>
                </div>
                <div className="bg-white/95 text-orange-600 rounded-xl px-6 py-3 min-w-[120px] text-center shadow-lg border-4 border-yellow-300">
                  <div className="text-4xl font-black">{spotsLeft}</div>
                  <div className="text-xs font-bold uppercase">of {maxSpots} left</div>
                </div>
                <div className="text-white/90 text-xs font-bold uppercase bg-purple-600/80 px-3 py-1 rounded-full">
                  Code: WELCOME2026
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-20 w-px bg-white/30"></div>
              <div className="sm:hidden w-full h-px bg-white/30"></div>

              {/* ENDS IN Timer (Feb 28, 2026) */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-white/90">
                  <FaClock className="text-base sm:text-lg" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Promo Ends</span>
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="bg-red-100 text-red-700 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px] text-center shadow-lg border-2 border-red-200">
                    <div className="text-xl sm:text-2xl font-black">{String(timeUntilEnd.days).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase">Days</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black self-center text-white drop-shadow-md">:</div>
                  <div className="bg-red-100 text-red-700 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px] text-center shadow-lg border-2 border-red-200">
                    <div className="text-xl sm:text-2xl font-black">{String(timeUntilEnd.hours).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase">Hours</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black self-center text-white drop-shadow-md">:</div>
                  <div className="bg-red-100 text-red-700 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px] text-center shadow-lg border-2 border-red-200">
                    <div className="text-xl sm:text-2xl font-black">{String(timeUntilEnd.minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase">Mins</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full max-w-3xl">
              <motion.a
                href={spotsLeft > 0 ? "http://localhost:3002/registration/young-eagles" : "#"}
                target={spotsLeft > 0 ? "_blank" : "_self"}
                rel="noopener noreferrer"
                whileHover={{ scale: spotsLeft > 0 ? 1.03 : 1 }}
                whileTap={{ scale: spotsLeft > 0 ? 0.97 : 1 }}
                className={`px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg shadow-2xl transition-all border-4 flex-1 text-center ${
                  spotsLeft > 0
                    ? 'bg-white text-orange-600 hover:bg-yellow-50 border-yellow-300 hover:shadow-yellow-400/50 cursor-pointer'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed border-gray-500'
                }`}
                onClick={(e) => {
                  if (spotsLeft === 0) {
                    e.preventDefault();
                  }
                }}
              >
                {spotsLeft > 0 ? `🎉 Claim Your ${discountPercentage}% Discount!` : '😔 All Spots Taken'}
              </motion.a>
              
              <motion.a
                href="https://edudashpro.org.za"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all border-2 border-blue-400 flex-none text-center"
              >
                📱 Get App
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyBirdPromo;
