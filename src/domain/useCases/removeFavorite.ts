import type { FavoriteRepository } from '@/domain/repositories/FavoriteRepository';

export const removeFavorite = (repo: FavoriteRepository, pokemonId: number): void => {
  repo.remove(pokemonId);
};
