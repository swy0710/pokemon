import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { pokemonRepository } from '@/app/pokemonRepository';
import { type EvolutionChain } from '@/domain/entities/EvolutionChain';
import { getEvolutionChain } from '@/domain/useCases/getEvolutionChain';

export const useEvolutionChain = (pokemonId: number | string): UseQueryResult<EvolutionChain> => {
  return useQuery({
    queryKey: ['evolutionChain', pokemonId],
    queryFn: () => getEvolutionChain(pokemonRepository, pokemonId),
  });
};
