import React, { useState } from 'react';
import { FaUsers, FaHeart, FaGraduationCap, FaShieldAlt, FaStar, FaRocket, FaCheckCircle, FaPhone, FaCalendarCheck } from 'react-icons/fa';
import SEOManager from '../components/SEO/SEOManager';
import { EducationalBanner } from '../components/Ads/AdManager_Safe';

const About = () => {
  const [selectedTrustSignal, setSelectedTrustSignal] = useState('safety');

  const values = [
    {
      icon: FaHeart,
      title: "Love & Care",
      description: "Every child receives personalized attention and nurturing care in a loving environment."
    },
    {
      icon: FaGraduationCap,
      title: "Excellence in Education",
      description: "We maintain the highest standards in early childhood education with innovative teaching methods."
    },
    {
      icon: FaShieldAlt,
      title: "Safety First",
      description: "Your child's safety and security is our top priority with modern safety protocols."
    },
    {
      icon: FaRocket,
      title: "Future Ready",
      description: "Preparing children for the future with Society 5.0 integration and modern learning tools."
    }
  ];

  const team = [
    {
      name: "Annatjie Makunyane",
      role: "Principal",
      experience: "15+ years",
      specialization: "Educational Leadership & Administration"
    },
    {
      name: "Tumi Mkhwebane",
      role: "Lead Teacher",
      experience: "10+ years",
      specialization: "Early Childhood Development"
    },
    {
      name: "Dimakatso Langa",
      role: "Teacher",
      experience: "8+ years",
      specialization: "Creative Learning & Arts"
    },
    {
      name: "Marrion Makunyane",
      role: "Administrator",
      experience: "12+ years",
      specialization: "Student Records & Parent Relations"
    }
  ];

  const trustSignals = [
    {
      id: 'safety',
      label: 'Safety & Care',
      title: 'Supervised routines and secure spaces',
      message: 'Our campus flow, staff supervision, and daily routines are designed so children are safe, comfortable, and ready to learn.',
      points: ['Secure environment', 'Daily check-ins', 'Caregiver visibility']
    },
    {
      id: 'learning',
      label: 'Future-Ready Learning',
      title: 'Society 5.0 learning for early development',
      message: 'We blend play, literacy, creativity, and guided technology to build curiosity, confidence, and school readiness.',
      points: ['Play-based literacy', 'Creative thinking', 'Problem-solving habits']
    },
    {
      id: 'parents',
      label: 'Parent Partnership',
      title: 'Families stay informed and connected',
      message: 'Parents receive updates and clear communication so home and school work together for every child.',
      points: ['Transparent communication', 'Progress visibility', 'Stronger parent-school trust']
    }
  ];

  const activeTrustSignal = trustSignals.find((signal) => signal.id === selectedTrustSignal) || trustSignals[0];

  return (
    <>
      <SEOManager 
        title="About Young Eagles Education Platform - Our Story & Mission"
        description="Learn about Young Eagles Day Care Centre's story, team, and values. Explore our safe campus, future-ready learning approach, and commitment to every family."
        keywords="about young eagles, education platform story, daycare mission, early learning values, expert teachers"
        url="https://youngeagles.org.za/about"
      />
      
      <div className="min-h-screen pt-16 bg-slate-50">
        {/* Hero Section */}
        <section
          className="relative text-white py-14 md:py-24 overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom right, rgba(30, 64, 175, 0.85), rgba(79, 70, 229, 0.78), rgba(37, 99, 235, 0.85)), url('/campus/campus-1.jpeg')"
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-blue-100 backdrop-blur-sm">
              <span>Since 2009</span>
              <span className="h-1 w-1 rounded-full bg-white/70" />
              <span>Where learning meets love</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 md:mb-6">About Young Eagles</h1>
            <p className="text-base sm:text-lg md:text-2xl mb-7 md:mb-8 opacity-95 max-w-4xl mx-auto">
              We nurture confident, curious children through safe care, strong values, and next-generation early learning.
            </p>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 text-xs sm:text-sm">
              <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium text-white/95">Ages 6 months - 6 years</span>
              <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium text-white/95">Trusted by 200+ families</span>
              <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium text-white/95">Safe, caring campus</span>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Founded in 2009, Young Eagles began with one purpose: to create a loving, structured environment where children can grow confidently from their earliest years.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Today, we combine traditional care values with Society 5.0 thinking so children build strong foundations in literacy, creativity, and social-emotional development.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-3xl font-bold text-blue-600">200+</div>
                    <div className="text-gray-600">Families supported</div>
                  </div>
                  <div className="text-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-3xl font-bold text-blue-600">10+</div>
                    <div className="text-gray-600">Educators & caregivers</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/campus/campus-4.jpeg"
                  alt="Children activity session at Young Eagles"
                  className="rounded-xl shadow-lg h-full w-full object-cover"
                />
                <img
                  src="/campus/campus-5.jpeg"
                  alt="Learners in uniform at Young Eagles"
                  className="rounded-xl shadow-lg h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Trust Signals */}
        <section className="py-8 md:py-10 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold">Why parents trust Young Eagles</h2>
                <a href="/contact" className="text-sm font-semibold text-blue-100 hover:text-white transition">Book a visit →</a>
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
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {activeTrustSignal.points.map((point) => (
                    <div key={point} className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs sm:text-sm">
                      <FaCheckCircle className="text-emerald-300" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 to-blue-50/70">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The principles that guide everything we do at Young Eagles
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                    <IconComponent className="text-3xl md:text-4xl text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Ad Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <EducationalBanner 
              title="Educational Excellence Partners"
              description="Discover the innovative educational tools and resources that enhance our curriculum"
              buttonText="Learn More"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dedicated professionals with years of experience in early childhood education
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-1">{member.experience} experience</p>
                  <p className="text-gray-600 text-sm">{member.specialization}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaRocket className="text-blue-600 mr-3" />
                  Our Mission
                </h3>
                <p className="text-gray-600 text-lg">
                  To provide exceptional early childhood education that nurtures each child's unique potential through innovative teaching methods, Society 5.0 integration, and unwavering commitment to safety, care, and educational excellence.
                </p>
                <div className="mt-5 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Child-first care approach</div>
                  <div className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Structured learning and play</div>
                  <div className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Strong parent partnership</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaStar className="text-yellow-500 mr-3" />
                  Our Vision
                </h3>
                <p className="text-gray-600 text-lg">
                  To be the leading early childhood education platform that shapes confident, creative, and capable future leaders prepared to thrive in an evolving world while maintaining strong human values.
                </p>
                <div className="mt-5 space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> School readiness outcomes</div>
                  <div className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Future-ready learning habits</div>
                  <div className="flex items-center gap-2"><FaCheckCircle className="text-emerald-500" /> Community-centered growth</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Come experience Young Eagles in person</h2>
            <p className="text-xl mb-8 opacity-95 max-w-3xl mx-auto">
              Meet our team, tour our campus, and see how we help children grow with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 md:px-8 py-3.5 md:py-4 font-bold text-blue-700 shadow-lg hover:bg-slate-100 transition"
              >
                <FaCalendarCheck />
                Book a Visit
              </a>
              <a
                href="/registration"
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/10 px-6 md:px-8 py-3.5 md:py-4 font-semibold text-white hover:bg-white/20 transition"
              >
                <FaRocket />
                Start Registration
              </a>
              <a
                href="tel:+27815236000"
                className="inline-flex items-center gap-2 rounded-xl border border-white/50 bg-white/10 px-6 md:px-8 py-3.5 md:py-4 font-semibold text-white hover:bg-white/20 transition"
              >
                <FaPhone />
                Call Admissions
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
