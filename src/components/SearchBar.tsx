import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { HistoryItem } from '../types';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('browserHistory', []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
      
      // Add to history
      const historyItem: HistoryItem = {
        url: searchUrl,
        title: `Search: ${searchQuery}`,
        timestamp: new Date().toISOString(),
      };
      setHistory([historyItem, ...history]);

      window.open(searchUrl, '_blank');
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search with Google..."
          className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/90 backdrop-blur-sm"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
    </form>
  );
};

export default SearchBar;