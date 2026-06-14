import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Share2, Trash2, Layers } from 'lucide-react';
import { useStack } from '../hooks/useStack';
import { useApp } from '../context/AppContext';
import CreateStackModal from '../components/modals/CreateStackModal';
import ShareModal from '../components/modals/ShareModal';
import toolsData from '../data/tools.json';
import { getToolInitials, getToolGradient } from '../utils/helpers';

function ToolIconSmall({ tool }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !tool.icon) {
    return (
      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0`}>
        {getToolInitials(tool.name)}
      </div>
    );
  }

  return (
    <img
      src={tool.icon}
      alt={tool.name}
      className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
      onError={() => setHasError(true)}
    />
  );
}

export default function MyStack() {
  const { stacks, deleteStack, shareStack } = useStack();
  const { showToast } = useApp();
  const [createOpen, setCreateOpen] = useState(false);
  const [shareState, setShareState] = useState(null);

  useEffect(() => { document.title = 'My AI Stack — NexoraAI'; }, []);

  const handleDelete = (stackId, stackName) => {
    if (window.confirm(`Delete "${stackName}"?`)) {
      deleteStack(stackId);
      showToast('Stack deleted', 'info');
    }
  };

  const handleShare = (stack) => {
    const url = shareStack(stack.id);
    setShareState({ url, title: stack.name });
  };

  return (
    <div className="min-h-screen pb-8 px-6 py-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#E8E8F0] mb-1" style={{ fontFamily: 'Space Grotesk' }}>
            My AI Stack
          </h1>
          <p className="text-[#666680] text-sm">Build and share your perfect AI toolkit</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white text-sm font-semibold hover:opacity-90 transition-all shadow-[0_0_16px_rgba(124,110,245,0.3)]"
        >
          <Plus size={15} />
          Create Stack
        </button>
      </div>

      {/* Stacks list */}
      {stacks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-[#1A1A24] flex items-center justify-center mb-5"
          >
            <Layers size={36} className="text-[#3D3D52]" />
          </motion.div>
          <h3 className="text-xl font-semibold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
            Create your first AI stack
          </h3>
          <p className="text-[#666680] text-sm mb-6 max-w-xs">
            Curate the perfect set of tools for any workflow and share it with others.
          </p>
          <button
            onClick={() => setCreateOpen(true)}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            Create Stack
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence>
            {stacks.map((stack, i) => {
              const stackTools = toolsData.filter((t) => stack.toolIds.includes(t.id));
              const visibleTools = stackTools.slice(0, 5);
              const extraCount = stackTools.length - visibleTools.length;

              return (
                <motion.div
                  key={stack.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-4 bg-[#13131A] border border-[#1E1E2E] rounded-xl hover:border-[#7C6EF5]/30 transition-all group"
                >
                  {/* Stack icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C6EF5]/20 to-[#9B8FF7]/20 border border-[#7C6EF5]/20 flex items-center justify-center text-2xl flex-shrink-0">
                    {stack.emoji}
                  </div>

                  {/* Name & count */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-[#E8E8F0] truncate" style={{ fontFamily: 'Space Grotesk' }}>
                      {stack.name}
                    </h3>
                    <p className="text-[12px] text-[#666680] mt-0.5">
                      {stackTools.length} tool{stackTools.length !== 1 ? 's' : ''} configured
                    </p>
                  </div>

                  {/* Tool icon overlaps */}
                  <div className="flex items-center -space-x-2 flex-shrink-0">
                    {visibleTools.map((tool) => (
                      <div key={tool.id} className="ring-2 ring-[#13131A] rounded-lg">
                        <ToolIconSmall tool={tool} />
                      </div>
                    ))}
                    {extraCount > 0 && (
                      <div className="w-7 h-7 rounded-lg bg-[#1A1A24] border border-[#1E1E2E] flex items-center justify-center text-[10px] text-[#666680] ring-2 ring-[#13131A] font-medium">
                        +{extraCount}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#3D3D52] hover:text-[#E8E8F0] hover:bg-[#1A1A24] transition-all"
                      title="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleShare(stack)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#3D3D52] hover:text-[#E8E8F0] hover:bg-[#1A1A24] transition-all"
                      title="Share"
                    >
                      <Share2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(stack.id, stack.name)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#3D3D52] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {createOpen && <CreateStackModal onClose={() => setCreateOpen(false)} />}
      {shareState && (
        <ShareModal
          url={shareState.url}
          title={shareState.title}
          onClose={() => setShareState(null)}
        />
      )}
    </div>
  );
}