'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

interface ExpandedWidgetModalProps {
  widget: {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    sources: Array<{
      id: number;
      name: string;
      color: string;
    }>;
  } | null;
  onClose: () => void;
}

const ExpandedWidgetModalComponent: React.FC<ExpandedWidgetModalProps> = ({ widget, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (widget) {
      document.body.style.overflow = 'hidden';
      // Trigger animation after mount
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [widget]);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 200); // Match animation duration
  }, [onClose]);

  const handleBackdropClick = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleStopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!widget) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-200 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleBackdropClick}
    >
      <Card 
        className={`bg-white w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden shadow-2xl transition-all duration-200 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={handleStopPropagation}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-green-700">
              {widget.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{widget.title}</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Close"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="prose prose-sm max-w-none">
            {widget.content}
          </div>
        </div>

        {/* Footer - Sources */}
        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50/50 flex items-center gap-3 flex-shrink-0">
          <span className="text-sm font-medium text-gray-700">Sources:</span>
          <div className="flex gap-2">
            {widget.sources.map((source) => (
              <div
                key={source.id}
                className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-gray-200"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: source.color }}
                />
                <span className="text-xs text-gray-600">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export const ExpandedWidgetModal = React.memo(ExpandedWidgetModalComponent);
ExpandedWidgetModal.displayName = 'ExpandedWidgetModal';
