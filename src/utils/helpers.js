
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}


export function getCategories(tools) {
  const counts = {};
  tools.forEach((tool) => {
    counts[tool.category] = (counts[tool.category] || 0) + 1;
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}


export function getCategoryGradient(category) {
  const gradients = {
    'Writing & Productivity': 'from-violet-500 to-purple-600',
    'Coding & Dev': 'from-cyan-500 to-blue-600',
    'Image Generation': 'from-pink-500 to-rose-600',
    'Video & Audio': 'from-orange-500 to-red-600',
    'Voice & Speech': 'from-green-500 to-emerald-600',
    'Design & UI': 'from-indigo-500 to-blue-600',
    'Research & Analysis': 'from-yellow-500 to-amber-600',
    'Business & Marketing': 'from-rose-500 to-pink-600'
  };
  return gradients[category] || 'from-violet-500 to-purple-600';
}


export function getCategoryColor(category) {
  const colors = {
    'Writing & Productivity': '#7C6EF5',
    'Coding & Dev': '#06B6D4',
    'Image Generation': '#EC4899',
    'Video & Audio': '#F97316',
    'Voice & Speech': '#22C55E',
    'Design & UI': '#6366F1',
    'Research & Analysis': '#EAB308',
    'Business & Marketing': '#F43F5E'
  };
  return colors[category] || '#7C6EF5';
}


export function getCategoryEmoji(category) {
  const emojis = {
    'Writing & Productivity': '✍️',
    'Coding & Dev': '💻',
    'Image Generation': '🎨',
    'Video & Audio': '🎬',
    'Voice & Speech': '🎙️',
    'Design & UI': '🖌️',
    'Research & Analysis': '🔬',
    'Business & Marketing': '📈'
  };
  return emojis[category] || '🤖';
}


export function categoryToSlug(category) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function slugToCategory(slug) {
  const map = {
    'writing-productivity': 'Writing & Productivity',
    'coding-dev': 'Coding & Dev',
    'image-generation': 'Image Generation',
    'video-audio': 'Video & Audio',
    'voice-speech': 'Voice & Speech',
    'design-ui': 'Design & UI',
    'research-analysis': 'Research & Analysis',
    'business-marketing': 'Business & Marketing'
  };
  return map[slug] || slug;
}


export function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}


export function getToolInitials(name) {
  return name.
  split(' ').
  map((w) => w[0]).
  join('').
  substring(0, 2).
  toUpperCase();
}


export function getToolGradient(id) {
  const gradients = [
  'from-violet-500 to-purple-700',
  'from-cyan-500 to-blue-700',
  'from-pink-500 to-rose-700',
  'from-orange-500 to-red-700',
  'from-green-500 to-emerald-700',
  'from-indigo-500 to-violet-700',
  'from-yellow-500 to-orange-700',
  'from-teal-500 to-cyan-700'];

  const index = id.charCodeAt(0) % gradients.length;
  return gradients[index];
}


export function truncate(str, maxLen) {
  if (!str) return '';
  return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
}


export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}