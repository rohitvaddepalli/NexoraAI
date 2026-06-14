import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Heart, Layers, Sun, Moon, Menu, X, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useFavorites } from '../../hooks/useFavorites';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { darkMode, toggleDarkMode } = useApp();
  const { favoriteIds } = useFavorites();
  const [searchValue, setSearchValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-[#1E1E2E]">
      <div className="flex items-center justify-between h-full px-5 md:px-8 max-w-[1400px] mx-auto gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C6EF5] to-[#9B8FF7] flex items-center justify-center flex-shrink-0">
            <Sparkles size={15} className="text-white" />
          </div>
          <span className="font-bold text-[15px] text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
            Nexora<span className="text-[#7C6EF5]">AI</span>
          </span>
        </Link>

        {/* Center Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm mx-4">
          <div className="relative w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3D52]" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full bg-[#1A1A24] border border-[#1E1E2E] rounded-lg pl-9 pr-4 py-2 text-sm text-[#E8E8F0] placeholder-[#3D3D52] focus:border-[#7C6EF5] focus:outline-none transition-all"
            />
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            to="/stacks"
            className="hidden md:flex items-center gap-1.5 text-sm text-[#666680] hover:text-[#E8E8F0] font-medium transition-colors px-2 py-1.5"
          >
            My Stack
          </Link>
          <Link
            to="/favorites"
            className="hidden md:flex items-center gap-1.5 text-sm text-[#666680] hover:text-[#E8E8F0] font-medium transition-colors px-2 py-1.5"
          >
            Favorites
          </Link>

          <button
            onClick={toggleDarkMode}
            className="hidden md:flex w-8 h-8 rounded-lg items-center justify-center text-[#666680] hover:text-[#E8E8F0] hover:bg-[#1A1A24] transition-all"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* User avatar placeholder */}
          <div className="hidden md:flex w-8 h-8 rounded-full bg-gradient-to-br from-[#7C6EF5] to-[#9B8FF7] items-center justify-center text-white text-xs font-bold">
            U
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#666680] hover:text-[#E8E8F0] hover:bg-[#1A1A24] transition-all"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-[60px] left-0 right-0 bg-[#0D0D14]/98 backdrop-blur-xl border-b border-[#1E1E2E] p-4 space-y-3"
          >
            <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false); }}>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3D3D52]" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search AI tools..."
                  className="w-full bg-[#1A1A24] border border-[#1E1E2E] rounded-lg pl-9 pr-4 py-2 text-sm text-[#E8E8F0] placeholder-[#3D3D52] focus:border-[#7C6EF5] focus:outline-none transition-all"
                />
              </div>
            </form>
            <div className="grid grid-cols-2 gap-2">
              {[
                { to: '/explore', label: 'Explore' },
                { to: '/favorites', label: 'Favorites' },
                { to: '/stacks', label: 'My Stack' },
                { to: '/compare', label: 'Compare' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                    location.pathname === to
                      ? 'border-[#7C6EF5] bg-[#7C6EF5]/15 text-[#9B8FF7]'
                      : 'border-[#1E1E2E] text-[#666680] hover:text-[#E8E8F0] hover:border-[#7C6EF5]/40'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#1E1E2E] text-[#666680] text-sm transition-all hover:border-[#7C6EF5]/40 hover:text-[#E8E8F0]"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}