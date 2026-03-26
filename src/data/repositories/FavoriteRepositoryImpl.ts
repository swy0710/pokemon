import type { Favorite } from '@/domain/entities/Favorite';
import type { FavoriteRepository } from '@/domain/repositories/FavoriteRepository';

const STORAGE_KEY = 'pokedex-favorites';

function readFromStorage(): Favorite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Favorite[];
  } catch {
    return [];
  }
}

function writeToStorage(favorites: Favorite[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export const favoriteRepositoryImpl: FavoriteRepository = {
  getAll(): Favorite[] {
    return readFromStorage();
  },

  add(favorite: Favorite): void {
    const favorites = readFromStorage();
    const alreadyExists = favorites.some((f) => f.pokemonId === favorite.pokemonId);
    if (!alreadyExists) {
      writeToStorage([...favorites, favorite]);
    }
  },

  remove(pokemonId: number): void {
    const favorites = readFromStorage();
    writeToStorage(favorites.filter((f) => f.pokemonId !== pokemonId));
  },

  has(pokemonId: number): boolean {
    return readFromStorage().some((f) => f.pokemonId === pokemonId);
  },
};
