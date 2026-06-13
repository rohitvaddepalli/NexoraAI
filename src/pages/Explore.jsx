import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import ToolCard from '../components/ui/ToolCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import FilterChip from '../components/ui/FilterChip';
import EmptyState from '../components/ui/EmptyState';
import toolsData from '../data/tools.json';
import { getCategories, categoryToSlug, getCategoryEmoji, getCategoryColor } from '../utils/helpers';
import { useSearch } from '../hooks/useSearch';
import { Link } from 'react-router-dom';

const CATEGORIES = getCategories(toolsData);
const PAGE_SIZE = 9;

export default function Explore() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePricing, setActivePricing] = useState([]);
  const [activePlatform, setActivePlatform] = useState([]);
  const [filterNew, setFilterNew] = useState(false);
  const [filterTrending, setFilterTrending] = useState(false);
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const { filterTools } = useSearch();

  useEffect(() => {
    document.title = 'Explore AI Tools — NexoraAI';
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const togglePricing = (p) => {
    setActivePricing((prev) =>
    prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
    setPage(1);
  };

  const togglePlatform = (p) => {
    setActivePlatform((prev) =>
    prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
    setPage(1);
  };

  const filtered = useMemo(
    () =>
    filterTools(toolsData, {
      category: activeCategory,
      pricing: activePricing,
      platform: activePlatform,
      isNew: filterNew,
      isTrending: filterTrending,
      sort
    }),
    [activeCategory, activePricing, activePlatform, filterNew, filterTrending, sort, filterTools]
  );

  const displayed = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = displayed.length < filtered.length;

  const clearFilters = () => {
    setActiveCategory('All');
    setActivePricing([]);
    setActivePlatform([]);
    setFilterNew(false);
    setFilterTrending(false);
    setPage(1);
  };

  return (
    <div className="flex min-h-screen pt-16">
      {}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 fixed left-0 top-16 bottom-0 overflow-y-auto border-r border-[#1E1E2E] bg-[#13131A] px-4 py-6">
        <div>
          <p className="text-[10px] font-semibold text-[#3D3D52] uppercase tracking-widest mb-3">Categories</p>
          <button
            onClick={() => {setActiveCategory('All');setPage(1);}}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm mb-1 transition-all ${
            activeCategory === 'All' ?
            'bg-[#7C6EF5]/15 text-[#9B8FF7] border-l-2 border-[#7C6EF5]' :
            'text-[#666680] hover:bg-[#1A1A24]'}`
            }>
            
            <span className="flex items-center gap-2">
              <span>🤖</span> All Tools
            </span>
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${activeCategory === 'All' ? 'bg-[#7C6EF5]/20 text-[#9B8FF7]' : 'bg-[#1A1A24] text-[#3D3D52]'}`}>
              {toolsData.length}
            </span>
          </button>
          {CATEGORIES.map(({ name, count }) =>
          <button
            key={name}
            onClick={() => {setActiveCategory(name);setPage(1);}}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm mb-1 transition-all ${
            activeCategory === name ?
            'bg-[#7C6EF5]/15 text-[#9B8FF7] border-l-2 border-[#7C6EF5]' :
            'text-[#666680] hover:bg-[#1A1A24]'}`
            }>
            
              <span className="flex items-center gap-2 truncate">
                <span>{getCategoryEmoji(name)}</span>
                <span className="truncate">{name}</span>
              </span>
              <span className={`flex-shrink-0 text-[11px] px-1.5 py-0.5 rounded-full ml-1 ${activeCategory === name ? 'bg-[#7C6EF5]/20 text-[#9B8FF7]' : 'bg-[#1A1A24] text-[#3D3D52]'}`}>
                {count}
              </span>
            </button>
          )}
        </div>

        <div className="border-t border-[#1E1E2E] my-4" />

        {}
        <div className="mb-5">
          <p className="text-[10px] font-semibold text-[#3D3D52] uppercase tracking-widest mb-3">Pricing</p>
          {['Free', 'Freemium', 'Paid'].map((p) =>
          <label key={p} className="flex items-center gap-2 py-1.5 cursor-pointer group">
              <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
              activePricing.includes(p) ? 'bg-[#7C6EF5] border-[#7C6EF5]' : 'border-[#3D3D52] group-hover:border-[#7C6EF5]'}`
              }
              onClick={() => togglePricing(p)}>
              
                {activePricing.includes(p) &&
              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              }
              </div>
              <span onClick={() => togglePricing(p)} className="text-sm text-[#666680] group-hover:text-[#E8E8F0] transition-colors">
                {p}
              </span>
            </label>
          )}
        </div>

        {}
        <div>
          <p className="text-[10px] font-semibold text-[#3D3D52] uppercase tracking-widest mb-3">Platform</p>
          {['Web', 'iOS', 'Android', 'API'].map((p) =>
          <label key={p} className="flex items-center gap-2 py-1.5 cursor-pointer group">
              <div
              className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
              activePlatform.includes(p) ? 'bg-[#7C6EF5] border-[#7C6EF5]' : 'border-[#3D3D52] group-hover:border-[#7C6EF5]'}`
              }
              onClick={() => togglePlatform(p)}>
              
                {activePlatform.includes(p) &&
              <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
              }
              </div>
              <span onClick={() => togglePlatform(p)} className="text-sm text-[#666680] group-hover:text-[#E8E8F0] transition-colors">
                {p}
              </span>
            </label>
          )}
        </div>
      </aside>

      {}
      <main className="flex-1 lg:ml-60 px-4 py-6">
        <div className="max-w-[900px]">
          {}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-[#666680]">
                Showing <span className="text-[#E8E8F0] font-medium">{filtered.length}</span> tools
              </span>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="All" active={!filterNew && !filterTrending} onClick={() => {setFilterNew(false);setFilterTrending(false);setPage(1);}} />
                <FilterChip label="Free" active={activePricing.includes('Free')} onClick={() => togglePricing('Free')} />
                <FilterChip label="New" active={filterNew} onClick={() => {setFilterNew(!filterNew);setPage(1);}} />
                <FilterChip label="Trending" active={filterTrending} onClick={() => {setFilterTrending(!filterTrending);setPage(1);}} />
              </div>
            </div>
            <select
              value={sort}
              onChange={(e) => {setSort(e.target.value);setPage(1);}}
              className="bg-[#1A1A24] border border-[#1E1E2E] rounded-lg px-3 py-1.5 text-sm text-[#666680] focus:border-[#7C6EF5] transition-all">
              
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="top-rated">Top Rated</option>
              <option value="free-first">Free First</option>
            </select>
          </div>

          {}
          {loading ?
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {[...Array(9)].map((_, i) => <SkeletonCard key={i} />)}
            </div> :
          filtered.length === 0 ?
          <EmptyState
            title="No tools found"
            subtitle="Try adjusting your filters or search for something else"
            action={{ label: 'Clear Filters', onClick: clearFilters }} /> :


          <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {displayed.map((tool, i) =>
              <ToolCard key={tool.id} tool={tool} index={i} />
              )}
              </div>
              {hasMore &&
            <div className="text-center mt-8">
                  <button
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-2.5 rounded-lg border border-[#7C6EF5] text-[#7C6EF5] hover:bg-[#7C6EF5]/10 transition-all text-sm font-medium">
                
                    Load More
                  </button>
                </div>
            }
            </>
          }
        </div>
      </main>
    </div>);

}