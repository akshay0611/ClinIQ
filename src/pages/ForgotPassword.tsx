import React from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, ArrowRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

interface ForgotPasswordFormInputs {
  email: string;
}

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = async (data) => {
    try {
      // For demo purposes - replace with Supabase authentication later
      console.log('Password reset request:', data);
      
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Demo success message
      toast.success('Password reset email sent! Check your inbox.');
      
      // When implementing Supabase:
      // const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      //   redirectTo: 'http://localhost:3000/reset-password',
      // });
      // if (error) throw error;
      // toast.success('Password reset email sent! Check your inbox.');
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to send reset email. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center">
        {/* Header section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
          >
            <span>Reset Your Password</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Forgot Password
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Enter your email address to receive a password reset link.
          </p>
        </motion.div>

        {/* Forgot password form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-8 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
                    })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="you@email.com"
                  />
                </div>
                {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
                <a href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  Sign in
                </a>
              </p>
              <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
                Don't have an account?{' '}
                <a href="/signup" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="relative pointer-events-none mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <EnvelopeIcon className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute -top-10 -left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <ArrowLeftIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute -bottom-10 -right-10 rotate-12 animate-float" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}