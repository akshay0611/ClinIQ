import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Activity, UserPlus, Shield, Heart, Award, CheckCircle } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTitle, setCurrentTitle] = useState(0);

  const titles = [
    "Personalized Care",
    "Expert Doctors",
    "24/7 Support",
    "AI-Powered Analysis",
    "Comprehensive Solutions"
  ];

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      }, 10);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);


  const animations = useMemo(() => {
    return {
      containerVariants: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      },
      itemVariants: {
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
        },
      },
      pulseAnimation: {
        scale: [1, 1.05, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
      floatingAnimation: {
        y: [0, -15, 0],
        transition: {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut",
        },
      },
      textCycleVariants: {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
        exit: { y: -50, opacity: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
      },
    };
  }, []);

  return (
    <section
      className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white overflow-hidden min-h-screen flex items-center justify-center"
      aria-label="Hero Section"
    >
     
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
          animate={animations.pulseAnimation}
          style={{
            top: '20%',
            left: '15%',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <motion.div
          className="absolute h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
          animate={{
            ...animations.pulseAnimation,
            transition: { ...animations.pulseAnimation.transition, delay: 1 },
          }}
          style={{
            bottom: '10%',
            right: '10%',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />
        <motion.div
          className="absolute h-80 w-80 rounded-full bg-teal-400/10 blur-3xl"
          animate={{
            ...animations.pulseAnimation,
            transition: { ...animations.pulseAnimation.transition, delay: 0.5 },
          }}
          style={{
            top: '60%',
            left: '60%',
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
          }}
        />
      </div>

     
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]" />

     
      <div className="absolute inset-0">
        <motion.div
          animate={animations.floatingAnimation}
          className="absolute top-20 left-10 text-blue-300/20"
          aria-hidden="true"
        >
          <Stethoscope size={140} strokeWidth={1} />
        </motion.div>
        <motion.div
          animate={{
            ...animations.floatingAnimation,
            transition: { ...animations.floatingAnimation.transition, delay: 1 },
          }}
          className="absolute bottom-20 right-10 text-blue-400/20"
          aria-hidden="true"
        >
          <Activity size={180} strokeWidth={1} />
        </motion.div>
        <motion.div
          animate={{
            ...animations.floatingAnimation,
            transition: { ...animations.floatingAnimation.transition, delay: 0.5 },
          }}
          className="absolute top-40 right-20 text-teal-300/20"
          aria-hidden="true"
        >
          <Shield size={120} strokeWidth={1} />
        </motion.div>
        <motion.div
          animate={{
            ...animations.floatingAnimation,
            transition: { ...animations.floatingAnimation.transition, delay: 1.5 },
          }}
          className="absolute bottom-40 left-20 text-indigo-300/20"
          aria-hidden="true"
        >
          <Heart size={100} strokeWidth={1} />
        </motion.div>
      </div>

      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={animations.containerVariants}
          initial="hidden"
          animate="visible"
        >
         
          <motion.div className="flex justify-center mb-8" variants={animations.itemVariants}>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md px-6 py-3 rounded-full border border-blue-300/20 shadow-lg shadow-blue-500/10">
              <Award className="h-5 w-5 mr-2 text-yellow-300" aria-hidden="true" />
              <span className="font-medium text-sm text-blue-50">Rated #1 Healthcare AI Platform of 2025</span>
            </div>
          </motion.div>

         
          <motion.div
            className="text-center mb-6"
            variants={animations.itemVariants}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight drop-shadow-md mb-4">
              Your Health, Our Priority
            </h1>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300"
            >
              <motion.span
                key={currentTitle}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
              >
                {titles[currentTitle]}
              </motion.span>
            </motion.h2>
          </motion.div>

         
          <motion.p
            className="text-center text-lg md:text-xl text-blue-50/90 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={animations.itemVariants}
          >
            Experience seamless healthcare with AI-powered symptom analysis and instant connections to medical professionals.
          </motion.p>

         
          <motion.div
            className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
            variants={animations.itemVariants}
          >
            <Link to="/symptom-check">
              <Button
                size="lg"
                variant="secondary"
                leftIcon={<Stethoscope size={20} aria-hidden="true" />}
                className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-300 hover:to-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all duration-300 hover:shadow-xl hover:scale-105 px-6 py-4 md:px-8 md:py-6 rounded-xl border-0 w-full sm:w-auto text-center"
              >
                Check Symptoms Now
              </Button>
            </Link>
            <Link to="/doctors">
              <Button
                size="lg"
                variant="outline"
                leftIcon={<UserPlus size={20} aria-hidden="true" />}
                className="bg-white/5 backdrop-blur-md border border-white/20 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 px-6 py-4 md:px-8 md:py-6 rounded-xl w-full sm:w-auto text-center"
              >
                Find a Doctor
              </Button>
            </Link>
          </motion.div>

         
          <motion.div
            className="mt-16 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={animations.itemVariants}
          >
            <motion.div
              className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 bg-blue-500/20 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-blue-300" aria-hidden="true" />
              </div>
              <div className="flex -space-x-3 mb-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 ring-2 ring-primary-900 flex items-center justify-center text-primary-900 font-semibold text-xs shadow-lg"
                    aria-hidden="true"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-center font-medium">10,000+ satisfied users</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 bg-indigo-500/20 p-3 rounded-full">
                <Shield className="w-6 h-6 text-indigo-300" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold mb-1">100% Secure</h3>
              <p className="text-center text-sm text-green-50/80">DPDP & DISHA-compliant, end-to-end encrypted</p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-4 bg-teal-500/20 p-3 rounded-full">
                <Stethoscope className="w-6 h-6 text-teal-300" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Expert Verified</h3>
              <p className="text-center text-sm text-blue-50/80">Results reviewed by medical professionals</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;