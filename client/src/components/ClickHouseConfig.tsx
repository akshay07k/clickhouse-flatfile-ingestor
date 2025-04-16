import React, { useState } from 'react';
import { KeyRound, Server, Database, User } from 'lucide-react';

interface ClickHouseConfigProps {
  onConnect: (config: ClickHouseConnection) => void;
  isLoading?: boolean;
  isConnected: boolean;
}

interface ClickHouseConnection {
  host: string;
  port: string;
  database: string;
  username: string;
  token: string;
}

const ClickHouseConfig: React.FC<ClickHouseConfigProps> = ({ onConnect, isLoading, isConnected }) => {
  const [config, setConfig] = useState<ClickHouseConnection>({
    host: 'localhost',
    port: '8123',
    database: 'default',
    username: 'default',
    token: 'OUdsilhgg843FF3769VCJHEDFT7ESFbkgfisbfsf34JKdsfgAGsj32gfuiO9',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(config);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6">ClickHouse Configuration</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Host
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Server className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="host"
                value={config.host}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
                placeholder="localhost"
                required
                disabled={isConnected}
              />
            </div>
          </div>
          
          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Port
            </label>
            <input
              type="text"
              name="port"
              value={config.port}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
              placeholder="8123"
              required
              disabled={isConnected}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Database
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Database className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="database"
              value={config.database}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
              placeholder="default"
              required
              disabled={isConnected}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="username"
              value={config.username}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
              placeholder="default"
              required
              disabled={isConnected}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            JWT Token
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="token"
              value={config.token}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
              required
              disabled={isConnected}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          } ${isConnected ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : 
          isConnected ? (
            'Connected'
          ) : (
            'Connect'
          )}
        </button>
      </div>
    </form>
  );
}

export default ClickHouseConfig;
