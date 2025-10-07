import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Stethoscope, 
  Brain, 
  MessageCircle, 
  Calendar, 
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Heart
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Describe Your Symptoms',
    description: 'Tell our AI about your symptoms, duration, and any relevant details in simple, natural language.',
    icon: <User size={24} />,
    color: 'from-primary-500 to-primary-600',
    lightColor: 'bg-primary-50',
    iconColor: 'text-primary-600',
    duration: '2-3 minutes',
    features: ['Natural language input', 'Smart symptom recognition', 'Contextual questions']
  },
  {
    id: 2,
    title: 'AI Analysis & Assessment',
    description: 'Our advanced AI analyzes your symptoms against medical databases and provides preliminary insights.',
    icon: <Brain size={24} />,
    color: 'from-accent-500 to-accent-600',
    lightColor: 'bg-accent-50',
    iconColor: 'text-accent-600',
    duration: 'Instant',
    features: ['Medical database analysis', 'Risk assessment', 'Preliminary insights']
  },
  {
    id: 3,
    title: 'Get Personalized Recommendations',
    description: 'Receive tailored recommendations including possible conditions, next steps, and when to seek immediate care.',
    icon: <MessageCircle size={24} />,
    color: 'from-secondary-500 to-secondary-600',
    lightColor: 'bg-secondary-50',
    iconColor: 'text-secondary-600',
    duration: 'Immediate',
    features: ['Personalized insights', 'Action recommendations', 'Urgency indicators']
  },
  {
    id: 4,
    title: 'Connect with Healthcare Professionals',
    description: 'Book appointments with verified doctors or get immediate consultation based on your needs.',
    icon: <Calendar size={24} />,
    color: 'from-violet-500 to-violet-600',
    lightColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
    duration: '5-10 minutes',
    features: ['Verified doctors', 'Instant booking', 'Video consultations']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const StepByStepProcess: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 relative" aria-labelledby="process-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10">
        <div className="absolute h-full w-full bg-grid-neutral-300/30 dark:bg-grid-neutral-700/20 bg-[length:20px_20px]" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary-400/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-accent-400/10 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-semibold bg-primary-600 text-white dark:bg-primary-500 dark:text-white">
            How It Works
          </div>
          <h2 id="process-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-white mb-6 tracking-tight font-heading">
            Your Health Journey in 4 Simple Steps
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            From symptom description to professional care, ClinIQ guides you through every step of your health journey with AI-powered insights and expert connections.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div 
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative"
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
                }
              }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                {/* Content */}
                <div className="flex-1 max-w-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl ${step.lightColor} dark:bg-opacity-20 flex items-center justify-center ${step.iconColor} shadow-sm`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400">Step {step.id}</div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-neutral-400" />
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white mb-4 font-heading">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-3">
                    {step.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                        <span className="text-neutral-600 dark:text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual Element */}
                <div className="flex-1 max-w-md">
                  <motion.div 
                    className={`relative p-8 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-xl`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-2xl backdrop-blur-sm" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 mx-auto">
                        <div className="text-3xl">
                          {step.id === 1 && <User size={40} />}
                          {step.id === 2 && <Brain size={40} />}
                          {step.id === 3 && <MessageCircle size={40} />}
                          {step.id === 4 && <Calendar size={40} />}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="flex justify-center my-8">
                  <motion.div
                    className="flex items-center gap-2 text-primary-500 dark:text-primary-400"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <ArrowRight size={16} />
                    </div>
                    <div className="h-px w-16 bg-gradient-to-r from-primary-500 to-transparent" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-primary-600" />
              <Heart className="h-6 w-6 text-accent-600" />
              <Stethoscope className="h-6 w-6 text-secondary-600" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4 font-heading">
              Ready to Start Your Health Journey?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust ClinIQ for their health insights and professional care connections.
            </p>
            <motion.button
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StepByStepProcess;
