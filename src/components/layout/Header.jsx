import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, Heart, Layers, Sun, Moon, Menu, X,
  Compass, Grid2X2, GitCompare, ChevronDown } from
'lucide-react';
import { useApp } from '../../context/AppContext';
import { useFavorites } from '../../hooks/useFavorites';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
{ to: '/explore', label: 'Explore', icon: Compass },
{ to: '/search', label: 'Categories', icon: Grid2X2 },
{ to: '/compare', label: 'Compare', icon: GitCompare },
{ to: '/favorites', label: 'Favorites', icon: Heart }];


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

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass border-b border-[#1E1E2E]">
      <div className="flex items-center justify-between h-full px-4 md:px-6 max-w-[1500px] mx-auto gap-4">

        {}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C6EF5] to-[#9B8FF7] flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <span className="font-bold text-lg text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
            Nexora<span className="text-[#7C6EF5]">AI</span>
          </span>
        </Link>

        {}
        <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
          {NAV_LINKS.map(({ to, label, icon: Icon }) =>
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
            isActive(to) ?
            'bg-[#7C6EF5]/15 text-[#9B8FF7]' :
            'text-[#666680] hover:text-[#E8E8F0] hover:bg-[#1A1A24]'}`
            }>
            
              <Icon size={14} />
              {label}
              {label === 'Favorites' && favoriteIds.length > 0 &&
            <span className="ml-0.5 text-[10px] bg-[#7C6EF5] text-white rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                  {favoriteIds.length > 9 ? '9+' : favoriteIds.length}
                </span>
            }
            </Link>
          )}
        </nav>

        {}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs lg:max-w-sm mx-2">
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666680]" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search AI tools..."
              className="w-full bg-[#1A1A24] border border-[#1E1E2E] rounded-lg pl-9 pr-4 py-2 text-sm text-[#E8E8F0] placeholder-[#666680] focus:border-[#7C6EF5] focus:ring-1 focus:ring-[#7C6EF5]/30 transition-all" />
            
          </div>
        </form>

        {}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {}
          <button
            onClick={toggleDarkMode}
            className="hidden md:flex w-9 h-9 rounded-lg items-center justify-center text-[#666680] hover:text-[#E8E8F0] hover:bg-[#1A1A24] transition-all"
            title="Toggle theme">
            
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {}
          <Link
            to="/stacks"
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
            isActive('/stacks') ?
            'border-[#7C6EF5] bg-[#7C6EF5]/15 text-[#9B8FF7]' :
            'border-[#7C6EF5] text-[#7C6EF5] hover:bg-[#7C6EF5]/10'}`
            }>
            
            <Layers size={14} />
            My Stack
          </Link>

          {}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#666680] hover:text-[#E8E8F0] hover:bg-[#1A1A24] transition-all">
            
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="lg:hidden absolute top-16 left-0 right-0 bg-[#13131A]/95 backdrop-blur-xl border-b border-[#1E1E2E] p-4 space-y-3">
          
            {}
            <form onSubmit={(e) => {handleSearch(e);setMobileMenuOpen(false);}}>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666680]" />
                <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search AI tools..."
                className="w-full bg-[#1A1A24] border border-[#1E1E2E] rounded-lg pl-9 pr-4 py-2 text-sm text-[#E8E8F0] placeholder-[#666680] focus:border-[#7C6EF5] transition-all" />
              
              </div>
            </form>

            {}
            <div className="grid grid-cols-2 gap-2">
              {[...NAV_LINKS, { to: '/stacks', label: 'My Stack', icon: Layers }].map(({ to, label, icon: Icon }) =>
            <Link
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
              isActive(to) ?
              'border-[#7C6EF5] bg-[#7C6EF5]/15 text-[#9B8FF7]' :
              'border-[#1E1E2E] text-[#666680] hover:text-[#E8E8F0] hover:border-[#7C6EF5]/40'}`
              }>
              
                  <Icon size={15} />
                  {label}
                  {label === 'Favorites' && favoriteIds.length > 0 &&
              <span className="ml-auto text-[10px] bg-[#7C6EF5] text-white rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                      {favoriteIds.length}
                    </span>
              }
                </Link>
            )}
            </div>

            {}
            <button
            onClick={toggleDarkMode}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#1E1E2E] text-[#666680] text-sm transition-all hover:border-[#7C6EF5]/40 hover:text-[#E8E8F0]">
            
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}