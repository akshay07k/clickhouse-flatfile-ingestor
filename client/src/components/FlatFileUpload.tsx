import React, { useState } from 'react';
import { Upload, Settings } from 'lucide-react';

interface FlatFileUploadProps {
  onUpload: (file: File, config: FileConfig) => void;
  isLoading?: boolean;
}

export interface FileConfig {
  delimiter: string;
  tableName: string;
  hasHeader: boolean;
}

const FlatFileUpload: React.FC<FlatFileUploadProps> = ({ onUpload, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [config, setConfig] = useState<FileConfig>({
    delimiter: ',',
    tableName: '',
    hasHeader: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Auto-set table name from file name
      const fileName = e.target.files[0].name.replace('.csv', '').replace(/[^a-zA-Z0-9]/g, '_');
      setConfig(prev => ({ ...prev, tableName: fileName }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onUpload(file, config);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">CSV File Upload</h2>
      
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400" />
            <div className="mt-4 text-center">
              <label className="cursor-pointer">
                <span className="mt-2 text-base leading-normal px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Select CSV File
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {file && (
              <div className="mt-4 text-sm text-gray-600">
                Selected: {file.name}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 text-gray-400 mr-2" />
            <h3 className="text-lg font-medium">File Configuration</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delimiter
              </label>
              <input
                type="text"
                value={config.delimiter}
                onChange={(e) => setConfig(prev => ({ ...prev, delimiter: e.target.value }))}
                className="block w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                // maxLength={1}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Table Name
              </label>
              <input
                type="text"
                value={config.tableName}
                onChange={(e) => setConfig(prev => ({ ...prev, tableName: e.target.value }))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="my_table"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="hasHeader"
                checked={config.hasHeader}
                onChange={(e) => setConfig(prev => ({ ...prev, hasHeader: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="hasHeader" className="ml-2 block text-sm text-gray-700">
                File has header row
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            (!file || isLoading) ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Upload File'
          )}
        </button>
      </div>
    </form>
  );
}

export default FlatFileUpload;
