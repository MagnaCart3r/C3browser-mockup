export interface HistoryItem {
  url: string;
  title: string;
  timestamp: string;
}

export interface BookmarkItem {
  url: string;
  title: string;
  id: string;
}

export interface Settings {
  theme: 'light' | 'dark';
  searchEngine: 'google' | 'bing';
  notifications: boolean;
}

export interface DownloadItem {
  id: string;
  filename: string;
  url: string;
  timestamp: string;
  size?: string;
  status: 'completed' | 'in-progress' | 'error';
}