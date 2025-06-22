import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, User, Stethoscope, Activity, Shield, Heart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Akshay Kumar',
    position: 'Developer',
    text: 'ClinIQ helped me understand my symptoms when I was feeling anxious about what was wrong. The doctor it recommended was perfect for my situation.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: 2,
    name: 'Jishnu Chauhan',
    position: 'Lead Engineer',
    text: 'As someone with chronic health issues, I appreciate how ClinIQ lets me track my symptoms over time. It gives me better conversations with my doctors.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: 3,
    name: 'Raunak Jain',
    position: 'AI Researcher',
    text: 'The symptom checker is surprisingly accurate. It identified that I needed immediate care for what turned out to be appendicitis. Possibly saved my life!',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
];

const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


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
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);


  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
          animate={pulseAnimation}
          style={{
            top: '20%',
            left: '15%',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          }}
        />
        <motion.div 
          className="absolute h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"
          animate={{
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 1 }
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
            ...pulseAnimation,
            transition: { ...pulseAnimation.transition, delay: 0.5 }
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
          animate={floatingAnimation} 
          className="absolute top-20 left-10 text-blue-300/20"
          aria-hidden="true"
        >
          <Stethoscope size={140} strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 }
          }} 
          className="absolute bottom-20 right-10 text-blue-400/20"
          aria-hidden="true"
        >
          <Activity size={180} strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 0.5 }
          }} 
          className="absolute top-40 right-20 text-teal-300/20"
          aria-hidden="true"
        >
          <Shield size={120} strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1.5 }
          }} 
          className="absolute bottom-40 left-20 text-indigo-300/20"
          aria-hidden="true"
        >
          <Heart size={100} strokeWidth={1} />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full text-sm font-semibold bg-primary-600/80 text-white backdrop-blur-md">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            What Our Users Say
          </h2>
          <p className="text-lg text-blue-50/90 max-w-2xl mx-auto">
            Discover how ClinIQ is helping people take control of their health journey with our innovative platform.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
        
          <div className="absolute inset-y-0 left-0 flex items-center -ml-5 md:-ml-10 z-10">
            <motion.button
              onClick={prev}
              className="p-3 rounded-full bg-primary-600/80 backdrop-blur-md text-white hover:bg-primary-500 transition-colors duration-200 shadow-lg"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center -mr-5 md:-mr-10 z-10">
            <motion.button
              onClick={next}
              className="p-3 rounded-full bg-primary-600/80 backdrop-blur-md text-white hover:bg-primary-500 transition-colors duration-200 shadow-lg"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          
          <div className="overflow-hidden px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-primary-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-10 relative"
              >
               
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-t-2xl"></div>
                
               
                <div className="absolute -top-6 left-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-3 shadow-lg">
                  <Quote size={24} className="text-white" />
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pt-4">
                  <div className="flex-shrink-0">
                    {testimonials[current].image ? (
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-1 animate-pulse-slow"></div>
                        <img
                          src={testimonials[current].image}
                          alt={testimonials[current].name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary-900 relative z-10"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-primary-700 flex items-center justify-center">
                        <User size={40} className="text-blue-400" />
                      </div>
                    )}
                    
                    <div className="flex justify-center text-yellow-300 mt-3">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} fill="currentColor" size={16} />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <blockquote className="text-lg md:text-xl text-blue-50 mb-6 leading-relaxed">
                      "{testimonials[current].text}"
                    </blockquote>
                    
                    <div className="flex items-center">
                      <div className="h-10 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 mr-4"></div>
                      <div>
                        <p className="font-bold text-lg text-white">
                          {testimonials[current].name}
                        </p>
                        <p className="text-blue-50/80">
                          {testimonials[current].position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

         
          <motion.div 
            className="flex justify-center mt-8 space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                  current === index 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 w-16' 
                    : 'bg-blue-400/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>
        
        
        <motion.div 
          className="mt-16 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-300 mb-1">98%</div>
            <div className="text-sm text-blue-50/80">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-300 mb-1">50k+</div>
            <div className="text-sm text-blue-50/80">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-300 mb-1">4.9</div>
            <div className="text-sm text-blue-50/80">App Store Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;