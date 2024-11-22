import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Settings as SettingsType } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Settings = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [settings, setSettings] = useLocalStorage<SettingsType>('settings', {
    theme: 'light',
    searchEngine: 'google',
    notifications: true,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value as 'light' | 'dark' })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Search Engine</label>
            <select
              value={settings.searchEngine}
              onChange={(e) => setSettings({ ...settings, searchEngine: e.target.value as 'google' | 'bing' })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="google">Google</option>
              <option value="bing">Bing</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm font-medium">Enable Notifications</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;