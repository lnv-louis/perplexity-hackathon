'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const BreadcrumbComponent = () => {
  return (
    <div className="fixed top-6 left-6 z-50">
      <Link 
        href="/"
        className="flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 hover:bg-white transition-colors"
      >
        <ChevronLeft className="w-4 h-4 text-gray-700" />
        <span className="text-sm font-medium text-gray-700">Back to Home</span>
      </Link>
    </div>
  );
};

export const Breadcrumb = React.memo(BreadcrumbComponent);
Breadcrumb.displayName = 'Breadcrumb';
