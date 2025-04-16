import React from 'react';
import { Database } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Database className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-semibold">DataFlow</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
