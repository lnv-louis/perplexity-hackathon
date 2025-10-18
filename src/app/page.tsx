'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    "Ask about neighborhood safety...",
    "Compare housing prices...",
    "Find student-friendly areas...",
    "Check transport links...",
    "Explore local amenities...",
  ];

  useEffect(() => {
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];

      if (!isDeleting && charIndex <= currentPhrase.length) {
        setPlaceholder(currentPhrase.substring(0, charIndex));
        charIndex++;
        timeout = setTimeout(type, 100);
      } else if (!isDeleting && charIndex > currentPhrase.length) {
        timeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2000);
      } else if (isDeleting && charIndex >= 0) {
        setPlaceholder(currentPhrase.substring(0, charIndex));
        charIndex--;
        timeout = setTimeout(type, 50);
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        charIndex = 0;
        timeout = setTimeout(type, 500);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [currentPhraseIndex]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/housing?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <span className="text-gray-900 text-4xl font-bold" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>Homiq</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/contact">
            <button className="text-gray-700 hover:text-green-700 transition-colors text-base font-medium">
              Contact Us
            </button>
          </Link>
          <Link href="/login">
            <button className="text-gray-700 hover:text-green-700 transition-colors text-base font-medium">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Ask anything,
            <br />
            <span className="text-green-700">
              get neighborhood intelligence
            </span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full shadow-lg p-2">
            <input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-0 focus:outline-none focus:ring-0 bg-transparent px-4 text-sm"
            />
            <Button
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 h-10"
            >
              Search
            </Button>
          </div>
        </div>

        {/* CTA */}
        <Link href="/housing?welcome=true">
          <Button className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 text-lg rounded-xl font-medium shadow-lg">
            Get Started →
          </Button>
        </Link>
      </div>
    </div>
  );
}
