import React, { useState } from 'react';
import { Bookmark, Plus, X } from 'lucide-react';
import { BookmarkItem } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Bookmarks = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkItem[]>('bookmarks', []);
  const [newBookmark, setNewBookmark] = useState({ url: '', title: '' });

  const addBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBookmark.url && newBookmark.title) {
      setBookmarks([
        ...bookmarks,
        { ...newBookmark, id: Date.now().toString() },
      ]);
      setNewBookmark({ url: '', title: '' });
    }
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Bookmark className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold">Bookmarks</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <form onSubmit={addBookmark} className="mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newBookmark.title}
              onChange={(e) => setNewBookmark({ ...newBookmark, title: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <input
              type="url"
              placeholder="URL"
              value={newBookmark.url}
              onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </form>

        <div className="max-h-96 overflow-y-auto">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg mb-2"
              >
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <h3 className="font-semibold">{bookmark.title}</h3>
                  <p className="text-sm text-gray-500">{bookmark.url}</p>
                </a>
                <button
                  onClick={() => removeBookmark(bookmark.id)}
                  className="text-red-500 hover:text-red-600 ml-4"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No bookmarks yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;