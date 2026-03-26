import { useMemo } from 'react';

import type { Pokemon } from '@/domain/entities/Pokemon';

export const usePokemonSearch = (query: string, pokemons: Pokemon[]): Pokemon[] => {
  return useMemo(() => {
    if (!query.trim()) return pokemons;
    const lower = query.toLowerCase();
    return pokemons.filter((p) => p.name.toLowerCase().includes(lower));
  }, [query, pokemons]);
};
