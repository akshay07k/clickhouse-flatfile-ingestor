import React from 'react';
import { Navigation, HeroSection, CTASection, Footer } from '../components';
import { Features, HowItWorks } from '.';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <Features />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
