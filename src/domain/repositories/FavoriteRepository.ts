import type { Favorite } from '@/domain/entities/Favorite';

export interface FavoriteRepository {
  getAll(): Favorite[];
  add(favorite: Favorite): void;
  remove(pokemonId: number): void;
  has(pokemonId: number): boolean;
}
