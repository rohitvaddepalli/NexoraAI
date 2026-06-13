import { useState, useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import toolsData from '../data/tools.json';
import { debounce } from '../utils/helpers';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useLocalStorage('nexora-recent-searches', []);

  const addRecentSearch = useCallback(
    debounce((term) => {
      if (!term.trim()) return;
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s !== term);
        return [term, ...filtered].slice(0, 8);
      });
    }, 500),
    [setRecentSearches]
  );

  const removeRecentSearch = (term) => {
    setRecentSearches((prev) => prev.filter((s) => s !== term));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const filterTools = useCallback((tools, filters = {}) => {
    let result = [...tools];
    const {
      query: q,
      category,
      pricing,
      platform,
      isNew,
      isTrending,
      sort = 'popular'
    } = filters;

    if (q) {
      const lq = q.toLowerCase();
      result = result.filter(
        (tool) =>
        tool.name.toLowerCase().includes(lq) ||
        tool.description.toLowerCase().includes(lq) ||
        tool.category.toLowerCase().includes(lq) ||
        (tool.tags || []).some((tag) => tag.toLowerCase().includes(lq)) ||
        (tool.keyFeatures || []).some((f) => f.toLowerCase().includes(lq))
      );
    }

    if (category && category !== 'All') {
      result = result.filter((tool) => tool.category === category);
    }

    if (pricing && pricing.length > 0) {
      result = result.filter((tool) => pricing.includes(tool.pricing));
    }

    if (platform && platform.length > 0) {
      result = result.filter((tool) =>
      platform.some((p) => (tool.platform || []).includes(p))
      );
    }

    if (isNew) {
      result = result.filter((tool) => tool.isNew);
    }

    if (isTrending) {
      result = result.filter((tool) => tool.isTrending);
    }

    switch (sort) {
      case 'newest':
        result = result.sort(
          (a, b) => new Date(b.addedDate) - new Date(a.addedDate)
        );
        break;
      case 'top-rated':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case 'free-first':
        result = result.sort((a, b) => (b.hasFreeplan ? 1 : 0) - (a.hasFreeplan ? 1 : 0));
        break;
      case 'popular':
      default:
        result = result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return toolsData;
    return filterTools(toolsData, { query });
  }, [query, filterTools]);

  return {
    query,
    setQuery,
    results,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    filterTools
  };
}