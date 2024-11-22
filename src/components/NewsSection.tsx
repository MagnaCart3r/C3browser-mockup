import React, { useState, useEffect } from 'react';
import { Newspaper } from 'lucide-react';
import axios from 'axios';

interface NewsItem {
  title: string;
  url: string;
  publishedAt: string;
}

const mockNews = [
  {
    title: "Nigeria's Tech Sector Sees Unprecedented Growth",
    url: "https://example.com/news1",
    publishedAt: new Date().toISOString()
  },
  {
    title: "New Educational Initiatives Launch Across Nigeria",
    url: "https://example.com/news2",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Nigerian Startups Attract Major International Investment",
    url: "https://example.com/news3",
    publishedAt: new Date().toISOString()
  }
];

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>(mockNews);
  const [loading, setLoading] = useState(false);

  // Simulate news updates every 10 seconds
  useEffect(() => {
    const updateNews = () => {
      setLoading(true);
      // In a real application, this would fetch from a news API
      const updatedNews = mockNews.map(item => ({
        ...item,
        title: `${item.title} (Updated: ${new Date().toLocaleTimeString()})`,
        publishedAt: new Date().toISOString()
      }));
      setNews(updatedNews);
      setLoading(false);
    };

    const interval = setInterval(updateNews, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-lg p-6 mt-8 border border-amber-100">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-6 w-6 text-amber-600" />
        <h2 className="text-xl font-bold text-amber-900">Nigeria News Updates</h2>
      </div>
      <div className="space-y-4">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded-lg hover:bg-amber-100/50 transition-colors duration-200"
          >
            <h3 className="text-lg font-semibold text-amber-900 mb-2">{item.title}</h3>
            <p className="text-sm text-amber-700">
              {new Date(item.publishedAt).toLocaleString('en-NG', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}
            </p>
          </a>
        ))}
      </div>
      {loading && (
        <div className="text-center text-amber-600 mt-4">
          Updating news...
        </div>
      )}
    </div>
  );
};

export default NewsSection;