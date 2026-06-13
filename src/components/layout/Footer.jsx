import { Link } from 'react-router-dom';
import { Layers, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E2E] py-10 px-6 mt-auto">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C6EF5] to-[#9B8FF7] flex items-center justify-center text-white font-bold text-xs">
                N
              </div>
              <span className="font-bold text-base text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
                Nexora<span className="text-[#7C6EF5]">AI</span>
              </span>
            </Link>
            <p className="text-xs text-[#3D3D52] flex items-center gap-1">
              <Zap size={12} className="text-[#7C6EF5]" />
              Built for AI enthusiasts
            </p>
          </div>

          {}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {[
            { to: '/explore', label: 'Explore' },
            { to: '/search', label: 'Categories' },
            { to: '/compare', label: 'Compare' },
            { to: '/favorites', label: 'Favorites' },
            { to: '/stacks', label: 'My Stack' }].
            map(({ to, label }) =>
            <Link
              key={to}
              to={to}
              className="text-sm text-[#666680] hover:text-[#7C6EF5] transition-colors">
              
                {label}
              </Link>
            )}
          </nav>

          {}
          <div className="text-xs text-[#3D3D52] text-center md:text-right">
            <div>© 2024 NexoraAI</div>
            <div className="mt-1">Updated Daily · 40+ Tools</div>
          </div>
        </div>
      </div>
    </footer>);

}