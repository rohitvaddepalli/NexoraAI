import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, SortAsc } from 'lucide-react';
import EmptyState from '../components/ui/EmptyState';
import toolsData from '../data/tools.json';
import { slugToCategory, getCategoryGradient, getCategoryEmoji, getCategoryColor, getToolInitials, getToolGradient } from '../utils/helpers';
import { useSearch } from '../hooks/useSearch';
import { useFavorites } from '../hooks/useFavorites';

const getSubcategories = (tools) => {
  const subs = new Set(['All']);
  tools.forEach((t) => { if (t.subcategory) subs.add(t.subcategory); });
  return [...subs];
};

function TrendingCard({ tool, index }) {
  const color = getCategoryColor(tool.category);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="relative flex-shrink-0 w-64 bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5 hover:border-[#7C6EF5]/40 hover:shadow-[0_8px_32px_rgba(124,110,245,0.12)] transition-all group"
    >
      <Link to={`/tool/${tool.id}`} className="absolute inset-0 z-10 rounded-xl" aria-label={`View ${tool.name}`} />

      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white text-sm font-bold`}>
          {getToolInitials(tool.name)}
        </div>
        {tool.isFeatured && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#7C6EF5]/15 text-[#9B8FF7] border border-[#7C6EF5]/20 uppercase tracking-wider">
            Featured
          </span>
        )}
      </div>
      <h3 className="text-[14px] font-bold text-[#E8E8F0] mb-1.5 group-hover:text-[#9B8FF7] transition-colors">
        {tool.name}
      </h3>
      <p className="text-[12px] text-[#666680] line-clamp-2 mb-3 leading-relaxed">{tool.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {(tool.tags || []).slice(0, 2).map((tag) => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A1A24] border border-[#1E1E2E] text-[#666680]">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-[12px] font-medium text-[#7C6EF5]">
        <span>{tool.pricing}</span>
        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.div>
  );
}

function AllToolCard({ tool, index }) {
  const color = getCategoryColor(tool.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="relative group bg-[#13131A] border border-[#1E1E2E] rounded-xl p-4 hover:border-[#7C6EF5]/40 hover:shadow-[0_8px_32px_rgba(124,110,245,0.12)] transition-all cursor-pointer"
    >
      {/* Full-card clickable overlay */}
      <Link to={`/tool/${tool.id}`} className="absolute inset-0 z-10 rounded-xl" aria-label={`View ${tool.name}`} />

      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
          {getToolInitials(tool.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-semibold text-[#E8E8F0] truncate group-hover:text-[#9B8FF7] transition-colors">
            {tool.name}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={11} className="text-[#F59E0B] fill-[#F59E0B]" />
            <span className="text-[11px] text-[#E8E8F0] font-medium">{tool.rating}</span>
            <span className="text-[11px] text-[#3D3D52]">({(tool.reviewCount / 1000).toFixed(1)}k)</span>
          </div>
        </div>
      </div>
      <p className="text-[12px] text-[#666680] line-clamp-3 mb-4 leading-relaxed">{tool.description}</p>
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-medium ${
          tool.pricing === 'Free' ? 'text-[#22C55E]' : tool.pricing === 'Freemium' ? 'text-[#F59E0B]' : 'text-[#3D3D52]'
        }`}>
          {tool.pricing === 'Free' ? 'Free Tier' : tool.pricing === 'Paid' ? 'Paid' : 'Freemium'}
        </span>
        <span className="text-[12px] font-semibold text-[#7C6EF5] group-hover:text-[#9B8FF7] transition-colors flex items-center gap-1">
          View Details
        </span>
      </div>
    </motion.div>
  );
}

export default function CategoryPage() {
  const { slug } = useParams();
  const category = slugToCategory(slug);
  const [activeSub, setActiveSub] = useState('All');
  const [sort, setSort] = useState('popular');
  const { filterTools } = useSearch();
  const scrollRef = useRef(null);

  useEffect(() => {
    document.title = `${category} AI Tools — NexoraAI`;
  }, [category]);

  const categoryTools = useMemo(() => toolsData.filter((t) => t.category === category), [category]);
  const subcategories = useMemo(() => getSubcategories(categoryTools), [categoryTools]);

  const displayed = useMemo(() => {
    let tools = categoryTools;
    if (activeSub !== 'All') tools = tools.filter((t) => t.subcategory === activeSub);
    return filterTools(tools, { sort });
  }, [categoryTools, activeSub, sort, filterTools]);

  const trending = categoryTools.filter((t) => t.isFeatured || t.isTrending).slice(0, 6);
  const gradient = getCategoryGradient(category);
  const emoji = getCategoryEmoji(category);
  const color = getCategoryColor(category);

  return (
    <div className="min-h-screen pb-8">
      {/* Category hero banner */}
      <div
        className="relative overflow-hidden border-b border-[#1E1E2E]"
        style={{ background: 'linear-gradient(135deg, #13131A 0%, #1A1630 100%)' }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-15`} />
        <div className="relative px-6 py-10 flex items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1A1A24] border border-[#1E1E2E] flex items-center justify-center text-xl flex-shrink-0">
              <span className="text-[10px] font-semibold text-[#666680] uppercase tracking-widest">
                {emoji}
              </span>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-[#666680] uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#1A1A24] flex items-center justify-center text-[8px]">
                  {emoji}
                </div>
                CATEGORY
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                {category}
              </h1>
              <p className="text-[13px] text-[#666680] max-w-md leading-relaxed">
                Accelerate your development workflow with state-of-the-art AI tools. Build faster, break less.
              </p>
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end flex-shrink-0">
            <div className="text-5xl font-black text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
              {categoryTools.length}
            </div>
            <div className="text-[10px] font-semibold text-[#3D3D52] uppercase tracking-widest">TOOLS INDEXED</div>
          </div>
        </div>
      </div>

      {/* Subcategory chips */}
      <div className="px-6 py-4 border-b border-[#1E1E2E] flex gap-2 overflow-x-auto hide-scrollbar">
        {subcategories.map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSub(sub)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeSub === sub
                ? 'bg-[#7C6EF5] text-white'
                : 'bg-[#13131A] border border-[#1E1E2E] text-[#666680] hover:border-[#7C6EF5]/40 hover:text-[#E8E8F0]'
            }`}
          >
            {sub === 'All' ? `All ${category.split(' ')[0]}` : sub}
          </button>
        ))}
      </div>

      <div className="px-6 py-6">
        {/* Trending Now */}
        {trending.length > 0 && activeSub === 'All' && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-base">🔥</span>
              <h2 className="text-lg font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
                Trending Now
              </h2>
            </div>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto hide-scrollbar pb-2"
            >
              {trending.map((tool, i) => (
                <TrendingCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* All tools grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
              All {category} Tools
            </h2>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-1.5 text-sm text-[#666680] focus:border-[#7C6EF5] focus:outline-none transition-all"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="newest">Newest</option>
              <option value="top-rated">Top Rated</option>
              <option value="free-first">Free First</option>
            </select>
          </div>

          {displayed.length === 0 ? (
            <EmptyState
              title="No tools found"
              subtitle="Try a different subcategory filter"
              action={{ label: 'Show All', onClick: () => setActiveSub('All') }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {displayed.map((tool, i) => (
                <AllToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}