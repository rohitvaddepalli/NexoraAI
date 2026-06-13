import { Search } from 'lucide-react';

export default function EmptyState({ title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#1A1A24] flex items-center justify-center mb-5">
        <Search size={28} className="text-[#3D3D52]" />
      </div>
      <h3 className="text-lg font-semibold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
        {title}
      </h3>
      <p className="text-[#666680] text-sm mb-6 max-w-sm">{subtitle}</p>
      {action &&
      <button
        onClick={action.onClick}
        className="px-4 py-2 rounded-lg border border-[#7C6EF5] text-[#7C6EF5] hover:bg-[#7C6EF5]/10 transition-all text-sm font-medium">
        
          {action.label}
        </button>
      }
    </div>);

}