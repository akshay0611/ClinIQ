import React, { Fragment, useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { QuestionMarkCircleIcon, CheckCircleIcon, LockClosedIcon, CalendarIcon, CurrencyDollarIcon, PhoneIcon, BookOpenIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: 'Is the symptom checker 100% accurate?',
    answer: 'The AI offers suggestions, not diagnoses. Always consult a professional.',
    icon: <QuestionMarkCircleIcon className="w-6 h-6 text-blue-500" />,
    color: 'blue'
  },
  {
    question: 'Can I consult a doctor online?',
    answer: 'Yes. We offer tele-consultation appointments depending on doctor availability.',
    icon: <PhoneIcon className="w-6 h-6 text-green-500" />,
    color: 'green'
  },
  {
    question: 'How is my data stored?',
    answer: 'Data is encrypted and never shared without consent.',
    icon: <LockClosedIcon className="w-6 h-6 text-purple-500" />,
    color: 'purple'
  },
  {
    question: 'How do I cancel my appointment?',
    answer: 'You can cancel via your dashboard or contact support for help.',
    icon: <CalendarIcon className="w-6 h-6 text-amber-500" />,
    color: 'amber'
  },
  {
    question: 'Is this platform free?',
    answer: 'Most features are free. Some premium services may require payment.',
    icon: <CurrencyDollarIcon className="w-6 h-6 text-pink-500" />,
    color: 'pink'
  },
];

export default function Faq() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = faqs.filter(faq =>
      faq.question.toLowerCase().includes(term) ||
      faq.answer.toLowerCase().includes(term)
    );
    setFilteredFaqs(filtered);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950 py-16">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 max-w-3xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <span>Knowledge Base</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find quick answers to the most common questions about our platform and services.
          </p>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-2xl mb-12 relative"
        >
          <div className="flex items-center bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl border border-blue-50 dark:border-neutral-700/80 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20 overflow-hidden">
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-6 py-4 bg-transparent outline-none text-gray-800 dark:text-gray-200" 
            />
            <button className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-4 h-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </motion.div>

      
        <div className="w-full max-w-3xl">
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <Disclosure as={Fragment}>
                    {({ open }) => (
                      <div className={`bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-${faq.color}-50 dark:border-${faq.color}-500/50 overflow-hidden`}>
                        <Disclosure.Button
                          className={`flex items-center w-full px-6 py-5 text-left focus:outline-none focus-visible:ring focus-visible:ring-${faq.color}-500/75 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700/30`}
                        >
                          <div className={`flex-shrink-0 p-2.5 rounded-full bg-${faq.color}-50 dark:bg-${faq.color}-900/50 mr-4`}>
                            {faq.icon}
                          </div>
                          <span className="flex-1 text-lg font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                          <ChevronUpIcon
                            className={`w-6 h-6 text-${faq.color}-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                          />
                        </Disclosure.Button>
                        <Transition
                          show={open}
                          enter="transition duration-300 ease-out"
                          enterFrom="transform scale-y-0 opacity-0"
                          enterTo="transform scale-y-100 opacity-100"
                          leave="transition duration-200 ease-in"
                          leaveFrom="transform scale-y-100 opacity-100"
                          leaveTo="transform scale-y-0 opacity-0"
                        >
                          <Disclosure.Panel static className="px-8 pb-6 pt-2 text-gray-700 dark:text-gray-300 text-base">
                            <div className="flex items-start gap-3">
                              <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>{faq.answer}</span>
                            </div>
                          </Disclosure.Panel>
                        </Transition>
                      </div>
                    )}
                  </Disclosure>
                </motion.div>
              ))
            ) : (
              <motion.div
                variants={itemVariants}
                className="text-center text-gray-600 dark:text-gray-300"
              >
                No results found for "{searchTerm}". Try a different search term.
              </motion.div>
            )}
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl">
              <BookOpenIcon className="w-10 h-10 text-blue-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Guide</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Learn how to use all features efficiently.</p>
              <Link to="/guide" className="text-blue-600 dark:text-blue-400 inline-flex items-center group">
                Learn more 
                <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl">
              <CalendarIcon className="w-10 h-10 text-green-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Appointment Help</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">All about booking & scheduling.</p>
              <Link to="/appointment-help" className="text-green-600 dark:text-green-400 inline-flex items-center group">
                Learn more 
                <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl">
              <LockClosedIcon className="w-10 h-10 text-purple-500 mb-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Privacy & Security</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">How we protect your information.</p>
              <Link to="/privacy" className="text-purple-600 dark:text-purple-400 inline-flex items-center group">
                Learn more 
                <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

     
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-16 flex flex-col items-center text-center bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-6">
              Our support team is ready to assist you with any questions or concerns you may have.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 hover:shadow-xl hover:shadow-blue-500/30 transition duration-200 text-lg"
            >
              <PhoneIcon className="w-5 h-5" /> Contact Support
            </Link>
          </motion.div>
        </div>
      </div>

     
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <QuestionMarkCircleIcon className="w-24 h-24 text-blue-300/50 dark:text-blue-700/30 absolute top-20 left-10" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <CheckCircleIcon className="w-16 h-16 text-green-300/50 dark:text-green-700/30 absolute bottom-40 right-20 animate-float" />
        </motion.div>
      </div>
    </div>
  );
}