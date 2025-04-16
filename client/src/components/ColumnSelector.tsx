import React from 'react';
import { Columns } from 'lucide-react';

interface Column {
  name: string;
  type: string;
}

interface ColumnSelectorProps {
  columns: Column[];
  selectedColumns: string[];
  onColumnToggle: (column: string) => void;
  isLoading?: boolean;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ columns, selectedColumns, onColumnToggle, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-h-100 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Select Columns</h2>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => columns.forEach(col => onColumnToggle(col.name))}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Toggle All
          </button>
          <span className="text-sm text-gray-500">
            {selectedColumns.length} of {columns.length} selected
          </span>
        </div>
      </div>
      
      {columns.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Columns className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No columns available</p>
        </div>
      ) : (
        <div className="space-y-2">
          {columns.map((column) => (
            <label
              key={column.name}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedColumns.includes(column.name)}
                onChange={() => onColumnToggle(column.name)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-3 flex-1">
                <span className="block font-medium text-gray-900">
                  {column.name}
                </span>
                <span className="block text-sm text-gray-500">
                  {column.type}
                </span>
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColumnSelector;
