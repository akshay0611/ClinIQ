import React from 'react';
import Hero from '../components/home/Hero';
import FeaturesSection from '../components/home/FeaturesSection';
import StepByStepProcess from '../components/home/StepByStepProcess';
import UserReviewsCarousel from '../components/home/UserReviewsCarousel';
import FeatureComparison from '../components/home/FeatureComparison';
import TrustSection from '../components/home/TrustSection';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <StepByStepProcess />
      <UserReviewsCarousel />
      <FeatureComparison />
      <TrustSection />
    </div>
  );
};

export default Home;