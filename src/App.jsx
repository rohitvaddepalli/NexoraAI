import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import MobileNav from './components/layout/MobileNav';
import Toast from './components/ui/Toast';

const Landing = lazy(() => import('./pages/Landing'));
const Explore = lazy(() => import('./pages/Explore'));
const ToolDetail = lazy(() => import('./pages/ToolDetail'));
const Favorites = lazy(() => import('./pages/Favorites'));
const MyStack = lazy(() => import('./pages/MyStack'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const Compare = lazy(() => import('./pages/Compare'));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#7C6EF5] border-t-transparent animate-spin" />
        <p className="text-[#666680] text-sm">Loading...</p>
      </div>
    </div>);

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
    </div>);

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
        transition={{ duration: 0.3, ease: 'easeInOut' }}>
        
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
    </AnimatePresence>);

}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Header />
      <main>
        <Suspense fallback={<PageFallback />}>
          <AnimatedRoutes />
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
      <Toast />
    </div>);

}