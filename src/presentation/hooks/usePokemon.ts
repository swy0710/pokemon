import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { pokemonRepository } from '@/app/pokemonRepository';
import { type Pokemon } from '@/domain/entities/Pokemon';
import { getPokemon } from '@/domain/useCases/getPokemon';

export const usePokemon = (id: number | string): UseQueryResult<Pokemon> => {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(pokemonRepository, id),
  });
};
