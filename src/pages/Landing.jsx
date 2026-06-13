import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import ToolCard from '../components/ui/ToolCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import toolsData from '../data/tools.json';
import { getCategories, getCategoryGradient, getCategoryEmoji, categoryToSlug } from '../utils/helpers';

const CATEGORIES = getCategories(toolsData);
const FEATURED = toolsData.filter((t) => t.isFeatured);
const TRENDING = toolsData.filter((t) => t.isTrending).slice(0, 6);

const TRENDING_CATEGORIES = [
'Writing & Productivity', 'Coding & Dev', 'Image Generation',
'Video & Audio', 'Research & Analysis', 'Voice & Speech'];


const STATS = [
{ value: '40+', label: 'Tools' },
{ value: '8', label: 'Categories' },
{ value: 'Daily', label: 'Updated' }];


export default function Landing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'NexoraAI — Discover the Best AI Tools';
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {}
      <section className="relative overflow-hidden pt-24 pb-20 px-4">
        {}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="animate-float absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, #7C6EF5 0%, transparent 70%)' }} />
          
          <div
            className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{
              background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
              animation: 'float 8s ease-in-out infinite reverse'
            }} />
          
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C6EF5]/10 border border-[#7C6EF5]/20 text-[#9B8FF7] text-xs font-medium mb-6">
              <Sparkles size={12} />
              Your AI Tool Discovery Platform
            </div>

            <h1
              className="text-5xl md:text-6xl font-bold text-[#E8E8F0] mb-5 leading-tight"
              style={{ fontFamily: 'Space Grotesk' }}>
              
              Discover the{' '}
              <span className="gradient-text">Best AI Tools.</span>
            </h1>

            <p className="text-lg text-[#666680] mb-8 max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
              Search, explore, and curate AI tools across every category. Build your perfect AI toolkit.
            </p>

            <SearchBar
              className="max-w-[600px] mx-auto mb-6"
              placeholder="Search 40+ AI tools..." />
            

            {}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {TRENDING_CATEGORIES.map((cat) =>
              <Link
                key={cat}
                to={`/category/${categoryToSlug(cat)}`}
                className="px-3 py-1.5 rounded-full bg-[#1A1A24] border border-[#1E1E2E] text-[#666680] text-xs hover:border-[#7C6EF5]/50 hover:text-[#9B8FF7] transition-all flex items-center gap-1.5">
                
                  <span>{getCategoryEmoji(cat)}</span>
                  {cat}
                </Link>
              )}
            </div>

            {}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/explore"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white font-medium text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(124,110,245,0.3)]">
                
                Explore All Tools
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/search"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#1E1E2E] text-[#666680] hover:border-[#7C6EF5]/50 hover:text-[#E8E8F0] font-medium text-sm transition-all">
                
                Browse Categories
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {}
      <section className="border-y border-[#1E1E2E] py-5 px-4">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-0">
          {STATS.map(({ value, label }, i) =>
          <div key={label} className="flex items-center">
              <div className="text-center px-8 md:px-14">
                <div className="text-2xl font-bold text-[#7C6EF5]" style={{ fontFamily: 'Space Grotesk' }}>
                  {value}
                </div>
                <div className="text-xs text-[#666680] mt-0.5">{label}</div>
              </div>
              {i < STATS.length - 1 &&
            <div className="w-px h-10 bg-[#1E1E2E]" />
            }
            </div>
          )}
        </div>
      </section>

      {}
      <section className="py-14 px-4 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-[#7C6EF5]" />
              <span className="text-xs font-semibold text-[#666680] uppercase tracking-widest">Featured</span>
            </div>
            <h2 className="text-2xl font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
              Featured Tools
            </h2>
          </div>
          <Link to="/explore" className="text-[#7C6EF5] hover:text-[#9B8FF7] text-sm font-medium flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div> :

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED.map((tool, i) =>
          <ToolCard key={tool.id} tool={tool} index={i} />
          )}
          </div>
        }
      </section>

      {}
      <section className="py-14 px-4 bg-[#13131A]/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              Browse by Category
            </h2>
            <p className="text-[#666680] text-sm">Find the perfect AI tool for your specific needs</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(({ name, count }, i) =>
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}>
              
                <Link
                to={`/category/${categoryToSlug(name)}`}
                className="block bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5 hover:border-[#7C6EF5]/40 hover:shadow-[0_8px_32px_rgba(124,110,245,0.1)] transition-all group">
                
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryGradient(name)} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform`}>
                    {getCategoryEmoji(name)}
                  </div>
                  <div className="text-sm font-semibold text-[#E8E8F0] mb-1">{name}</div>
                  <div className="text-xs text-[#3D3D52]">{count} tools</div>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {}
      <section className="py-14 px-4 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className="text-orange-400" />
              <span className="text-xs font-semibold text-[#666680] uppercase tracking-widest">Hot Right Now</span>
            </div>
            <h2 className="text-2xl font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
              Trending Right Now
            </h2>
          </div>
          <Link to="/explore" className="text-[#7C6EF5] hover:text-[#9B8FF7] text-sm font-medium flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRENDING.map((tool, i) =>
          <ToolCard key={tool.id} tool={tool} index={i} />
          )}
        </div>
      </section>
    </div>);

}