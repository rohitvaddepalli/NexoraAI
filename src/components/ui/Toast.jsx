import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const icons = {
  success: <CheckCircle size={16} className="text-[#22C55E]" />,
  error: <AlertCircle size={16} className="text-[#EF4444]" />,
  info: <Info size={16} className="text-[#7C6EF5]" />
};

const colors = {
  success: 'border-[#22C55E]/30 bg-[#22C55E]/10',
  error: 'border-[#EF4444]/30 bg-[#EF4444]/10',
  info: 'border-[#7C6EF5]/30 bg-[#7C6EF5]/10'
};

export default function Toast() {
  const { toasts, dismissToast } = useApp();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) =>
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur ${colors[toast.type] || colors.info} max-w-xs`}>
          
            {icons[toast.type] || icons.info}
            <p className="text-[13px] text-[#E8E8F0] flex-1">{toast.message}</p>
            <button
            onClick={() => dismissToast(toast.id)}
            className="text-[#666680] hover:text-[#E8E8F0] transition-colors ml-1">
            
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>);

}