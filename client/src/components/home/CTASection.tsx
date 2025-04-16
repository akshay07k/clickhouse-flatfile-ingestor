import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your data workflow?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Start using our tool today and experience seamless data integration between ClickHouse and flat files.
          </p>
          <Link
          to={"/get-started"}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center">
            Get Started Now <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
