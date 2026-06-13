import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Plus } from 'lucide-react';
import { useStack } from '../../hooks/useStack';
import { useApp } from '../../context/AppContext';
import toolsData from '../../data/tools.json';
import { getToolInitials, getToolGradient } from '../../utils/helpers';

const EMOJIS = ['🚀', '🤖', '🎨', '💻', '🧠', '⚡', '🔥', '🌟', '💡', '🛠️', '📊', '🎯', '🔬', '🎬', '🌐'];

export default function CreateStackModal({ onClose }) {
  const { createStack, addToolToStack } = useStack();
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🚀');
  const [toolSearch, setToolSearch] = useState('');
  const [selectedToolIds, setSelectedToolIds] = useState([]);

  const filteredTools = useMemo(() => {
    if (!toolSearch.trim()) return toolsData.slice(0, 10);
    const lq = toolSearch.toLowerCase();
    return toolsData.filter(
      (t) =>
      t.name.toLowerCase().includes(lq) ||
      t.category.toLowerCase().includes(lq)
    ).slice(0, 10);
  }, [toolSearch]);

  const toggleTool = (id) => {
    setSelectedToolIds((prev) =>
    prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    const stack = createStack(name.trim(), description.trim(), selectedEmoji);
    selectedToolIds.forEach((id) => addToolToStack(stack.id, id));
    showToast('Stack created!', 'success');
    onClose();
  };

  const selectedTools = toolsData.filter((t) => selectedToolIds.includes(t.id));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}>
        
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="w-full max-w-[480px] bg-[#1A1A24] border border-[#1E1E2E] rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}>
          
          {}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
              Create New Stack
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#666680] hover:text-[#E8E8F0] hover:bg-[#13131A] transition-all">
              
              <X size={18} />
            </button>
          </div>

          {}
          <div className="mb-4">
            <label className="text-xs font-medium text-[#666680] uppercase tracking-wider mb-2 block">Icon</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map((emoji) =>
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`w-9 h-9 rounded-lg text-xl flex items-center justify-center transition-all ${
                selectedEmoji === emoji ?
                'bg-[#7C6EF5]/20 ring-2 ring-[#7C6EF5]' :
                'bg-[#13131A] hover:bg-[#7C6EF5]/10'}`
                }>
                
                  {emoji}
                </button>
              )}
            </div>
          </div>

          {}
          <div className="mb-4">
            <label className="text-xs font-medium text-[#666680] uppercase tracking-wider mb-2 block">
              Stack Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Content Creation Toolkit"
              className="w-full bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-2.5 text-[#E8E8F0] placeholder-[#3D3D52] text-sm focus:border-[#7C6EF5] transition-all" />
            
          </div>

          {}
          <div className="mb-5">
            <label className="text-xs font-medium text-[#666680] uppercase tracking-wider mb-2 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this stack is for..."
              rows={2}
              className="w-full bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-2.5 text-[#E8E8F0] placeholder-[#3D3D52] text-sm focus:border-[#7C6EF5] transition-all resize-none" />
            
          </div>

          {}
          <div className="mb-4">
            <label className="text-xs font-medium text-[#666680] uppercase tracking-wider mb-2 block">
              Add Tools
            </label>
            <div className="relative mb-2">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666680]" />
              <input
                type="text"
                value={toolSearch}
                onChange={(e) => setToolSearch(e.target.value)}
                placeholder="Search tools to add..."
                className="w-full bg-[#13131A] border border-[#1E1E2E] rounded-lg pl-8 pr-3 py-2 text-sm text-[#E8E8F0] placeholder-[#3D3D52] focus:border-[#7C6EF5] transition-all" />
              
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1">
              {filteredTools.map((tool) =>
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${
                selectedToolIds.includes(tool.id) ?
                'bg-[#7C6EF5]/15 border border-[#7C6EF5]/30' :
                'hover:bg-[#13131A]'}`
                }>
                
                  <img
                  src={tool.icon}
                  alt={tool.name}
                  className="w-6 h-6 rounded-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }} />
                
                  <span className="text-[13px] text-[#E8E8F0] flex-1">{tool.name}</span>
                  {selectedToolIds.includes(tool.id) &&
                <span className="w-4 h-4 rounded-full bg-[#7C6EF5] flex items-center justify-center">
                      <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                }
                </button>
              )}
            </div>
          </div>

          {}
          {selectedTools.length > 0 &&
          <div className="flex flex-wrap gap-2 mb-5">
              {selectedTools.map((tool) =>
            <span
              key={tool.id}
              className="flex items-center gap-1 text-[12px] px-2 py-1 rounded-full bg-[#7C6EF5]/15 text-[#9B8FF7] border border-[#7C6EF5]/20">
              
                  {tool.name}
                  <button onClick={() => toggleTool(tool.id)} className="hover:text-[#E8E8F0]">
                    <X size={10} />
                  </button>
                </span>
            )}
            </div>
          }

          {}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-[#1E1E2E] text-[#666680] hover:text-[#E8E8F0] transition-all text-sm">
              
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!name.trim()}
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white font-medium text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              
              <Plus size={16} />
              Create Stack
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}