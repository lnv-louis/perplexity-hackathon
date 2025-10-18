'use client';

import React from 'react';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export const ZoomControls = React.memo<ZoomControlsProps>(({
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <button
        onClick={onZoomIn}
        className="p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-colors shadow-md"
        title="Zoom in"
      >
        <ZoomIn className="w-4 h-4 text-gray-700" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-colors shadow-md"
        title="Zoom out"
      >
        <ZoomOut className="w-4 h-4 text-gray-700" />
      </button>
      <button
        onClick={onReset}
        className="p-3 bg-green-600 hover:bg-green-700 backdrop-blur-sm border border-green-600 rounded-lg transition-colors shadow-md"
        title="Return to center"
      >
        <Maximize2 className="w-4 h-4 text-white" />
      </button>
    </div>
  );
});

ZoomControls.displayName = 'ZoomControls';
