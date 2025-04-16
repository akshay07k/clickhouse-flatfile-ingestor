import React from 'react'
import { Eye } from 'lucide-react'

interface PreviewResultProps {
  previewResult: string // CSV string
}

const parseCSV = (csv: string) => {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return headers.reduce((obj: Record<string, string>, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {});
  });
};

const PreviewResult: React.FC<PreviewResultProps> = ({ previewResult }) => {
  const parsed = parseCSV(previewResult);
  const columns = parsed.length > 0 ? Object.keys(parsed[0]) : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-h-150 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Data Preview</h2>
        <div className="text-gray-400 text-sm">
          <Eye className="h-4 w-4 inline-block mr-1" />
          {parsed.length > 0 ? `${parsed.length} records` : 'No data'}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {parsed.length === 0 ? (
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
                {parsed.map((row, i) => (
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

      {parsed.length > 0 && (
        <p className="mt-4 text-sm text-gray-500">
          Showing {parsed.length} records
        </p>
      )}
    </div>
  );
};

export default PreviewResult;
