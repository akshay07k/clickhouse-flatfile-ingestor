import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  SourceSelector,
  ClickHouseConfig,
  FlatFileUpload,
  TableSelector,
  ColumnSelector,
  IngestionTrigger,
  StatusDisplay,
  DataPreview
} from "../components";
import { FileConfig } from '../components/FlatFileUpload';

type Source = 'clickhouse' | 'flatfile';

interface Status {
  type: 'success' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

interface Column {
  name: string;
  type: string;
}

interface State {
  sourceType: Source;
  targetType: Source;
  statusMessages: Status[];
  isConnected: boolean;
  tables: string[];
  selectedTable: string;
  columns: Column[];
  selectedColumns: string[];
  loading: {
    tables: boolean;
    columns: boolean;
    data: boolean;
  };
  tableData: any[];
}

const initialState: State = {
  sourceType: 'clickhouse',
  targetType: 'flatfile',
  statusMessages: [],
  isConnected: false,
  tables: [],
  selectedTable: '',
  columns: [],
  selectedColumns: [],
  loading: {
    tables: false,
    columns: false,
    data: false,
  },
  tableData: [],
};

const reducer = (state: State, action: any): State => {
  switch (action.type) {
    case 'SET_SOURCE_TYPE':
      return { ...state, sourceType: action.payload };

    case 'SET_TARGET_TYPE':
      return { ...state, targetType: action.payload };

    case 'ADD_STATUS':
      return {
        ...state,
        statusMessages: [
          { type: action.payload.type, message: action.payload.message, timestamp: new Date() },
          ...state.statusMessages,
        ],
      };

    case 'SET_CONNECTION_STATUS':
      return { ...state, isConnected: action.payload };

    case 'SET_TABLES':
      return { ...state, tables: action.payload, loading: { ...state.loading, tables: false } };

    case 'SET_SELECTED_TABLE':
      return { ...state, selectedTable: action.payload };

    case 'SET_COLUMNS':
      return {
        ...state,
        columns: action.payload,
        selectedColumns: action.payload.map((c: Column) => c.name),
        loading: { ...state.loading, columns: false },
      };

    case 'SET_TABLE_DATA':
      return { ...state, tableData: action.payload, loading: { ...state.loading, data: false } };

    case 'TOGGLE_COLUMN_SELECTION':
      return {
        ...state,
        selectedColumns: state.selectedColumns.includes(action.payload)
          ? state.selectedColumns.filter((col) => col !== action.payload)
          : [...state.selectedColumns, action.payload],
      };

    case 'SET_LOADING':
      return { ...state, loading: { ...state.loading, [action.payload]: true } };

    default:
      return state;
  }
};

axios.defaults.withCredentials = true;

const Ingestion: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTables = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: 'tables' });
        const res = await axios.get('http://localhost:3000/api/clickhouse/tables');
        const tableNames = res.data.map((t: { name: string }) => t.name);
        dispatch({ type: 'SET_TABLES', payload: tableNames });
      } catch (err: any) {
        dispatch({ type: 'ADD_STATUS', payload: { type: 'error', message: 'Failed to fetch tables' } });
      }
    };

    if (state.isConnected && state.sourceType === 'clickhouse') {
      fetchTables();
    }
  }, [state.isConnected, state.sourceType]);

  const handleClickHouseConnect = async (config: any) => {
    try {
      dispatch({ type: 'ADD_STATUS', payload: { type: 'info', message: 'Connecting to ClickHouse...' } });
      const res = await axios.post('http://localhost:3000/api/clickhouse/connect-clickhouse', config);
      if (res.data.success) {
        dispatch({ type: 'SET_CONNECTION_STATUS', payload: true });
        dispatch({ type: 'ADD_STATUS', payload: { type: 'success', message: 'Connected to ClickHouse' } });
      }
    } catch (err: any) {
      dispatch({ type: 'ADD_STATUS', payload: { type: 'error', message: `Connection failed: ${err.message}` } });
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: false });
    }
  };

  const fetchColumns = async (table: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: 'columns' });
      const res = await axios.get(`http://localhost:3000/api/clickhouse/tables/${table}?columns`);
      dispatch({ type: 'SET_COLUMNS', payload: res.data });
    } catch (err: any) {
      dispatch({ type: 'ADD_STATUS', payload: { type: 'error', message: `Failed to fetch columns: ${err.message}` } });
    }
  };

  const fetchTableData = async (table: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: 'data' });
      const res = await axios.get(`http://localhost:3000/api/clickhouse/tables/${table}/preview`);
      dispatch({ type: 'SET_TABLE_DATA', payload: res.data });
    } catch (err: any) {
      dispatch({ type: 'ADD_STATUS', payload: { type: 'error', message: `Failed to fetch table data: ${err.message}` } });
    }
  };

  const handleTableSelect = (table: string) => {
    dispatch({ type: 'SET_SELECTED_TABLE', payload: table });
    fetchColumns(table);
    fetchTableData(table);
    dispatch({ type: 'ADD_STATUS', payload: { type: 'info', message: `Selected table: ${table}` } });
  };

  const handleColumnToggle = (columnName: string) => {
    dispatch({ type: 'TOGGLE_COLUMN_SELECTION', payload: columnName });
  };

  const handleFileUpload = async (file: File, config: FileConfig) => {
    try {
      dispatch({
        type: 'ADD_STATUS',
        payload: { type: 'info', message: `Uploading file: ${file.name}` },
      });
  
      const formData = new FormData();
      formData.append('csvFile', file);
      formData.append(config.delimiter, config.delimiter);
      formData.append('tableName', config.tableName);
      formData.append('hasHeader', config.hasHeader ? 'true' : 'false');
  
      dispatch({ type: 'SET_LOADING', payload: 'data' });
  
      const res = await axios.post('http://localhost:3000/api/flatfile/upload', formData);
  
      if (res.data?.message === 'Data ingested successfully') {
        const response = await axios.get(`http://localhost:3000/api/clickhouse/tables/${config.tableName}/preview`);
        dispatch({ type: 'SET_TABLE_DATA', payload: response.data });
        dispatch({
          type: 'ADD_STATUS',
          payload: { type: 'success', message: res.data.message },
        });
      } else {
        dispatch({
          type: 'ADD_STATUS',
          payload: { type: 'error', message: 'Data upload succeeded but response was unexpected.' },
        });
      }
    } catch (err: any) {
      dispatch({
        type: 'ADD_STATUS',
        payload: { type: 'error', message: `File upload failed: ${err.message}` },
      });
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Data Ingestion Tool</h1>
        <div className="space-y-8">
          <SourceSelector
            sourceType={state.sourceType}
            targetType={state.targetType}
            onSourceChange={(source) => dispatch({ type: 'SET_SOURCE_TYPE', payload: source })}
            onTargetChange={(target) => dispatch({ type: 'SET_TARGET_TYPE', payload: target })}
          />
          <div className="grid grid-cols-1 gap-8">
            {state.sourceType === 'clickhouse' ? (
              <ClickHouseConfig isConnected={state.isConnected} onConnect={handleClickHouseConnect} />
            ) : (
              <FlatFileUpload onUpload={handleFileUpload} />
            )}
          </div>

          {state.isConnected && state.sourceType === 'clickhouse' && (
            <div className="flex justify-end mb-4">
              <button
                onClick={() => navigate('/join-tables')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
              >
                Join Two Tables
              </button>
            </div>
          )}

          {state.sourceType == 'clickhouse' && (
            <>
              <div className="space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {state.sourceType === 'clickhouse' && (
                  <TableSelector
                    tables={state.tables}
                    selectedTable={state.selectedTable}
                    onTableSelect={handleTableSelect}
                    isLoading={state.loading.tables}
                  />
                )}
                <ColumnSelector
                  columns={state.columns}
                  selectedColumns={state.selectedColumns}
                  onColumnToggle={handleColumnToggle}
                  isLoading={state.loading.columns}
                />
              </div>

              <DataPreview
                data={state.tableData}
                isLoading={state.loading.data}
                columns={state.selectedColumns}
                onRefresh={() =>
                  dispatch({ type: 'ADD_STATUS', payload: { type: 'info', message: 'Refreshing data preview...' } })
                }
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <IngestionTrigger
                  selectedColumns={state.selectedColumns}
                  selectedTable={state.selectedTable}
                  onSuccess={() =>
                    dispatch({ type: 'ADD_STATUS', payload: { type: 'success', message: 'Ingestion completed' } })
                  }
                  onFail={() =>
                    dispatch({ type: 'ADD_STATUS', payload: { type: 'error', message: `Ingestion failed` } })
                  }
                  stats={{ processed: 10, failed: 0 }}
                />
                <StatusDisplay messages={state.statusMessages} />
              </div>
            </>
          )}
          
          {state.sourceType === 'flatfile' && state.tableData.length > 0 && (
            <>
              <DataPreview
                data={state.tableData}
                isLoading={state.loading.data}
                columns={Object.keys(state.tableData[0] || {})}
                onRefresh={() =>
                  dispatch({ type: 'ADD_STATUS', payload: { type: 'info', message: 'Refreshing data preview...' } })
                }
              />
              <StatusDisplay messages={state.statusMessages} />
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Ingestion;
