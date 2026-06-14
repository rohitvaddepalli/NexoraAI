import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ToolCard from '../components/ui/ToolCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import FilterChip from '../components/ui/FilterChip';
import EmptyState from '../components/ui/EmptyState';
import toolsData from '../data/tools.json';
import { useSearch } from '../hooks/useSearch';

const PAGE_SIZE = 9;

const FILTER_CHIPS = [
  { label: 'All', key: 'all' },
  { label: 'Free', key: 'free' },
  { label: 'Paid', key: 'paid' },
  { label: 'New', key: 'new' },
  { label: 'Trending', key: 'trending' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'free-first', label: 'Free First' },
];

export default function Explore() {
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const [sortOpen, setSortOpen] = useState(false);
  const { filterTools } = useSearch();

  useEffect(() => {
    document.title = 'Explore AI Tools — NexoraAI';
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const opts = {
      sort,
      isNew: activeFilter === 'new',
      isTrending: activeFilter === 'trending',
      pricing: activeFilter === 'free' ? ['Free'] : activeFilter === 'paid' ? ['Paid'] : [],
    };
    return filterTools(toolsData, opts);
  }, [activeFilter, sort, filterTools]);

  const displayed = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = displayed.length < filtered.length;

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label || 'Popular';

  return (
    <div className="min-h-screen pb-8 px-6 pt-6">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {FILTER_CHIPS.map(({ label, key }) => (
            <FilterChip
              key={key}
              label={label}
              active={activeFilter === key}
              onClick={() => { setActiveFilter(key); setPage(1); }}
            />
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#13131A] border border-[#1E1E2E] text-[#E8E8F0] text-sm font-medium hover:border-[#7C6EF5]/40 transition-all"
          >
            Sort by: {currentSortLabel}
            <ChevronDown size={14} className={`text-[#666680] transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          {sortOpen && (
            <div className="absolute top-full mt-1 right-0 bg-[#1A1A24] border border-[#1E1E2E] rounded-xl p-1.5 w-44 z-30 shadow-xl">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setSortOpen(false); setPage(1); }}
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
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No tools found"
          subtitle="Try adjusting your filters"
          action={{ label: 'Show All', onClick: () => { setActiveFilter('all'); setPage(1); } }}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {displayed.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} index={i} />
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-8 py-2.5 rounded-lg border border-[#7C6EF5]/50 text-[#7C6EF5] hover:bg-[#7C6EF5]/10 transition-all text-sm font-medium"
              >
                Load More Tools
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}