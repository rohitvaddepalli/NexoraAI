import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Heart, Sun, Moon, Layers } from 'lucide-react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import Toast from './components/ui/Toast';
import { useApp } from './context/AppContext';
import { useFavorites } from './hooks/useFavorites';

const Landing = lazy(() => import('./pages/Landing'));
const Explore = lazy(() => import('./pages/Explore'));
const ToolDetail = lazy(() => import('./pages/ToolDetail'));
const Favorites = lazy(() => import('./pages/Favorites'));
const MyStack = lazy(() => import('./pages/MyStack'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Compare = lazy(() => import('./pages/Compare'));

// Pages that use the sidebar layout
const SIDEBAR_PATHS = ['/explore', '/favorites', '/stacks', '/compare', '/category'];

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#7C6EF5] border-t-transparent animate-spin" />
        <p className="text-[#666680] text-sm">Loading...</p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      <div className="text-6xl">🤖</div>
      <h1 className="text-3xl font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
        404 — Page Not Found
      </h1>
      <p className="text-[#666680] text-sm max-w-xs">
        The page you're looking for doesn't exist in the AI universe.
      </p>
      <a href="/" className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white text-sm font-medium hover:opacity-90 transition-all">
        Go Home
      </a>
    </div>
  );
}

function SidebarTopBar() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useApp();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue('');
    }
  };

  return (
    <header className="h-[60px] flex items-center justify-between px-6 border-b border-[#1E1E2E] bg-[#0D0D14] flex-shrink-0">
      <form onSubmit={handleSearch} className="flex-1 max-w-sm">
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
      <div className="flex items-center gap-3">
        <Link
          to="/favorites"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#666680] hover:text-[#E8E8F0] hover:bg-[#1A1A24] transition-all"
        >
          <Heart size={16} />
        </Link>
        <button
          onClick={toggleDarkMode}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[#666680] hover:text-[#E8E8F0] hover:bg-[#1A1A24] transition-all"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <Link
          to="/stacks"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7C6EF5]/15 border border-[#7C6EF5]/30 text-[#9B8FF7] text-sm font-medium hover:bg-[#7C6EF5]/25 transition-all"
        >
          <Layers size={14} />
          My Stack
        </Link>
      </div>
    </header>
  );
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/tool/:id" element={<ToolDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/stacks" element={<MyStack />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function LayoutWrapper({ children }) {
  const location = useLocation();
  const useSidebar = SIDEBAR_PATHS.some((p) => location.pathname.startsWith(p));

  if (useSidebar) {
    return (
      <div className="flex min-h-screen overflow-x-hidden">
        <Sidebar />
        <div className="flex flex-col min-w-0" style={{ marginLeft: '220px', width: 'calc(100% - 220px)' }}>
          <SidebarTopBar />
          <main className="flex-1 min-w-0">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] overflow-x-hidden">
      <Suspense fallback={<PageFallback />}>
        <LayoutWrapper>
          <AnimatedRoutes />
        </LayoutWrapper>
      </Suspense>
      <MobileNav />
      <Toast />
    </div>
  );
}