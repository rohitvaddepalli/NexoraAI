import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { categoryToSlug } from '../utils/helpers';

const TRENDING_TAGS = [
  { label: 'Writing', slug: 'writing-productivity' },
  { label: 'Coding', slug: 'coding-dev' },
  { label: 'Design', slug: 'image-generation' },
  { label: 'Video', slug: 'video-audio' },
  { label: 'Voice', slug: 'voice-speech' },
];

export default function Landing() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = 'NexoraAI — Discover the Best AI Tools';
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 pt-24 pb-20 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06]"
            style={{ background: 'radial-gradient(circle, #7C6EF5 0%, transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
            style={{ background: 'radial-gradient(circle, #9B8FF7 0%, transparent 65%)' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto text-center w-full"
        >
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#E8E8F0] mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            Discover the Best AI Tools.<br />
            <span className="text-[#9B8FF7]">All in One Place.</span>
          </h1>

          <p className="text-[#666680] text-lg mb-10 max-w-lg mx-auto" style={{ fontFamily: 'Inter' }}>
            Search, explore, and curate AI tools across every category.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-[560px] mx-auto mb-6">
            <div className="flex items-center bg-[#13131A] border border-[#1E1E2E] rounded-2xl px-5 py-3.5 gap-3 hover:border-[#7C6EF5]/40 focus-within:border-[#7C6EF5]/60 transition-all shadow-[0_0_40px_rgba(124,110,245,0.08)]">
              <Search size={18} className="text-[#3D3D52] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search 500+ AI tools..."
                className="flex-1 bg-transparent text-[#E8E8F0] placeholder-[#3D3D52] text-base focus:outline-none"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-xl bg-[#7C6EF5] flex items-center justify-center hover:bg-[#6B5FE0] transition-colors flex-shrink-0"
              >
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>
          </form>

          {/* Trending tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <span className="text-[#3D3D52] text-sm">Trending:</span>
            {TRENDING_TAGS.map(({ label, slug }) => (
              <Link
                key={slug}
                to={`/category/${slug}`}
                className="px-3.5 py-1.5 rounded-full bg-[#13131A] border border-[#1E1E2E] text-[#666680] text-sm hover:border-[#7C6EF5]/50 hover:text-[#9B8FF7] transition-all"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/explore"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7C6EF5] text-white font-semibold text-sm hover:bg-[#6B5FE0] transition-all shadow-[0_0_24px_rgba(124,110,245,0.35)]"
            >
              Explore All Tools
            </Link>
            <Link
              to="/search"
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-[#1E1E2E] text-[#666680] font-semibold text-sm hover:border-[#7C6EF5]/40 hover:text-[#E8E8F0] transition-all"
            >
              Browse Categories
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}