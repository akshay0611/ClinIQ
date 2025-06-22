import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { ArrowLeftOnRectangleIcon as LogoutIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleIcon as ExclamationIcon } from '@heroicons/react/24/outline';
import { ChartBarIcon, BellIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

interface SymptomData {
  date: string;
  input: string;
  result: string;
  severity: string;
}

interface Stat {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

const dummySymptomData: SymptomData[] = [
  { date: '2025-04-19', input: 'Cough, Fever', result: 'Flu', severity: '🟡 Moderate' },
  { date: '2025-04-15', input: 'Headache', result: 'Tension', severity: '🟢 Mild' },
  { date: '2025-04-10', input: 'Sore throat, Runny nose', result: 'Common Cold', severity: '🟢 Mild' },
  { date: '2025-04-02', input: 'Fatigue, Joint pain', result: 'Overexertion', severity: '🟡 Moderate' },
];

const getStats = (userName: string): Stat[] => [
  { 
    label: 'Total Symptoms Checked', 
    value: 12, 
    icon: <ExclamationIcon className="w-6 h-6 text-yellow-400" />,
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/30' 
  },
  { 
    label: 'Appointments Booked', 
    value: 3, 
    icon: <CalendarIcon className="w-6 h-6 text-green-500" />,
    bgColor: 'bg-green-50 dark:bg-green-900/30' 
  },
  { 
    label: 'Last Check Result', 
    value: 'Cold', 
    icon: <CheckCircleIcon className="w-6 h-6 text-blue-500" />,
    bgColor: 'bg-blue-50 dark:bg-blue-900/30' 
  },
  { 
    label: 'Upcoming Appointment', 
    value: '2025-04-25 10:00 AM', 
    icon: <BellIcon className="w-6 h-6 text-purple-500" />,
    bgColor: 'bg-purple-50 dark:bg-purple-900/30' 
  },
];

export default function Dashboard(): JSX.Element {
  const [userName, setUserName] = useState<string>('User');
  const [password, setPassword] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDetail, setSelectedDetail] = useState<SymptomData | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [appointmentDate, setAppointmentDate] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState<string>('');
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);
  
  const stats = getStats(userName);

  
  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  
  const handleBookAppointment = () => {
    if (!appointmentDate) {
      toast.error('Please select a date for your appointment.');
      return;
    }
    if (!appointmentTime) {
      toast.error('Please select a time for your appointment.');
      return;
    }
    toast.success(`Appointment booked for ${appointmentDate} at ${appointmentTime}`);
    setIsBookingOpen(false);
    setAppointmentDate('');
    setAppointmentTime('');
  };

  
  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLoggingOut(false);
      toast('Logged out successfully!', { icon: '👋' });
    
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-12">
        <Toaster position="top-right" />
        
       
        <motion.header 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex justify-center items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm font-medium mb-4"
          >
            <span>Dashboard</span>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
              <UserCircleIcon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Welcome, {userName}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Your health dashboard is up to date. Here's your summary.
              </p>
            </div>
          </div>
        </motion.header>

       
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/20 p-6"
              >
                <div className={`mb-4 w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/20 p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ExclamationIcon className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Symptom History</h2>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <button 
                    className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-medium"
                  >
                    View All
                  </button>
                </motion.div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-100 dark:border-neutral-700/50">
                      <th className="whitespace-nowrap px-3 py-4 font-semibold text-gray-700 dark:text-gray-300">Date</th>
                      <th className="whitespace-nowrap px-3 py-4 font-semibold text-gray-700 dark:text-gray-300">Symptoms</th>
                      <th className="whitespace-nowrap px-3 py-4 font-semibold text-gray-700 dark:text-gray-300">Result</th>
                      <th className="whitespace-nowrap px-3 py-4 font-semibold text-gray-700 dark:text-gray-300">Severity</th>
                      <th className="whitespace-nowrap px-3 py-4 font-semibold text-gray-700 dark:text-gray-300">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummySymptomData.map((row, idx) => (
                      <motion.tr 
                        key={idx} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * idx }}
                        className="border-b border-gray-50 dark:border-neutral-800"
                      >
                        <td className="whitespace-nowrap px-3 py-4 text-gray-800 dark:text-gray-200">{row.date}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-gray-800 dark:text-gray-200">{row.input}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-gray-800 dark:text-gray-200">{row.result}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-gray-800 dark:text-gray-200">{row.severity}</td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-sm font-medium"
                            onClick={() => { setSelectedDetail(row); setIsModalOpen(true); }}
                          >
                            View
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/20 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <UserCircleIcon className="w-6 h-6 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="Your name"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                      checked={emailNotifications}
                      onChange={e => setEmailNotifications(e.target.checked)}
                    />
                    <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600 rounded"
                      checked={smsNotifications}
                      onChange={e => setSmsNotifications(e.target.checked)}
                    />
                    <span className="text-gray-700 dark:text-gray-300">SMS Notifications</span>
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                  onClick={handleSaveProfile}
                >
                  <ShieldCheckIcon className="w-5 h-5" />
                  Save Changes
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 text-white font-medium shadow-lg shadow-red-500/20 dark:shadow-red-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-red-500/30"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogoutIcon className="w-5 h-5" />
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </motion.button>
              </div>
            </motion.div>
          </motion.section>

         
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-1 space-y-8"
          >
          
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-6 h-6 text-blue-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h2>
                </div>
              </div>
              
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <BellIcon className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Next Appointment</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">AprilreferralsApril 25, 2025 - 10:00 AM</p>
                <p className="text-gray-700 dark:text-gray-300">Dr. Emily Chen - General Checkup</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                onClick={() => setIsBookingOpen(true)}
              >
                <CalendarIcon className="w-5 h-5" />
                Book New Appointment
              </motion.button>
            </div>
            
           
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <ChartBarIcon className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Health Metrics</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-100 dark:border-neutral-700/50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Heart Rate</h3>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">72 BPM</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-100 dark:border-neutral-700/50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Blood Pressure</h3>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">120/80</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-100 dark:border-neutral-700/50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Sleep</h3>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">7h 20m</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                    <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
              
              <button className="mt-6 w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200">
                View All Metrics
              </button>
            </div>
          </motion.section>
        </div>

       
        <div className="relative pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <CalendarIcon className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute top-20 left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <CheckCircleIcon className="w-20 h-20 text-green-300 dark:text-green-700 absolute bottom-10 right-10 rotate-12 animate-float" />
          </motion.div>
        </div>
      </div>

     
      <Transition show={isModalOpen} as={React.Fragment}>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-30 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 z-40 w-full max-w-md shadow-2xl border border-blue-100 dark:border-blue-800/50 relative"
            >
              <Dialog.Title className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/50 rounded-full">
                  <ExclamationIcon className="w-6 h-6 text-yellow-500" />
                </div>
                Symptom Details
              </Dialog.Title>
              
              {selectedDetail && (
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Date</p>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedDetail.date}</p>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Symptoms</p>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedDetail.input}</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Result</p>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedDetail.result}</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Severity</p>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedDetail.severity}</p>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 transition-all duration-200"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        </Dialog>
      </Transition>

     
      <Transition show={isBookingOpen} as={React.Fragment}>
        <Dialog open={isBookingOpen} onClose={() => setIsBookingOpen(false)} className="fixed z-30 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
          <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl p-8 z-40 w-full max-w-md shadow-2xl border border-blue-100 dark:border-blue-800/50 relative"
            >
              <Dialog.Title className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <CalendarIcon className="w-6 h-6 text-blue-500" />
                </div>
                Book Appointment
              </Dialog.Title>

              <div className="space-y-6">
               
                <div>
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Select Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={appointmentDate}
                    onChange={e => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} 
                  />
                </div>

                
                <div>
                  <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Select Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    value={appointmentTime}
                    onChange={e => setAppointmentTime(e.target.value)}
                    step="1800" 
                  />
                </div>
              </div>

             
              <div className="mt-8 flex justify-end gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all duration-200"
                  onClick={() => {
                    setIsBookingOpen(false);
                    setAppointmentDate('');
                    setAppointmentTime('');
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
                  onClick={handleBookAppointment}
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}