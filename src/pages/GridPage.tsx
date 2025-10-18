'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import widgetsData from '../../data/widgets.json';
import { WidgetCard } from '@/components/grid/WidgetCard';
import { ZoomControls } from '@/components/grid/ZoomControls';
import { Breadcrumb } from '@/components/grid/Breadcrumb';
import { ExpandedWidgetModal } from '@/components/grid/ExpandedWidgetModal';
import ChatWindow from '@/components/grid/ChatWindow';
import { iconMap, calculateWidgetHeight, getSmartIcon } from '@/lib/widgetHelpers';
import { renderWidgetContent } from '@/lib/widgetRenderer';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface WidgetContent {
  id: string;
  title: string;
  iconType: string;
  content: any;
  sources: Array<{
    id: number;
    name: string;
    color: string;
  }>;
}

interface WidgetData {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  sources: Array<{
    id: number;
    name: string;
    color: string;
  }>;
  loading?: boolean;
}

const GridPage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const isWelcome = searchParams?.get('welcome') === 'true';
  
  const [isSearching, setIsSearching] = useState(false);
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(!!initialQuery || isWelcome); // Auto-open chat if query provided or welcome
  const [activeWidgets, setActiveWidgets] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiWidgets, setApiWidgets] = useState<any[]>([]); // Store API response widgets

  // Memoized handlers
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setIsChatOpen(true); // Always open chat when searching
    console.log('Starting housing search for:', query);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Search results received:', data);
      console.log('📦 API Response Details:', {
        widget_count: data.widget_count,
        widgets: data.widgets,
        first_widget: data.widgets?.[0]
      });

      if (data.widgets && Array.isArray(data.widgets)) {
        // Store the API widgets to merge with static widgets
        setApiWidgets(data.widgets);
        const newWidgetIds = data.widgets.map((widget: any) => widget.id);
        setActiveWidgets(newWidgetIds);
        console.log('Updated widgets from API:', newWidgetIds);
        console.log('Full API widgets data:', data.widgets);
      }
    } catch (error) {
      console.error('Search error:', error);
      // TODO: Show error message to user
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle initial query from homepage
  useEffect(() => {
    if (initialQuery && !hasSearched) {
      setHasSearched(true);
      handleSearch(initialQuery);
    }
  }, [initialQuery, hasSearched, handleSearch]);

  const handleDelete = useCallback((widgetId: string) => {
    // Show confirmation dialog
    if (window.confirm('Are you sure you want to delete this widget?')) {
      setActiveWidgets(prev => prev.filter(id => id !== widgetId));
      setApiWidgets(prev => prev.filter(w => w.id !== widgetId));
      if (selectedWidget === widgetId) {
        setSelectedWidget(null);
      }
    }
  }, [selectedWidget]);

  const handleExpand = useCallback((widgetId: string) => {
    setExpandedWidget(widgetId);
  }, []);

  const handleCloseExpanded = useCallback(() => {
    setExpandedWidget(null);
  }, []);

  const handleWidgetClick = useCallback((widgetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedWidget(widgetId);
  }, []);

  const handleCanvasClick = useCallback(() => {
    setSelectedWidget(null);
  }, []);

  // Handle drag start - auto-select the widget being dragged
  const handleDragStart = useCallback((layout: any, oldItem: any, newItem: any, placeholder: any, e: MouseEvent, element: HTMLElement) => {
    setSelectedWidget(newItem.i);
  }, []);

  // Memoize zoom control handlers
  const handleZoomIn = useCallback((zoomIn: (step?: number) => void) => {
    zoomIn(0.1);
  }, []);

  const handleZoomOut = useCallback((zoomOut: (step?: number) => void) => {
    zoomOut(0.1);
  }, []);

  const handleZoomReset = useCallback((resetTransform: () => void) => {
    resetTransform();
  }, []);

  const handleChatOpen = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const handleChatClose = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  // Handle new widgets from chat
  const handleChatSearchComplete = useCallback((newWidgets: any[]) => {
    // Check if it's a follow-up (single widget)
    if (newWidgets.length === 1 && newWidgets[0].id.startsWith('widget-')) {
      // Append new widget to existing ones
      setApiWidgets(prev => [...prev, ...newWidgets]);
      setActiveWidgets(prev => [...prev, newWidgets[0].id]);
      console.log('Appended follow-up widget:', newWidgets[0].id);
    } else {
      // Initial search - replace all widgets
      setApiWidgets(newWidgets);
      const newWidgetIds = newWidgets.map((widget: any) => widget.id);
      setActiveWidgets(newWidgetIds);
      console.log('Replaced widgets with initial search:', newWidgetIds);
    }
  }, []);

  // Memoize widget event handlers to prevent re-creation
  const handleWidgetMouseEnter = useCallback((widgetId: string) => {
    setHoveredWidget(widgetId);
  }, []);

  const handleWidgetMouseLeave = useCallback(() => {
    setHoveredWidget(null);
  }, []);

  // Generate widgets from JSON data - MERGE static widgets with API data
  const widgets: Record<string, WidgetData> = useMemo(() => {
    const widgetMap: Record<string, WidgetData> = {};
    
    console.log('🔄 Regenerating widgets, apiWidgets count:', apiWidgets.length);
    
    // Start with static widgets from JSON
    (widgetsData.widgets as WidgetContent[]).forEach((widgetData) => {
      widgetMap[widgetData.id] = {
        id: widgetData.id,
        title: widgetData.title,
        icon: iconMap[widgetData.iconType],
        content: renderWidgetContent(widgetData),
        sources: widgetData.sources,
      };
    });
    
    // Override with API data if available
    apiWidgets.forEach((apiWidget) => {
      console.log('🎨 Processing API widget:', apiWidget.id, apiWidget.title);
      // Get the static widget structure (for icon and layout)
      const staticWidget = widgetMap[apiWidget.id];
      
      // For new follow-up widgets, create from scratch
      if (!staticWidget) {
        const contentStr = typeof apiWidget.content === 'string' ? apiWidget.content : JSON.stringify(apiWidget.content);
        const smartIconType = getSmartIcon(apiWidget.title, contentStr);
        
        console.log('🆕 Creating new follow-up widget:', apiWidget.id, 'Icon:', smartIconType);
        
        widgetMap[apiWidget.id] = {
          id: apiWidget.id,
          title: apiWidget.title,
          icon: iconMap[smartIconType],
          content: <div className="prose prose-sm max-w-none text-gray-700">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                a: ({node, href, ...props}) => {
                  const isCitation = /^\[(\d+)\]$/.test(props.children?.toString() || '');
                  if (isCitation) {
                    const citationNum = props.children?.toString().match(/\d+/)?.[0];
                    const citation = apiWidget.citations?.find((c: any) => c.number === parseInt(citationNum || '0'));
                    return (
                      <a 
                        href={citation?.url || href || '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-1.5 py-0.5 rounded ml-0.5 no-underline font-medium"
                        title={citation?.title}
                        {...props}
                      />
                    );
                  }
                  return <a className="text-blue-600 hover:text-blue-800 underline" href={href} {...props} />;
                },
                h1: ({node, ...props}) => <h1 className="font-bold text-xl mb-3 mt-4 text-gray-900" {...props} />,
                h2: ({node, ...props}) => <h2 className="font-bold text-lg mb-2 mt-3 text-gray-900" {...props} />,
                h3: ({node, ...props}) => <h3 className="font-semibold text-base mb-2 mt-3 text-gray-800" {...props} />,
                code: ({node, ...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />,
              }}
            >
              {apiWidget.content}
            </ReactMarkdown>
          </div>,
          sources: apiWidget.citations || [],
        };
        return;
      }
      
      if (staticWidget) {
        // Find the original widget data from JSON for iconType
        const originalWidget = (widgetsData.widgets as WidgetContent[]).find(w => w.id === apiWidget.id);
        
        console.log('✅ Merging API data for widget:', apiWidget.id, 'Title:', apiWidget.title);
        
        // Merge: keep icon/layout from static, update title and content from API
        widgetMap[apiWidget.id] = {
          ...staticWidget,
          title: apiWidget.title || staticWidget.title,
          content: typeof apiWidget.content === 'string' 
            ? <div className="prose prose-sm max-w-none text-gray-700">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Style markdown elements
                    p: ({node, ...props}) => <p className="mb-3 leading-relaxed" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="leading-relaxed" {...props} />,
                    a: ({node, href, ...props}) => {
                      // Check if it's a citation link [1], [2], etc.
                      const isCitation = /^\[(\d+)\]$/.test(props.children?.toString() || '');
                      if (isCitation) {
                        const citationNum = props.children?.toString().match(/\d+/)?.[0];
                        const citation = apiWidget.citations?.find((c: any) => c.number === parseInt(citationNum || '0'));
                        return (
                          <a 
                            href={citation?.url || href || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-1.5 py-0.5 rounded ml-0.5 no-underline font-medium"
                            title={citation?.title}
                            {...props}
                          />
                        );
                      }
                      return <a className="text-blue-600 hover:text-blue-800 underline" href={href} {...props} />;
                    },
                    h1: ({node, ...props}) => <h1 className="font-bold text-xl mb-3 mt-4 text-gray-900" {...props} />,
                    h2: ({node, ...props}) => <h2 className="font-bold text-lg mb-2 mt-3 text-gray-900" {...props} />,
                    h3: ({node, ...props}) => <h3 className="font-semibold text-base mb-2 mt-3 text-gray-800" {...props} />,
                    code: ({node, ...props}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props} />,
                  }}
                >
                  {apiWidget.content}
                </ReactMarkdown>
              </div>
            : renderWidgetContent({
                id: apiWidget.id,
                title: apiWidget.title,
                iconType: originalWidget?.iconType || 'info',
                content: apiWidget.content,
                sources: staticWidget.sources
              } as WidgetContent),
        };
      }
    });
    
    return widgetMap;
  }, [apiWidgets]);

  // Generate layouts dynamically based on content and API sizes
  const dynamicLayouts = useMemo(() => {
    const lg: any[] = [];
    const md: any[] = [];
    const sm: any[] = [];
    
    const activeWidgetData = activeWidgets.map(id => {
      // Find API widget first (has dynamic size)
      const apiWidget = apiWidgets.find(w => w.id === id);
      const staticWidget = (widgetsData.widgets as WidgetContent[]).find(w => w.id === id);
      
      return {
        id,
        size: apiWidget?.size || { w: 2, h: 3 }, // Larger default size to show more content
        content: staticWidget?.content
      };
    });
    
    // Calculate total width needed for bento-style grid (multiple columns)
    const totalCols = 12;
    
    // Bento-style layout: 2-3 widgets per row for better content visibility
    let xPosLg = 0;
    let yPosLg = 0;
    let currentRowHeight = 0;
    let xPosMd = 0;
    let yPosMd = 0;
    let yPosSm = 0;
    
    activeWidgetData.forEach((widgetData) => {
      // Use API sizes directly (already calculated for content length)
      const height = widgetData.size.h * 2; // Convert to grid units
      const width = widgetData.size.w * 2;   // Convert to grid units
      
      // Large layout - bento grid style (2-3 columns for readability)
      if (xPosLg + width > totalCols) {
        xPosLg = 0;
        yPosLg += currentRowHeight;
        currentRowHeight = 0;
      }
      
      lg.push({
        i: widgetData.id,
        x: xPosLg,
        y: yPosLg,
        w: width,
        h: height,
        minW: 4,
        minH: 6,
      });
      
      currentRowHeight = Math.max(currentRowHeight, height);
      xPosLg += width;
      
      // Medium layout
      const mdWidth = Math.min(width, 10);
      if (xPosMd + mdWidth > 10) {
        xPosMd = 0;
        yPosMd += height;
      }
      md.push({
        i: widgetData.id,
        x: xPosMd,
        y: yPosMd,
        w: mdWidth,
        h: height,
        minW: 3,
        minH: 2,
      });
      xPosMd += mdWidth;
      
      // Small layout
      sm.push({
        i: widgetData.id,
        x: 0,
        y: yPosSm,
        w: 6,
        h: height,
        minW: 3,
        minH: 2,
      });
      yPosSm += height;
    });
    
    return { lg, md, sm };
  }, [activeWidgets, apiWidgets]);

  const layouts = dynamicLayouts;

  // Memoize widgets to prevent re-creation on every render
  const memoizedActiveWidgets = useMemo(
    () => Object.values(widgets).filter(w => activeWidgets.includes(w.id)),
    [widgets, activeWidgets]
  );

  const expandedWidgetData = expandedWidget ? widgets[expandedWidget] : null;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ShaderGradient Background */}
      <div className="absolute inset-0 z-0">
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <ShaderGradient
            control="query"
            urlString="https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.5&cAzimuthAngle=180&cDistance=3&cPolarAngle=90&cameraZoom=1&color1=%23dcffdb&color2=%2388ff85&color3=%2320d3a8&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=40&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=2.1&positionX=-1.4&positionY=1&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&toggleAxis=false&type=plane&uAmplitude=0&uDensity=2.1&uFrequency=5.5&uSpeed=0.1&uStrength=5.3&uTime=0&wireframe=false&zoomOut=false"
          />
        </ShaderGradientCanvas>
      </div>

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Chat button */}
      <button
        onClick={handleChatOpen}
        className="fixed top-6 right-6 z-40 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-medium shadow-lg transition-colors"
      >
        Chat
      </button>

      {/* Infinite canvas with less sensitive zoom */}
            <TransformWrapper
        initialScale={0.6}
        initialPositionX={-200}
        initialPositionY={-100}
        minScale={0.1}
        maxScale={8}
        limitToBounds={false}
        centerOnInit={true}
        wheel={{ wheelDisabled: false, step: 0.1 }}
        doubleClick={{ 
          disabled: false, 
          mode: 'zoomIn',
          step: 0.3,
          excluded: ['input', 'button', 'a']
        }}
        panning={{ 
          disabled: selectedWidget !== null,
          velocityDisabled: true,
          lockAxisX: false,
          lockAxisY: false,
          excluded: ['input', 'button', 'a']
        }}
        velocityAnimation={{
          disabled: true,
          sensitivity: 0.5,
          animationTime: 200,
          animationType: 'easeOutQuart'
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Zoom Controls */}
            <ZoomControls 
              onZoomIn={() => handleZoomIn(zoomIn)}
              onZoomOut={() => handleZoomOut(zoomOut)}
              onReset={() => handleZoomReset(resetTransform)}
            />

            {/* Canvas content with full viewport dotted grid */}
            <TransformComponent wrapperClass="!w-screen !h-screen">
              <div 
                className="p-6 min-h-screen min-w-screen w-[200vw] h-[200vh] canvas-background relative"
                onClick={handleCanvasClick}
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(156, 163, 175, 0.3) 1px, transparent 1px)',
                  backgroundSize: '24px 24px'
                }}
              >
                {/* Loading Overlay with larger, more visible text */}
                {isSearching && (
                  <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative mb-8">
                        {/* Animated spinner */}
                        <div className="w-24 h-24 border-8 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
                        {/* Pulse ring */}
                        <div className="absolute inset-0 w-24 h-24 border-8 border-white/10 rounded-full animate-ping mx-auto"></div>
                      </div>
                      <p className="text-white text-5xl font-bold tracking-wide mb-4 animate-pulse">
                        Generating...
                      </p>
                      <p className="text-white/90 text-xl mt-4 max-w-md mx-auto">
                        Researching your query with Perplexity AI
                      </p>
                    </div>
                  </div>
                )}

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
                  draggableCancel=".no-drag"
                  draggableHandle=".drag-handle"
                  onDragStart={handleDragStart}
                >
                  {memoizedActiveWidgets.map((widget) => (
                    <div key={widget.id}>
                      <WidgetCard
                        widget={widget}
                        isHovered={hoveredWidget === widget.id}
                        isSelected={selectedWidget === widget.id}
                        onMouseEnter={() => handleWidgetMouseEnter(widget.id)}
                        onMouseLeave={handleWidgetMouseLeave}
                        onClick={(e) => handleWidgetClick(widget.id, e)}
                        onDelete={(e) => {
                          e.stopPropagation();
                          handleDelete(widget.id);
                        }}
                        onExpand={(e) => {
                          e.stopPropagation();
                          handleExpand(widget.id);
                        }}
                      />
                    </div>
                  ))}
                </ResponsiveGridLayout>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {/* Expanded Widget Modal */}
      <ExpandedWidgetModal 
        widget={expandedWidgetData}
        onClose={handleCloseExpanded}
      />

      {/* Chat Window */}
      <ChatWindow 
        isOpen={isChatOpen}
        onClose={handleChatClose}
        initialQuery={initialQuery}
        onSearchComplete={handleChatSearchComplete}
        existingWidgets={apiWidgets}
        isSearching={isSearching}
      />
    </div>
  );
};

export default GridPage;
