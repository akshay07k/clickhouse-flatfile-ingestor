import React from 'react';
import StepCard from '../components/ui/StepCard';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="space-y-8">
          <StepCard
            number="1"
            title="Connect Your Sources"
            description="Use our secure connectors to add ClickHouse and flat file sources."
          />
          <StepCard
            number="2"
            title="Configure Your Workflow"
            description="Define transformations, schema mappings, and export settings."
          />
          <StepCard
            number="3"
            title="Ingest & Export Data"
            description="Run the pipeline and monitor real-time progress."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
