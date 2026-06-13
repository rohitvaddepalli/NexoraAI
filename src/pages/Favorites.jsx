import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import ToolCard from '../components/ui/ToolCard';

export default function Favorites() {
  const { favoritedTools } = useFavorites();
  const [sort, setSort] = useState('recent');

  useEffect(() => {document.title = 'Your Favorites — NexoraAI';}, []);

  const sorted = [...favoritedTools].sort((a, b) => {
    if (sort === 'az') return a.name.localeCompare(b.name);
    if (sort === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  return (
    <div className="min-h-screen pt-20 pb-24 md:pb-8 px-4">
      <div className="max-w-[1100px] mx-auto">
        {}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#E8E8F0] mb-1" style={{ fontFamily: 'Space Grotesk' }}>
              Your Favorites
            </h1>
            <p className="text-[#666680] text-sm">Tools you've saved for quick access</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#7C6EF5]/15 text-[#9B8FF7] text-sm font-medium border border-[#7C6EF5]/20">
              {favoritedTools.length} tools
            </span>
            {favoritedTools.length > 0 &&
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#1A1A24] border border-[#1E1E2E] rounded-lg px-3 py-1.5 text-sm text-[#666680] focus:border-[#7C6EF5] transition-all">
              
                <option value="recent">Recently Added</option>
                <option value="az">A–Z</option>
                <option value="category">By Category</option>
              </select>
            }
          </div>
        </div>

        {}
        {favoritedTools.length === 0 ?
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-2xl bg-[#1A1A24] flex items-center justify-center mb-5">
            
              <Heart size={36} className="text-[#3D3D52]" />
            </motion.div>
            <h3 className="text-xl font-semibold text-[#E8E8F0] mb-2" style={{ fontFamily: 'Space Grotesk' }}>
              No favorites yet
            </h3>
            <p className="text-[#666680] text-sm mb-6 max-w-xs">
              Start exploring and save the tools you love for quick access later.
            </p>
            <Link
            to="/explore"
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white text-sm font-medium hover:opacity-90 transition-all">
            
              Explore Tools
            </Link>
          </div> :

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
            <AnimatePresence>
              {sorted.map((tool, i) =>
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}>
              
                  <ToolCard tool={tool} index={i} />
                </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        }
      </div>
    </div>);

}