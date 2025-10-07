import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DoctorCard from '../components/doctors/DoctorCard';
import DoctorFilter from '../components/doctors/DoctorFilter';
import { Doctor } from '../types';
import { mockDoctors } from '../services/mockData';
import { UserIcon, Stethoscope, Search , Calendar} from 'lucide-react';

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(mockDoctors);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleFilter = (filters: {
    search: string;
    specialization: string;
    location: string;
    availableToday: boolean;
  }) => {
    let filtered = [...doctors];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        doctor => 
          doctor.name.toLowerCase().includes(searchTerm) || 
          doctor.specialization.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.specialization) {
      filtered = filtered.filter(
        doctor => doctor.specialization === filters.specialization
      );
    }
    
    if (filters.location) {
      filtered = filtered.filter(
        doctor => doctor.location === filters.location
      );
    }
    
    if (filters.availableToday) {
      filtered = filtered.filter(
        doctor => doctor.isAvailableToday
      );
    }
    
    setFilteredDoctors(filtered);
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
    visible: { opacity: 1, y: 0 }
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
            <span>Healthcare Professionals</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Find the Right Doctor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Connect with qualified healthcare professionals specializing in your needs.
            Filter by specialty, location, and availability.
          </p>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30">
            <DoctorFilter onFilter={handleFilter} />
          </div>
        </motion.div>

       
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-16 bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30 max-w-2xl mx-auto"
          >
            <Search size={48} className="mx-auto text-blue-400 dark:text-blue-500 mb-4 opacity-70" />
            <h3 className="text-2xl font-semibold text-neutral-800 dark:text-white mb-4">
              No doctors found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mx-auto max-w-md">
              We couldn't find any doctors matching your criteria. Try adjusting your filters or search terms.
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredDoctors.map((doctor) => (
              <motion.div key={doctor.id} variants={itemVariants}>
                <DoctorCard doctor={doctor} />
              </motion.div>
            ))}
          </motion.div>
        )}

       
        {!isLoading && filteredDoctors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 text-center shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30">
              <div className="bg-blue-50 dark:bg-blue-900/50 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <UserIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{filteredDoctors.length}</h3>
              <p className="text-gray-600 dark:text-gray-300">Healthcare Professionals</p>
            </div>
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 text-center shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30">
              <div className="bg-green-50 dark:bg-green-900/50 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-green-500 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(filteredDoctors.map(d => d.specialization)).size}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Specialties</p>
            </div>
            <div className="bg-white dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-blue-50 dark:border-neutral-700/80 p-6 text-center shadow-xl shadow-blue-900/5 dark:shadow-neutral-900/30">
              <div className="bg-purple-50 dark:bg-purple-900/50 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-500 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredDoctors.filter(d => d.isAvailableToday).length}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">Available Today</p>
            </div>
          </motion.div>
        )}

       
        <div className="relative pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 0.5, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Stethoscope className="w-16 h-16 text-blue-300 dark:text-blue-700 absolute top-10 left-10 animate-pulse" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <UserIcon className="w-20 h-20 text-blue-300 dark:text-indigo-700 absolute bottom-10 right-10 rotate-12 animate-float" />
          </motion.div>
        </div>
      </div>
     
    </div>
  );
};

export default Doctors;