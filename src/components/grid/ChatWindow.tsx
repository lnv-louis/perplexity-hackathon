'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onSearchComplete?: (widgets: any[]) => void; // Callback to update parent with new widgets
}

export default function ChatWindow({ isOpen, onClose, initialQuery, onSearchComplete }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize chat based on context
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      setHasInitialized(true);
      
      if (initialQuery) {
        // User came from homepage with a query - this is handled by GridPage's handleSearch
        // Just show the loading state, GridPage will trigger the API call
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: initialQuery,
          timestamp: new Date(),
        };
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '🔍 I\'m analyzing your query and researching with Perplexity AI. This may take a moment as I gather comprehensive information...',
          timestamp: new Date(),
        };
        
        setMessages([userMessage, assistantMessage]);
        // Note: GridPage's handleSearch will update the widgets, 
        // and we'll show completion when that's done
      } else {
        // User clicked "Get Started" - show welcome message
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          role: 'assistant',
          content: '👋 Hey! How can I help you find the perfect place to live? You can ask me about neighborhoods, housing prices, safety, amenities, or anything else about living in a specific area.',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [isOpen, initialQuery, hasInitialized]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input + (selectedFile ? ` [Attached: ${selectedFile.name}]` : ''),
      timestamp: new Date(),
    };

    const queryText = input;
    const isFollowUpQuery = messages.length > 1; // More than just welcome message
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedFile(null);
    setIsLoading(true);

    try {
      // Call the actual API with follow-up flag
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: queryText,
          isFollowUp: isFollowUpQuery 
        }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Chat search results:', data);

      // Update widgets via callback
      if (onSearchComplete && data.widgets) {
        onSearchComplete(data.widgets);
      }

      // Show success message
      const successMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: data.is_followup 
          ? `✅ I've added 1 new widget about "${data.widgets[0]?.title}" to your canvas! You can see the details there.`
          : `✅ I've updated the canvas with ${data.widget_count || 0} widgets based on my research! You can explore: ${data.widgets?.map((w: any) => w.title).join(', ')}. Feel free to ask follow-up questions!`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, successMessage]);
    } catch (error) {
      console.error('Chat search error:', error);
      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: '❌ Sorry, I encountered an error while researching. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, selectedFile, onSearchComplete, messages.length]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleFileButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Slide-in Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header - Minimal */}
          <div className="flex items-center justify-end p-4 border-b bg-white">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400 text-center">
                  Start a conversation...
                </p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-green-700 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-base leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-2 mb-2">
                {/* Gemini-inspired thinking indicator */}
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100/50 shadow-sm">
                  {/* Animated gradient orbs */}
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse" style={{ animationDuration: '1s', animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" style={{ animationDuration: '1s', animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 animate-pulse" style={{ animationDuration: '1s', animationDelay: '400ms' }}></div>
                  </div>
                  <span className="text-xs font-medium text-gray-600 animate-pulse">Thinking</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white">
            {selectedFile && (
              <div className="mb-3 flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span className="text-sm text-gray-600 flex-1">{selectedFile.name}</span>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            <p className="text-xs text-gray-400 mb-3 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
            <div className="flex gap-2 items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
              />
              <button
                type="button"
                onClick={handleFileButtonClick}
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Attach file"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none min-h-[48px] max-h-[120px]"
                rows={1}
              />
              <button
                type="submit"
                disabled={!input.trim() && !selectedFile}
                className="p-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

