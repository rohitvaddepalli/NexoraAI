import { motion } from 'framer-motion';

export default function FavoriteButton({ isFavorited, onToggle, size = 'md' }) {
  const iconSize = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;
  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={onToggle}
      className={`flex items-center justify-center rounded-lg transition-all ${
      size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'} ${

      isFavorited ?
      'text-[#7C6EF5] bg-[#7C6EF5]/15' :
      'text-[#3D3D52] hover:text-[#7C6EF5] hover:bg-[#7C6EF5]/10'}`
      }
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isFavorited ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        width={iconSize}
        height={iconSize}>
        
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        
      </svg>
    </motion.button>);

}