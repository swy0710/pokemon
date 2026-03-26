import type { EvolutionChain } from '@/domain/entities/EvolutionChain';
import type { PokemonRepository } from '@/domain/repositories/PokemonRepository';

export const getEvolutionChain = async (
  repo: PokemonRepository,
  pokemonId: number | string,
): Promise<EvolutionChain> => {
  return repo.getEvolutionChain(pokemonId);
};
