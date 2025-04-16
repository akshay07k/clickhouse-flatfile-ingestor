import React from 'react';
import { Table } from 'lucide-react';

interface TableSelectorProps {
  tables: string[];
  selectedTable: string;
  onTableSelect: (table: string) => void;
  isLoading?: boolean;
}

const TableSelector: React.FC<TableSelectorProps> = ({ tables, selectedTable, onTableSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-h-100 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-6">Select Table</h2>
      
      {tables.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Table className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No tables available</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tables.map((table) => (
            <button
              key={table}
              onClick={() => onTableSelect(table)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                selectedTable === table
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <Table className="h-5 w-5 mr-3 text-gray-400" />
                <span className="font-medium">{table}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TableSelector;
