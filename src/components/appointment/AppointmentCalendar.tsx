import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Button from '../common/Button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AppointmentCalendarProps {
  doctorAvailability: string[];
  onDateTimeSelect: (date: Date, time: string) => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ 
  doctorAvailability,
  onDateTimeSelect 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  // Convert doctorAvailability strings to day indices (0 = Sunday, 1 = Monday, etc.)
  const availableDaysIndices = doctorAvailability.map(day => {
    const daysMap: { [key: string]: number } = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };
    return daysMap[day];
  });

  // Time slots
  const morningSlots = ['9:00 AM', '10:00 AM', '11:00 AM'];
  const afternoonSlots = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  // Check if a date is available
  const isDateAvailable = (date: Date) => {
    return availableDaysIndices.includes(date.getDay());
  };

  // Custom tile content
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      return isDateAvailable(date) ? (
        <div className="h-1 w-1 bg-green-500 rounded-full mx-auto mt-1"></div>
      ) : null;
    }
    return null;
  };

  // Custom tile className
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      let classes = '';
      
      // Today's date
      const today = new Date();
      if (date.toDateString() === today.toDateString()) {
        classes += 'bg-primary-100 dark:bg-primary-900/30 ';
      }
      
      // Available dates
      if (isDateAvailable(date)) {
        classes += 'text-neutral-800 dark:text-white hover:bg-primary-200 dark:hover:bg-primary-800/30 ';
      } else {
        classes += 'text-neutral-400 dark:text-neutral-600 cursor-not-allowed ';
      }
      
      // Selected date
      if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
        classes += 'bg-primary-500 text-white !important ';
      }
      
      return classes;
    }
    return '';
  };

  // Show a toast if unavailable date is clicked
  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date)) {
      setSelectedDate(date);
      setSelectedTime(null);
    } else {
      toast.error('This date is not available for appointments.');
    }
  };

  // Simulate booking with loading and confirmation
  const handleTimeSelect = async (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      setBooking(true);
      setSuccess(false);
      setTimeout(() => {
        setBooking(false);
        setSuccess(true);
        onDateTimeSelect(selectedDate, time);
        toast.success('Appointment booked!');
      }, 1200);
    }
  };

  // Customize calendar navigation
  const navigationLabel = ({ date }: { date: Date }) => {
    return (
      <span className="text-lg font-semibold text-neutral-800 dark:text-white">
        {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-card p-6 w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <CalendarIcon size={32} className="text-blue-500" aria-hidden="true" />
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-white">Book an Appointment</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <div className="calendar-container">
          <Calendar
            onChange={handleDateSelect as any}
            value={selectedDate}
            tileContent={({ date, view }) => (
              <span title={isDateAvailable(date) ? 'Available' : 'Unavailable'}>
                {tileContent({ date, view })}
              </span>
            )}
            tileClassName={tileClassName}
            tileDisabled={({ date }) => !isDateAvailable(date)}
            minDate={new Date()}
            navigationLabel={navigationLabel}
            nextLabel={<ChevronRight size={20} />}
            prevLabel={<ChevronLeft size={20} />}
            className="custom-calendar"
            aria-label="Doctor appointment calendar"
          />
        </div>
        {/* Time Selection Section */}
        <div>
          <AnimatePresence>
            {booking && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full gap-2"
              >
                <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
                <span className="text-blue-500 font-medium">Booking appointment...</span>
              </motion.div>
            )}
            {success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full gap-2"
              >
                <CheckCircle2 className="text-green-500 w-10 h-10" />
                <span className="text-green-600 font-semibold">Appointment booked!</span>
                <Button className="mt-2" onClick={() => { setSuccess(false); setSelectedDate(null); setSelectedTime(null); }}>Book Another</Button>
              </motion.div>
            )}
            {!booking && !success && (
              selectedDate ? (
                <motion.div
                  key="times"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-medium text-neutral-800 dark:text-white mb-4">
                    Available Times for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h4>
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Morning</h5>
                    <div className="grid grid-cols-3 gap-2">
                      {morningSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => handleTimeSelect(time)}
                          aria-label={`Book ${time} appointment`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Afternoon</h5>
                    <div className="grid grid-cols-3 gap-2">
                      {afternoonSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => handleTimeSelect(time)}
                          aria-label={`Book ${time} appointment`}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-neutral-600 dark:text-neutral-400">Please select a date to view available time slots</p>
                </div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
      <style jsx="true">{`
        .custom-calendar {
          border: none;
          border-radius: 0.5rem;
          width: 100%;
          padding: 0.5rem;
          background-color: transparent;
        }
        .react-calendar__tile {
          padding: 10px;
          border-radius: 0.375rem;
          font-weight: 500;
        }
        .react-calendar__navigation button {
          border-radius: 0.375rem;
          color: var(--text-color);
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: rgba(59, 130, 246, 0.1);
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: rgba(59, 130, 246, 0.1);
        }
        .react-calendar__tile--active {
          background-color: #0891B2 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default AppointmentCalendar;