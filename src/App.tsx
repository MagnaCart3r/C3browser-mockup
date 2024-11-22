import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NewsSection from './components/NewsSection';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to C3Browser</h1>
            <p className="text-blue-200">Your gateway to seamless browsing and Nigerian news</p>
          </div>
          <SearchBar />
          <NewsSection />
        </div>
      </main>
    </div>
  );
}

export default App;