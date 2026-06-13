import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Search, Check, Star, ExternalLink } from 'lucide-react';
import toolsData from '../data/tools.json';
import { useApp } from '../context/AppContext';
import { getCategoryColor, getToolInitials, getToolGradient } from '../utils/helpers';

function ToolIconCompare({ tool }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !tool.icon) {
    return (
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
        
        {getToolInitials(tool.name)}
      </div>);

  }

  return (
    <img
      src={tool.icon}
      alt={tool.name}
      className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"
      onError={() => setHasError(true)} />);


}

function PickerIcon({ tool }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !tool.icon) {
    return (
      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>
        {getToolInitials(tool.name)}
      </div>);

  }

  return (
    <img
      src={tool.icon}
      alt={tool.name}
      className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
      onError={() => setHasError(true)} />);


}

function ToolPickerDropdown({ onAdd, selected }) {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return toolsData.filter((t) => !selected.includes(t.id)).slice(0, 8);
    const lq = search.toLowerCase();
    return toolsData.
    filter((t) => !selected.includes(t.id) && (
    t.name.toLowerCase().includes(lq) || t.category.toLowerCase().includes(lq))).
    slice(0, 8);
  }, [search, selected]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-[#7C6EF5]/50 text-[#7C6EF5] hover:bg-[#7C6EF5]/10 text-sm font-medium transition-all">
        
        <Plus size={16} />
        Add Tool
      </button>
      {open &&
      <div className="absolute top-full mt-2 left-0 bg-[#1A1A24] border border-[#1E1E2E] rounded-xl p-3 w-64 z-50 shadow-2xl">
          <div className="relative mb-2">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#666680]" />
            <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tools..."
            autoFocus
            className="w-full bg-[#13131A] border border-[#1E1E2E] rounded-lg pl-8 pr-3 py-2 text-sm text-[#E8E8F0] placeholder-[#3D3D52] focus:border-[#7C6EF5] transition-all" />
          
          </div>
          <div className="max-h-52 overflow-y-auto space-y-1">
            {filtered.map((tool) =>
          <button
            key={tool.id}
            onClick={() => {onAdd(tool.id);setOpen(false);setSearch('');}}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#13131A] transition-all text-left">
            
                <PickerIcon tool={tool} />
                <div>
                  <div className="text-[13px] text-[#E8E8F0]">{tool.name}</div>
                  <div className="text-[11px] text-[#3D3D52]">{tool.category}</div>
                </div>
              </button>
          )}
          </div>
        </div>
      }
    </div>);

}

