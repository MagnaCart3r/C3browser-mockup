import React, { useState } from 'react';
import { Globe, Download } from 'lucide-react';
import History from './History';
import Bookmarks from './Bookmarks';
import Settings from './Settings';
import Downloads from './Downloads';

const Header = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white shadow-lg">
        <div className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-blue-300" />
          <h1 className="text-2xl font-bold">C3Browser</h1>
        </div>
        <nav className="flex gap-6">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="text-blue-200 hover:text-white transition-colors"
          >
            Settings
          </button>
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="text-blue-200 hover:text-white transition-colors"
          >
            History
          </button>
          <button
            onClick={() => setIsBookmarksOpen(true)}
            className="text-blue-200 hover:text-white transition-colors"
          >
            Bookmarks
          </button>
          <button
            onClick={() => setIsDownloadsOpen(true)}
            className="text-blue-200 hover:text-white transition-colors flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Downloads
          </button>
        </nav>
      </header>

      <History isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      <Bookmarks isOpen={isBookmarksOpen} onClose={() => setIsBookmarksOpen(false)} />
      <Settings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <Downloads isOpen={isDownloadsOpen} onClose={() => setIsDownloadsOpen(false)} />
    </>
  );
};

export default Header;