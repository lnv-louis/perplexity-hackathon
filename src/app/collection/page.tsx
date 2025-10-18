'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Responsive, WidthProvider } from 'react-grid-layout';
import useLocalStorage from '@/hooks/use-local-storage';
import { WidgetCard } from '@/components/grid/WidgetCard';
import { iconMap, getSmartIcon } from '@/lib/widgetHelpers';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExpandedWidgetModal } from '@/components/grid/ExpandedWidgetModal';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function CollectionPage() {
  const [savedWidgets, setSavedWidgets] = useLocalStorage<any[]>('saved-widgets', []);
  const [expandedWidget, setExpandedWidget] = React.useState<any | null>(null);

  const handleRemoveWidget = (e: React.MouseEvent, widgetId: string) => {
    e.stopPropagation();
    setSavedWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const handleExpand = (e: React.MouseEvent, widget: any) => {
    e.stopPropagation();
    setExpandedWidget(widget);
  };

  const handleCloseExpanded = () => {
    setExpandedWidget(null);
  };

  // Generate a simple static layout
  const layout = savedWidgets.map((widget, index) => ({
    i: widget.id,
    x: (index % 3) * 4, // 3 widgets per row
    y: Math.floor(index / 3) * 5,
    w: 4,
    h: 5,
  }));

  // Transform saved raw data into renderable widget objects
  const renderableWidgets = savedWidgets.map(apiWidget => {
    const contentStr = typeof apiWidget.content === 'string' ? apiWidget.content : JSON.stringify(apiWidget.content);
    const smartIconType = getSmartIcon(apiWidget.title, contentStr, apiWidget.id);
    
    return {
      ...apiWidget,
      icon: iconMap[smartIconType],
      content: (
        <div className="prose prose-sm max-w-none text-gray-700">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
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
                      title={citation?.title || 'Source'}
                      {...props}
                    />
                  );
                }
                return <a className="text-blue-600 hover:text-blue-800 underline" href={href || '#'} {...props} />;
              },
            }}
          >
            {apiWidget.content}
          </ReactMarkdown>
        </div>
      ),
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-6 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">Homiq</span>
          </Link>
          <Link href="/housing">
            <Button variant="outline">Back to Canvas</Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Collection</h1>
          <p className="text-lg text-gray-600">
            Here are your saved widgets. You can remove them by clicking the bookmark icon.
          </p>
        </div>

        {renderableWidgets.length === 0 ? (
          <div className="text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-xl p-12">
            You haven't saved any widgets yet.
          </div>
        ) : (
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768 }}
            cols={{ lg: 12, md: 10, sm: 6 }}
            rowHeight={50}
            isDraggable={false}
            isResizable={false}
          >
            {renderableWidgets.map(widget => (
              <div key={widget.id}>
                <WidgetCard
                  widget={widget}
                  isHovered={false}
                  isSelected={false}
                  isSaved={true}
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                  onClick={(e) => handleExpand(e, widget)}
                  onDelete={(e) => handleRemoveWidget(e, widget.id)}
                  onExpand={(e) => handleExpand(e, widget)}
                  onSave={(e) => handleRemoveWidget(e, widget.id)}
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </main>

      <ExpandedWidgetModal 
        widget={expandedWidget}
        onClose={handleCloseExpanded}
      />
    </div>
  );
}