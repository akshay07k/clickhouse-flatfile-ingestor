import React from 'react';
import { Play, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface IngestionTriggerProps {
  onSuccess: () => void;
  onFail: () => void;
  isLoading?: boolean;
  error?: string;
  stats?: {
    processed: number;
    failed: number;
  };
  selectedColumns: string[];
  selectedTable: string;
}

const IngestionTrigger: React.FC<IngestionTriggerProps> = ({ onSuccess, onFail, isLoading, error, stats, selectedColumns, selectedTable }) => {
  const handleClickhouseToFile = async () => {
    try {
      const selectedColumnsNames = selectedColumns.join(',');
      const response = await axios.get(
        `http://localhost:3000/api/clickhouse/tables/${selectedTable}/export?columns=${selectedColumnsNames}`,
      );

      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedTable}.csv`;
      a.click();
      a.remove();
      onSuccess();
    } catch (err: any) {
      console.log(err);
      onFail();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Data Ingestion</h2>

          {stats && (
            <div className="text-sm">
              <span className="text-green-600">{stats.processed} processed</span>
              {stats.failed > 0 && (
                <span className="text-red-600 ml-3">{stats.failed} failed</span>
              )}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error occurred</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleClickhouseToFile}
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2" />
              Start Ingestion
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default IngestionTrigger;
