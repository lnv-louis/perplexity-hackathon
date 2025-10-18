'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of a message for chat
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Define the shape of the context state
interface CanvasContextType {
  apiWidgets: any[];
  setApiWidgets: React.Dispatch<React.SetStateAction<any[]>>;
  activeWidgets: string[];
  setActiveWidgets: React.Dispatch<React.SetStateAction<string[]>>;
  locationTitle: string;
  setLocationTitle: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

// Create the context with a default undefined value
const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

// Create the provider component
export function CanvasProvider({ children }: { children: ReactNode }) {
  const [apiWidgets, setApiWidgets] = useState<any[]>([]);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([]);
  const [locationTitle, setLocationTitle] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const value = {
    apiWidgets,
    setApiWidgets,
    activeWidgets,
    setActiveWidgets,
    locationTitle,
    setLocationTitle,
    messages,
    setMessages,
  };

  return (
    <CanvasContext.Provider value={value}>
      {children}
    </CanvasContext.Provider>
  );
}

// Create a custom hook to use the context
export function useCanvas() {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
}
