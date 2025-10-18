// Widget-related TypeScript interfaces

export interface Citation {
  number: number;
  url: string;
  title: string;
  name?: string;
}

export interface WidgetSource {
  id: number;
  name: string;
  color: string;
}

// Content structures for different widget types
export interface SafetyContent {
  score: number;
  rating: string;
  metrics: string[];
}

export interface BudgetContent {
  avgRent1BR: number;
  studentHousing: number;
  comparison: string;
}

export interface StudentContent {
  percentage: number;
  label: string;
  highlights: string[];
}

export interface TransportContent {
  tube: {
    distance: string;
    lines: string[];
  };
  bus: {
    distance: string;
  };
  details: string;
}

export interface Review {
  text: string;
  author: string;
  timeAgo: string;
}

export interface ReviewsContent {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

export interface AmenitiesContent {
  amenities: string[];
}

export interface ImageItem {
  alt: string;
  url?: string;
}

export interface PhotosContent {
  images: ImageItem[];
}

// Union type for all possible content structures
export type WidgetContentData = 
  | SafetyContent 
  | BudgetContent 
  | StudentContent 
  | TransportContent 
  | ReviewsContent 
  | AmenitiesContent 
  | PhotosContent
  | string // For markdown content from API
  | Record<string, unknown>; // For unknown structured content

export interface WidgetContent {
  id: string;
  title: string;
  iconType: string;
  content: WidgetContentData;
  sources: WidgetSource[];
}

export interface ApiWidget {
  id: string;
  title: string;
  content: string | WidgetContentData;
  citations?: Citation[];
  size?: { w: number; h: number };
}

export interface WidgetData {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  sources: WidgetSource[];
  loading?: boolean;
}

// Layout types for react-grid-layout
export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
}

export interface Layouts {
  lg: LayoutItem[];
  md: LayoutItem[];
  sm: LayoutItem[];
}

// Event handler types for react-grid-layout
export type GridLayout = LayoutItem[];
export type GridItemCallback = (
  layout: GridLayout,
  oldItem: LayoutItem,
  newItem: LayoutItem,
  placeholder: LayoutItem,
  event: MouseEvent,
  element: HTMLElement
) => void;
