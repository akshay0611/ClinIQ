import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Award, CheckCircle, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const TrustSection: React.FC = () => {
  const trustItems = [
    {
      icon: <Shield size={28} />,
      title: 'DPDP & DISHA Compliant',
      description: 'Health data protected under Indian privacy laws',
      color: 'from-blue-500 to-indigo-600',
      lightColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      icon: <Lock size={28} />,
      title: 'Data Encryption',
      description: 'End-to-end encryption for all your personal and health information',
      color: 'from-emerald-500 to-teal-600',
      lightColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      icon: <Award size={28} />,
      title: 'Certified Providers',
      description: 'All healthcare professionals are verified and credentialed',
      color: 'from-violet-500 to-purple-600',
      lightColor: 'bg-violet-50',
      iconColor: 'text-violet-600',
    },
    {
      icon: <CheckCircle size={28} />,
      title: 'AI Accuracy',
      description: 'Our symptom checker is regularly reviewed by medical professionals',
      color: 'from-rose-500 to-pink-600',
      lightColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 relative" aria-labelledby="features-heading">
     
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10">
        <div className="absolute h-full w-full bg-grid-neutral-300/30 dark:bg-grid-neutral-700/20 bg-[length:20px_20px]" />
      </div>
      
     
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-teal-400/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-green-400/10 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full text-sm font-semibold bg-primary-600 text-white dark:bg-primary-500 dark:text-white">
            Security & Trust
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 dark:text-white mb-6 tracking-tight">
            Your Health Data is Safe with Us
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            We prioritize the security and privacy of your health information with industry-leading standards and protocols.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {trustItems.map((item, index) => (
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
              <div className="h-full bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-xl group-hover:scale-105 group-hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden flex flex-col group-hover:bg-opacity-90">
              
                <div className={`h-2 w-full bg-gradient-to-r ${item.color}`}></div>
                
                <div className="p-8 flex-grow">
                 
                  <div className={`w-16 h-16 rounded-xl ${item.lightColor} dark:bg-opacity-20 flex items-center justify-center ${item.iconColor} mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {item.description}
                  </p>
                </div>
                
               
                <div className="px-8 pb-6">
                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-700">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group-hover:underline">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
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
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Learn about our security
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
        
      
        <motion.div 
          className="mt-20 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-700 px-4 py-2 rounded-lg">
            <Shield className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">DPDP & DISHA Compliant</span>
          </div>
          <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-700 px-4 py-2 rounded-lg">
            <Lock className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">256-bit Encryption</span>
          </div>
          <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-700 px-4 py-2 rounded-lg">
            <Award className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">Top Rated 2025</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;