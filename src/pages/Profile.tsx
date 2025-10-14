import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { UserCircleIcon, ShieldCheckIcon, CalendarIcon, BellIcon, ExclamationCircleIcon as ExclamationIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../services/supabaseClient';

interface ProfileData {
  full_name: string;
  date_of_birth: string;
  gender: string;
  blood_type: string;
  allergies: string[];
  current_medications: string[];
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

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
    icon: <UserCircleIcon className="w-6 h-6 text-blue-500" />,
    bgColor: 'bg-blue-50 dark:bg-blue-900/30' 
  },
  { 
    label: 'Upcoming Appointment', 
    value: '2025-04-25 10:00 AM', 
    icon: <BellIcon className="w-6 h-6 text-purple-500" />,
    bgColor: 'bg-purple-50 dark:bg-purple-900/30' 
  },
];

export default function Profile(): JSX.Element {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [symptomData, setSymptomData] = useState<SymptomData[]>([]);
  const [loading, setLoading] = useState(true);
  const stats = getStats(currentUser?.name || 'User');

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (error && error.code !== 'PGRST116') { // PGRST116: row not found
          console.error('Error fetching profile:', error);
          toast.error('Could not fetch profile.');
        } else if (data) {
          setProfile(data);
        } else {
          // Initialize a default profile structure for new users
          setProfile({
            full_name: currentUser.name || '',
            date_of_birth: '',
            gender: '',
            blood_type: '',
            allergies: [],
            current_medications: [],
            emergency_contact_name: '',
            emergency_contact_phone: '',
          });
        }
      }
    };

    const fetchSymptomData = async () => {
      if (currentUser) {
        const { data, error } = await supabase
          .from('symptoms')
          .select('created_at, symptoms_input, result, severity')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching symptom data:', error);
          toast.error('Could not fetch symptom history.');
        } else if (data) {
          const formattedData = data.map(item => ({
            date: new Date(item.created_at).toLocaleDateString(),
            input: item.symptoms_input,
            result: item.result,
            severity: item.severity,
          }));
          setSymptomData(formattedData);
        }
      }
    };

    Promise.all([fetchProfile(), fetchSymptomData()]).then(() => {
      setLoading(false);
    });
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => (prev ? { ...prev, [name]: value } : null));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ProfileData) => {
    const { value } = e.target;
    setProfile(prev => (prev ? { ...prev, [field]: value.split(',').map(item => item.trim()) } : null));
  };

  const handleSaveProfile = async () => {
    if (!currentUser || !profile) return;

    const { error } = await supabase.from('profiles').upsert({ 
      id: currentUser.id, 
      ...profile, 
      updated_at: new Date() 
    });

    if (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile.');
    } else {
      toast.success('Profile updated successfully!');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-blue-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-8 md:py-12 mt-16">
        <Toaster position="top-right" />

        <motion.header 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
              <UserCircleIcon className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Welcome, {currentUser?.name?.split(' ')[0] || 'User'}!
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Manage your profile and view your health summary.
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
                    </tr>
                  </thead>
                  <tbody>
                    {symptomData.map((row, idx) => (
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
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
                <p className="text-gray-700 dark:text-gray-300">April 25, 2025 - 10:00 AM</p>
                <p className="text-gray-700 dark:text-gray-300">Dr. Emily Chen - General Checkup</p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <CalendarIcon className="w-5 h-5" />
                Book New Appointment
              </motion.button>
            </div>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/20 p-6 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
          {profile && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" name="full_name" value={profile.full_name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Date of Birth</label>
                <input type="date" name="date_of_birth" value={profile.date_of_birth} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Gender</label>
                <select name="gender" value={profile.gender} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Blood Type</label>
                <input type="text" name="blood_type" value={profile.blood_type} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Allergies (comma-separated)</label>
                <input type="text" name="allergies" value={profile.allergies.join(', ')} onChange={(e) => handleArrayChange(e, 'allergies')} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Current Medications (comma-separated)</label>
                <input type="text" name="current_medications" value={profile.current_medications.join(', ')} onChange={(e) => handleArrayChange(e, 'current_medications')} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Emergency Contact Name</label>
                <input type="text" name="emergency_contact_name" value={profile.emergency_contact_name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-gray-700 dark:text-gray-300">Emergency Contact Phone</label>
                <input type="text" name="emergency_contact_phone" value={profile.emergency_contact_phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-neutral-700/80 bg-gray-50 dark:bg-neutral-900/50" />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
              onClick={handleSaveProfile}
            >
              <ShieldCheckIcon className="w-5 h-5" />
              Save Changes
            </motion.button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
