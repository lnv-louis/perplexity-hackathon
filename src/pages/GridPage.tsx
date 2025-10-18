'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import widgetsData from '../../data/widgets.json';
import { WidgetCard } from '@/components/grid/WidgetCard';
import { ZoomControls } from '@/components/grid/ZoomControls';
import { Breadcrumb } from '@/components/grid/Breadcrumb';
import { ExpandedWidgetModal } from '@/components/grid/ExpandedWidgetModal';
import ChatWindow from '@/components/grid/ChatWindow';
import { iconMap, calculateWidgetHeight } from '@/lib/widgetHelpers';
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
  const [isSearching, setIsSearching] = useState(false);
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeWidgets, setActiveWidgets] = useState<string[]>([
    'safety', 'budget', 'student', 'transport', 'reviews', 'amenities', 'photos'
  ]);

  // Memoized handlers
  const handleSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 2000);
  }, []);

  const handleDelete = useCallback((widgetId: string) => {
    setActiveWidgets(prev => prev.filter(id => id !== widgetId));
    if (selectedWidget === widgetId) {
      setSelectedWidget(null);
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

  // Memoize widget event handlers to prevent re-creation
  const handleWidgetMouseEnter = useCallback((widgetId: string) => {
    setHoveredWidget(widgetId);
  }, []);

  const handleWidgetMouseLeave = useCallback(() => {
    setHoveredWidget(null);
  }, []);

  // Generate widgets from JSON data
  const widgets: Record<string, WidgetData> = useMemo(() => {
    const widgetMap: Record<string, WidgetData> = {};
    
    (widgetsData.widgets as WidgetContent[]).forEach((widgetData) => {
      widgetMap[widgetData.id] = {
        id: widgetData.id,
        title: widgetData.title,
        icon: iconMap[widgetData.iconType],
        content: renderWidgetContent(widgetData),
        sources: widgetData.sources,
      };
    });
    
    return widgetMap;
  }, []);

  // Generate layouts dynamically based on content
  const dynamicLayouts = useMemo(() => {
    const lg: any[] = [];
    const md: any[] = [];
    const sm: any[] = [];
    
    // Start from top-left (0, 0)
    let xPosLg = 0;
    let yPosLg = 0;
    let xPosMd = 0;
    let yPosMd = 0;
    let yPosSm = 0;
    
    (widgetsData.widgets as WidgetContent[]).forEach((widgetData) => {
      const height = calculateWidgetHeight(widgetData.content, widgetData.id);
      const width = widgetData.id === 'reviews' ? 6 : 3;
      
      // Large layout
      if (xPosLg + width > 12) {
        xPosLg = 0;
        yPosLg += height;
      }
      lg.push({
        i: widgetData.id,
        x: xPosLg,
        y: yPosLg,
        w: width,
        h: height,
        minW: 2,
        minH: 2,
      });
      xPosLg += width;
      
      // Medium layout
      if (xPosMd + (width > 4 ? 10 : 5) > 10) {
        xPosMd = 0;
        yPosMd += height;
      }
      md.push({
        i: widgetData.id,
        x: xPosMd,
        y: yPosMd,
        w: width > 4 ? 10 : 5,
        h: height,
        minW: 2,
        minH: 2,
      });
      xPosMd += (width > 4 ? 10 : 5);
      
      // Small layout
      sm.push({
        i: widgetData.id,
        x: 0,
        y: yPosSm,
        w: 6,
        h: height,
        minW: 2,
        minH: 2,
      });
      yPosSm += height;
    });
    
    return { lg, md, sm };
  }, []);

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
        minScale={0.5}
        maxScale={3}
        centerOnInit={true}
        limitToBounds={false}
        doubleClick={{ disabled: false, mode: 'zoomIn', step: 0.3 }}
        wheel={{ 
          step: 0.01,
          smoothStep: 0.001,
          wheelDisabled: false,
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

            {/* Canvas content */}
            <TransformComponent wrapperClass="!w-screen !h-screen">
              <div 
                className="p-6 min-h-[3000px] min-w-[4000px] canvas-background"
                onClick={handleCanvasClick}
              >
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
      />
    </div>
  );
};

export default GridPage;
