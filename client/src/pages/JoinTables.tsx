import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PreviewResult from '../components/PreviewResult';

const JoinTables: React.FC = () => {
  // State for available tables.
  const [tables, setTables] = useState<string[]>([]);

  // Table 1 states.
  const [table1, setTable1] = useState('');
  const [columns1, setColumns1] = useState<string[]>([]);
  const [selectedColumns1, setSelectedColumns1] = useState<string[]>([]);

  // Table 2 states.
  const [table2, setTable2] = useState('');
  const [columns2, setColumns2] = useState<string[]>([]);
  const [selectedColumns2, setSelectedColumns2] = useState<string[]>([]);

  // Shared join key state.
  const [joinKey, setJoinKey] = useState('');

  // Loading and preview result state.
  const [loading, setLoading] = useState(false);
  const [previewResult, setPreviewResult] = useState<string>('');

  // Fetch available tables on mount.
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/clickhouse/tables');
        const tableNames = res.data.map((t: { name: string }) => t.name);
        setTables(tableNames);
      } catch (err) {
        console.error("Error fetching tables:", err);
      }
    };
    fetchTables();
  }, []);

  // Fetch columns for Table 1
  useEffect(() => {
    if (!table1) {
      setColumns1([]);
      setSelectedColumns1([]);
      return;
    }
    const fetchColumnsForTable1 = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clickhouse/tables/${table1}?columns`);
        const cols = res.data.map((col: { name: string }) => col.name);
        setColumns1(cols);
        // Select all columns by default.
        setSelectedColumns1(cols);
      } catch (err) {
        console.error(`Error fetching columns for ${table1}:`, err);
      }
    };
    fetchColumnsForTable1();
  }, [table1]);

  // Fetch columns for Table 2
  useEffect(() => {
    if (!table2) {
      setColumns2([]);
      setSelectedColumns2([]);
      return;
    }
    const fetchColumnsForTable2 = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clickhouse/tables/${table2}?columns`);
        const cols = res.data.map((col: { name: string }) => col.name);
        setColumns2(cols);
        // Select all columns by default.
        setSelectedColumns2(cols);
      } catch (err) {
        console.error(`Error fetching columns for ${table2}:`, err);
      }
    };
    fetchColumnsForTable2();
  }, [table2]);

  // Toggle column selection helper for Table 1
  const toggleColumn1 = (col: string) => {
    if (selectedColumns1.includes(col)) {
      setSelectedColumns1(selectedColumns1.filter(c => c !== col));
    } else {
      setSelectedColumns1([...selectedColumns1, col]);
    }
  };

  // Toggle column selection helper for Table 2
  const toggleColumn2 = (col: string) => {
    if (selectedColumns2.includes(col)) {
      setSelectedColumns2(selectedColumns2.filter(c => c !== col));
    } else {
      setSelectedColumns2([...selectedColumns2, col]);
    }
  };

  // Preview join result. (Assumes backend endpoint "/api/clickhouse/join/export")
  const handlePreview = async () => {
    if (!table1 || !table2 || !joinKey) {
      console.log("Please select both tables and specify a join key.");
      return;
    }
    setLoading(true);
    try {
      // Combine columns with table prefixes.
      const joinedColumns = [
        ...selectedColumns1.map(col => `${table1}.${col}`),
        ...selectedColumns2.map(col => `${table2}.${col}`)
      ];
      const res = await axios.post('http://localhost:3000/api/clickhouse/join/export', {
        tables: [table1, table2],
        joinKey,
        columns: joinedColumns,
      });
      console.log("Preview result:", res.data);

      setPreviewResult(res.data);
    } catch (err: any) {
      console.error("Preview join failed:", err);
      // alert("Preview failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Export join result as CSV. (Assumes backend endpoint "/api/clickhouse/join/export")
  const handleExport = async () => {
    if (!table1 || !table2 || !joinKey) {
      console.log("Please select both tables and specify a join key.");
      return;
    }
    setLoading(true);
    try {
      const joinedColumns = [
        ...selectedColumns1.map(col => `${table1}.${col}`),
        ...selectedColumns2.map(col => `${table2}.${col}`)
      ];
      const res = await axios.post('http://localhost:3000/api/clickhouse/join/export', {
        tables: [table1, table2],
        joinKey,
        columns: joinedColumns,
      }, { responseType: 'blob' });
      const blob = new Blob([res.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'joined_tables.csv';
      a.click();
      a.remove();
    } catch (err: any) {
      console.error("Export join failed:", err);
      // alert("Export failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Join Two Tables</h1>
        <div className="space-y-8">
          {/* Blocks for Table 1 and Table 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Table 1 Block */}
            <div className="p-6 bg-white rounded-md shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Table 1</h2>
              <label className="block text-sm font-medium text-gray-700">Select Table</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                value={table1}
                onChange={(e) => setTable1(e.target.value)}
              >
                <option value="">Select Table 1</option>
                {tables.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Select Columns</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {columns1.map((col) => (
                    <label key={col} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedColumns1.includes(col)}
                        onChange={() => toggleColumn1(col)}
                      />
                      <span>{col}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Table 2 Block */}
            <div className="p-6 bg-white rounded-md shadow-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Table 2</h2>
              <label className="block text-sm font-medium text-gray-700">Select Table</label>
              <select
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
                value={table2}
                onChange={(e) => setTable2(e.target.value)}
              >
                <option value="">Select Table 2</option>
                {tables.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Select Columns</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {columns2.map((col) => (
                    <label key={col} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedColumns2.includes(col)}
                        onChange={() => toggleColumn2(col)}
                      />
                      <span>{col}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Join Key Input */}
          <div className="mt-4 bg-white p-4 py-6 rounded-md">
            <label className="block text-sm font-medium text-gray-700">Join Key (Common column for both tables)</label>
            <input
              type="text"
              placeholder="e.g., id"
              value={joinKey}
              onChange={(e) => setJoinKey(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          {/* Preview and Export Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              onClick={handlePreview}
              disabled={loading || !table1 || !table2 || !joinKey}
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 transition"
            >
              {loading ? "Loading Preview..." : "Preview Join Result"}
            </button>
            <button
              onClick={handleExport}
              disabled={loading || !table1 || !table2 || !joinKey}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition"
            >
              {loading ? "Processing..." : "Export CSV"}
            </button>
          </div>

          {/* Preview Result */}
          {previewResult.length > 0 ? (
            <PreviewResult  previewResult = {previewResult}/>
          ) : (
            <p className="text-sm text-gray-500">No preview data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinTables;
