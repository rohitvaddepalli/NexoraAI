import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Heart, Layers, GitCompare, Sparkles } from 'lucide-react';
import { useFavorites } from '../../hooks/useFavorites';

const NAV_LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/explore', label: 'Explore', icon: Compass },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/stacks', label: 'My Stack', icon: Layers },
  { to: '/compare', label: 'Compare', icon: GitCompare },
];

export default function Sidebar() {
  const location = useLocation();
  const { favoriteIds } = useFavorites();

  const isActive = (path) => {
    if (path === '/' ) return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[220px] flex flex-col border-r border-[#1E1E2E] bg-[#0D0D14] z-40">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-[#1E1E2E]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C6EF5] to-[#9B8FF7] flex items-center justify-center flex-shrink-0">
            <Sparkles size={15} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-[15px] text-[#E8E8F0] leading-none" style={{ fontFamily: 'Space Grotesk' }}>
              Nexora<span className="text-[#7C6EF5]">AI</span>
            </div>
            <div className="text-[10px] text-[#3D3D52] mt-0.5 leading-none">AI Discovery</div>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_LINKS.map(({ to, label, icon: Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                active
                  ? 'bg-[#7C6EF5]/15 text-[#9B8FF7]'
                  : 'text-[#666680] hover:text-[#E8E8F0] hover:bg-[#1A1A24]'
              }`}
            >
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#7C6EF5] rounded-r-full" />
              )}
              <Icon size={16} className="flex-shrink-0" />
              <span>{label}</span>
              {label === 'Favorites' && favoriteIds.length > 0 && (
                <span className="ml-auto text-[10px] bg-[#7C6EF5] text-white rounded-full w-4 h-4 flex items-center justify-center font-semibold flex-shrink-0">
                  {favoriteIds.length > 9 ? '9+' : favoriteIds.length}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user section */}
      <div className="px-4 py-4 border-t border-[#1E1E2E]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C6EF5] to-[#9B8FF7] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            U
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-[#E8E8F0] truncate">User</div>
            <div className="text-[11px] text-[#3D3D52]">Free Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
