import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Layers, Check, X, Share2, Flag, GitCompare } from 'lucide-react';
import toolsData from '../data/tools.json';
import { useFavorites } from '../hooks/useFavorites';
import { useStack } from '../hooks/useStack';
import { useApp } from '../context/AppContext';
import StarRating from '../components/ui/StarRating';
import CategoryBadge from '../components/ui/CategoryBadge';
import ToolCard from '../components/ui/ToolCard';
import ShareModal from '../components/modals/ShareModal';
import { getCategoryColor, formatDate, getToolInitials, getToolGradient } from '../utils/helpers';

const TABS = ['Overview', 'Features', 'Reviews', 'Similar Tools'];

function ToolIcon({ tool, size = 80 }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !tool.icon) {
    return (
      <div
        className={`rounded-2xl bg-gradient-to-br ${getToolGradient(tool.id)} flex items-center justify-center text-white font-bold flex-shrink-0`}
        style={{ width: size, height: size, fontSize: size / 3 }}
      >
        {getToolInitials(tool.name)}
      </div>
    );
  }

  return (
    <img
      src={tool.icon}
      alt={tool.name}
      loading="lazy"
      className="rounded-2xl object-cover flex-shrink-0"
      style={{ width: size, height: size }}
      onError={() => setHasError(true)}
    />
  );
}

function PlaceholderReview({ name, date, rating, text }) {
  return (
    <div className="bg-[#1A1A24] border border-[#1E1E2E] rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C6EF5] to-[#9B8FF7] flex items-center justify-center text-white text-sm font-bold">
          {name[0]}
        </div>
        <div>
          <div className="text-sm font-medium text-[#E8E8F0]">{name}</div>
          <div className="text-xs text-[#3D3D52]">{date}</div>
        </div>
        <StarRating rating={rating} size="sm" />
      </div>
      <p className="text-sm text-[#666680] leading-relaxed">{text}</p>
    </div>
  );
}

