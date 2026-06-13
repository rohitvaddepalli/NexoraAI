import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ToolCard from '../components/ui/ToolCard';
import FilterChip from '../components/ui/FilterChip';
import EmptyState from '../components/ui/EmptyState';
import toolsData from '../data/tools.json';
import { slugToCategory, getCategoryGradient, getCategoryEmoji, getCategoryColor } from '../utils/helpers';
import { useSearch } from '../hooks/useSearch';

const getSubcategories = (tools) => {
  const subs = new Set(['All']);
  tools.forEach((t) => {if (t.subcategory) subs.add(t.subcategory);});
  return [...subs];
};

export default function CategoryPage() {
  const { slug } = useParams();
  const category = slugToCategory(slug);
  const [activeSub, setActiveSub] = useState('All');
  const [sort, setSort] = useState('popular');
  const { filterTools } = useSearch();

  useEffect(() => {
    document.title = `${category} AI Tools — NexoraAI`;
  }, [category]);

  const categoryTools = useMemo(
    () => toolsData.filter((t) => t.category === category),
    [category]
  );

  const subcategories = useMemo(() => getSubcategories(categoryTools), [categoryTools]);

  const displayed = useMemo(() => {
    let tools = categoryTools;
    if (activeSub !== 'All') {
      tools = tools.filter((t) => t.subcategory === activeSub);
    }
    return filterTools(tools, { sort });
  }, [categoryTools, activeSub, sort, filterTools]);

  const featured = categoryTools.filter((t) => t.isFeatured || t.isTrending).slice(0, 4);
  const gradient = getCategoryGradient(category);
  const emoji = getCategoryEmoji(category);
  const color = getCategoryColor(category);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {}
      <div className={`relative pt-16 overflow-hidden`} style={{ height: 220 }}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0A0F]`} />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl mb-2">
            
            {emoji}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-[#E8E8F0] mb-1"
            style={{ fontFamily: 'Space Grotesk' }}>
            
            {category}
          </motion.h1>
          <p className="text-sm text-[#E8E8F0]/60 mb-2">
            {categoryTools.length} tools available
          </p>
          <div
            className="inline-block text-xs px-3 py-1 rounded-full font-medium"
            style={{ color, backgroundColor: `${color}20`, border: `1px solid ${color}30` }}>
            
            {categoryTools.length} Tools Found
          </div>
        </div>
      </div>

      <div className="px-4 max-w-[1100px] mx-auto">
        {}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar py-4">
          {subcategories.map((sub) =>
          <FilterChip
            key={sub}
            label={sub}
            active={activeSub === sub}
            onClick={() => setActiveSub(sub)} />

          )}
        </div>

        {}
        {featured.length > 0 && activeSub === 'All' &&
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
                ⭐ Top Picks
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((tool, i) =>
            <ToolCard key={tool.id} tool={tool} index={i} />
            )}
            </div>
          </div>
        }

        {}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="text-sm text-[#666680]">
            Showing <span className="text-[#E8E8F0] font-medium">{displayed.length}</span> tools
          </span>
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
        {displayed.length === 0 ?
        <EmptyState
          title="No tools found"
          subtitle="Try a different subcategory filter"
          action={{ label: 'Show All', onClick: () => setActiveSub('All') }} /> :


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayed.map((tool, i) =>
          <ToolCard key={tool.id} tool={tool} index={i} />
          )}
          </div>
        }
      </div>
    </div>);

}