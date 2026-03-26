import type { Favorite } from '@/domain/entities/Favorite';
import type { FavoriteRepository } from '@/domain/repositories/FavoriteRepository';

export const getFavorites = (repo: FavoriteRepository): Favorite[] => {
  return repo.getAll();
};