export default function ToolDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = toolsData.find((t) => t.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { stacks, addToolToStack } = useStack();
  const { showToast, addToCompare } = useApp();
  const [activeTab, setActiveTab] = useState('Overview');
  const [shareOpen, setShareOpen] = useState(false);
  const [addToStackOpen, setAddToStackOpen] = useState(false);

  useEffect(() => {
    if (tool) document.title = `${tool.name} — NexoraAI`;
    else document.title = 'Tool Not Found — NexoraAI';
  }, [tool]);

  if (!tool) {
    return (
      <div className="pt-24 flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold text-[#E8E8F0]">Tool not found</h1>
        <Link to="/explore" className="text-[#7C6EF5] hover:underline">← Back to Explore</Link>
      </div>
    );
  }

  const similar = toolsData.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  const handleFavorite = () => {
    toggleFavorite(tool.id);
    showToast(
      isFavorite(tool.id) ? 'Removed from favorites' : 'Added to favorites',
      isFavorite(tool.id) ? 'info' : 'success'
    );
  };

  const handleAddToStack = (stackId) => {
    addToolToStack(stackId, tool.id);
    showToast('Added to stack!', 'success');
    setAddToStackOpen(false);
  };

  const handleAddToCompare = () => {
    addToCompare(tool.id);
    showToast('Added to compare list', 'info');
  };

  const pricingBadge = {
    Free: 'text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/20',
    Freemium: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
    Paid: 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/20',
  };

  return (
    <div className="min-h-screen pt-[72px] pb-20 px-5 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#666680] hover:text-[#E8E8F0] transition-colors text-sm mb-6 mt-2"
        >
          <ArrowLeft size={16} />
          Back to Explore
        </button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Tool header card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#13131A] border border-[#1E1E2E] rounded-xl p-6 mb-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <ToolIcon tool={tool} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <CategoryBadge category={tool.category} size="sm" />
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${pricingBadge[tool.pricing] || ''}`}>
                          {tool.pricing}
                        </span>
                      </div>
                      <h1 className="text-3xl font-bold text-[#E8E8F0]" style={{ fontFamily: 'Space Grotesk' }}>
                        {tool.name}
                      </h1>
                    </div>
                  </div>
                  <StarRating rating={tool.rating} reviewCount={tool.reviewCount} />
                  <p className="text-sm text-[#666680] mt-3 leading-relaxed">{tool.description}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[#1E1E2E]">
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#7C6EF5] to-[#9B8FF7] text-white text-sm font-semibold hover:opacity-90 transition-all shadow-[0_0_16px_rgba(124,110,245,0.3)]"
                >
                  <ExternalLink size={15} />
                  Visit Tool
                </a>
                <div className="relative">
                  <button
                    onClick={() => setAddToStackOpen(!addToStackOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1E1E2E] text-[#666680] hover:border-[#7C6EF5]/50 hover:text-[#E8E8F0] text-sm transition-all"
                  >
                    <Layers size={15} />
                    Add to My Stack
                  </button>
                  <AnimatePresence>
                    {addToStackOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full mt-2 left-0 bg-[#1A1A24] border border-[#1E1E2E] rounded-xl p-2 w-48 z-50 shadow-xl"
                      >
                        {stacks.length === 0 ? (
                          <div className="px-3 py-2 text-xs text-[#666680]">No stacks yet. Create one first.</div>
                        ) : (
                          stacks.map((stack) => (
                            <button
                              key={stack.id}
                              onClick={() => handleAddToStack(stack.id)}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#666680] hover:text-[#E8E8F0] hover:bg-[#13131A] transition-all text-left"
                            >
                              <span>{stack.emoji}</span>
                              <span className="truncate">{stack.name}</span>
                            </button>
                          ))
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <button
                  onClick={handleFavorite}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm transition-all ${
                    isFavorite(tool.id)
                      ? 'border-[#7C6EF5]/50 bg-[#7C6EF5]/10 text-[#9B8FF7]'
                      : 'border-[#1E1E2E] text-[#666680] hover:border-[#7C6EF5]/50 hover:text-[#E8E8F0]'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorite(tool.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  {isFavorite(tool.id) ? 'Saved' : 'Save'}
                </button>
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="bg-[#13131A] border border-[#1E1E2E] rounded-xl overflow-hidden">
              <div className="flex border-b border-[#1E1E2E] overflow-x-auto">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 px-5 py-3.5 text-sm font-medium transition-all border-b-2 ${
                      activeTab === tab
                        ? 'border-[#7C6EF5] text-[#7C6EF5]'
                        : 'border-transparent text-[#666680] hover:text-[#E8E8F0]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                {activeTab === 'Overview' && (
                  <div className="space-y-6">
                    <p className="text-[#666680] text-sm leading-relaxed">{tool.longDescription || tool.description}</p>

                    {tool.keyFeatures?.length > 0 && (
                      <div>
                        <h3 className="text-base font-semibold text-[#E8E8F0] mb-3" style={{ fontFamily: 'Space Grotesk' }}>Key Capabilities</h3>
                        <ul className="space-y-2">
                          {tool.keyFeatures.map((feat) => (
                            <li key={feat} className="flex items-start gap-2.5 text-sm text-[#666680]">
                              <div className="w-5 h-5 rounded-full bg-[#7C6EF5]/15 border border-[#7C6EF5]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Check size={11} className="text-[#7C6EF5]" />
                              </div>
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {tool.useCases?.length > 0 && (
                      <div>
                        <h3 className="text-base font-semibold text-[#E8E8F0] mb-3" style={{ fontFamily: 'Space Grotesk' }}>Use Cases</h3>
                        <div className="flex flex-wrap gap-2">
                          {tool.useCases.map((uc) => (
                            <span key={uc} className="text-[12px] px-3 py-1 rounded-full border border-[#1E1E2E] bg-[#1A1A24] text-[#666680]">
                              {uc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interface Gallery */}
                    {tool.screenshots?.length > 0 && (
                      <div>
                        <h3 className="text-base font-semibold text-[#E8E8F0] mb-3" style={{ fontFamily: 'Space Grotesk' }}>Interface Gallery</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {tool.screenshots.slice(0, 3).map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt={`${tool.name} screenshot ${i + 1}`}
                              className="rounded-lg border border-[#1E1E2E] object-cover w-full aspect-video"
                              onError={(e) => e.target.style.display = 'none'}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'Features' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(tool.keyFeatures || []).map((feat, i) => (
                      <div key={feat} className="bg-[#1A1A24] border border-[#1E1E2E] rounded-xl p-4">
                        <div className="w-8 h-8 rounded-lg bg-[#7C6EF5]/15 flex items-center justify-center mb-2">
                          <span className="text-[#7C6EF5] text-sm font-bold">{i + 1}</span>
                        </div>
                        <p className="text-sm text-[#E8E8F0]">{feat}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Reviews' && (
                  <div className="space-y-4">
                    <PlaceholderReview
                      name="Alex M."
                      date="Jan 12, 2024"
                      rating={5}
                      text={`${tool.name} has completely transformed my workflow. The ${tool.keyFeatures?.[0] || 'core features'} are incredibly useful. Highly recommend!`}
                    />
                    <PlaceholderReview
                      name="Sarah K."
                      date="Feb 3, 2024"
                      rating={4}
                      text={`Great tool overall. ${tool.description} I especially love how easy it is to get started. The free plan is quite generous.`}
                    />
                    <PlaceholderReview
                      name="David L."
                      date="Mar 15, 2024"
                      rating={5}
                      text={`Best ${tool.category.toLowerCase()} tool I've tried. The ${tool.keyFeatures?.[1] || 'features'} set it apart from the competition. Worth every penny.`}
                    />
                  </div>
                )}

                {activeTab === 'Similar Tools' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {similar.length > 0 ? (
                      similar.map((t, i) => (
                        <ToolCard key={t.id} tool={t} index={i} />
                      ))
                    ) : (
                      <p className="text-[#666680] text-sm col-span-2">No similar tools found.</p>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Right sidebar — Metadata */}
          <aside className="lg:w-[260px] flex-shrink-0 space-y-4">
            {/* Metadata card */}
            <div className="bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-[#E8E8F0] mb-4" style={{ fontFamily: 'Space Grotesk' }}>Metadata</h3>
              <dl className="space-y-3">
                {[
                  {
                    label: 'Pricing Model',
                    value: <span className="text-sm font-semibold text-[#E8E8F0]">{tool.pricing}</span>,
                  },
                  {
                    label: 'Starting Price',
                    value: <span className="text-sm font-semibold text-[#E8E8F0]">{tool.hasFreeplan ? '$0.00 / mo' : 'Paid'}</span>,
                  },
                  {
                    label: 'Platforms',
                    value: <span className="text-sm font-semibold text-[#E8E8F0]">{(tool.platform || []).join(', ')}</span>,
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-2">
                    <dt className="text-xs text-[#3D3D52] mt-0.5 flex-shrink-0">{label}</dt>
                    <dd className="text-right">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Divider */}
              <div className="border-t border-[#1E1E2E] my-4" />

              {/* Tags */}
              {tool.tags?.length > 0 && (
                <div>
                  <div className="text-xs text-[#3D3D52] mb-2">Tags</div>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-[#1A1A24] border border-[#1E1E2E] text-[#666680]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-[#13131A] border border-[#1E1E2E] rounded-xl p-5 space-y-2">
              <button
                onClick={() => setShareOpen(true)}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1E1E2E] text-[#666680] hover:border-[#7C6EF5]/50 hover:text-[#E8E8F0] text-sm transition-all"
              >
                <Share2 size={15} />
                Share this tool
              </button>
              <button
                onClick={handleAddToCompare}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#1E1E2E] text-[#666680] hover:border-[#7C6EF5]/50 hover:text-[#E8E8F0] text-sm transition-all"
              >
                <GitCompare size={15} />
                Compare
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-[#3D3D52] hover:text-[#666680] text-sm transition-all">
                <Flag size={15} />
                Report an issue
              </button>
            </div>
          </aside>
        </div>
      </div>

      {shareOpen && (
        <ShareModal
          url={`https://nexoraai.vercel.app/tool/${tool.id}`}
          title={tool.name}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}