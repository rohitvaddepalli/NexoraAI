import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { X, Clock } from 'lucide-react';
import ToolCard from '../components/ui/ToolCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import FilterChip from '../components/ui/FilterChip';
import toolsData from '../data/tools.json';
import { useSearch } from '../hooks/useSearch';

const POPULAR_SEARCHES = ['image generation', 'writing', 'coding', 'video', 'voice'];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('popular');
  const [activePricing, setActivePricing] = useState([]);
  const { recentSearches, removeRecentSearch, clearRecentSearches, filterTools, addRecentSearch } = useSearch();

  useEffect(() => {
    document.title = query ? `"${query}" — NexoraAI Search` : 'Search — NexoraAI';
    if (query) addRecentSearch(query);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => {
    return filterTools(toolsData, {
      query,
      pricing: activePricing,
      sort
    });
  }, [query, activePricing, sort, filterTools]);

  const togglePricing = (p) => {
    setActivePricing((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="max-w-[1100px] mx-auto">
        {}
        <div className="mb-6">
          {query ?
          <>
              <h1 className="text-2xl font-bold text-[#E8E8F0] mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                Results for <span className="text-[#7C6EF5]">"{query}"</span>
              </h1>
              <p className="text-sm text-[#666680]">
                Found <span className="text-[#E8E8F0] font-medium">{results.length}</span> tools
              </p>
            </> :

          <h1 className="text-2xl font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
              Search AI Tools
            </h1>
          }
        </div>

        {}
        {recentSearches.length > 0 &&
        <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#3D3D52] uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={12} />
                Recent Searches
              </span>
              <button
              onClick={clearRecentSearches}
              className="text-xs text-[#3D3D52] hover:text-[#7C6EF5] transition-colors">
              
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) =>
            <div key={term} className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#1A1A24] border border-[#1E1E2E] text-sm text-[#666680]">
                  <Link to={`/search?q=${encodeURIComponent(term)}`} className="hover:text-[#E8E8F0] transition-colors">
                    {term}
                  </Link>
                  <button onClick={() => removeRecentSearch(term)} className="text-[#3D3D52] hover:text-[#666680] ml-1">
                    <X size={11} />
                  </button>
                </div>
            )}
            </div>
          </div>
        }

        {}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap gap-2">
            <FilterChip label="Free" active={activePricing.includes('Free')} onClick={() => togglePricing('Free')} />
            <FilterChip label="Freemium" active={activePricing.includes('Freemium')} onClick={() => togglePricing('Freemium')} />
            <FilterChip label="Paid" active={activePricing.includes('Paid')} onClick={() => togglePricing('Paid')} />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-[#1A1A24] border border-[#1E1E2E] rounded-lg px-3 py-1.5 text-sm text-[#666680] focus:border-[#7C6EF5] transition-all">
            
            <option value="popular">Popular</option>
            <option value="newest">Newest</option>
            <option value="top-rated">Top Rated</option>
            <option value="free-first">Free First</option>
          </select>
        </div>

        {}
        {loading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div> :
        results.length === 0 && query ?
        <div className="py-16 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              No results for "{query}"
            </h3>
            <p className="text-[#666680] text-sm mb-6">Try searching for something else</p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_SEARCHES.map((s) =>
            <Link
              key={s}
              to={`/search?q=${encodeURIComponent(s)}`}
              className="px-3 py-1.5 rounded-full bg-[#1A1A24] border border-[#1E1E2E] text-sm text-[#666680] hover:border-[#7C6EF5]/50 hover:text-[#9B8FF7] transition-all">
              
                  {s}
                </Link>
            )}
            </div>
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((tool, i) =>
          <ToolCard key={tool.id} tool={tool} index={i} />
          )}
          </div>
        }
      </div>
    </div>);

}