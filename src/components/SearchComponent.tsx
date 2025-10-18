'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

export default function SearchComponent() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    
    // Navigate to housing page with query parameter
    router.push(`/housing?q=${encodeURIComponent(query)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <img src="/next.svg" alt="Logo" className="h-8 w-auto invert" />
          <span className="text-white text-xl font-semibold">HOUSE.AI</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Ask anything,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              get instant answers
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Powered by AI to give you comprehensive, accurate answers to any question
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-3xl relative">
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
            <Input
              type="text"
              placeholder="Ask anything..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-transparent border-0 text-white placeholder:text-slate-400 text-lg py-6 px-6 pr-24 focus:ring-0 focus:outline-none"
              disabled={loading}
            />
            <Button 
              onClick={handleSearch} 
              disabled={loading || !query.trim()}
              className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 px-6 rounded-xl"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </div>

        {/* Example queries */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {['What is quantum computing?', 'Latest AI developments', 'Climate change solutions'].map((example) => (
            <button
              key={example}
              onClick={() => setQuery(example)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-slate-300 hover:text-white transition-all border border-white/10 hover:border-white/30"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}