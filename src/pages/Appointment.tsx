import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { stethoscope, MapPin, Star, Calendar, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Doctor } from '../types';
import { mockDoctors } from '../services/mockData';
import AppointmentCalendar from '../components/appointment/AppointmentCalendar';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const Appointment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    // Simulate API call to get doctor data
    const timer = setTimeout(() => {
      const foundDoctor = mockDoctors.find(doc => doc.id === id);
      if (foundDoctor) {
        setDoctor(foundDoctor);
      } else {
        toast.error('Doctor not found');
        navigate('/doctors');
      }
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, navigate]);

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleBooking = () => {
    setIsConfirmModalOpen(true);
  };

  const confirmBooking = () => {
    setIsConfirmModalOpen(false);
    
    // Simulate API call to book appointment
    setTimeout(() => {
      setIsSuccessModalOpen(true);
    }, 1000);
  };

  const handleSuccessClose = () => {
    setIsSuccessModalOpen(false);
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white mb-4">Doctor Not Found</h2>
          <Button onClick={() => navigate('/doctors')}>Back to Doctors</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/doctors')}
              className="mb-5"
            >
              ← Back to Doctors
            </Button>
            
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-white">
              Book an Appointment
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <div className="p-6">
                  <div className="relative mb-6">
                    <img
                      src={doctor.photoUrl}
                      alt={doctor.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    
                    {doctor.isAvailableToday && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Available Today
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-1">
                    {doctor.name}
                  </h2>
                  
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                    {doctor.specialization}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(doctor.rating) ? "#facc15" : "none"}
                        color={i < Math.floor(doctor.rating) ? "#facc15" : "#d1d5db"}
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {doctor.rating} (124 reviews)
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <MapPin size={18} className="text-neutral-500 dark:text-neutral-400 mt-1 mr-2" />
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {doctor.location}
                      </span>
                    </div>
                    
                    <div className="flex items-start">
                      <stethoscope size={18} className="text-neutral-500 dark:text-neutral-400 mt-1 mr-2" />
                      <span className="text-neutral-700 dark:text-neutral-300">
                        10+ years experience
                      </span>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar size={18} className="text-neutral-500 dark:text-neutral-400 mt-1 mr-2" />
                      <span className="text-neutral-700 dark:text-neutral-300">
                        Available on: {doctor.availability.join(', ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                    <h3 className="font-medium text-neutral-800 dark:text-white mb-2">
                      About
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {doctor.name} is a highly skilled {doctor.specialization.toLowerCase()} specialist 
                      with extensive experience in treating various conditions. 
                      {doctor.name.split(' ')[0]} is known for a compassionate approach to patient care.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <AppointmentCalendar
                doctorAvailability={doctor.availability}
                onDateTimeSelect={handleDateTimeSelect}
              />
              
              {selectedDate && selectedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-card p-6 mt-6"
                >
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-4">
                    Appointment Summary
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <stethoscope size={20} className="text-primary-500 mt-1 mr-3" />
                      <div>
                        <p className="font-medium text-neutral-800 dark:text-white">
                          Doctor
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {doctor.name} - {doctor.specialization}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar size={20} className="text-primary-500 mt-1 mr-3" />
                      <div>
                        <p className="font-medium text-neutral-800 dark:text-white">
                          Date
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock size={20} className="text-primary-500 mt-1 mr-3" />
                      <div>
                        <p className="font-medium text-neutral-800 dark:text-white">
                          Time
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {selectedTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                    <Button onClick={handleBooking} fullWidth size="lg">
                      Book Appointment
                    </Button>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mt-4">
                      You can cancel or reschedule up to 24 hours before your appointment.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Appointment"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBooking}>
              Confirm Booking
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            You're about to book an appointment with:
          </p>
          
          <div className="flex items-center p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <img
              src={doctor.photoUrl}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h4 className="font-semibold text-neutral-800 dark:text-white">
                {doctor.name}
              </h4>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                {doctor.specialization}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex">
              <Calendar size={16} className="text-neutral-500 dark:text-neutral-400 mt-0.5 mr-2" />
              <p className="text-neutral-700 dark:text-neutral-300">
                {selectedDate?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
            
            <div className="flex">
              <Clock size={16} className="text-neutral-500 dark:text-neutral-400 mt-0.5 mr-2" />
              <p className="text-neutral-700 dark:text-neutral-300">
                {selectedTime}
              </p>
            </div>
          </div>
        </div>
      </Modal>
      
      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessClose}
        title="Appointment Booked!"
        size="sm"
        footer={
          <Button onClick={handleSuccessClose} fullWidth>
            Go to Dashboard
          </Button>
        }
      >
        <div className="text-center py-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-neutral-800 dark:text-white mb-2">
            Appointment Confirmed
          </h3>
          
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Your appointment with {doctor.name} has been booked successfully.
          </p>
          
          <div className="bg-neutral-50 dark:bg-neutral-700 p-4 rounded-lg text-left">
            <div className="space-y-2">
              <div className="flex">
                <Calendar size={16} className="text-neutral-500 dark:text-neutral-400 mt-0.5 mr-2" />
                <p className="text-neutral-700 dark:text-neutral-300">
                  {selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              
              <div className="flex">
                <Clock size={16} className="text-neutral-500 dark:text-neutral-400 mt-0.5 mr-2" />
                <p className="text-neutral-700 dark:text-neutral-300">
                  {selectedTime}
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-4">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Appointment;