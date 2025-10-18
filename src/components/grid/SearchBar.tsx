'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const SUGGESTED_QUERIES = [
  "Ask Homiq to find affordable houses in Bloomsbury...",
  "Ask Homiq to compare different flats in Camden...",
  "Ask Homiq about safe neighborhoods near universities...",
  "Ask Homiq to find student housing with good transport...",
  "Ask Homiq about family-friendly areas with schools...",
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typing animation effect
  useEffect(() => {
    const currentSuggestion = SUGGESTED_QUERIES[currentSuggestionIndex];
    
    const typeSpeed = isDeleting ? 30 : 80;
    const pauseAtEnd = 2000;
    const pauseAtStart = 500;

    if (!isDeleting && charIndex < currentSuggestion.length) {
      timeoutRef.current = setTimeout(() => {
        setPlaceholder(currentSuggestion.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typeSpeed);
    } else if (isDeleting && charIndex > 0) {
      timeoutRef.current = setTimeout(() => {
        setPlaceholder(currentSuggestion.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typeSpeed);
    } else if (!isDeleting && charIndex === currentSuggestion.length) {
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAtEnd);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      timeoutRef.current = setTimeout(() => {
        setCurrentSuggestionIndex((currentSuggestionIndex + 1) % SUGGESTED_QUERIES.length);
      }, pauseAtStart);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [charIndex, isDeleting, currentSuggestionIndex]);

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg p-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSearching}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent px-4 shadow-none"
        />
        <Button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 h-10 shadow-none"
        >
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
