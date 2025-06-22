import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Users, Calendar, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <Stethoscope size={28} />,
    title: 'Symptom Analysis',
    description: 'Get AI-powered analysis of your symptoms with possible conditions and recommended next steps.',
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    benefits: ['Smart symptom recognition', 'Personalized recommendations', 'Medical database integration'],
    href: '/symptom-analysis'
  },
  {
    icon: <Users size={28} />,
    title: 'Find Specialists',
    description: 'Search for doctors by specialty, location, and availability to get the care you need.',
    color: 'from-emerald-500 to-teal-600',
    lightColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    benefits: ['Verified specialists', 'Filter by expertise', 'Read patient reviews'],
    href: '/find-specialists'
  },
  {
    icon: <Calendar size={28} />,
    title: 'Easy Booking',
    description: 'Book appointments with just a few clicks and manage your healthcare schedule in one place.',
    color: 'from-violet-500 to-purple-600',
    lightColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
    benefits: ['Instant confirmation', 'Reminders & notifications', 'Calendar integration'],
    href: '/booking'
  },
  {
  icon: <Shield size={28} />,
  title: 'Private & Secure',
  description: 'Your health data is encrypted and protected with industry-leading security standards.',
  color: 'from-rose-500 to-pink-600',
  lightColor: 'bg-rose-50',
  iconColor: 'text-rose-600',
  benefits: [
    'IT Act compliant',
    'End-to-end encryption',
    'Secure data storage'
  ],
  href: '/security'
},
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const FeaturesSection: React.FC = () => {

  const hoverAnimation = useCallback(() => ({
    scale: 1.03,
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3, ease: "easeOut" }
  }), []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 relative" aria-labelledby="features-heading">
     
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10">
        <div className="absolute h-full w-full bg-grid-neutral-300/30 dark:bg-grid-neutral-700/20 bg-[length:20px_20px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
       
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
           <div className="inline-block px-4 py-1.5 mb-4 rounded-full text-sm font-semibold bg-primary-600 text-white dark:bg-primary-500 dark:text-white">
            Why Choose ClinIQ
          </div>
          <h2 id="features-heading" className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-white mb-6 tracking-tight">
           An AI that diagnose before the doctor does
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            ClinIQ provides all the tools you need to understand your symptoms and connect with healthcare professionals in one intuitive platform.
          </p>
        </motion.div>

       
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative h-full"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] } 
                }
              }}
            >
              
              <motion.div 
                className="h-full bg-white dark:bg-neutral-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
                whileHover={hoverAnimation()}
              >
               
                <div className={`h-2 w-full bg-gradient-to-r ${feature.color}`}></div>
                
                <div className="p-8 flex-grow">
                 
                  <div className={`w-16 h-16 rounded-xl ${feature.lightColor} dark:bg-opacity-20 flex items-center justify-center ${feature.iconColor} mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  
                 
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                    {feature.description}
                  </p>
                  
                 
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
               
                <div className="px-8 pb-6">
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700">
                    <a 
                      href={feature.href}
                      className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                      aria-label={`Learn more about ${feature.title}`}
                    >
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
       
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.a 
            href="/features" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore all features
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>

      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-neutral-50 to-transparent dark:from-neutral-900 dark:to-transparent"></div>
    </section>
  );
};

export default FeaturesSection;