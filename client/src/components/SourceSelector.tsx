import React from 'react';
import { Database, FileSpreadsheet } from 'lucide-react';

type Source = 'clickhouse' | 'flatfile';

interface SourceSelectorProps {
  sourceType: Source;
  targetType: Source;
  onSourceChange: (type: Source) => void;
  onTargetChange: (type: Source) => void;
}

const SourceSelector: React.FC<SourceSelectorProps> = ({ sourceType, targetType, onSourceChange, onTargetChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">Data Transfer Configuration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Source</h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                onSourceChange('clickhouse')
                onTargetChange('flatfile')
              }}
              className={`w-full flex items-center p-4 rounded-lg border transition-colors ${
                sourceType === 'clickhouse'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Database className="w-5 h-5 mr-3" />
              <span>ClickHouse Database</span>
            </button>
            
            <button
              onClick={() => {
                onSourceChange('flatfile')
                onTargetChange('clickhouse')
              }}
              className={`w-full flex items-center p-4 rounded-lg border transition-colors ${
                sourceType === 'flatfile'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 mr-3" />
              <span>Flat File (CSV)</span>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Target</h3>
          <div className="space-y-3">
            <button
              onClick={() => {
                onTargetChange('clickhouse')
                onSourceChange('flatfile')
              }}
              className={`w-full flex items-center p-4 rounded-lg border transition-colors ${
                targetType === 'clickhouse'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Database className="w-5 h-5 mr-3" />
              <span>ClickHouse Database</span>
            </button>
            
            <button
              onClick={() => {
                onTargetChange('flatfile')
                onSourceChange('clickhouse')
              }}
              className={`w-full flex items-center p-4 rounded-lg border transition-colors ${
                targetType === 'flatfile'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 mr-3" />
              <span>Flat File (CSV)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SourceSelector;
