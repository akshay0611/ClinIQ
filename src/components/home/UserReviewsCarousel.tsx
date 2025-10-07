import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  User, 
  MapPin,
  Calendar,
  Heart,
  ThumbsUp,
  MessageCircle,
  Award,
  Shield,
  Clock
} from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Marketing Manager',
    location: 'New York, NY',
    text: 'ClinIQ has been a game-changer for my family. The AI accurately identified my daughter\'s symptoms and connected us with the perfect pediatrician within hours. The peace of mind is priceless.',
    rating: 5,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    date: '2 days ago',
    verified: true,
    helpful: 24,
    condition: 'Pediatric Care',
    response: {
      text: 'Thank you Sarah! We\'re thrilled that ClinIQ could help your family get the care you needed quickly.',
      author: 'ClinIQ Support Team',
      date: '1 day ago'
    }
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    position: 'Cardiologist',
    location: 'San Francisco, CA',
    text: 'As a healthcare provider, I appreciate how ClinIQ helps patients come prepared to appointments. The symptom analysis is surprisingly accurate and helps me provide better care.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    date: '1 week ago',
    verified: true,
    helpful: 18,
    condition: 'Cardiology',
    response: {
      text: 'Dr. Chen, your feedback means the world to us. We\'re committed to supporting both patients and healthcare providers.',
      author: 'ClinIQ Medical Team',
      date: '6 days ago'
    }
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'Software Engineer',
    location: 'Austin, TX',
    text: 'I was skeptical about AI health analysis, but ClinIQ proved me wrong. It caught early signs of a condition that my regular checkup missed. The follow-up care was exceptional.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    date: '3 days ago',
    verified: true,
    helpful: 31,
    condition: 'Preventive Care',
    response: {
      text: 'Emily, we\'re so glad we could help with early detection. Your health is our priority!',
      author: 'ClinIQ Care Team',
      date: '2 days ago'
    }
  },
  {
    id: 4,
    name: 'James Wilson',
    position: 'Retired Teacher',
    location: 'Miami, FL',
    text: 'At 68, I was hesitant about using technology for health. ClinIQ made it so simple and the video consultations saved me from multiple trips to the doctor. Highly recommended!',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    date: '5 days ago',
    verified: true,
    helpful: 19,
    condition: 'Senior Care',
    response: {
      text: 'James, thank you for trusting us with your health. We\'re proud to serve users of all ages!',
      author: 'ClinIQ Support Team',
      date: '4 days ago'
    }
  },
  {
    id: 5,
    name: 'Lisa Park',
    position: 'Working Mother',
    location: 'Seattle, WA',
    text: 'Managing health for my family of 5 was overwhelming until ClinIQ. The family accounts feature and appointment scheduling has made our lives so much easier.',
    rating: 5,
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    date: '1 week ago',
    verified: true,
    helpful: 27,
    condition: 'Family Health',
    response: {
      text: 'Lisa, we\'re honored to be part of your family\'s health journey. Thank you for sharing your experience!',
      author: 'ClinIQ Family Care Team',
      date: '6 days ago'
    }
  },
  {
    id: 6,
    name: 'David Thompson',
    position: 'Business Owner',
    location: 'Chicago, IL',
    text: 'The enterprise features have been perfect for our company\'s health program. Our employees love the convenience and our HR team appreciates the comprehensive analytics.',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    date: '4 days ago',
    verified: true,
    helpful: 15,
    condition: 'Corporate Health',
    response: {
      text: 'David, we\'re thrilled that ClinIQ is supporting your team\'s health and wellness goals!',
      author: 'ClinIQ Enterprise Team',
      date: '3 days ago'
    }
  }
];

const UserReviewsCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % reviews.length);
    setIsAutoPlaying(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute h-64 w-64 rounded-full bg-primary-400/20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            top: '20%',
            left: '15%',
          }}
        />
        <motion.div 
          className="absolute h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{
            bottom: '10%',
            right: '10%',
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:40px_40px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full text-sm font-semibold bg-primary-600/80 text-white backdrop-blur-md">
            User Reviews
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight font-heading">
            What Our Community Says
          </h2>
          <p className="text-lg md:text-xl text-primary-50/90 max-w-3xl mx-auto leading-relaxed">
            Real stories from real users who've experienced the difference ClinIQ makes in their health journey. 
            Join thousands of satisfied users who trust us with their healthcare needs.
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center -ml-5 md:-ml-10 z-10">
            <motion.button
              onClick={prev}
              className="p-3 rounded-full bg-primary-600/80 backdrop-blur-md text-white hover:bg-primary-500 transition-colors duration-200 shadow-lg"
              aria-label="Previous review"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center -mr-5 md:-mr-10 z-10">
            <motion.button
              onClick={next}
              className="p-3 rounded-full bg-primary-600/80 backdrop-blur-md text-white hover:bg-primary-500 transition-colors duration-200 shadow-lg"
              aria-label="Next review"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Review Content */}
          <div className="overflow-hidden px-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-primary-800/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-10 relative border border-primary-600/20"
              >
                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-t-2xl"></div>
                
                {/* Quote Icon */}
                <div className="absolute -top-6 left-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full p-3 shadow-lg">
                  <Quote size={24} className="text-white" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
                  {/* User Info */}
                  <div className="lg:col-span-1">
                    <div className="flex flex-col items-center lg:items-start">
                      {/* Avatar */}
                      <div className="relative mb-4">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 p-1 animate-pulse-slow"></div>
                        <img
                          src={reviews[current].image}
                          alt={reviews[current].name}
                          className="w-20 h-20 rounded-full object-cover border-4 border-primary-900 relative z-10"
                        />
                        {reviews[current].verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center">
                            <Shield size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                      
                      {/* User Details */}
                      <div className="text-center lg:text-left">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {reviews[current].name}
                        </h3>
                        <p className="text-primary-50/80 mb-2">
                          {reviews[current].position}
                        </p>
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-primary-50/70 text-sm mb-3">
                          <MapPin size={14} />
                          {reviews[current].location}
                        </div>
                        
                        {/* Rating */}
                        <div className="flex justify-center lg:justify-start text-accent-300 mb-3">
                          {[...Array(reviews[current].rating)].map((_, i) => (
                            <Star key={i} fill="currentColor" size={16} />
                          ))}
                        </div>
                        
                        {/* Condition */}
                        <div className="inline-flex items-center gap-2 bg-primary-700/50 px-3 py-1 rounded-full text-sm text-primary-50/90 mb-3">
                          <Heart size={14} />
                          {reviews[current].condition}
                        </div>
                        
                        {/* Date */}
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-primary-50/70 text-sm">
                          <Calendar size={14} />
                          {reviews[current].date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="lg:col-span-2">
                    <blockquote className="text-lg md:text-xl text-primary-50 mb-6 leading-relaxed">
                      "{reviews[current].text}"
                    </blockquote>
                    
                    {/* Helpful Count */}
                    <div className="flex items-center gap-2 mb-6">
                      <button className="flex items-center gap-2 text-primary-50/70 hover:text-accent-300 transition-colors duration-200">
                        <ThumbsUp size={16} />
                        <span className="text-sm">{reviews[current].helpful} found this helpful</span>
                      </button>
                    </div>

                    {/* Response */}
                    {reviews[current].response && (
                      <div className="bg-primary-700/50 rounded-xl p-4 border border-primary-600/30">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageCircle size={16} className="text-accent-300" />
                          <span className="text-sm font-medium text-accent-300">Response from {reviews[current].response.author}</span>
                        </div>
                        <p className="text-primary-50/90 text-sm leading-relaxed mb-2">
                          {reviews[current].response.text}
                        </p>
                        <div className="flex items-center gap-2 text-primary-50/70 text-xs">
                          <Clock size={12} />
                          {reviews[current].response.date}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <motion.div 
            className="flex justify-center mt-8 space-x-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                  current === index 
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 w-16' 
                    : 'bg-primary-400/50'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-300 mb-2 font-heading">4.9/5</div>
            <div className="text-sm text-primary-50/80 font-medium">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent-300 mb-2 font-heading">50k+</div>
            <div className="text-sm text-primary-50/80 font-medium">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary-300 mb-2 font-heading">98%</div>
            <div className="text-sm text-primary-50/80 font-medium">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-300 mb-2 font-heading">24/7</div>
            <div className="text-sm text-primary-50/80 font-medium">Support Available</div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-primary-800/50 backdrop-blur-md rounded-2xl p-8 border border-primary-600/30">
            <h3 className="text-2xl font-bold text-white mb-4 font-heading">
              Ready to Join Our Community?
            </h3>
            <p className="text-primary-50/90 mb-6 max-w-2xl mx-auto">
              Experience the same level of care and support that our users rave about. Start your health journey with ClinIQ today.
            </p>
            <motion.button
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Award className="mr-2 h-4 w-4" />
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UserReviewsCarousel;
