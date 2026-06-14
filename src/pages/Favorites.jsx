import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { getToolInitials, getToolGradient, getCategoryColor } from '../utils/helpers';

function FavoriteCard({ tool, index }) {
  const color = getCategoryColor(tool.category);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.04 }}
      className="group"
    >
      <Link
        to={`/tool/${tool.id}`}
        className="block bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5 hover:border-[#7C6EF5]/40 hover:shadow-[0_8px_32px_rgba(124,110,245,0.12)] transition-all h-full"
      >
        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white text-xl font-bold mb-4`}
        >
          {getToolInitials(tool.name)}
        </div>

        {/* Name */}
        <h3 className="text-[15px] font-bold text-[#E8E8F0] mb-2 group-hover:text-[#9B8FF7] transition-colors" style={{ fontFamily: 'Space Grotesk' }}>
          {tool.name}
        </h3>

        {/* Description */}
        <p className="text-[12px] text-[#666680] line-clamp-3 leading-relaxed mb-4">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {(tool.tags || [tool.category]).slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full border font-medium"
              style={{
                color,
                backgroundColor: `${color}12`,
                borderColor: `${color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

export default function Favorites() {
  const { favoritedTools } = useFavorites();
  const [sort, setSort] = useState('recent');
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => { document.title = 'Your Favorites — NexoraAI'; }, []);

  const sorted = [...favoritedTools].sort((a, b) => {
    if (sort === 'az') return a.name.localeCompare(b.name);
    if (sort === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const SORT_OPTIONS = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'az', label: 'A–Z' },
    { value: 'category', label: 'By Category' },
  ];

  const currentLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || 'Recently Added';

  return (
    <div className="min-h-screen pb-8 px-6 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
            Your Favorites
          </h1>
          {favoritedTools.length > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-[#7C6EF5]/15 text-[#9B8FF7] text-[13px] font-semibold border border-[#7C6EF5]/20">
              {favoritedTools.length}
            </span>
          )}
        </div>

        {/* Sort dropdown */}
        {favoritedTools.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#13131A] border border-[#1E1E2E] text-[#E8E8F0] text-sm font-medium hover:border-[#7C6EF5]/40 transition-all"
            >
              {currentLabel}
              <ChevronDown size={14} className={`text-[#666680] transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
            </button>
            {sortOpen && (
              <div className="absolute top-full mt-1 right-0 bg-[#1A1A24] border border-[#1E1E2E] rounded-xl p-1.5 w-44 z-30 shadow-xl">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSort(opt.value); setSortOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      sort === opt.value
                        ? 'text-[#9B8FF7] bg-[#7C6EF5]/10'
                        : 'text-[#666680] hover:text-[#E8E8F0] hover:bg-[#13131A]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Empty state */}
      {favoritedTools.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-[#1A1A24] flex items-center justify-center mb-5"
          >
            <Heart size={36} className="text-[#3D3D52]" />
          </motion.div>
          <h3 className="text-xl font-semibold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            No favorites yet
          </h3>
          <p className="text-[#666680] text-sm mb-6 max-w-xs">
            Start exploring and save the tools you love for quick access later.
          </p>
          <Link
            to="/explore"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            Explore Tools
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {sorted.map((tool, i) => (
              <FavoriteCard key={tool.id} tool={tool} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}