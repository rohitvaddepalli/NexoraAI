import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, Clock, Star } from 'lucide-react';
import SkeletonCard from '../components/ui/SkeletonCard';
import toolsData from '../data/tools.json';
import { useSearch } from '../hooks/useSearch';
import { useFavorites } from '../hooks/useFavorites';
import { getToolInitials, getToolGradient, getCategoryColor } from '../utils/helpers';

const POPULAR_SEARCHES = ['image generation', 'writing', 'coding', 'video', 'voice'];

const CATEGORY_FILTERS = [
  { label: 'Image Generation', key: 'Image Generation' },
  { label: 'Video Generation', key: 'Video & Audio' },
  { label: 'Design Assets', key: 'Image Generation' },
];

function SearchToolCard({ tool }) {
  const [imgError, setImgError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(tool.id);

  const pricingColors = {
    Free: 'bg-[#22C55E]',
    Freemium: 'bg-[#7C6EF5]',
    Paid: 'bg-[#F59E0B]',
    'Open Source': 'bg-[#06B6D4]',
  };
  const badgeColor = pricingColors[tool.pricing] || 'bg-[#7C6EF5]';

  return (
    <Link
      to={`/tool/${tool.id}`}
      className="group bg-[#13131A] border border-[#1E1E2E] rounded-xl overflow-hidden hover:border-[#7C6EF5]/40 hover:shadow-[0_8px_32px_rgba(124,110,245,0.12)] transition-all block"
    >
      {/* Thumbnail */}
      <div className="relative h-40 bg-[#1A1A24] overflow-hidden">
        {!imgError && tool.screenshots?.[0] ? (
          <img
            src={tool.screenshots[0]}
            alt={tool.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center`}
          >
            <span className="text-white text-3xl font-bold opacity-60">{getToolInitials(tool.name)}</span>
          </div>
        )}
        {/* Pricing badge */}
        <span className={`absolute top-2.5 right-2.5 text-[11px] font-semibold text-white px-2 py-0.5 rounded-full ${badgeColor}`}>
          {tool.pricing}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2.5 mb-2">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {getToolInitials(tool.name)}
          </div>
          <div>
            <div className="text-[14px] font-semibold text-[#E8E8F0] group-hover:text-[#9B8FF7] transition-colors leading-tight">
              {tool.name}
            </div>
            <div
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: getCategoryColor(tool.category) }}
            >
              {tool.category}
            </div>
          </div>
        </div>
        <p className="text-[12px] text-[#666680] line-clamp-2 mb-3 leading-relaxed">
          {tool.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-[12px] text-[#E8E8F0] font-medium">{tool.rating}</span>
          </div>
          <button
            onClick={(e) => { e.preventDefault(); toggleFavorite(tool.id); }}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
              favorited ? 'text-[#7C6EF5] bg-[#7C6EF5]/10' : 'text-[#3D3D52] hover:text-[#7C6EF5]'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [activePricing, setActivePricing] = useState([]);
  const [sort, setSort] = useState('popular');
  const { recentSearches, removeRecentSearch, clearRecentSearches, filterTools, addRecentSearch } = useSearch();

  useEffect(() => {
    document.title = query ? `"${query}" — NexoraAI Search` : 'Search — NexoraAI';
    if (query) addRecentSearch(query);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    return filterTools(toolsData, { query, pricing: activePricing, sort });
  }, [query, activePricing, sort, filterTools]);

  const togglePricing = (p) => {
    setActivePricing((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const Checkbox = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border flex items-center justify-center transition-all flex-shrink-0 ${
          checked ? 'bg-[#7C6EF5] border-[#7C6EF5]' : 'border-[#3D3D52] group-hover:border-[#7C6EF5]'
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span onClick={onChange} className="text-sm text-[#666680] group-hover:text-[#E8E8F0] transition-colors flex-1">
        {label}
      </span>
    </label>
  );

  return (
    <div className="min-h-screen pt-[60px] pb-20 flex">
      {/* Left filter panel */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 fixed left-0 top-[60px] bottom-0 overflow-y-auto border-r border-[#1E1E2E] bg-[#0D0D14] px-5 py-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[13px] font-semibold text-[#E8E8F0]">Filters</h3>
          {(activePricing.length > 0) && (
            <button
              onClick={() => setActivePricing([])}
              className="text-xs text-[#7C6EF5] hover:text-[#9B8FF7] transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Category */}
        <div className="mb-6">
          <p className="text-[10px] font-semibold text-[#3D3D52] uppercase tracking-widest mb-3">Category</p>
          {[
            { label: 'Image Generation', count: 24 },
            { label: 'Video Generation', count: 8 },
            { label: 'Design Assets', count: 12 },
          ].map(({ label, count }) => (
            <label key={label} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-[#3D3D52] group-hover:border-[#7C6EF5] transition-all flex-shrink-0" />
              <span className="text-sm text-[#666680] group-hover:text-[#E8E8F0] transition-colors flex-1">
                {label}
              </span>
              <span className="text-[11px] text-[#3D3D52]">{count}</span>
            </label>
          ))}
        </div>

        {/* Pricing */}
        <div>
          <p className="text-[10px] font-semibold text-[#3D3D52] uppercase tracking-widest mb-3">Pricing</p>
          <Checkbox label="Free" checked={activePricing.includes('Free')} onChange={() => togglePricing('Free')} />
          <Checkbox label="Freemium" checked={activePricing.includes('Freemium')} onChange={() => togglePricing('Freemium')} />
          <Checkbox label="Paid" checked={activePricing.includes('Paid')} onChange={() => togglePricing('Paid')} />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 lg:ml-64 px-5 lg:px-8 py-6">
        {/* Heading */}
        <div className="mb-5">
          {query ? (
            <>
              <h1 className="text-2xl font-bold text-[#E8E8F0] mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                Results for <span className="text-[#7C6EF5]">"{query}"</span>
              </h1>
              <p className="text-sm text-[#666680]">Showing {results.length} results</p>
            </>
          ) : (
            <h1 className="text-2xl font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
              Search AI Tools
            </h1>
          )}
        </div>

        {/* Recent searches */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-sm text-[#666680]">Recent:</span>
            {recentSearches.map((term) => (
              <div key={term} className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1A1A24] border border-[#1E1E2E] text-sm text-[#666680]">
                <Link to={`/search?q=${encodeURIComponent(term)}`} className="hover:text-[#E8E8F0] transition-colors">
                  {term}
                </Link>
                <button onClick={() => removeRecentSearch(term)} className="text-[#3D3D52] hover:text-[#666680] ml-1">
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Results grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : results.length === 0 && query ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1A1A24] flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              No exact matches found
            </h3>
            <p className="text-[#666680] text-sm mb-6 max-w-sm mx-auto">
              We couldn't find anything matching your specific filters. Try adjusting your search or explore popular tools below.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_SEARCHES.map((s) => (
                <Link
                  key={s}
                  to={`/search?q=${encodeURIComponent(s)}`}
                  className="px-3 py-1.5 rounded-full bg-[#1A1A24] border border-[#1E1E2E] text-sm text-[#666680] hover:border-[#7C6EF5]/50 hover:text-[#9B8FF7] transition-all"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((tool, i) => (
              <SearchToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}