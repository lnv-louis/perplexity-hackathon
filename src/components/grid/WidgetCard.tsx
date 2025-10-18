'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { X, Maximize } from 'lucide-react';

interface WidgetCardProps {
  widget: {
    id: string;
    title: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    sources: Array<{
      id: number;
      name: string;
      color: string;
      url?: string;
    }>;
  };
  isHovered: boolean;
  isSelected: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onExpand: (e: React.MouseEvent) => void;
}

export const WidgetCard = React.memo<WidgetCardProps>(({
  widget,
  isHovered,
  isSelected,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onDelete,
  onExpand,
}) => {
  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="h-full"
    >
      <Card className={`bg-white h-full flex flex-col overflow-hidden transition-all duration-200 hover:shadow-2xl hover:shadow-gray-400/40 group relative ${
        isSelected 
          ? 'border-2 border-green-600 shadow-xl shadow-green-300/50' 
          : 'border border-gray-200'
      }`}>
        {/* Hover buttons - always show expand button */}
        {isHovered && (
          <>
            <button
              onClick={onDelete}
              className="no-drag absolute top-2 right-2 z-20 p-1.5 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
              title="Remove widget"
            >
              <X className="w-3.5 h-3.5 text-red-600" />
            </button>
            <button
              onClick={onExpand}
              className="no-drag absolute top-2 right-12 z-20 p-1.5 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
              title="Expand widget"
            >
              <Maximize className="w-3.5 h-3.5 text-green-600" />
            </button>
          </>
        )}

        {/* Selection indicator */}
        {isSelected && (
          <div className="no-drag absolute top-2 left-2 z-20 px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-md shadow-sm">
            Selected
          </div>
        )}

        {/* Widget Header - with drag handle */}
        <div className="flex items-center gap-3 p-4 pb-3 flex-shrink-0 border-b border-gray-100 drag-handle cursor-move">
          <div className="text-green-700 flex-shrink-0">
            {widget.icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900">{widget.title}</h3>
        </div>
        
        {/* Widget Content */}
        <div className="flex-1 overflow-auto px-4 py-3 no-drag">
          {widget.content}
        </div>

        {/* Widget Footer - Sources */}
        <div className="no-drag border-t border-gray-100 px-4 py-1.5 flex items-center gap-2 bg-gray-50/50 flex-shrink-0">
          <div className="flex gap-1.5">
            {widget.sources.map((source) => (
              <div
                key={source.id}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: source.color }}
                title={source.name}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">
            {widget.sources.length} {widget.sources.length === 1 ? 'source' : 'sources'}
          </span>
        </div>
      </Card>
    </div>
  );
});

WidgetCard.displayName = 'WidgetCard';
