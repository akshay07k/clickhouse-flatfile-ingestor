import React from 'react';
import { Eye } from 'lucide-react';

interface DataPreviewProps {
  data: any[];
  columns: string[];
  isLoading?: boolean;
  onRefresh?: () => void;
}

const DataPreview: React.FC<DataPreviewProps> = ({ data, columns, isLoading, onRefresh }) => {
  console.log(columns);
  
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="border rounded-lg overflow-y-auto">
          <div className="bg-gray-200 h-10"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-100"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-h-150  overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Data Preview</h2>
        
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <Eye className="h-4 w-4 mr-1" />
            Refresh Preview
          </button>
        )}
      </div>

      <div className="border rounded-lg overflow-y-auto max-h-72">
        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Eye className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No preview data available</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {data.length > 0 && (
        <p className="mt-4 text-sm text-gray-500">
          Showing {data.length} records
        </p>
      )}
    </div>
  );
}

export default DataPreview;
