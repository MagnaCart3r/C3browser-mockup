import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { HistoryItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const History = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('browserHistory', []);

  const clearHistory = () => {
    setHistory([]);
  };

  const getLastSevenDays = () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return history.filter(item => new Date(item.timestamp) > sevenDaysAgo);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold">Browsing History</h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-5 w-5" />
              Clear History
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {getLastSevenDays().length > 0 ? (
            getLastSevenDays().map((item, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg mb-2"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.url}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No history found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;