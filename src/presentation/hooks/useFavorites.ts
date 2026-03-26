import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Favorite } from '@/domain/entities/Favorite';

interface FavoritesState {
  favorites: Favorite[];
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (favorite: Favorite): void => {
        const already = get().favorites.some((f) => f.pokemonId === favorite.pokemonId);
        if (!already) {
          set((state) => ({ favorites: [...state.favorites, favorite] }));
        }
      },

      removeFavorite: (pokemonId: number): void => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.pokemonId !== pokemonId),
        }));
      },

      isFavorite: (pokemonId: number): boolean => {
        return get().favorites.some((f) => f.pokemonId === pokemonId);
      },
    }),
    { name: 'pokedex-favorites' },
  ),
);
