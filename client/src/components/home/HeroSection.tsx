import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="pt-16">
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Seamless Data Ingestion—Bidirectional Integration
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Connect, transform, and transfer your data effortlessly.
            </p>
            <Link
            to={"/get-started"}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </div>
    </div>
  );
};

export default HeroSection;
