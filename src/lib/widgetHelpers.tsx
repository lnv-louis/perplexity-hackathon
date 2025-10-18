import React from 'react';
import { 
  Shield, DollarSign, GraduationCap, Bus, Star, Home, MapPin,
  CloudRain, Building, TrendingUp, Coffee, Trees, Heart,
  Activity, AlertCircle, Info, Sparkles
} from 'lucide-react';

export const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-5 h-5" />,
  dollar: <DollarSign className="w-5 h-5" />,
  graduation: <GraduationCap className="w-5 h-5" />,
  bus: <Bus className="w-5 h-5" />,
  star: <Star className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  map: <MapPin className="w-5 h-5" />,
  weather: <CloudRain className="w-5 h-5" />,
  building: <Building className="w-5 h-5" />,
  trending: <TrendingUp className="w-5 h-5" />,
  coffee: <Coffee className="w-5 h-5" />,
  trees: <Trees className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  activity: <Activity className="w-5 h-5" />,
  alert: <AlertCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  sparkles: <Sparkles className="w-5 h-5" />,
};

// Smart icon selection based on widget title/content
export function getSmartIcon(title: string, content: string = '', widgetId: string = ''): string {
  // Use a generic icon for all follow-up widgets
  if (widgetId.startsWith('widget-')) {
    return 'info';
  }

  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();
  const combined = lowerTitle + ' ' + lowerContent;
  
  // Specific overrides for new titles
  if (lowerTitle.includes('safety and crime')) return 'shield';
  if (lowerTitle.includes('local amenities')) return 'coffee';
  if (lowerTitle.includes('lifestyle and atmosphere')) return 'heart';
  if (lowerTitle.includes('available properties')) return 'home';
  if (lowerTitle.includes('weather and climate')) return 'weather';

  // Weather-related
  if (/weather|climate|temperature|rain|sun/.test(combined)) return 'weather';
  
  // Safety-related
  if (/safe|crime|security|police/.test(combined)) return 'shield';
  
  // Budget/Money-related
  if (/price|budget|cost|rent|expensive|cheap|afford/.test(combined)) return 'dollar';
  
  // Student-related
  if (/student|university|college|education|school/.test(combined)) return 'graduation';
  
  // Transport-related
  if (/transport|bus|train|metro|commute|travel/.test(combined)) return 'bus';
  
  // Property/Housing-related
  if (/property|house|flat|apartment|accommodation|location/.test(combined)) return 'home';
  
  // Amenities/Places
  if (/amenity|cafe|restaurant|shop|park|gym/.test(combined)) return 'coffee';
  
  // Nature/Environment
  if (/park|green|nature|tree|environment/.test(combined)) return 'trees';
  
  // Lifestyle/Community
  if (/lifestyle|community|culture|nightlife|social/.test(combined)) return 'heart';
  
  // Reviews/Ratings
  if (/review|rating|feedback|opinion/.test(combined)) return 'star';
  
  // Trends/Statistics
  if (/trend|statistic|data|analysis/.test(combined)) return 'trending';
  
  // Default
  return 'info';
}

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
