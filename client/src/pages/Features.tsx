import React from 'react';
import FeatureCard from '../components/ui/FeatureCard';
import { Database, FileSpreadsheet, Shield, Activity, Layers } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Database}
            title="Bidirectional Data Flow"
            description="Transfer data from ClickHouse to flat files and vice versa with ease."
          />
          <FeatureCard
            icon={FileSpreadsheet}
            title="Schema Discovery"
            description="Auto-detect schemas and choose specific columns for efficient ingestion."
          />
          <FeatureCard
            icon={Shield}
            title="JWT Authentication"
            description="Securely connect to ClickHouse with JWT tokens."
          />
          <FeatureCard
            icon={Activity}
            title="Real-Time Reporting"
            description="View record counts and status updates instantly."
          />
          <FeatureCard
            icon={Layers}
            title="Multi-table Joins"
            description="Combine data from multiple sources with advanced join operations."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
