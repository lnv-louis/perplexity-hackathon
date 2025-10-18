import React from 'react';
import { Star } from 'lucide-react';

interface WidgetContent {
  id: string;
  content: any;
}

export const renderWidgetContent = (widgetData: WidgetContent): React.ReactNode => {
  const { id, content } = widgetData;
  
  switch (id) {
    case 'safety':
      return (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-900">{content.score}/10</span>
            <div className="px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium">
              {content.rating}
            </div>
          </div>
          <div className="space-y-1.5 text-sm text-gray-600 leading-relaxed">
            {content.metrics.map((metric: string, idx: number) => (
              <p key={idx}>• {metric}</p>
            ))}
          </div>
        </div>
      );
    
    case 'budget':
      return (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Rent (1BR)</span>
              <span className="text-lg font-semibold text-gray-900">£{content.avgRent1BR}/mo</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Student Housing</span>
              <span className="text-lg font-semibold text-gray-900">£{content.studentHousing}/mo</span>
            </div>
          </div>
          <div className="pt-2 border-t border-gray-100 text-xs text-gray-500">
            <p>{content.comparison}</p>
          </div>
        </div>
      );
    
    case 'student':
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold text-gray-900">{content.percentage}%</span>
            <span className="text-xs text-gray-500">{content.label}</span>
          </div>
          <div className="space-y-1.5 text-sm text-gray-600 leading-relaxed">
            {content.highlights.map((highlight: string, idx: number) => (
              <p key={idx}>• {highlight}</p>
            ))}
          </div>
        </div>
      );
    
    case 'transport':
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500 mb-1">Tube</div>
              <div className="text-lg font-semibold text-gray-900">{content.tube.distance}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Bus</div>
              <div className="text-lg font-semibold text-gray-900">{content.bus.distance}</div>
            </div>
          </div>
          <div className="space-y-1 text-xs text-gray-500">
            <p>{content.tube.lines.join(' & ')} lines</p>
            <p>{content.details}</p>
          </div>
        </div>
      );
    
    case 'reviews':
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">{content.rating}</span>
            <span className="text-xs text-gray-500">({content.totalReviews} reviews)</span>
          </div>
          <div className="space-y-2.5">
            {content.reviews.map((review: any, idx: number) => (
              <div key={idx} className="border-l-2 border-green-600 pl-3">
                <p className="text-sm text-gray-700 leading-relaxed">"{review.text}"</p>
                <p className="text-xs text-gray-400 mt-1">{review.author} • {review.timeAgo}</p>
              </div>
            ))}
          </div>
        </div>
      );
    
    case 'amenities':
      return (
        <div className="flex flex-wrap gap-2">
          {content.amenities.map((amenity: string, idx: number) => (
            <div
              key={idx}
              className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-700"
            >
              {amenity}
            </div>
          ))}
        </div>
      );
    
    case 'photos':
      return (
        <div className="grid grid-cols-1 gap-2 h-full">
          {content.images.map((image: any, idx: number) => (
            <div key={idx} className="bg-gray-100 rounded-md h-20 flex items-center justify-center text-xs text-gray-400">
              {image.alt}
            </div>
          ))}
        </div>
      );
    
    default:
      return <div>No content available</div>;
  }
};
