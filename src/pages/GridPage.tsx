'use client';

import React, { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Shield, 
  GraduationCap,
  Bus,
  Star,
  Home,
  Loader2,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface WidgetData {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  loading?: boolean;
}

const GridPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    'safety', 'budget', 'student', 'transport', 'reviews', 'amenities', 'photos'
  ]);

  const layouts = {
    lg: [
      { i: 'safety', x: 0, y: 0, w: 3, h: 3, minW: 2, minH: 2 },
      { i: 'budget', x: 3, y: 0, w: 3, h: 3, minW: 2, minH: 2 },
      { i: 'student', x: 6, y: 0, w: 3, h: 3, minW: 2, minH: 2 },
      { i: 'transport', x: 9, y: 0, w: 3, h: 3, minW: 2, minH: 2 },
      { i: 'reviews', x: 0, y: 3, w: 6, h: 4, minW: 3, minH: 3 },
      { i: 'amenities', x: 6, y: 3, w: 4, h: 3, minW: 2, minH: 2 },
      { i: 'photos', x: 10, y: 3, w: 2, h: 3, minW: 2, minH: 2 },
    ],
    md: [
      { i: 'safety', x: 0, y: 0, w: 5, h: 3, minW: 2, minH: 2 },
      { i: 'budget', x: 5, y: 0, w: 5, h: 3, minW: 2, minH: 2 },
      { i: 'student', x: 0, y: 3, w: 5, h: 3, minW: 2, minH: 2 },
      { i: 'transport', x: 5, y: 3, w: 5, h: 3, minW: 2, minH: 2 },
      { i: 'reviews', x: 0, y: 6, w: 10, h: 4, minW: 3, minH: 3 },
      { i: 'amenities', x: 0, y: 10, w: 5, h: 3, minW: 2, minH: 2 },
      { i: 'photos', x: 5, y: 10, w: 5, h: 3, minW: 2, minH: 2 },
    ],
    sm: [
      { i: 'safety', x: 0, y: 0, w: 6, h: 3, minW: 2, minH: 2 },
      { i: 'budget', x: 0, y: 3, w: 6, h: 3, minW: 2, minH: 2 },
      { i: 'student', x: 0, y: 6, w: 6, h: 3, minW: 2, minH: 2 },
      { i: 'transport', x: 0, y: 9, w: 6, h: 3, minW: 2, minH: 2 },
      { i: 'reviews', x: 0, y: 12, w: 6, h: 4, minW: 3, minH: 3 },
      { i: 'amenities', x: 0, y: 16, w: 6, h: 3, minW: 2, minH: 2 },
      { i: 'photos', x: 0, y: 19, w: 6, h: 3, minW: 2, minH: 2 },
    ],
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  };

  const handleDelete = (widgetId: string) => {
    setActiveWidgets(prev => prev.filter(id => id !== widgetId));
  };

  const widgets: Record<string, WidgetData> = {
    safety: {
      id: 'safety',
      title: 'Safety & Crime',
      icon: <Shield className="w-4 h-4" />,
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-900">8.2/10</span>
            <div className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium">
              Very Safe
            </div>
          </div>
          <div className="space-y-1.5 text-sm text-gray-600 leading-relaxed">
            <p>• Low crime rate in past 12 months</p>
            <p>• Well-lit streets, active community</p>
            <p>• Regular police presence</p>
          </div>
        </div>
      ),
    },
    budget: {
      id: 'budget',
      title: 'Budget & Prices',
      icon: <DollarSign className="w-4 h-4" />,
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Rent (1BR)</span>
              <span className="text-lg font-semibold text-gray-900">£1,200/mo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Student Housing</span>
              <span className="text-lg font-semibold text-gray-900">£800/mo</span>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 text-xs text-gray-500">
            <p>15% cheaper than city average</p>
          </div>
        </div>
      ),
    },
    student: {
      id: 'student',
      title: 'Student Life',
      icon: <GraduationCap className="w-4 h-4" />,
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">92%</span>
            <span className="text-xs text-gray-500">student-friendly</span>
          </div>
          <div className="space-y-1.5 text-sm text-gray-600 leading-relaxed">
            <p>• 5 universities within 2 miles</p>
            <p>• Active student community</p>
            <p>• Study cafes & libraries nearby</p>
          </div>
        </div>
      ),
    },
    transport: {
      id: 'transport',
      title: 'Transport',
      icon: <Bus className="w-4 h-4" />,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Tube</div>
              <div className="text-lg font-semibold text-gray-900">3 min</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Bus</div>
              <div className="text-lg font-semibold text-gray-900">1 min</div>
            </div>
          </div>
          <div className="space-y-1 text-xs text-gray-500">
            <p>Northern & Piccadilly lines</p>
            <p>15 min to Central London</p>
          </div>
        </div>
      ),
    },
    reviews: {
      id: 'reviews',
      title: 'Resident Reviews',
      icon: <Star className="w-4 h-4" />,
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.6</span>
            <span className="text-xs text-gray-500">(234 reviews)</span>
          </div>
          <div className="space-y-2.5">
            <div className="border-l-2 border-green-500 pl-3">
              <p className="text-sm text-gray-700 leading-relaxed">"Great area for students, very affordable and safe!"</p>
              <p className="text-xs text-gray-400 mt-1">Student • 2 months ago</p>
            </div>
            <div className="border-l-2 border-green-500 pl-3">
              <p className="text-sm text-gray-700 leading-relaxed">"Love the community vibe and transport links."</p>
              <p className="text-xs text-gray-400 mt-1">Resident • 1 year ago</p>
            </div>
          </div>
        </div>
      ),
    },
    amenities: {
      id: 'amenities',
      title: 'Nearby Amenities',
      icon: <Home className="w-4 h-4" />,
      content: (
        <div className="flex flex-wrap gap-2">
          {['Supermarket', 'Gym', 'Library', 'Cafe', 'Park', 'Restaurant'].map((amenity) => (
            <div
              key={amenity}
              className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-700"
            >
              {amenity}
            </div>
          ))}
        </div>
      ),
    },
    photos: {
      id: 'photos',
      title: 'Area Photos',
      icon: <MapPin className="w-4 h-4" />,
      content: (
        <div className="grid grid-cols-1 gap-2 h-full">
          <div className="bg-gray-100 rounded-md h-20"></div>
          <div className="bg-gray-100 rounded-md h-20"></div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Soft gradient background (not beige) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>

      {/* Fixed floating search bar */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <div className="backdrop-blur-md bg-white/80 border border-gray-200 rounded-full shadow-lg px-4 py-2">
          <div className="flex gap-2 items-center">
            <Search className="text-gray-400 w-4 h-4 ml-2" />
            <Input
              type="text"
              placeholder="e.g. bloomsbury student uni, safe, cheap"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none h-9 text-sm placeholder:text-gray-400"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              size="sm"
              className="bg-green-800 hover:bg-green-900 text-white px-4 h-9 text-sm font-medium rounded-full"
            >
              {isSearching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Search'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Infinite canvas with smooth Canva-style zoom */}
      <TransformWrapper
        initialScale={1}
        minScale={0.1}
        maxScale={8}
        centerOnInit={true}
        limitToBounds={false}
        doubleClick={{ disabled: false, mode: 'zoomIn', step: 0.7 }}
        wheel={{ 
          step: 0.05,
          smoothStep: 0.005,
          wheelDisabled: false
        }}
        panning={{ 
          disabled: false,
          velocityDisabled: false,
          lockAxisX: false,
          lockAxisY: false
        }}
        velocityAnimation={{
          disabled: false,
          sensitivity: 1,
          animationTime: 400,
          animationType: 'easeOutQuart'
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Zoom controls */}
            <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
              <button
                onClick={() => zoomIn(0.3)}
                className="p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-colors shadow-md"
                title="Zoom in"
              >
                <ZoomIn className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => zoomOut(0.3)}
                className="p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-colors shadow-md"
                title="Zoom out"
              >
                <ZoomOut className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => resetTransform()}
                className="p-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-colors shadow-md"
                title="Reset view"
              >
                <Maximize2 className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Canvas content */}
            <TransformComponent wrapperClass="!w-screen !h-screen">
              <div className="p-24 min-h-screen min-w-[2000px]">
                <ResponsiveGridLayout
                  className="layout"
                  layouts={layouts}
                  breakpoints={{ lg: 1200, md: 996, sm: 768 }}
                  cols={{ lg: 12, md: 10, sm: 6 }}
                  rowHeight={50}
                  isDraggable={true}
                  isResizable={true}
                  compactType="vertical"
                  preventCollision={false}
                  margin={[16, 16]}
                  resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
                >
                  {Object.values(widgets)
                    .filter(widget => activeWidgets.includes(widget.id))
                    .map((widget) => (
                    <div 
                      key={widget.id}
                      onMouseEnter={() => setHoveredWidget(widget.id)}
                      onMouseLeave={() => setHoveredWidget(null)}
                    >
                      <Card className="bg-white border border-gray-200 h-full overflow-auto transition-all duration-200 hover:shadow-xl hover:shadow-gray-300/30 group relative">
                        {/* Hover delete button (shadcn red) */}
                        {hoveredWidget === widget.id && (
                          <button
                            onClick={() => handleDelete(widget.id)}
                            className="absolute top-2 right-2 z-20 p-1.5 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors shadow-sm opacity-0 group-hover:opacity-100"
                            title="Remove widget"
                          >
                            <X className="w-3.5 h-3.5 text-red-600" />
                          </button>
                        )}

                        <div className="p-4 h-full flex flex-col">
                          {/* Widget Header - bigger, at top */}
                          <div className="flex items-center gap-2 mb-3">
                            {widget.icon}
                            <h3 className="text-base font-semibold text-gray-900">{widget.title}</h3>
                          </div>
                          
                          {/* Widget Content - no bottom padding blocking */}
                          <div className="flex-1 overflow-auto pb-2">
                            {widget.loading ? (
                              <div className="flex items-center justify-center h-full">
                                <Loader2 className="w-6 h-6 animate-spin text-gray-300" />
                              </div>
                            ) : (
                              widget.content
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </ResponsiveGridLayout>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default GridPage;
