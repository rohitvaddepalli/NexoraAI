import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../../hooks/useFavorites';
import { useApp } from '../../context/AppContext';
import { getCategoryColor, getToolInitials, getToolGradient } from '../../utils/helpers';


function ToolIcon({ tool }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !tool.icon) {
    return (
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
        
        {getToolInitials(tool.name)}
      </div>);

  }

  return (
    <img
      src={tool.icon}
      alt={tool.name}
      loading="lazy"
      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
      onError={() => setHasError(true)} />);


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

  const pricingColor = {
    Free: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20',
    Freemium: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
    Paid: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20'
  };

  const categoryColor = getCategoryColor(tool.category);
  const favorited = isFavorite(tool.id);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:border-[#7C6EF5]/40 hover:shadow-[0_8px_32px_rgba(124,110,245,0.15)]">
      
      <Link to={`/tool/${tool.id}`} className="absolute inset-0 z-10 rounded-xl" aria-label={`View ${tool.name}`} />

      {}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-shrink-0">
          <ToolIcon tool={tool} />
        </div>
        <button
          onClick={handleFavorite}
          className={`relative z-20 w-8 h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
          favorited ?
          'text-[#7C6EF5] bg-[#7C6EF5]/10' :
          'text-[#3D3D52] hover:text-[#7C6EF5] hover:bg-[#7C6EF5]/10'}`
          }
          title={favorited ? 'Remove from favorites' : 'Add to favorites'}>
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={favorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4">
            
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {}
      <div>
        <div
          className="block text-[15px] font-semibold text-[#E8E8F0] group-hover:text-[#7C6EF5] transition-colors mb-1.5 leading-tight">
          
          {tool.name}
        </div>
        <span
          className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border"
          style={{
            color: categoryColor,
            backgroundColor: `${categoryColor}15`,
            borderColor: `${categoryColor}25`
          }}>
          
          {tool.category}
        </span>
      </div>

      {}
      <p className="text-[13px] text-[#666680] line-clamp-2 flex-1 leading-relaxed">
        {tool.description}
      </p>

      {}
      <div className="border-t border-[#1E1E2E]" />

      {}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${pricingColor[tool.pricing] || pricingColor.Paid}`}>
            {tool.pricing}
          </span>
          {tool.isNew &&
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#7C6EF5]/15 text-[#9B8FF7] border border-[#7C6EF5]/20 flex items-center gap-1">
              <Sparkles size={9} />
              New
            </span>
          }
          {tool.isTrending && !tool.isNew &&
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center gap-1">
              <TrendingUp size={9} />
              Trending
            </span>
          }
        </div>
        <div className="flex items-center gap-1 text-[12px] text-[#666680] flex-shrink-0">
          <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-[#E8E8F0] font-medium">{tool.rating}</span>
          <span>({(tool.reviewCount / 1000).toFixed(1)}k)</span>
        </div>
      </div>
    </motion.div>);

}