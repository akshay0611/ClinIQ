import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Tag, X, ChevronDown, Stethoscope } from 'lucide-react';

interface DoctorFilterProps {
  onFilter: (filters: {
    search: string;
    specialization: string;
    location: string;
    availableToday: boolean;
  }) => void;
}

const DoctorFilter: React.FC<DoctorFilterProps> = ({ onFilter }) => {
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [location, setLocation] = useState('');
  const [availableToday, setAvailableToday] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ search, specialization, location, availableToday });
  };
  
  const handleClear = () => {
    setSearch('');
    setSpecialization('');
    setLocation('');
    setAvailableToday(false);
    onFilter({ search: '', specialization: '', location: '', availableToday: false });
  };
  
  const specializations = [
    'Family Medicine',
    'Internal Medicine',
    'Pediatrics',
    'Cardiology',
    'Neurology',
    'Dermatology',
    'Gastroenterology',
    'Psychiatry',
    'Orthopedics',
    'Obstetrics and Gynecology'
  ];
  
 const locations = [
  'Delhi',
  'Mumbai',
  'Kolkata',
  'Chennai'
];


  const activeFiltersCount = [
    specialization !== '',
    location !== '',
    availableToday
  ].filter(Boolean).length;

  return (
    <div className="backdrop-blur-sm rounded-2xl">
      <form onSubmit={handleSubmit}>
      
        <div className="relative mb-4">
          <div className="relative">
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Search size={20} className="text-blue-500 dark:text-blue-400" />
            </motion.div>
            <input
              type="text"
              className="w-full py-4 pl-12 pr-20 bg-white dark:bg-neutral-800 border border-blue-100 dark:border-neutral-700 rounded-xl shadow-md shadow-blue-900/5 dark:shadow-blue-900/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search doctors by name or specialty"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
           
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="absolute inset-y-0 right-0 flex items-center px-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-300 font-medium rounded-r-xl border-l border-blue-100 dark:border-blue-800 transition-all duration-200 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30"
            >
              <Filter size={16} className="mr-2" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <div className="ml-2 px-1.5 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">
                  {activeFiltersCount}
                </div>
              )}
              <ChevronDown 
                size={16} 
                className={`ml-1 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} 
              />
            </button>
          </div>
        </div>
        
       
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-neutral-800 p-6 rounded-xl border border-blue-50 dark:border-neutral-700 shadow-lg shadow-blue-900/5 dark:shadow-blue-900/20 mb-4">
           
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Stethoscope size={16} className="mr-2 text-blue-500 dark:text-blue-400" />
                Specialization
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 pl-4 pr-10 rounded-lg appearance-none border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Tag size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            
           
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <MapPin size={16} className="mr-2 text-green-500 dark:text-green-400" />
                Location
              </label>
              <div className="relative">
                <select
                  className="w-full p-3 pl-4 pr-10 rounded-lg appearance-none border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-neutral-900/50 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>{loc}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <MapPin size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
            
           
            <div className="flex flex-col justify-between space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                <Calendar size={16} className="mr-2 text-purple-500 dark:text-purple-400" />
                Availability
              </label>
              <div className="flex items-center h-12">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={availableToday}
                      onChange={(e) => setAvailableToday(e.target.checked)}
                    />
                    <div className={`w-10 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                      availableToday ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                    </div>
                    <div className={`absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out ${
                      availableToday ? 'transform translate-x-4' : ''
                    }`}>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-700 dark:text-gray-300">
                    Available Today
                  </span>
                </label>
              </div>
            </div>
          </div>
          
         
          <div className="flex gap-3 mb-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
            >
              <Filter size={18} />
              Apply Filters
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleClear}
              className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <X size={18} />
              Clear
            </motion.button>
          </div>
          
         
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {specialization && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-300 text-sm"
                >
                  <Stethoscope size={14} className="mr-1" />
                  {specialization}
                  <button 
                    onClick={() => setSpecialization('')}
                    className="ml-1.5 p-0.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
              
              {location && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/50 border border-green-100 dark:border-green-800 text-green-600 dark:text-green-300 text-sm"
                >
                  <MapPin size={14} className="mr-1" />
                  {location}
                  <button 
                    onClick={() => setLocation('')}
                    className="ml-1.5 p-0.5 rounded-full hover:bg-green-100 dark:hover:bg-green-800"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
              
              {availableToday && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/50 border border-purple-100 dark:border-purple-800 text-purple-600 dark:text-purple-300 text-sm"
                >
                  <Calendar size={14} className="mr-1" />
                  Available Today
                  <button 
                    onClick={() => setAvailableToday(false)}
                    className="ml-1.5 p-0.5 rounded-full hover:bg-purple-100 dark:hover:bg-purple-800"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      </form>
    </div>
  );
};

export default DoctorFilter;