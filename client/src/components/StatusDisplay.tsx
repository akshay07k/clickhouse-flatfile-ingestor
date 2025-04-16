import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface Status {
  type: 'success' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

interface StatusDisplayProps {
  messages: Status[];
}

const StatusDisplay: React.FC<StatusDisplayProps> = ({ messages }) => {
  const getIcon = (type: Status['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-blue-400" />;
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-h-60 overflow-y-auto ">
      <h2 className="text-xl font-semibold mb-6">Status Log</h2>
      
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No status messages yet</p>
          </div>
        ) : (
          messages.map((status, index) => (
            <div
              key={index}
              className={`flex items-start p-4 rounded-lg ${
                status.type === 'error'
                  ? 'bg-red-50'
                  : status.type === 'success'
                  ? 'bg-green-50'
                  : 'bg-blue-50'
              }`}
            >
              <div className="flex-shrink-0">
                {getIcon(status.type)}
              </div>
              <div className="ml-3 flex-1">
                <p className={`text-sm ${
                  status.type === 'error'
                    ? 'text-red-700'
                    : status.type === 'success'
                    ? 'text-green-700'
                    : 'text-blue-700'
                }`}>
                  {status.message}
                </p>
              </div>
              <div className="ml-3 flex-shrink-0">
                <span className="text-xs text-gray-500">
                  {getTimeAgo(status.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StatusDisplay;
