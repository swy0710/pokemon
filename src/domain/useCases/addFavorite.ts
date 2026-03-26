import type { Favorite } from '@/domain/entities/Favorite';
import type { FavoriteRepository } from '@/domain/repositories/FavoriteRepository';

export const addFavorite = (repo: FavoriteRepository, favorite: Favorite): void => {
  repo.add(favorite);
};
