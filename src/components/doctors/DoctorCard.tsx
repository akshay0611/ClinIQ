import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Star, Clock, Award, Phone, ThumbsUp } from 'lucide-react';
import { Doctor } from '../../types';
import Button from '../common/Button';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <motion.div 
      whileHover={{ translateY: -5 }}
      className="h-full rounded-2xl overflow-hidden bg-white dark:bg-neutral-800/90 backdrop-blur-sm border border-blue-50 dark:border-neutral-700/80 shadow-xl shadow-blue-900/5 dark:shadow-blue-900/30 flex flex-col transition-all duration-300"
    >
      <div className="relative">
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 dark:from-blue-900/30 dark:to-indigo-900/30" />
        
        <img
          src={doctor.photoUrl}
          alt={doctor.name}
          className="relative w-full h-52 object-cover"
        />
        
      
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm pl-2 pr-3 py-1 rounded-full flex items-center shadow-lg">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(doctor.rating) ? "#facc15" : "none"}
                color={i < Math.floor(doctor.rating) ? "#facc15" : "#d1d5db"}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="ml-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            {doctor.rating}
          </span>
        </div>
        
       
        {doctor.isAvailableToday && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
            <Clock size={12} />
            <span>Available Today</span>
          </div>
        )}
        
        
        <div className="absolute -bottom-12 left-4 w-24 h-24 rounded-full border-4 border-white dark:border-neutral-800 overflow-hidden shadow-lg">
          <img 
            src={doctor.photoUrl} 
            alt={doctor.name} 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
      
     
      <div className="p-5 pt-14 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-neutral-800 dark:text-white mb-1">
            {doctor.name}
          </h3>
          
          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
              {doctor.specialization}
            </span>
            {doctor.isVerified && (
              <div className="ml-2 flex items-center text-green-500 dark:text-green-400">
                <Award size={14} className="mr-1" />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 mr-3">
              <MapPin size={16} className="text-blue-500 dark:text-blue-400" />
            </div>
            <span>{doctor.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900/30 mr-3">
              <Calendar size={16} className="text-purple-500 dark:text-purple-400" />
            </div>
            <span>Available: {doctor.availability.join(', ')}</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 mr-3">
              <Phone size={16} className="text-green-500 dark:text-green-400" />
            </div>
            <span>Online/In-person consultation</span>
          </div>
        </div>
        
       
        <div className="flex justify-between mb-6 px-1">
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{doctor.experience}+</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Years Exp.</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{doctor.patientCount}+</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Patients</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{doctor.reviews}</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">Reviews</p>
          </div>
        </div>
        
       
        <div className="mt-auto grid grid-cols-2 gap-3">
          <Link to={`/doctor/${doctor.id}`} className="w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 px-4 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ThumbsUp size={16} />
              View Profile
            </motion.button>
          </Link>
          
          <Link to={`/appointment/${doctor.id}`} className="w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white font-medium shadow-lg shadow-blue-500/20 dark:shadow-blue-700/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <Calendar size={16} />
              Book Now
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;