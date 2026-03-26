import { useInfiniteQuery, type UseInfiniteQueryResult } from '@tanstack/react-query';

import { pokemonRepository } from '@/app/pokemonRepository';
import { type Pokemon } from '@/domain/entities/Pokemon';
import { getPokemons } from '@/domain/useCases/getPokemons';

const LIMIT = 20;

interface PokemonsPage {
  pokemons: Pokemon[];
  total: number;
}

export const usePokemons = (): UseInfiniteQueryResult<{ pages: PokemonsPage[] }, Error> => {
  return useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam }) => getPokemons(pokemonRepository, LIMIT, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: PokemonsPage, allPages: PokemonsPage[]) => {
      const fetched = allPages.length * LIMIT;
      return fetched < lastPage.total ? fetched : undefined;
    },
  });
};
