import React from 'react';
import { Database } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Database className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-semibold text-white">DataFlow</span>
            </div>
            <p className="text-sm">
              Seamless data integration solution for modern businesses.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
              <li><a href="#" className="hover:text-white">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">GitHub</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2025 DataFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
