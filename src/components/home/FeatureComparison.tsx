import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  X, 
  Star, 
  Crown, 
  Building, 
  ArrowRight,
  Zap,
  Users,
  Clock,
  MessageCircle,
  Brain,
  FileText,
  Globe
} from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for basic health insights',
    icon: <Star size={24} />,
    color: 'from-neutral-500 to-neutral-600',
    popular: false,
    features: [
      { name: 'Basic Symptom Analysis', included: true, description: 'AI-powered symptom checking' },
      { name: 'Health Insights', included: true, description: 'Basic health recommendations' },
      { name: 'Doctor Directory', included: true, description: 'Browse verified doctors' },
      { name: 'Basic Support', included: true, description: 'Email support within 48 hours' },
      { name: 'Health History', included: false, description: 'Track your health over time' },
      { name: 'Priority Support', included: false, description: '24/7 chat support' },
      { name: 'Video Consultations', included: false, description: 'Direct video calls with doctors' },
      { name: 'Prescription Management', included: false, description: 'Digital prescription tracking' },
      { name: 'Family Accounts', included: false, description: 'Manage family health profiles' },
      { name: 'Advanced Analytics', included: false, description: 'Detailed health insights' },
      { name: 'API Access', included: false, description: 'Integrate with your systems' },
      { name: 'White-label Solution', included: false, description: 'Custom branding options' }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$19',
    period: 'month',
    description: 'Most popular for individuals',
    icon: <Crown size={24} />,
    color: 'from-primary-500 to-primary-600',
    popular: true,
    features: [
      { name: 'Basic Symptom Analysis', included: true, description: 'AI-powered symptom checking' },
      { name: 'Health Insights', included: true, description: 'Advanced health recommendations' },
      { name: 'Doctor Directory', included: true, description: 'Browse verified doctors' },
      { name: 'Basic Support', included: true, description: 'Email support within 24 hours' },
      { name: 'Health History', included: true, description: 'Track your health over time' },
      { name: 'Priority Support', included: true, description: '24/7 chat support' },
      { name: 'Video Consultations', included: true, description: 'Direct video calls with doctors' },
      { name: 'Prescription Management', included: true, description: 'Digital prescription tracking' },
      { name: 'Family Accounts', included: true, description: 'Manage up to 4 family members' },
      { name: 'Advanced Analytics', included: true, description: 'Detailed health insights' },
      { name: 'API Access', included: false, description: 'Integrate with your systems' },
      { name: 'White-label Solution', included: false, description: 'Custom branding options' }
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For healthcare organizations',
    icon: <Building size={24} />,
    color: 'from-accent-500 to-accent-600',
    popular: false,
    features: [
      { name: 'Basic Symptom Analysis', included: true, description: 'AI-powered symptom checking' },
      { name: 'Health Insights', included: true, description: 'Advanced health recommendations' },
      { name: 'Doctor Directory', included: true, description: 'Browse verified doctors' },
      { name: 'Basic Support', included: true, description: 'Dedicated account manager' },
      { name: 'Health History', included: true, description: 'Track your health over time' },
      { name: 'Priority Support', included: true, description: '24/7 phone & chat support' },
      { name: 'Video Consultations', included: true, description: 'Direct video calls with doctors' },
      { name: 'Prescription Management', included: true, description: 'Digital prescription tracking' },
      { name: 'Family Accounts', included: true, description: 'Unlimited family members' },
      { name: 'Advanced Analytics', included: true, description: 'Custom analytics dashboard' },
      { name: 'API Access', included: true, description: 'Full API integration' },
      { name: 'White-label Solution', included: true, description: 'Custom branding options' }
    ]
  }
];

const featureCategories = [
  {
    name: 'Core Features',
    icon: <Brain size={20} />,
    features: ['Basic Symptom Analysis', 'Health Insights', 'Doctor Directory', 'Basic Support']
  },
  {
    name: 'Advanced Features',
    icon: <Zap size={20} />,
    features: ['Health History', 'Priority Support', 'Video Consultations', 'Prescription Management']
  },
  {
    name: 'Family & Sharing',
    icon: <Users size={20} />,
    features: ['Family Accounts']
  },
  {
    name: 'Analytics & Insights',
    icon: <FileText size={20} />,
    features: ['Advanced Analytics']
  },
  {
    name: 'Integration & Customization',
    icon: <Globe size={20} />,
    features: ['API Access', 'White-label Solution']
  }
];

const FeatureComparison: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredFeatures = selectedCategory === 'all' 
    ? plans[0].features.map(f => f.name)
    : featureCategories.find(cat => cat.name === selectedCategory)?.features || [];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900 relative" aria-labelledby="comparison-heading">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10">
        <div className="absolute h-full w-full bg-grid-neutral-300/30 dark:bg-grid-neutral-700/20 bg-[length:20px_20px]" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-400/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent-400/10 blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-semibold bg-primary-600 text-white dark:bg-primary-500 dark:text-white">
            Pricing Plans
          </div>
          <h2 id="comparison-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-white mb-6 tracking-tight font-heading">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            From basic health insights to comprehensive healthcare solutions, find the plan that fits your needs and budget.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            All Features
          </button>
          {featureCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === category.name
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div 
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="min-w-full">
            {/* Plan Headers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-200 ${
                    plan.popular
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-xl scale-105'
                      : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-lg'
                  }`}
                  whileHover={{ scale: plan.popular ? 1.05 : 1.02 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                      {plan.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2 font-heading">
                      {plan.name}
                    </h3>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-neutral-800 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-neutral-600 dark:text-neutral-300 ml-2">
                        /{plan.period}
                      </span>
                    </div>
                    
                    <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                      {plan.description}
                    </p>
                    
                    <motion.button
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                        plan.popular
                          ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                          : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-800 dark:text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {plan.id === 'enterprise' ? 'Contact Sales' : 'Get Started'}
                      <ArrowRight className="inline ml-2 h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature Comparison */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 dark:bg-neutral-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-800 dark:text-white">
                        Features
                      </th>
                      {plans.map((plan) => (
                        <th key={plan.id} className="px-6 py-4 text-center text-sm font-semibold text-neutral-800 dark:text-white">
                          {plan.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                    {plans[0].features
                      .filter(feature => selectedCategory === 'all' || filteredFeatures.includes(feature.name))
                      .map((feature, index) => (
                      <tr key={index} className="hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-neutral-800 dark:text-white">
                              {feature.name}
                            </div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-400">
                              {feature.description}
                            </div>
                          </div>
                        </td>
                        {plans.map((plan) => {
                          const planFeature = plan.features.find(f => f.name === feature.name);
                          return (
                            <td key={plan.id} className="px-6 py-4 text-center">
                              {planFeature?.included ? (
                                <div className="flex justify-center">
                                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                                    <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex justify-center">
                                  <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center">
                                    <X className="h-5 w-5 text-neutral-400" />
                                  </div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-2xl p-8 border border-primary-100 dark:border-primary-800">
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4 font-heading">
              Still Not Sure Which Plan is Right for You?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
              Our team is here to help you choose the perfect plan for your healthcare needs. Get personalized recommendations and answers to all your questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chat with Sales
              </motion.button>
              <motion.button
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-600 text-neutral-800 dark:text-white font-semibold transition-all duration-200 hover:bg-neutral-50 dark:hover:bg-neutral-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Clock className="mr-2 h-4 w-4" />
                Schedule Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureComparison;
