import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Search, Heart, Layers } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';
import { motion } from 'framer-motion';

const navItems = [
{ to: '/', icon: Home, label: 'Home' },
{ to: '/explore', icon: Compass, label: 'Explore' },
{ to: '/search', icon: Search, label: 'Search' },
{ to: '/favorites', icon: Heart, label: 'Favorites' },
{ to: '/stacks', icon: Layers, label: 'Stack' }];


export default function MobileNav() {
  const location = useLocation();
  const { favoriteIds } = useFavorites();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 glass border-t border-[#1E1E2E]">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-0.5 px-3 py-1 relative">
              
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`relative flex items-center justify-center w-8 h-8 rounded-lg transition-all ${
                isActive ? 'text-[#7C6EF5]' : 'text-[#666680]'}`
                }>
                
                <Icon size={20} />
                {label === 'Favorites' && favoriteIds.length > 0 &&
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7C6EF5] rounded-full text-[9px] text-white flex items-center justify-center font-bold">
                    {favoriteIds.length > 9 ? '9+' : favoriteIds.length}
                  </span>
                }
              </motion.div>
              <span
                className={`text-[11px] font-medium transition-colors ${
                isActive ? 'text-[#7C6EF5]' : 'text-[#3D3D52]'}`
                }>
                
                {label}
              </span>
              {isActive &&
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#7C6EF5]" />

              }
            </Link>);

        })}
      </div>
    </nav>);

}