import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MyRegisterButton from "../components/MyRegisterButton";
import AdManager from "../components/AdManager";
import codeAPillar from "../assets/codeAPillar.png";
import legoBlocks from "../assets/legoBlocks.png";
import {
  FaRobot,
  FaTools,
  FaPalette,
  FaBook,
  FaGraduationCap,
  FaHeart,
  FaStar,
  FaChevronDown,
  FaCheckCircle,
  FaPhone,
  FaCalendarCheck
} from "react-icons/fa";

const Programs = () => {
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const programs = [
    {
      id: "mini-coders",
      title: "Mini Coders & Robo Buddies",
      ageRange: "3–5 years",
      icon: <FaRobot className="text-3xl text-cyan-500" />,
      image: codeAPillar,
      description:
        "Children meet friendly robots and guided digital tools. Through hands-on play, they learn sequencing, simple commands, and early problem solving.",
      skills: ["Early logic", "Sequencing", "Motor skills", "Problem solving"],
      highlight: "Kids love making robots move and dance.",
      benefits: [
        "Develops computational thinking",
        "Builds confidence with technology",
        "Enhances logical reasoning",
        "Improves fine motor skills"
      ]
    },
    {
      id: "little-builders",
      title: "Little Builders & Tinkerers",
      ageRange: "2–5 years",
      icon: <FaTools className="text-3xl text-indigo-500" />,
      image: legoBlocks,
      description:
        "With colorful blocks and simple construction kits, children build towers, bridges, and pretend machines while learning how things work.",
      skills: ["Spatial awareness", "Creativity", "Engineering basics", "Planning"],
      highlight: "Every block becomes an adventure.",
      benefits: [
        "Develops spatial intelligence",
        "Encourages creative thinking",
        "Builds persistence and patience",
        "Introduces STEM concepts"
      ]
    },
    {
      id: "creative-cubs",
      title: "Creative Cubs Art Studio",
      ageRange: "2–5 years",
      icon: <FaPalette className="text-3xl text-rose-500" />,
      image: null,
      description:
        "From painting to recycled crafts, little artists explore textures, colors, and materials while expressing themselves with confidence.",
      skills: ["Creativity", "Sensory exploration", "Fine motor skills", "Self-expression"],
      highlight: "Imagination runs wild with no rules.",
      benefits: [
        "Develops artistic abilities",
        "Enhances sensory development",
        "Builds self-confidence",
        "Encourages emotional expression"
      ]
    },
    {
      id: "imagination-station",
      title: "Imagination Station",
      ageRange: "2–5 years",
      icon: <FaBook className="text-3xl text-purple-500" />,
      image: null,
      description:
        "Storytime becomes showtime with puppets, dress-up, and collaborative play. Children build language skills and social confidence.",
      skills: ["Language development", "Empathy", "Social skills", "Storytelling"],
      highlight: "Children become heroes in their own stories.",
      benefits: [
        "Builds vocabulary and language skills",
        "Develops social emotional intelligence",
        "Encourages imaginative play",
        "Improves communication skills"
      ]
    }
  ];

  const programTabs = [
    { id: "overview", label: "Overview", icon: <FaGraduationCap /> },
    { id: "benefits", label: "Benefits", icon: <FaStar /> },
    { id: "environment", label: "Environment", icon: <FaHeart /> }
  ];

  const programImageFallbacks = {
    "mini-coders": "/campus/campus-4.jpeg",
    "little-builders": "/campus/campus-6.jpeg",
    "creative-cubs": "/campus/campus-8.jpeg",
    "imagination-station": "/campus/campus-5.jpeg"
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section
        className="relative pt-24 md:pt-28 pb-12 md:pb-16 px-4 sm:px-6 text-white bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, rgba(37, 99, 235, 0.84), rgba(79, 70, 229, 0.78), rgba(29, 78, 216, 0.84)), url('/campus/campus-1.jpeg')"
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-5">Programs That Build Confident Young Minds</h1>
          <p className="text-base sm:text-lg md:text-2xl opacity-95 max-w-4xl mx-auto leading-relaxed">
            Play-based learning, creative expression, and early STEM foundations designed for ages 2 to 5.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs sm:text-sm">
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium">4 core programs</span>
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium">Ages 2-5 years</span>
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium">10+ educators</span>
            <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 font-medium">Trusted by 200+ families</span>
          </div>
        </motion.div>
      </section>

      {/* Program Tabs */}
      <section className="px-4 sm:px-6 py-8 md:py-10 bg-gradient-to-b from-slate-100 to-white mb-8 md:mb-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-2 shadow-lg border border-slate-200">
              {programTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  {tab.icon}
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="md:hidden">
                  <AdManager placement="mobile" className="flex justify-center mb-6" />
                </div>

                {programs.map((program, index) => (
                  <motion.div
                    key={program.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-slate-200"
                  >
                    <div className="p-5 sm:p-6 md:p-8">
                      <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-8">
                        <motion.div whileHover={{ scale: 1.03 }} className="flex-shrink-0">
                          <img
                            src={program.image || programImageFallbacks[program.id]}
                            alt={program.title}
                            className="w-full max-w-[320px] h-52 sm:h-60 object-cover rounded-2xl shadow-lg"
                          />
                        </motion.div>
                        
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-4">
                            {program.icon}
                            <div>
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{program.title}</h3>
                              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Ages {program.ageRange}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            {program.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {program.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          
                          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl border-l-4 border-amber-400">
                            <p className="text-amber-800 font-medium">
                              ✨ {program.highlight}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-3 pt-4">
                            <MyRegisterButton />
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
                              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:shadow-lg transition-all duration-300"
                            >
                              <span>Learn More</span>
                              <motion.div
                                animate={{ rotate: expandedProgram === program.id ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <FaChevronDown />
                              </motion.div>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedProgram === program.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-8 pt-8 border-t border-slate-200"
                          >
                            <h4 className="text-xl font-semibold text-gray-800 mb-4">Program Benefits:</h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {program.benefits.map((benefit, benefitIndex) => (
                                <motion.div
                                  key={benefitIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: benefitIndex * 0.1 }}
                                  className="flex items-center gap-3 bg-emerald-50 p-3 rounded-lg"
                                >
                                  <FaCheckCircle className="text-emerald-500 flex-shrink-0" />
                                  <span className="text-gray-700">{benefit}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* In-feed Ad after second program */}
                    {index === 1 && (
                      <div className="py-8">
                        <AdManager placement="in-feed" className="flex justify-center" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "benefits" && (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl border border-slate-200"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-7 md:mb-8 text-gray-800">Why Parents Choose Our Programs</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: "🧠", title: "Cognitive Development", description: "Critical thinking and structured problem-solving through guided play." },
                    { icon: "🤝", title: "Social Skills", description: "Confidence, empathy, and teamwork in collaborative activities." },
                    { icon: "🎯", title: "Individual Growth", description: "Personalized support for each child’s pace and strengths." },
                    { icon: "🌟", title: "Creative Expression", description: "Imagination and artistic confidence in supportive studio activities." },
                    { icon: "💡", title: "STEM Foundation", description: "Early technology and hands-on science concepts for young learners." },
                    { icon: "❤️", title: "Emotional Intelligence", description: "Self-awareness, communication, and emotional regulation skills." }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg border border-blue-100"
                    >
                      <div className="text-4xl mb-4">{benefit.icon}</div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600">{benefit.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "environment" && (
              <motion.div
                key="environment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl border border-slate-200"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Learning Environment</h3>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto">
                    Our center is colorful, inclusive, and loving. We reflect African heritage in stories, role models, and activities so children feel represented and inspired.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-emerald-50 to-sky-50 p-6 rounded-2xl shadow-lg border border-emerald-100"
                  >
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">Safe & Nurturing</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Child-proofed facilities</li>
                      <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Trained and caring staff</li>
                      <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Supervised routines throughout the day</li>
                      <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Healthy meal programs</li>
                    </ul>
                    <img src="/campus/campus-3.jpeg" alt="Safe corridor at Young Eagles" className="mt-5 h-44 w-full rounded-xl object-cover" />
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl shadow-lg border border-orange-100"
                  >
                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">Culturally Rich</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> African heritage celebration</li>
                      <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Diverse books and materials</li>
                      <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Multilingual environment</li>
                      <li className="flex items-center gap-2"><FaStar className="text-yellow-500" /> Inclusive learning spaces</li>
                    </ul>
                    <img src="/campus/campus-6.jpeg" alt="Young Eagles celebration area" className="mt-5 h-44 w-full rounded-xl object-cover" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 md:py-16 px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-2xl md:rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your child's learning journey?</h3>
            <p className="text-base sm:text-lg md:text-xl mb-7 md:mb-8 opacity-90">
              Join Young Eagles and see how structured play, care, and future-ready learning build confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3.5 md:py-4 bg-white text-blue-700 rounded-full font-bold hover:bg-slate-100 transition"
              >
                <FaCalendarCheck />
                Book a Visit
              </a>
              <MyRegisterButton className="bg-white text-indigo-700 hover:bg-gray-100" />
              <motion.a
                href="tel:+27815236000"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                <FaPhone />
                <span>Call Admissions</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* AdSense Banner */}
      <section className="py-6 md:py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <AdManager placement="content" className="flex justify-center" />
        </div>
      </section>
    </div>
  );
};

export default Programs;
