import { motion } from 'framer-motion';

export default function FilterChip({ label, active, onClick, count }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium border transition-all whitespace-nowrap ${
      active ?
      'bg-[#7C6EF5] border-[#7C6EF5] text-white' :
      'bg-transparent border-[#1E1E2E] text-[#666680] hover:border-[#7C6EF5]/50 hover:text-[#E8E8F0]'}`
      }>
      
      {label}
      {count !== undefined &&
      <span
        className={`text-[11px] px-1.5 py-0.5 rounded-full ${
        active ? 'bg-white/20 text-white' : 'bg-[#1A1A24] text-[#3D3D52]'}`
        }>
        
          {count}
        </span>
      }
    </motion.button>);

}