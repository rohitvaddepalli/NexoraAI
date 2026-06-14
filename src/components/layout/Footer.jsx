import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E2E] py-8 px-6 mt-auto">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7C6EF5] to-[#9B8FF7] flex items-center justify-center">
            <Sparkles size={12} className="text-white" />
          </div>
          <span className="font-bold text-[14px] text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
            Nexora<span className="text-[#7C6EF5]">AI</span>
          </span>
        </Link>

        {/* Copyright */}
        <p className="text-xs text-[#3D3D52] text-center">
          © 2024 NexoraAI. Visionary AI Discovery.
        </p>

        {/* Links */}
        <nav className="flex items-center gap-5">
          {['Privacy', 'Terms', 'API', 'About'].map((label) => (
            <a
              key={label}
              href="#"
              className="text-xs text-[#666680] hover:text-[#7C6EF5] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}