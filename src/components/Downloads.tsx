import React from 'react';
import { Download, File, Folder, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface DownloadItem {
  id: string;
  filename: string;
  url: string;
  timestamp: string;
  size?: string;
  status: 'completed' | 'in-progress' | 'error';
}

const Downloads = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [downloads, setDownloads] = useLocalStorage<DownloadItem[]>('downloads', []);

  const openDownloadsFolder = () => {
    // In a real browser, this would open the system's downloads folder
    console.log('Opening downloads folder');
  };

  const removeDownload = (id: string) => {
    setDownloads(downloads.filter(download => download.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Download className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold">Downloads</h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={openDownloadsFolder}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <Folder className="h-5 w-5" />
              Open Downloads Folder
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
          {downloads.length > 0 ? (
            downloads.map((download) => (
              <div
                key={download.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg mb-2"
              >
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-semibold">{download.filename}</h3>
                    <p className="text-sm text-gray-500">
                      {download.size && `${download.size} • `}
                      {new Date(download.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeDownload(download.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No downloads yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Downloads;