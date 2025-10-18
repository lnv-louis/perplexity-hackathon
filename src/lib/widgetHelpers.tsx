import React from 'react';
import { Shield, DollarSign, GraduationCap, Bus, Star, Home, MapPin } from 'lucide-react';

export const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-5 h-5" />,
  dollar: <DollarSign className="w-5 h-5" />,
  graduation: <GraduationCap className="w-5 h-5" />,
  bus: <Bus className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  map: <MapPin className="w-5 h-5" />,
};

export const calculateWidgetHeight = (content: any, widgetId: string): number => {
  // Base height for header and footer
  const baseHeight = 2;
  
  // Calculate content height based on widget type
  if (widgetId === 'reviews') {
    const reviewCount = content.reviews?.length || 0;
    return baseHeight + Math.max(4, Math.ceil(reviewCount * 1.5));
  } else if (widgetId === 'amenities') {
    const amenityCount = content.amenities?.length || 0;
    return baseHeight + Math.max(3, Math.ceil(amenityCount / 3));
  } else if (widgetId === 'photos') {
    const imageCount = content.images?.length || 0;
    return baseHeight + Math.max(3, Math.ceil(imageCount * 2.5));
  } else if (widgetId === 'safety') {
    const metricCount = content.metrics?.length || 0;
    return baseHeight + Math.max(3, Math.ceil(metricCount * 0.5 + 1));
  } else if (widgetId === 'student') {
    const highlightCount = content.highlights?.length || 0;
    return baseHeight + Math.max(3, Math.ceil(highlightCount * 0.5 + 1));
  }
  
  // Default height
  return 3;
};
