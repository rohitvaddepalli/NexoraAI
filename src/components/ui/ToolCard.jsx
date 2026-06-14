import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../../hooks/useFavorites';
import { useApp } from '../../context/AppContext';
import { getCategoryColor, getToolInitials, getToolGradient } from '../../utils/helpers';


function ToolIcon({ tool }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !tool.icon) {
    return (
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
      >
        {getToolInitials(tool.name)}
      </div>
    );
  }

  return (
    <img
      src={tool.icon}
      alt={tool.name}
      loading="lazy"
      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
      onError={() => setHasError(true)}
    />
  );
}

export default function ToolCard({ tool, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useApp();

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wasAlready = isFavorite(tool.id);
    toggleFavorite(tool.id);
    showToast(wasAlready ? 'Removed from favorites' : 'Added to favorites', wasAlready ? 'info' : 'success');
  };

  const categoryColor = getCategoryColor(tool.category);
  const favorited = isFavorite(tool.id);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -3 }}
      className="group relative bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:border-[#7C6EF5]/40 hover:shadow-[0_8px_32px_rgba(124,110,245,0.15)]"
    >
      <Link to={`/tool/${tool.id}`} className="absolute inset-0 z-10 rounded-xl" aria-label={`View ${tool.name}`} />

      {/* Top: icon */}
      <div className="flex items-start justify-between gap-2">
        <ToolIcon tool={tool} />
        <button
          onClick={handleFavorite}
          className={`relative z-20 w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
            favorited
              ? 'text-[#7C6EF5] bg-[#7C6EF5]/10'
              : 'text-[#3D3D52] hover:text-[#7C6EF5] hover:bg-[#7C6EF5]/10'
          }`}
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={favorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* Category badge ABOVE name (matching design) */}
      <div>
        <span
          className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md mb-1.5"
          style={{
            color: categoryColor,
            backgroundColor: `${categoryColor}15`,
          }}
        >
          {tool.category}
        </span>
        <div className="text-[15px] font-semibold text-[#E8E8F0] group-hover:text-[#9B8FF7] transition-colors leading-tight">
          {tool.name}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
        <span className="text-[13px] font-semibold text-[#E8E8F0]">{tool.rating}</span>
      </div>

      {/* Description */}
      <p className="text-[12px] text-[#666680] line-clamp-2 flex-1 leading-relaxed">
        {tool.description}
      </p>

      {/* Bottom: pricing + arrow */}
      <div className="border-t border-[#1E1E2E]" />
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[12px] font-semibold ${
          tool.pricing === 'Free' ? 'text-[#22C55E]' :
          tool.pricing === 'Freemium' ? 'text-[#F59E0B]' :
          'text-[#666680]'
        }`}>
          {tool.pricing}
        </span>
        <div className="relative z-20 w-7 h-7 rounded-lg bg-[#1A1A24] flex items-center justify-center group-hover:bg-[#7C6EF5]/20 transition-colors">
          <ArrowRight size={13} className="text-[#3D3D52] group-hover:text-[#9B8FF7] transition-colors" />
        </div>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-1.5 flex-wrap -mt-1">
        {tool.isNew && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#7C6EF5]/15 text-[#9B8FF7] border border-[#7C6EF5]/20 flex items-center gap-1">
            <Sparkles size={8} />
            New
          </span>
        )}
        {tool.isTrending && !tool.isNew && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1">
            <TrendingUp size={8} />
            Trending
          </span>
        )}
      </div>
    </motion.div>
  );
}