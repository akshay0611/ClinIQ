import React from 'react';
import Hero from '../components/home/Hero';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import TrustSection from '../components/home/TrustSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <TrustSection />
    </div>
  );
};

export default Home;