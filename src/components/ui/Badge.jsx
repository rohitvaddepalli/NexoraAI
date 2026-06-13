export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[#1A1A24] text-[#666680] border border-[#1E1E2E]',
    accent: 'bg-[#7C6EF5]/15 text-[#9B8FF7] border border-[#7C6EF5]/20',
    success: 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20',
    warning: 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20',
    error: 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20',
    new: 'bg-[#7C6EF5]/15 text-[#9B8FF7] border border-[#7C6EF5]/20',
    trending: 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
  };
  return (
    <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>);

}