const COMPARE_ROWS = [
{
  key: 'rating', label: 'Rating',
  render: (t) =>
  <div className="flex items-center gap-1.5">
        <Star size={14} className="text-[#F59E0B] fill-[#F59E0B]" />
        <span className="text-[#E8E8F0] font-semibold text-sm">{t.rating}</span>
        <span className="text-[#3D3D52] text-xs">/ 5.0</span>
      </div>

},
{
  key: 'pricing', label: 'Pricing',
  render: (t) => {
    const styles = {
      Free: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/25',
      Freemium: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/25',
      Paid: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/25'
    };
    return (
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[t.pricing] || styles.Paid}`}>
          {t.pricing}
        </span>);

  }
},
{
  key: 'hasFreeplan', label: 'Free Plan',
  render: (t) => t.hasFreeplan ?
  <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
          <Check size={11} className="text-[#22C55E]" />
        </div>
        <span className="text-[#22C55E] text-xs font-medium">Yes</span>
      </div> :

  <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
          <X size={11} className="text-[#EF4444]" />
        </div>
        <span className="text-[#EF4444] text-xs font-medium">No</span>
      </div>

},
{
  key: 'platform', label: 'Platform',
  render: (t) =>
  <div className="flex flex-wrap gap-1">
        {(t.platform || []).map((p) =>
    <span key={p} className="text-[11px] px-1.5 py-0.5 rounded-md bg-[#1A1A24] border border-[#1E1E2E] text-[#666680]">{p}</span>
    )}
      </div>

},
{
  key: 'keyFeatures', label: 'Key Features',
  render: (t) =>
  <ul className="space-y-1.5">
        {(t.keyFeatures || []).slice(0, 4).map((f) =>
    <li key={f} className="flex items-start gap-1.5 text-[12px] text-[#666680] leading-relaxed">
            <div className="w-1.5 h-1.5 rounded-full bg-[#7C6EF5] flex-shrink-0 mt-1" />
            {f}
          </li>
    )}
      </ul>

},
{
  key: 'bestFor', label: 'Best For',
  render: (t) => <p className="text-[13px] text-[#666680] leading-relaxed">{t.bestFor}</p>
}];


export default function Compare() {
  const { compareList, addToCompare, removeFromCompare } = useApp();
  const [localIds, setLocalIds] = useState([]);

  useEffect(() => {
    document.title = 'Compare AI Tools — NexoraAI';
    setLocalIds(compareList);
  }, [compareList]);

  const addTool = (id) => {
    if (localIds.length >= 3 || localIds.includes(id)) return;
    setLocalIds((prev) => [...prev, id]);
    addToCompare(id);
  };

  const removeTool = (id) => {
    setLocalIds((prev) => prev.filter((x) => x !== id));
    removeFromCompare(id);
  };

  const tools = toolsData.filter((t) => localIds.includes(t.id));

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="max-w-[1100px] mx-auto">
        {}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E8E8F0] mb-1" style={{ fontFamily: 'Space Grotesk' }}>
              Compare AI Tools
            </h1>
            <p className="text-sm text-[#666680]">Side-by-side comparison of up to 3 tools</p>
          </div>
          {localIds.length < 3 &&
          <ToolPickerDropdown onAdd={addTool} selected={localIds} />
          }
        </div>

        {tools.length === 0 ?
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="text-xl font-semibold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              Add tools to compare
            </h3>
            <p className="text-[#666680] text-sm mb-6 max-w-xs">
              Search and add up to 3 tools to compare them side by side.
            </p>
            <ToolPickerDropdown onAdd={addTool} selected={localIds} />
          </div> :

        <div className="overflow-x-auto rounded-xl border border-[#1E1E2E]">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#1E1E2E]">
                  <th className="text-left py-4 px-5 w-36 bg-[#13131A]">
                    <span className="text-[11px] font-semibold text-[#3D3D52] uppercase tracking-widest">Feature</span>
                  </th>
                  {tools.map((tool) =>
                <th key={tool.id} className="py-5 px-4 min-w-[220px] bg-[#13131A]">
                      {}
                      <div className="flex flex-col items-center gap-3">
                        {}
                        <div className="flex flex-col items-center gap-2 relative w-full">
                          <ToolIconCompare tool={tool} />
                          <button
                        onClick={() => removeTool(tool.id)}
                        className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#1A1A24] border border-[#1E1E2E] text-[#3D3D52] flex items-center justify-center hover:bg-[#EF4444]/20 hover:text-[#EF4444] hover:border-[#EF4444]/30 transition-all"
                        title="Remove">
                        
                            <X size={11} />
                          </button>
                        </div>
                        {}
                        <div className="text-center">
                          <div className="text-[#E8E8F0] font-bold text-sm leading-tight mb-1.5">
                            {tool.name}
                          </div>
                          <span
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                        style={{
                          color: getCategoryColor(tool.category),
                          backgroundColor: `${getCategoryColor(tool.category)}18`,
                          border: `1px solid ${getCategoryColor(tool.category)}30`
                        }}>
                        
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </th>
                )}
                  {localIds.length < 3 &&
                <th className="px-4 bg-[#13131A]">
                      <div className="flex items-center justify-center h-full">
                        <ToolPickerDropdown onAdd={addTool} selected={localIds} />
                      </div>
                    </th>
                }
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, ri) =>
              <tr
                key={row.key}
                className={`border-b border-[#1E1E2E] ${ri % 2 === 0 ? 'bg-[#0A0A0F]' : 'bg-[#13131A]/40'}`}>
                
                    <td className="py-4 px-5 text-[11px] font-semibold text-[#3D3D52] uppercase tracking-widest align-top whitespace-nowrap">
                      {row.label}
                    </td>
                    {tools.map((tool) =>
                <td key={tool.id} className="py-4 px-4 border-l border-[#1E1E2E] align-top">
                        {row.render(tool)}
                      </td>
                )}
                    {localIds.length < 3 &&
                <td className="border-l border-[#1E1E2E]" />
                }
                  </tr>
              )}
                {}
                <tr className="bg-[#0A0A0F]">
                  <td className="py-4 px-5 text-[11px] font-semibold text-[#3D3D52] uppercase tracking-widest">
                    Action
                  </td>
                  {tools.map((tool) =>
                <td key={tool.id} className="py-4 px-4 border-l border-[#1E1E2E]">
                      <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white text-xs font-semibold hover:opacity-90 transition-all shadow-[0_0_12px_rgba(124,110,245,0.25)]">
                    
                        <ExternalLink size={12} />
                        Visit Tool
                      </a>
                    </td>
                )}
                  {localIds.length < 3 &&
                <td className="border-l border-[#1E1E2E]" />
                }
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>);

}