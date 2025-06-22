import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { UserPlusIcon, EnvelopeIcon, UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupFormInputs>();
  const password = watch('password', '');

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = data;
      
      // For demo purposes - replace with Supabase authentication later
      console.log('Registration data:', registrationData);
      
      // Simulating API call
      setTimeout(() => {
        // Demo success message
        toast.success('Account created successfully!');
        
        // Redirect to login page
        // window.location.href = '/login';
      }, 1000);
      
      // When implementing Supabase:
      // const { data: authData, error } = await supabase.auth.signUp({
      //   email: registrationData.email,
      //   password: registrationData.password,
      //   options: {
      //     data: {
      //       name: registrationData.name,
      //     }
      //   }
      // });
      // 
      // if (error) throw error;
      // toast.success('Account created successfully!');
      // window.location.href = '/login';
      
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
            <span>Join Us</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Create Account
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join the ClinIQ community and get access to personalized healthcare services.
          </p>
        </motion.div>

        {/* Signup form */}
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
              className="space-y-5"
            >
              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Your Name"
                  />
                </div>
                {errors.name && <span className="text-red-500 text-sm mt-1 block">{errors.name.message}</span>}
              </div>

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

              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must contain uppercase, lowercase, number and special character'
                      }
                    })}
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                    >
                      {passwordVisible ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>}
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                    >
                      {confirmPasswordVisible ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword.message}</span>}
              </div>

              <div className="flex items-start my-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    {...register('acceptTerms', {
                      required: 'You must accept the terms and conditions'
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                    I accept the <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
                  </label>
                  {errors.acceptTerms && <span className="text-red-500 text-sm mt-1 block">{errors.acceptTerms.message}</span>}
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
                <UserPlusIcon className="w-5 h-5" />
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <a href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Security note */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
        >
          <CheckCircleIcon className="h-5 w-5 text-green-500" />
          <span>Your information is secure and encrypted</span>
        </motion.div>

        {/* Decorative elements */}
        <div className="relative pointer-events-none mt-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <UserPlusIcon className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute -top-10 -left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <CheckCircleIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute -bottom-10 -right-10 rotate-12 animate-float" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}