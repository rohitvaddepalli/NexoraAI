import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import toolsData from '../data/tools.json';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage('nexora-favorites', []);

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
    prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favoriteIds.includes(id);

  const favoritedTools = useMemo(
    () => toolsData.filter((tool) => favoriteIds.includes(tool.id)),
    [favoriteIds]
  );

  return { favoriteIds, toggleFavorite, isFavorite, favoritedTools };
}