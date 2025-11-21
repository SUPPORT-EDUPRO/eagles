import React, { useState, useEffect } from 'react';
import { FaClock, FaFire } from 'react-icons/fa';

const EarlyBirdPromo = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [spotsLeft] = useState(50); // Fixed spots without Supabase
  const [timeUntilEnd, setTimeUntilEnd] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [registrationOpen, setRegistrationOpen] = useState(false);

  // Countdown to START (tomorrow at 00:00)
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

  // Countdown to END (December 31, 2025)
  useEffect(() => {
    const endDate = new Date('2025-12-31T23:59:59');

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
                  2026 Registration Opens Soon!
                </h2>
                {spotsLeft > 0 && spotsLeft <= 10 && (
                  <span className="ml-2 sm:ml-3 text-yellow-100 font-bold animate-pulse bg-red-500/50 px-2 py-1 rounded text-xs sm:text-sm">⚡ LIMITED SPOTS!</span>
                )}
                {spotsLeft === 0 && (
                  <span className="ml-2 sm:ml-3 text-white font-black bg-gray-900 px-3 py-1 rounded text-xs sm:text-sm">❌ FULL!</span>
                )}
              </div>
            </div>

            {/* Countdown Timers */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center w-full">
              {/* STARTS IN Timer */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-white/90">
                  <FaClock className="text-base sm:text-lg" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                    {registrationOpen ? "Registration Open!" : "Registration Opens in"}
                  </span>
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="bg-white/95 text-orange-600 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px] text-center shadow-lg border-2 border-white/50">
                    <div className="text-xl sm:text-2xl font-black">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase">Days</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black self-center text-white drop-shadow-md">:</div>
                  <div className="bg-white/95 text-orange-600 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px] text-center shadow-lg border-2 border-white/50">
                    <div className="text-xl sm:text-2xl font-black">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase">Hours</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black self-center text-white drop-shadow-md">:</div>
                  <div className="bg-white/95 text-orange-600 rounded-lg sm:rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-[50px] sm:min-w-[60px] text-center shadow-lg border-2 border-white/50">
                    <div className="text-xl sm:text-2xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs font-bold uppercase">Mins</div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block h-20 w-px bg-white/30"></div>
              <div className="sm:hidden w-full h-px bg-white/30"></div>

              {/* ENDS IN Timer (Dec 31) */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-white/90">
                  <FaClock className="text-base sm:text-lg" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Ends Dec 31</span>
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
                href={registrationOpen ? "http://localhost:3002/registration/young-eagles" : "#"}
                target={registrationOpen ? "_blank" : "_self"}
                rel="noopener noreferrer"
                whileHover={{ scale: registrationOpen ? 1.03 : 1 }}
                whileTap={{ scale: registrationOpen ? 0.97 : 1 }}
                className={`px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base md:text-lg shadow-2xl transition-all border-4 flex-1 text-center ${
                  registrationOpen
                    ? 'bg-white text-orange-600 hover:bg-yellow-50 border-yellow-300 hover:shadow-yellow-400/50 cursor-pointer'
                    : 'bg-gray-400 text-gray-700 cursor-not-allowed border-gray-500'
                }`}
                onClick={(e) => {
                  if (!registrationOpen) {
                    e.preventDefault();
                  }
                }}
              >
                {registrationOpen ? '📝 Register for 2026!' : '⏰ Opens Tomorrow'}
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
