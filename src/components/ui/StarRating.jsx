import { Star } from 'lucide-react';

export default function StarRating({ rating, reviewCount, size = 'sm' }) {
  const stars = Math.round(rating);
  const iconSize = size === 'sm' ? 13 : 16;
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) =>
      <Star
        key={n}
        size={iconSize}
        className={n <= stars ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#3D3D52]'} />

      )}
      <span className="text-[#E8E8F0] font-medium text-[13px] ml-1">{rating}</span>
      {reviewCount &&
      <span className="text-[#666680] text-[12px]">
          ({reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}k` : reviewCount})
        </span>
      }
    </div>);

}