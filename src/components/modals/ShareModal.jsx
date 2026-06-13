import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { copyToClipboard } from '../../utils/helpers';

export default function ShareModal({ url, title, onClose }) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useApp();

  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      showToast('Link copied!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
          className="w-full max-w-[420px] bg-[#1A1A24] border border-[#1E1E2E] rounded-2xl p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}>
          
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
              Share {title}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#666680] hover:text-[#E8E8F0] hover:bg-[#13131A] transition-all">
              
              <X size={18} />
            </button>
          </div>

          <p className="text-[13px] text-[#666680] mb-4">Share this link with others:</p>

          <div className="flex gap-2">
            <div className="flex-1 bg-[#13131A] border border-[#1E1E2E] rounded-lg px-3 py-2.5 text-[13px] text-[#666680] truncate font-mono">
              {url}
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              copied ?
              'bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30' :
              'bg-[#7C6EF5] text-white hover:bg-[#9B8FF7]'}`
              }>
              
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}