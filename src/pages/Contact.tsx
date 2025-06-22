import React from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PaperAirplaneIcon, EnvelopeIcon, PhoneIcon, ClockIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { sendContactForm } from '../services/contactApi';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: 'Bug' | 'Feedback' | 'Appointment' | 'Other';
  message: string;
}

const SUPPORT_EMAIL = 'teamcodexsupport@gmail.com';
const SUPPORT_PHONE = '+91 98765432100';
const SUPPORT_HOURS = 'Mon–Fri | 10AM–6PM IST';

const SUBJECT_OPTIONS = [
  { value: 'Bug', label: 'Bug' },
  { value: 'Feedback', label: 'Feedback' },
  { value: 'Appointment', label: 'Appointment' },
  { value: 'Other', label: 'Other' },
];

export default function Contact() {
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<ContactFormInputs>();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const res = await sendContactForm(data);
      if (res.success) {
        toast.success('Message sent successfully!');
        reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

     

      <div className="relative container mx-auto px-4 py-16 md:py-24">
       
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <span>Contact Us</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're here to help with any questions, feedback, or support you need. Reach out to our team today!
          </p>
        </motion.div>

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-blue-500" />
                Send Us a Message
              </h2>
              
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Name</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Your Name"
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
                  </div>
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="you@email.com"
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
                  </div>
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Subject</label>
                  <Controller
                    name="subject"
                    control={control}
                    defaultValue={SUBJECT_OPTIONS[0].value as "Bug" | "Feedback" | "Appointment" | "Other"}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        {SUBJECT_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Type your message..."
                  />
                  {errors.message && <span className="text-red-500 text-sm mt-1 block">{errors.message.message}</span>}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                  disabled={isSubmitting}
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30 h-full">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Support Information</h2>
              <div className="space-y-6">
  <motion.div
    whileHover={{ scale: 1.03, x: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className="flex items-center gap-5 group"
  >
    <div className="flex-shrink-0 p-3 rounded-full bg-blue-50 dark:bg-blue-900/50 group-hover:bg-blue-100 dark:group-hover:bg-blue-800/50 transition-colors duration-200">
      <EnvelopeIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
    </div>
    <div>
      <p className="font-semibold text-gray-900 dark:text-white mb-1">Email</p>
      <a
        href={`mailto:${SUPPORT_EMAIL}`}
        className="text-gray-600 dark:text-gray-300 hover:underline"
      >
        {SUPPORT_EMAIL}
      </a>
    </div>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.03, x: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className="flex items-center gap-5 group"
  >
    <div className="flex-shrink-0 p-3 rounded-full bg-green-50 dark:bg-green-900/50 group-hover:bg-green-100 dark:group-hover:bg-green-800/50 transition-colors duration-200">
      <PhoneIcon className="w-6 h-6 text-green-500 dark:text-green-400" />
    </div>
    <div>
      <p className="font-semibold text-gray-900 dark:text-white mb-1">Phone</p>
      <a
        href={`tel:${SUPPORT_PHONE.replace(/\s+/g, "")}`}
        className="text-gray-600 dark:text-gray-300 hover:underline"
      >
        {SUPPORT_PHONE}
      </a>
    </div>
  </motion.div>

  <motion.div
    whileHover={{ scale: 1.03, x: 5 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    className="flex items-center gap-5 group"
  >
    <div className="flex-shrink-0 p-3 rounded-full bg-pink-50 dark:bg-pink-900/50 group-hover:bg-pink-100 dark:group-hover:bg-pink-800/50 transition-colors duration-200">
      <ClockIcon className="w-6 h-6 text-pink-500 dark:text-pink-400" />
    </div>
    <div>
      <p className="font-semibold text-gray-900 dark:text-white mb-1">Hours</p>
      <p className="text-gray-600 dark:text-gray-300">{SUPPORT_HOURS}</p>
    </div>
  </motion.div>
</div>


             
              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-neutral-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Find quick answers to common questions in our FAQ section.</p>
                <motion.a
                  href="/faq"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  Visit FAQ
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

       
        <div className="relative pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <ChatBubbleLeftEllipsisIcon className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute top-10 left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <PaperAirplaneIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute bottom-10 right-10 rotate-12 animate-float" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}